// ===============================
// 1. Imports e setup
// ===============================
import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import OpenAI from "openai";

// Importar database
import { 
  connectDatabase, 
  saveAppointment, 
  getAppointments, 
  findAppointmentById, 
  updateAppointmentStatus,
  getAvailableSlots,
  saveLead,
  getLeads,
  getStats
} from './database.js';

const app = express();

// Segurança
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: false
}));

app.use(express.json());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requests por IP
});
app.use(limiter);

// Rate limiting específico para chat
const chatLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 10 // máximo 10 requests de chat por minuto
});

// ===============================
// 2. MIDDLEWARES
// ===============================

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Validação de contato
function validateContact(contact) {
  if (!contact) return false;
  
  // Regex mais flexível para telefones brasileiros
  const phoneRegex = /^[\+]?[1-9][\d\s\-\(\)]{8,20}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Remove espaços e caracteres especiais, mas mantém o +
  const cleanContact = contact.replace(/[^\d+]/g, '');
  
  // Aceita telefones com 10-15 dígitos (incluindo DDD)
  const isValidPhone = cleanContact.length >= 10 && cleanContact.length <= 15;
  const isValidEmail = emailRegex.test(contact);
  
  return isValidPhone || isValidEmail;
}

// === OpenAI client ===
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANTE: use um modelo que suporte JSON mode, como:
// gpt-4o-mini, gpt-4o, gpt-4.1, gpt-4.1-mini, etc.
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

// ===============================
// 3. Configuração de agenda
// ===============================
const CLINIC_SCHEDULE = {
  startHour: 9,       // 9h
  endHour: 18,        // 18h (último horário começa 17:30)
  slotMinutes: 30,    // intervalos de 30min
};

function generateSlotsForDay(dateStr) {
  const slots = [];

  const parts = dateStr.split("-");
  if (parts.length !== 3) return [];

  const [year, month, day] = parts.map(Number);
  const d = new Date(year, month - 1, day);
  if (isNaN(d.getTime())) return [];

  for (let h = CLINIC_SCHEDULE.startHour; h < CLINIC_SCHEDULE.endHour; h++) {
    for (let m = 0; m < 60; m += CLINIC_SCHEDULE.slotMinutes) {
      const hh = String(h).padStart(2, "0");
      const mm = String(m).padStart(2, "0");
      slots.push(`${hh}:${mm}`);
    }
  }
  return slots;
}

// ADICIONAR: Função para obter slots disponíveis do banco
async function getAvailableSlotsForDate(dateStr) {
  const allSlots = generateSlotsForDay(dateStr);
  if (!allSlots.length) return [];

  const bookedSlots = await getAvailableSlots(dateStr);
  return allSlots.filter(t => !bookedSlots.includes(t));
}

// ===============================
// 4. ROTAS
// ===============================

// ---- 1) Health check ----
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    message: "Servidor funcionando normalmente",
    timestamp: new Date().toISOString(),
    version: "2.1.0"
  });
});

// ---- 2) Leads genéricos (marketing + pré-avaliação) ----
app.post("/api/leads", async (req, res) => {
  try {
    const lead = req.body;

    console.log("🔥 NOVO LEAD RECEBIDO:", lead);

    // Validação básica
    if (!lead.name || !lead.phone) {
      return res.status(400).json({
        ok: false,
        error: "Nome e telefone são obrigatórios",
      });
    }

    const leadData = {
      ...lead,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    // Salvar no banco local
    await saveLead(leadData);

    // =======================================
    // 🚀 ENVIAR ESSE LEAD PARA O N8N
    // =======================================
    try {
      await fetch("https://btrix.app.n8n.cloud/webhook/bot-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        name: leadData.name,
        phone: leadData.phone,
        email: leadData.email || "",
        message: leadData.message || "",
        treatmentName: leadData.treatmentName || null,
        treatmentPrice: leadData.treatmentPrice || null,
        source: leadData.source || "site-bot",
        type: "lead",
        receivedAt: leadData.createdAt,
        }),
      });

      console.log("🚀 Lead enviado para o n8n com sucesso!");
    } catch (err) {
      console.error("⚠️ ERRO ao enviar lead para o n8n:", err.message);
      // Não quebra o fluxo para o usuário
    }
    // =======================================

    return res.json({
      ok: true,
      message: "Lead recebido com sucesso",
      leadId: leadData.id
    });

  } catch (error) {
    console.error("Erro ao receber lead:", error);
    return res.status(500).json({
      ok: false,
      error: "Erro interno do servidor",
    });
  }
});


// ---- 3) Disponibilidade de horários por dia ----
// GET /api/availability?date=2025-12-12
app.get("/api/availability", async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        ok: false,
        error: "Missing date (YYYY-MM-DD)",
      });
    }

    const availableSlots = await getAvailableSlotsForDate(date);

    return res.json({
      ok: true,
      date,
      availableSlots,
    });
  } catch (error) {
    console.error("Erro em /api/availability:", error);
    return res.status(500).json({
      ok: false,
      error: "Erro interno do servidor",
    });
  }
});

// ---- 4) Criação de agendamento ----
// POST /api/appointments
app.post("/api/appointments", async (req, res) => {
  try {
    const body = req.body;

    const {
      sourceBot,
      sourceVertical,
      clinicName,
      language,
      category,
      treatmentName,
      treatmentPrice,
      name,
      date,
      time,
      contact,
      sourceUrl,
    } = body;

    // Validações
    if (!name || !date || !time || !treatmentName) {
      return res.status(400).json({
        ok: false,
        error: "Missing required fields (name, date, time, treatmentName)",
      });
    }

    if (!validateContact(contact)) {
      return res.status(400).json({
        ok: false,
        error: "Contact must be a valid phone number or email",
      });
    }

    const availableSlots = await getAvailableSlotsForDate(date);
    if (!availableSlots.includes(time)) {
      return res.status(400).json({
        ok: false,
        error: "Selected slot is not available anymore",
      });
    }

    const appointment = {
      id: Date.now().toString(),
      sourceBot: sourceBot || "Eliza",
      sourceVertical: sourceVertical || "Aesthetic Clinic",
      clinicName: clinicName || "MovMore Clinic",
      language: language || "pt",
      category: category || null,
      treatmentName,
      treatmentPrice: treatmentPrice ?? null,
      name: name.trim(),
      date,
      time,
      contact: contact.trim(),
      sourceUrl: sourceUrl || null,
      status: "pending_payment"
    };

    await saveAppointment(appointment);

    console.log("📅 NOVO AGENDAMENTO:", appointment);

console.log("📅 NOVO AGENDAMENTO:", appointment);

// 1. Primeiro, descubra qual campo tem o preço
console.log("🔍 DADOS QUE CHEGARAM:", req.body);

// 2. Pegue o preço DO BODY (não do appointment)
const totalFromBody = req.body.total ?? req.body.treatmentPrice ?? req.body.price ?? null;
console.log("💰 PREÇO ENCONTRADO NO BODY:", totalFromBody);

// 3. Use esse preço para enviar ao n8n
try {
  await fetch("https://btrk.app.n8n.cloud/webhook/bot-lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: appointment.name,
      contact: appointment.contact,
      treatmentName: appointment.treatmentName,
      treatmentPrice: totalFromBody,  // ← MANDO O PREÇO AQUI!
      date: appointment.date,
      time: appointment.time,
      bookingId: appointment.id,
      source: "eliza-bot"
    }),
  });

  console.log("✅ Appointment enviado para o n8n com preço:", totalFromBody);
} catch (err) {
  console.error("❌ ERRO ao enviar appointment:", err.message);
}

    return res.json({
      ok: true,
      appointmentId: appointment.id,
      appointment: appointment
    });
  } catch (error) {
    console.error("Erro em /api/appointments:", error);
    return res.status(500).json({
      ok: false,
      error: error.message || "Unexpected error",
    });
  }
});

// ---- 5) Rota de chat com OpenAI (Chat Completions + JSON mode) ----
app.post("/api/chat", chatLimiter, async (req, res) => {
  try {
    const {
      message,       // mensagem do usuário
      clientId,      // opcional: id do cliente (ex: "movmore")
      language,      // "en", "pt", "es"
      context        // opcional: contexto extra (ex: fluxo atual)
    } = req.body;

    if (!message) {
      return res.status(400).json({ ok: false, error: "Missing 'message' in body" });
    }

    const lang = language || "pt";

    const systemPrompt = `
Você é a Eliza, assistente virtual da ${clientId || "MovMore Clinic"}, uma clínica de estética de luxo na Irlanda.

Você é uma especialista em tratamentos estéticos com anos de experiência. Seu papel é:
- Educar clientes sobre tratamentos de forma clara e profissional
- Sugerir tratamentos complementares (upsell) quando apropriado e ético
- Extrair informações de agendamento quando o cliente mencionar tratamentos, datas ou horários
- Responder SEMPRE no idioma: ${lang}
- Quando o cliente responder "yes", "sim", "sí", "ok", "claro" após você sugerir um tratamento, SEMPRE retornar intent: "book_appointment" com o tratamento mencionado

IMPORTANTE: Você deve responder SEMPRE em JSON válido com esta estrutura:

{
  "reply": "sua resposta ao cliente (pode incluir sugestão de tratamento complementar se apropriado)",
  "intent": "book_appointment" | "ask_price" | "ask_treatment" | "small_talk" | "other",
  "treatment": {
    "name": "nome exato do tratamento ou null",
    "category": "laserHim" | "laserHer" | "injectables" | "skin" | "body" | "massage" | null
  },
  "date": "YYYY-MM-DD ou null (se o cliente mencionar data, converta para este formato)",
  "time": "HH:MM ou null (se o cliente mencionar horário, converta para este formato)"
}

TRATAMENTOS DISPONÍVEIS:
- Laser Hair Removal (Him & Her): Full Leg, Underarms, Full Arms, Chest, Back, Bikini, etc.
- Injectables: Lip Filler, Anti-Wrinkles, Skinbooster, Nose Fillers, Sculptra, etc.
- Skin: HIFU Facial, Microneedling, Chemical Peels, Laser Resurfacing, etc.
- Body: Cryolipolysis, Radio Frequency, Fat Dissolving, Velashape, etc.
- Massage: Deep Tissue, Hot Stone, Lymphatic Drainage, Relaxing, etc.

REGRAS DE UPSELL:
- Lip Filler → sugerir Skinbooster
- Anti-Wrinkles → sugerir tratamento de 3 áreas
- HIFU Facial → sugerir Skinbooster
- Full Leg → sugerir Underarms
- Cryolipolysis → sugerir Radio Frequency

Seja natural, empática e profissional. Não force vendas, mas eduque sobre benefícios de combinações.
`;

    const userContent = context
      ? `Mensagem do usuário: "${message}".\nContexto adicional: ${JSON.stringify(context)}`
      : `Mensagem do usuário: "${message}".`;

    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent }
      ],
    });

    const raw = completion.choices[0].message.content;
    console.log("Resposta BRUTA do modelo:", raw);

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      console.error("Erro ao parsear JSON do modelo:", raw);
      return res.status(500).json({
        ok: false,
        error: "Invalid JSON from model",
        raw
      });
    }

    return res.json({
      ok: true,
      model: OPENAI_MODEL,
      reply: parsed.reply,
      intent: parsed.intent,
      treatment: parsed.treatment || null,
      date: parsed.date || null,
      time: parsed.time || null
    });

  } catch (error) {
    console.error("Erro em /api/chat:", error);
    
    // Fallback para quando OpenAI falha
    const fallbackReplies = {
      en: "I'm having trouble connecting right now. Please try again in a moment.",
      pt: "Estou com problemas de conexão no momento. Por favor, tente novamente em alguns instantes.",
      es: "Estoy teniendo problemas de conexión en este momento. Por favor, inténtelo de nuevo en un momento."
    };
    
    const lang = req.body.language || "pt";
    
    return res.json({
      ok: true,
      reply: fallbackReplies[lang] || fallbackReplies.pt,
      intent: "other",
      treatment: null,
      date: null,
      time: null
    });
  }
});

// ---- 6) Rota para obter agendamentos (admin) ----
app.get("/api/appointments", async (req, res) => {
  try {
    const appointments = await getAppointments();
    
    return res.json({
      ok: true,
      appointments: appointments,
      total: appointments.length
    });
  } catch (error) {
    console.error("Erro em GET /api/appointments:", error);
    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

// ---- 7) Rota para obter leads (admin) ----
app.get("/api/leads", async (req, res) => {
  try {
    const leads = await getLeads();
    
    return res.json({
      ok: true,
      leads: leads,
      total: leads.length
    });
  } catch (error) {
    console.error("Erro em GET /api/leads:", error);
    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

// ---- 8) Estatísticas (admin) ----
app.get("/api/stats", async (req, res) => {
  try {
    const stats = await getStats();
    
    return res.json({
      ok: true,
      stats
    });
  } catch (error) {
    console.error("Erro em /api/stats:", error);
    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

// ---- 9) Webhook para confirmação de pagamento ----
app.post("/api/payment/webhook", async (req, res) => {
  try {
    const { appointmentId, status, transactionId } = req.body;

    console.log("💳 WEBHOOK DE PAGAMENTO:", { appointmentId, status, transactionId });

    if (!appointmentId || !status) {
      return res.status(400).json({
        ok: false,
        error: "Missing appointmentId or status"
      });
    }

    const appointment = await findAppointmentById(appointmentId);
    if (!appointment) {
      return res.status(404).json({
        ok: false,
        error: "Appointment not found"
      });
    }

    await updateAppointmentStatus(appointmentId, status, transactionId);

    console.log(`✅ Status atualizado para ${status} - Agendamento ${appointmentId}`);

    return res.json({
      ok: true,
      message: "Payment status updated"
    });
  } catch (error) {
    console.error("Erro em /api/payment/webhook:", error);
    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

// ---- 10) Endpoint para traduzir descrições de tratamentos ----
app.post("/api/translate", async (req, res) => {
  try {
    const { text, targetLang } = req.body;

    if (!text || !targetLang) {
      return res.status(400).json({ ok: false, error: "Missing 'text' or 'targetLang' in body" });
    }

    const langMap = {
      pt: "português brasileiro",
      es: "español",
      en: "english"
    };

    const targetLanguage = langMap[targetLang] || "português brasileiro";

    const systemPrompt = `Você é um tradutor profissional especializado em estética e beleza. Traduza o texto a seguir para ${targetLanguage}, mantendo o tom profissional e persuasivo. Responda APENAS com a tradução, sem explicações adicionais.`;

    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text }
      ],
    });

    const translation = completion.choices[0].message.content.trim();

    return res.json({
      ok: true,
      translation
    });

  } catch (error) {
    console.error("Erro em /api/translate:", error);
    return res.status(500).json({
      ok: false,
      error: error.message || "Unexpected error"
    });
  }
});

// ---- 11) Endpoint para sugerir upsell inteligente ----
app.post("/api/suggest-upsell", async (req, res) => {
  try {
    const { treatment, category, language } = req.body;

    if (!treatment) {
      return res.status(400).json({ ok: false, error: "Missing 'treatment' in body" });
    }

    const lang = language || "pt";

    const systemPrompt = `
Você é a Eliza, especialista em tratamentos estéticos da MovMore Clinic.

Sua tarefa: Sugerir UM tratamento complementar que combine bem com o tratamento principal escolhido pelo cliente.

TRATAMENTOS DISPONÍVEIS:
- Laser Hair Removal: Full Leg (€78-95), Underarms (€40-42), Full Arms (€65-78), Bikini (€68-90), etc.
- Injectables: Lip Filler (€189), Anti-Wrinkles 1 Area (€160), Skinbooster (€199), Nose Fillers (€299), Under-Eye Filler (€199), etc.
- Skin: HIFU Facial (€249), Microneedling (€229), Fractional Laser (€179), Deep Pore Cleansing (€49.99), etc.
- Body: Cryolipolysis (€149), Radio Frequency (€299), Fat Dissolving (€259), Velashape (€369), Lemon Bottle (€99), etc.
- Massage: Deep Tissue (€80), Hot Stone (€55), Lymphatic Drainage (€49.99), Relaxing (€60), etc.

REGRAS DE UPSELL (exemplos):
- Lip Filler → Skinbooster (hidratação profunda complementa o preenchimento)
- Anti-Wrinkles → Skinbooster ou HIFU Facial (rejuvenescimento completo)
- HIFU Facial → Microneedling ou Skinbooster (potencializa resultados)
- Full Leg → Underarms ou Bikini (pacote completo de depilação)
- Cryolipolysis → Radio Frequency (redução de gordura + firmeza)
- Microneedling → HIFU Facial (textura + lifting)

RESPONDA SEMPRE em JSON válido com esta estrutura:

{
  "message": "mensagem de upsell em ${lang} (use emojis, seja persuasiva mas não agressiva)",
  "name": "nome exato do tratamento sugerido",
  "price": preço numérico (ex: 199)
}

Exemplo de mensagem:
"💎 OFERTA ESPECIAL 💎\n\nMuitos clientes combinam Lip Filler com Skinbooster para resultados ainda melhores!\n\nGostaria de adicionar por apenas €199?"

Seja natural e educativa. Explique brevemente POR QUE a combinação funciona bem.
`;

    const userContent = `Tratamento principal escolhido: ${treatment}${category ? ` (categoria: ${category})` : ""}`;

    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent }
      ],
    });

    const raw = completion.choices[0].message.content;
    console.log("Upsell sugerido pela IA:", raw);

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      console.error("Erro ao parsear JSON do modelo:", raw);
      return res.status(500).json({
        ok: false,
        error: "Invalid JSON from model",
        raw
      });
    }

    return res.json({
      ok: true,
      suggestion: {
        message: parsed.message,
        name: parsed.name,
        price: parsed.price
      }
    });

  } catch (error) {
    console.error("Erro em /api/suggest-upsell:", error);
    return res.status(500).json({
      ok: false,
      error: error.message || "Unexpected error"
    });
  }
});

// ===============================
// 5. FUNÇÕES AUXILIARES PARA AUTOMAÇÃO
// ===============================

/**
 * Função placeholder para agendar mensagens de WhatsApp/SMS
 * 
 * @param {string} contact - Número de WhatsApp ou email
 * @param {string} date - Data do agendamento (YYYY-MM-DD)
 * @param {string} time - Horário do agendamento (HH:MM)
 * @param {string} type - Tipo de mensagem: "confirmation", "reminder", "feedback"
 * @param {number} hoursOffset - Horas antes (-) ou depois (+) do horário
 */
function scheduleWhatsAppMessage(contact, date, time, type, hoursOffset = 0) {
  // TODO: Implementar com serviço de WhatsApp API (Twilio, MessageBird, etc.)
  // TODO: Ou usar serviço de agendamento (node-cron, bull queue, etc.)
  
  const appointmentDateTime = new Date(`${date}T${time}:00`);
  const sendDateTime = new Date(appointmentDateTime.getTime() + (hoursOffset * 60 * 60 * 1000));

  console.log(`📅 Mensagem de ${type} agendada para ${contact} em ${sendDateTime.toISOString()}`);

  // Exemplo de estrutura de mensagens:
  const messages = {
    confirmation: {
      en: `✅ Your appointment at MovMore Clinic is confirmed!\n📅 ${date} at ${time}\nSee you soon! 💫`,
      pt: `✅ Seu agendamento na MovMore Clinic está confirmado!\n📅 ${date} às ${time}\nTe vemos em breve! 💫`,
      es: `✅ ¡Tu cita en MovMore Clinic está confirmada!\n📅 ${date} a las ${time}\n¡Nos vemos pronto! 💫`
    },
    reminder: {
      en: `⏰ Reminder: Your appointment at MovMore Clinic is tomorrow at ${time}. See you soon!`,
      pt: `⏰ Lembrete: Seu agendamento na MovMore Clinic é amanhã às ${time}. Te vemos em breve!`,
      es: `⏰ Recordatorio: Tu cita en MovMore Clinic es mañana a las ${time}. ¡Nos vemos pronto!`
    },
    feedback: {
      en: `💫 How was your experience at MovMore Clinic? We'd love your feedback!\n⭐ Google: [link]\n⭐ Trustpilot: [link]`,
      pt: `💫 Como foi sua experiência na MovMore Clinic? Adoraríamos seu feedback!\n⭐ Google: [link]\n⭐ Trustpilot: [link]`,
      es: `💫 ¿Cómo foi tu experiencia en MovMore Clinic? ¡Nos encantaría tu opinión!\n⭐ Google: [link]\n⭐ Trustpilot: [link]`
    }
  };

  // Em produção, usar serviço real de agendamento
  // Exemplo com node-cron:
  // schedule.scheduleJob(sendDateTime, () => {
  //   sendWhatsAppMessage(contact, messages[type].pt);
  // });
}

/**
 * Função placeholder para enviar mensagem via WhatsApp
 */
function sendWhatsAppMessage(contact, message) {
  // TODO: Implementar com Twilio, MessageBird, ou WhatsApp Business API
  console.log(`📱 Enviando WhatsApp para ${contact}: ${message}`);
}

// ===============================
// 6. ERROR HANDLING
// ===============================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    error: "Endpoint not found"
  });
});

// Error handler global
app.use((error, req, res, next) => {
  console.error("Erro não tratado:", error);
  res.status(500).json({
    ok: false,
    error: "Internal server error"
  });
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('🔄 Desligando servidor...');
  process.exit(0);
});

// ===============================
// 7. Start server
// ===============================
const PORT = process.env.PORT || 3001;

// Conectar ao banco de dados
await connectDatabase();

app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
  console.log(`📊 Endpoints disponíveis:`);
  console.log(`   GET  /api/health - Health check`);
  console.log(`   POST /api/chat - Chat com IA`);
  console.log(`   POST /api/translate - Traduzir descrições`);
  console.log(`   POST /api/suggest-upsell - Sugerir upsell inteligente`);
  console.log(`   POST /api/appointments - Criar agendamento`);
  console.log(`   GET  /api/appointments - Listar agendamentos`);
  console.log(`   GET  /api/availability?date=YYYY-MM-DD - Horários disponíveis`);
  console.log(`   POST /api/leads - Capturar leads`);
  console.log(`   GET  /api/leads - Listar leads`);
  console.log(`   GET  /api/stats - Estatísticas`);
  console.log(`   POST /api/payment/webhook - Webhook de pagamento`);
});