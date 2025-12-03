// ============= CONFIG GERAL =============

const API_BASE = 'https://eliza-bot-movmore.onrender.com'; // trocar para URL do backend em produção

const CLINIC_CONFIG = {
  name: "MovMore Clinic",
  botName: "Eliza",
  whatsappUrl: "https://wa.me/353894434534",
  paymentUrl: "https://payment.movmoreclinic.com/checkout", // Placeholder para API de pagamento
  taglines: {
    en: "Your 24/7 aesthetic clinic concierge.",
    pt: "Sua concierge 24/7 de estética.",
    es: "Tu concierge estética 24/7."
  }
};

// ============= TEXTOS (EN / PT / ES) =============

const COPY = {
  en: {
    langQuestion: "Choose your language / Escolha seu idioma / Elige tu idioma:",
    langEN: "English (EN)",
    langPT: "Português (PT)",
    langES: "Español (ES)",

    welcome1: "Hi, I'm <b>Eliza</b>, the AI assistant of <b>MovMore Clinic</b>. ✨",
    welcome2: "I can explain treatments, show prices and book consultations for you.",
    howHelp: "How can I help you today?",

    menuTitle: "Back to the main menu. What would you like to do now?",
    mExplore: "Explore treatments",
    mBook: "Book a consultation",
    mPrices: "See prices",
    mPre: "Quick pre-evaluation",
    mFaq: "FAQ",
    mBack: "Back to main menu",

    catQuestionTreat: "Great! Which type of treatment are you interested in?",
    catQuestionPrices: "Perfect! Choose a category to see our prices:",
    catQuestionBook: "Perfect. Let's book your consultation. First, choose a treatment category:",
    addMoreTreatmentTitle: "Awesome! Let's boost your booking. 😊<br>Choose another treatment to add to your order:",
    catLaserHim: "Laser Hair Removal – Him",
    catLaserHer: "Laser Hair Removal – Her",
    catInjectables: "Injectables",
    catSkin: "Skin Treatments",
    catBody: "Body Treatments",
    catMassage: "Massages",

    // Fluxo Explorar Tratamentos
    treatmentsInCategory: "Here are the treatments in <b>{cat}</b>:",
    selectTreatmentToLearn: "Select a treatment to learn more:",
    treatmentExplanation: "<b>{name}</b> (€{price})<br><br>{description}",
    askBookTreatment: "Would you like to book this treatment?",
    askBookThisTreatment: "Would you like to book this treatment?",
    yesBook: "Yes, book it!",
    backToCat: "Back to category",

    // Fluxo Ver Preços
    pricesIntro: "Here are the prices for <b>{cat}</b>:",
    askScheduleFromPrices: "Would you like to schedule one of these treatments?",
    yesSchedule: "Yes, schedule",
    backToCategories: "Back to categories",
    whichTreatmentSchedule: "Which treatment would you like to schedule?",

    // Agendamento
    excellentChoice: "Excellent choice! <b>{treatment}</b> at <b>€{price}</b>.",
    askName: "What's your full name?",
    askDate: "Nice to meet you, <b>{name}</b>! Which date would you prefer? (format: YYYY-MM-DD)",
    askDateHint: "Example: 2025-12-20",
    invalidDate: "Please use the format YYYY-MM-DD (e.g., 2025-12-20)",
    askTime: "Great! What time works best for you?",
    availableSlots: "Here are the available time slots for <b>{date}</b>:",
    noSlotsAvailable: "Sorry, no slots available for this date. Please choose another date.",

    // Upsell
    upsellIntro: "<br>💎 <b>SPECIAL OFFER</b> 💎<br><br>Many clients combine <b>{main}</b> with <b style='font-size:18px;color:#ff5bb3;'>{upsell}</b> for better results!<br><br>Would you like to add it for just <b>€{price}</b>?",
    yesAddUpsell: "Yes, add it!",
    noUpsell: "No, thanks",
    continueBtn: "Continue",
    upsellAdded: "Perfect! I've added <b style='color:#ff5bb3;'>{upsell}</b> (€{price}) to your booking. ✨",
    
    // Agendamento direto
    directBookingConfirm: "Sure! I can help you with that.",
    directBookingDetails: "Appointment on <b>{date}</b>, <b>{treatment}</b> (€{price})",
    directBookingUpsell: "Would you like to add <b style='font-size:18px;color:#ff5bb3;'>{upsell}</b>? It goes really well with <b>{treatment}</b> for better results!<br><br>Just <b>€{price}</b> more.",

    // Confirmação
    askContact: "We're almost done! Please send me your best contact (WhatsApp or email).",
    askAddMoreTreatment: "Would you like to add another treatment to your booking?",
    privacyNote: "Your information will be used solely so our team can get in touch with you.",

    // 1º balão – título da confirmação
    bookingConfirmed: "✨ Your appointment confirmation:<br><br>Reserva #<b>{id}</b>",

    // 2º balão – detalhes do agendamento
    confirmationDetails: "<b>Treatment:</b> {treatment}<br><b>Date:</b> {date}<br><b>Time:</b> {time}<br><b>Name:</b> {name}<br><b>Contact:</b> {contact}<br><b>Total:</b> €{total}",

    // 3º balão – pergunta se quer pagar agora
    paymentLink: "Would you like to pay now to secure your spot?",
    paymentLinkIntro: "Here is your payment link:",
    payNow: "Pay Now",
    finish: "Finish",

    // Mensagem sobre confirmação por WhatsApp / e-mail / SMS
    confirmationSent: "You will receive the confirmation by WhatsApp, email, or SMS.",

    // Pré-Avaliação
    preIntro: "Let's do a quick pre-evaluation to understand your goals. 💬",
    preQuestion1: "What is your main aesthetic goal right now?",
    preQuestion2: "What concerns you the most about your appearance?",
    preQuestion3: "How old are you?",
    preQuestion4: "Why are you considering this treatment?",
    preThankYou: "Thank you for sharing! We have everything we need.",
    preAskContact: "To receive a personalized evaluation from our medical team, please provide:",
    preAskName: "Your full name:",
    preAskPhone: "Your WhatsApp number:",
    preAskEmail: "Your email address:",
    preLeadCaptured: "Perfect! Our team will analyze your information and contact you shortly with your personalized pre-evaluation. ✨",

    // Indicador de digitação
    typing: "Eliza is typing...",

    // Mensagens de erro
    errorTreatmentNotFound: "Treatment not found. Please try again.",
    errorLoadingSlots: "Error loading available slots. Please try again.",
    errorCreatingBooking: "Error creating booking. Please try again.",
    errorCapturingLead: "Error capturing lead. Please try again.",

    // FAQ
    faqTitle: "Frequently Asked Questions",
    faqQ1: "• Does laser hair removal hurt?",
    faqA1: "Most people describe it as a warm pinch or elastic snap. We work with modern devices and adjust the settings to your comfort level.",
    faqQ2: "• How many sessions will I need?",
    faqA2: "It depends on the area, hair and skin type. The team will guide you during consultation, but usually 6-10 sessions are recommended.",
    faqQ3: "• Is this a medical diagnosis?",
    faqA3: "No. The assistant only gives general information. Final indication is always made by a qualified professional during your visit.",
    faqQ4: "• Can I purchase more than one session?",
    faqA4: "Absolutely! We offer special package pricing when purchasing a course of 3, 6, or 9 sessions. Contact us via WhatsApp to learn more.",

    thanks: "Thank you for chatting with MovMore Clinic. ✨<br>If you need anything else, just open the assistant again.",
    genericGotIt: "Got it. If you get lost, you can always go back to the main menu."
  },

  pt: {
    langQuestion: "Escolha seu idioma / Choose your language / Elige tu idioma:",
    langEN: "Inglês (EN)",
    langPT: "Português (PT)",
    langES: "Espanhol (ES)",

    welcome1: "Olá, eu sou a <b>Eliza</b>, assistente de IA da <b>MovMore Clinic</b>. ✨",
    welcome2: "Eu posso explicar tratamentos, mostrar preços e agendar consultas para você.",
    howHelp: "Como posso te ajudar hoje?",

    menuTitle: "De volta ao menu principal. O que você gostaria de fazer agora?",
    mExplore: "Explorar tratamentos",
    mBook: "Agendar consulta",
    mPrices: "Ver preços",
    mPre: "Pré-avaliação rápida",
    mFaq: "Perguntas frequentes",
    mBack: "Voltar ao menu principal",

    catQuestionTreat: "Perfeito! Qual tipo de tratamento você tem interesse?",
    catQuestionPrices: "Perfeito! Escolha uma categoria para ver nossos preços:",
    catQuestionBook: "Perfeito. Vamos agendar sua consulta. Primeiro, escolha a categoria de tratamento:",
    addMoreTreatmentTitle: "Perfeito! Vamos turbinar sua consulta. 😊<br>Escolha outro tratamento para adicionar à sua ordem:",
    catLaserHim: "Depilação a laser – Ele",
    catLaserHer: "Depilação a laser – Ela",
    catInjectables: "Injetáveis",
    catSkin: "Tratamentos de pele",
    catBody: "Tratamentos corporais",
    catMassage: "Massagens",

    // Fluxo Explorar Tratamentos
    treatmentsInCategory: "Aqui estão os tratamentos em <b>{cat}</b>:",
    selectTreatmentToLearn: "Selecione um tratamento para saber mais:",
    treatmentExplanation: "<b>{name}</b> (€{price})<br><br>{description}",
    askBookTreatment: "Gostaria de agendar este tratamento?",
    askBookThisTreatment: "Gostaria de agendar este tratamento?",
    yesBook: "Sim, agendar!",
    backToCat: "Voltar à categoria",

    // Fluxo Ver Preços
    pricesIntro: "Aqui estão os preços de <b>{cat}</b>:",
    askScheduleFromPrices: "Gostaria de agendar algum desses tratamentos?",
    yesSchedule: "Sim, agendar",
    backToCategories: "Voltar às categorias",
    whichTreatmentSchedule: "Qual tratamento você gostaria de agendar?",

    // Agendamento
    excellentChoice: "Excelente escolha! <b>{treatment}</b> por <b>€{price}</b>.",
    askName: "Qual é o seu nome completo?",
    askDate: "Prazer, <b>{name}</b>! Qual data você prefere? (formato: YYYY-MM-DD)",
    askDateHint: "Exemplo: 2025-12-20",
    invalidDate: "Por favor, use o formato YYYY-MM-DD (ex: 2025-12-20)",
    askTime: "Ótimo! Qual horário funciona melhor pra você?",
    availableSlots: "Aqui estão os horários disponíveis para <b>{date}</b>:",
    noSlotsAvailable: "Desculpe, não há horários disponíveis para esta data. Por favor, escolha outra data.",

    // Upsell
    upsellIntro: "<br>💎 <b>OFERTA ESPECIAL</b> 💎<br><br>Muitos clientes combinam <b>{main}</b> com <b style='font-size:18px;color:#ff5bb3;'>{upsell}</b> para melhores resultados!<br><br>Gostaria de adicionar por apenas <b>€{price}</b>?",
    yesAddUpsell: "Sim, adicionar!",
    noUpsell: "Não, obrigado",
    continueBtn: "Continuar",
    upsellAdded: "Perfeito! Adicionei <b style='color:#ff5bb3;'>{upsell}</b> (€{price}) ao seu agendamento. ✨",
    
    // Agendamento direto
    directBookingConfirm: "Claro! Posso te ajudar com isso.",
    directBookingDetails: "Agendamento em <b>{date}</b>, <b>{treatment}</b> (€{price})",
    directBookingUpsell: "Gostaria de adicionar <b style='font-size:18px;color:#ff5bb3;'>{upsell}</b>? Combina muito bem com <b>{treatment}</b> para melhores resultados!<br><br>Apenas <b>€{price}</b> a mais.",

    // Confirmação
    askContact: "Quase acabando! Me passe seu melhor contato (WhatsApp ou e-mail).",
    askAddMoreTreatment: "Gostaria de adicionar mais algum tratamento ao seu agendamento?",
    privacyNote: "Seus dados serão usados apenas para que nossa equipe entre em contato.",
    bookingConfirmed: "✅ <b>Agendamento confirmado!</b><br><br>Reserva #<b>{id}</b>",
    confirmationDetails: "<b>Tratamento:</b> {treatment}<br><b>Data:</b> {date}<br><b>Horário:</b> {time}<br><b>Nome:</b> {name}<br><b>Contato:</b> {contact}<br><b>Total:</b> €{total}",
    paymentLink: "Complete seu pagamento para garantir seu horário:",
    payNow: "Pagar Agora",
    finish: "Encerrar chat",
    confirmationSent: "Uma confirmação foi enviada para seu contato. Até breve! ✨",

    // Pré-Avaliação
    preIntro: "Vamos fazer uma pré-avaliação rápida para entender seus objetivos. 💬",
    preQuestion1: "Qual é o seu objetivo estético principal agora?",
    preQuestion2: "O que mais te incomoda na sua aparência?",
    preQuestion3: "Quantos anos você tem?",
    preQuestion4: "Por que você está considerando este tratamento?",
    preThankYou: "Obrigada por compartilhar! Já temos tudo que precisamos.",
    preAskContact: "Para receber uma avaliação personalizada da nossa equipe médica, forneça:",
    preAskName: "Seu nome completo:",
    preAskPhone: "Seu número de WhatsApp:",
    preAskEmail: "Seu endereço de e-mail:",
    preLeadCaptured: "Perfeito! Nossa equipe vai analisar suas informações e entrar em contato em breve com sua pré-avaliação personalizada. ✨",

    // Indicador de digitação
    typing: "Eliza está digitando...",

    // Mensagens de erro
    errorTreatmentNotFound: "Tratamento não encontrado. Por favor, tente novamente.",
    errorLoadingSlots: "Erro ao carregar horários disponíveis. Por favor, tente novamente.",
    errorCreatingBooking: "Erro ao criar agendamento. Por favor, tente novamente.",
    errorCapturingLead: "Erro ao capturar lead. Por favor, tente novamente.",

    // FAQ
    faqTitle: "Perguntas Frequentes",
    faqQ1: "• Depilação a laser dói?",
    faqA1: "A maioria das pessoas descreve como um beliscão quente ou estalo de elástico. Trabalhamos com equipamentos modernos e ajustamos a intensidade para o seu conforto.",
    faqQ2: "• Quantas sessões vou precisar?",
    faqA2: "Depende da área, tipo de pele e pelo. A equipe orienta tudo na consulta, mas normalmente 6-10 sessões são recomendadas.",
    faqQ3: "• Isso é um diagnóstico médico?",
    faqA3: "Não. O assistente só dá informações gerais. A indicação final é sempre feita por um profissional qualificado durante a consulta.",
    faqQ4: "• Posso comprar mais de uma sessão?",
    faqA4: "Claro! Oferecemos valores especiais na compra de pacotes com 3, 6 ou 9 sessões. Fale com nossa equipe pelo WhatsApp para saber mais.",

    thanks: "Obrigado por escolher a MovMore Clinic. Esperamos você. Até logo.<br>Se precisar de mais alguma coisa, é só abrir o assistente novamente.",

    genericGotIt: "Entendido. Se você se perder, pode sempre voltar ao menu principal."
  },

  es: {
    langQuestion: "Elige tu idioma / Choose your language / Escolha seu idioma:",
    langEN: "Inglés (EN)",
    langPT: "Portugués (PT)",
    langES: "Español (ES)",

    welcome1: "Hola, soy <b>Eliza</b>, la asistente de IA de <b>MovMore Clinic</b>. ✨",
    welcome2: "Puedo explicar tratamientos, mostrar precios y reservar consultas para ti.",
    howHelp: "¿Cómo puedo ayudarte hoy?",

    menuTitle: "De vuelta al menú principal. ¿Qué te gustaría hacer ahora?",
    mExplore: "Explorar tratamientos",
    mBook: "Reservar consulta",
    mPrices: "Ver precios",
    mPre: "Pre-evaluación rápida",
    mFaq: "Preguntas frecuentes",
    mBack: "Volver al menú principal",

    catQuestionTreat: "¡Perfecto! ¿Qué tipo de tratamiento te interesa?",
    catQuestionPrices: "¡Perfecto! Elige una categoría para ver nuestros precios:",
    catQuestionBook: "Perfecto. Vamos a reservar tu consulta. Primero, elige la categoría de tratamiento:",
    addMoreTreatmentTitle: "¡Genial! Vamos a potenciar tu reserva. 😊<br>Elige otro tratamiento para añadir a tu orden:",
    catLaserHim: "Depilación láser – Él",
    catLaserHer: "Depilación láser – Ella",
    catInjectables: "Inyectables",
    catSkin: "Tratamientos de piel",
    catBody: "Tratamientos corporales",
    catMassage: "Masajes",

    // Fluxo Explorar Tratamentos
    treatmentsInCategory: "Aquí están los tratamientos en <b>{cat}</b>:",
    selectTreatmentToLearn: "Selecciona un tratamiento para saber más:",
    treatmentExplanation: "<b>{name}</b> (€{price})<br><br>{description}",
    askBookTreatment: "¿Te gustaría reservar este tratamiento?",
    askBookThisTreatment: "¿Te gustaría reservar este tratamiento?",
    yesBook: "Sí, reservar!",
    backToCat: "Volver a la categoría",

    // Fluxo Ver Preços
    pricesIntro: "Aquí están los precios de <b>{cat}</b>:",
    askScheduleFromPrices: "¿Te gustaría programar alguno de estos tratamientos?",
    yesSchedule: "Sí, programar",
    backToCategories: "Volver a las categorías",
    whichTreatmentSchedule: "¿Qué tratamiento te gustaría programar?",

    // Agendamento
    excellentChoice: "¡Excelente elección! <b>{treatment}</b> por <b>€{price}</b>.",
    askName: "¿Cuál es tu nombre completo?",
    askDate: "¡Mucho gusto, <b>{name}</b>! ¿Qué fecha prefieres? (formato: YYYY-MM-DD)",
    askDateHint: "Ejemplo: 2025-12-20",
    invalidDate: "Por favor, usa el formato YYYY-MM-DD (ej: 2025-12-20)",
    askTime: "¡Genial! ¿Qué hora te viene mejor?",
    availableSlots: "Aquí están los horarios disponibles para <b>{date}</b>:",
    noSlotsAvailable: "Lo siento, no hay horarios disponibles para esta fecha. Por favor, elige otra fecha.",

    // Upsell
    upsellIntro: "<br>💎 <b>OFERTA ESPECIAL</b> 💎<br><br>¡Muchos clientes combinan <b>{main}</b> con <b style='font-size:18px;color:#ff5bb3;'>{upsell}</b> para mejores resultados!<br><br>¿Te gustaría agregarlo por solo <b>€{price}</b>?",
    yesAddUpsell: "¡Sí, agregar!",
    noUpsell: "No, gracias",
    continueBtn: "Continuar",
    upsellAdded: "¡Perfecto! He agregado <b style='color:#ff5bb3;'>{upsell}</b> (€{price}) a tu reserva. ✨",
    
    // Agendamento direto
    directBookingConfirm: "¡Claro! Puedo ayudarte con eso.",
    directBookingDetails: "Cita el <b>{date}</b>, <b>{treatment}</b> (€{price})",
    directBookingUpsell: "¿Te gustaría agregar <b style='font-size:18px;color:#ff5bb3;'>{upsell}</b>? ¡Combina muy bien con <b>{treatment}</b> para mejores resultados!<br><br>Solo <b>€{price}</b> más.",

    // Confirmação
    askContact: "¡Casi terminamos! Comparte tu mejor contacto (número de WhatsApp o correo electrónico).",
    askAddMoreTreatment: "¿Te gustaría agregar otro tratamiento a tu reserva?",
    privacyNote: "Tus datos solo se usarán para que nuestro equipo se ponga en contacto contigo.",
    bookingConfirmed: "✅ <b>¡Reserva confirmada!</b><br><br>Reserva #<b>{id}</b>",
    confirmationDetails: "<b>Tratamiento:</b> {treatment}<br><b>Fecha:</b> {date}<br><b>Hora:</b> {time}<br><b>Nombre:</b> {name}<br><b>Contacto:</b> {contact}<br><b>Total:</b> €{total}",
    paymentLink: "Completa tu pago para asegurar tu cita:",
    payNow: "Pagar Ahora",
    finish: "Finalizar chat",
    confirmationSent: "Se ha enviado una confirmación a tu contacto. ¡Hasta pronto! ✨",

    // Pré-Avaliação
    preIntro: "Hagamos una pre-evaluación rápida para entender tus objetivos. 💬",
    preQuestion1: "¿Cuál es tu objetivo estético principal ahora?",
    preQuestion2: "¿Qué te preocupa más de tu apariencia?",
    preQuestion3: "¿Cuántos años tienes?",
    preQuestion4: "¿Por qué estás considerando este tratamiento?",
    preThankYou: "¡Gracias por compartir! Ya tenemos todo lo que necesitamos.",
    preAskContact: "Para recibir una evaluación personalizada de nuestro equipo médico, proporciona:",
    preAskName: "Tu nombre completo:",
    preAskPhone: "Tu número de WhatsApp:",
    preAskEmail: "Tu dirección de correo electrónico:",
    preLeadCaptured: "¡Perfecto! Nuestro equipo analizará tu información y se pondrá en contacto pronto con tu pre-evaluación personalizada. ✨",

    // Indicador de digitación
    typing: "Eliza está escribiendo...",

    // Mensajes de error
    errorTreatmentNotFound: "Tratamiento no encontrado. Por favor, inténtalo de nuevo.",
    errorLoadingSlots: "Error al carregar horarios disponibles. Por favor, inténtalo de nuevo.",
    errorCreatingBooking: "Error al crear reserva. Por favor, inténtalo de nuevo.",
    errorCapturingLead: "Error al capturar lead. Por favor, inténtalo de nuevo.",

    // FAQ
    faqTitle: "Preguntas Frecuentes",
    faqQ1: "• ¿Duele la depilación láser?",
    faqA1: "La mayoría de las personas lo describen como un pellizco cálido o chasquido de elástico. Trabajamos con dispositivos modernos y ajustamos la configuración a tu nivel de comodidad.",
    faqQ2: "• ¿Cuántas sesiones necesitaré?",
    faqA2: "Depende del área, tipo de piel y vello. El equipo te guiará durante la consulta, pero generalmente se recomiendan 6-10 sesiones.",
    faqQ3: "• ¿Es esto un diagnóstico médico?",
    faqA3: "No. El asistente solo da información general. La indicación final siempre la hace un profesional calificado durante tu visita.",
    faqQ4: "• ¿Puedo comprar más de una sesión?",
    faqA4: "¡Por supuesto! Ofrecemos precios especiales en paquetes de 3, 6 o 9 sesiones. Contáctanos por WhatsApp para saber más.",

    thanks: "Gracias por chatear con MovMore Clinic. ✨<br>Si necesitas algo más, solo abre el asistente nuevamente.",
    genericGotIt: "Entendido. Si te pierdes, siempre puedes volver al menú principal."
  }
};

// Helper para pegar texto traduzido
function tx(key) {
  const lang = botState.lang || "en";
  return (COPY[lang] && COPY[lang][key]) || COPY["en"][key] || key;
}

// ============= BASE DE TRATAMENTOS =============

const treatments = {
  laserHim: [
    {name:"Full Leg", price:95, description:"Complete hair removal for both legs using advanced laser technology. Smooth, hair-free legs with long-lasting results."},
    {name:"Fore Arms", price:65, description:"Laser hair removal for forearms. Perfect for those who want smooth, hair-free arms."},
    {name:"Full Arms", price:78, description:"Complete arm hair removal from shoulders to wrists. Ideal for a clean, polished look."},
    {name:"Underarms", price:42, description:"Quick and effective underarm hair removal. Say goodbye to daily shaving and irritation."},
    {name:"Chest", price:85, description:"Chest hair removal for a smooth, clean appearance. Popular choice for athletes and professionals."},
    {name:"Shoulders", price:95, description:"Shoulder hair removal for a refined look. Ideal for those who want to eliminate unwanted back and shoulder hair."},
    {name:"Full Back", price:114, description:"Complete back hair removal. Achieve a smooth, confident look with our advanced laser treatment."},
    {name:"Chest, Abdomen, Shoulder & Full Back", price:330, description:"Comprehensive upper body hair removal package. Perfect for those seeking a complete transformation."},
    {name:"Chest, Abdomen, Shoulder & Back of Neck", price:250, description:"Upper body and neck hair removal. Ideal for a polished, professional appearance."},
    {name:"Chest & Abdomen", price:165, description:"Torso hair removal for a clean, athletic look. Popular among fitness enthusiasts."},
    {name:"Neck", price:55, description:"Neck hair removal for a neat, groomed appearance. Perfect for maintaining a professional look."},
    {name:"Full Beard", price:75, description:"Complete beard area hair removal. Ideal for those who want a permanently smooth face."},
    {name:"Beard Outline", price:60, description:"Define your beard line with precision laser hair removal. Maintain sharp, clean edges."},
    {name:"Intimate Area", price:125, description:"Discreet and professional intimate area hair removal. Comfortable, hygienic, and long-lasting results."},
    {name:"Feet & Toes", price:35, description:"Foot and toe hair removal for a clean, polished look. Perfect for sandal season."}
  ],
  laserHer: [
    {name:"Underarms", price:40, description:"Quick and effective underarm hair removal. No more daily shaving or irritation."},
    {name:"Bikini Line & Underarm", price:68, description:"Popular combination package. Perfect for beach season and everyday confidence."},
    {name:"Full Face", price:65, description:"Complete facial hair removal. Achieve smooth, radiant skin with our gentle laser treatment."},
    {name:"Half Leg, Full Bikini & Underarm", price:145, description:"Comprehensive hair removal package. Our most popular choice for summer readiness."},
    {name:"Upper Lips", price:30, description:"Upper lip hair removal for a smooth, feminine look. Quick treatment with lasting results."},
    {name:"Chin", price:38, description:"Chin hair removal for a clean, confident appearance. Say goodbye to unwanted facial hair."},
    {name:"Belly Button (Navel)", price:38, description:"Navel area hair removal for a smooth, clean look. Perfect for crop tops and swimwear."},
    {name:"Nipples", price:38, description:"Discreet and professional nipple area hair removal. Comfortable treatment with lasting results."},
    {name:"Buttocks", price:55, description:"Buttocks hair removal for smooth, confident skin. Ideal for swimwear and intimate confidence."},
    {name:"Upper Lip and Chin", price:61, description:"Combination facial hair removal. Perfect for maintaining a smooth, feminine appearance."},
    {name:"Half Leg", price:62, description:"Lower or upper leg hair removal. Ideal for those who want smooth legs without full treatment."},
    {name:"Full Arms", price:65, description:"Complete arm hair removal from shoulders to wrists. Achieve smooth, hair-free arms."},
    {name:"Full Leg", price:78, description:"Complete leg hair removal for silky smooth skin. Our most requested treatment."},
    {name:"Full Bikini & Underarm", price:90, description:"Essential combination for beach confidence. Smooth, hair-free results that last."},
    {name:"Full Leg, Full Bikini & Underarm", price:164, description:"Ultimate hair removal package. Complete confidence from head to toe."}
  ],
  injectables: [
    {name:"Chin Fat Reduction Treatment", price:299, description:"Non-surgical chin contouring. Reduce double chin and define your jawline with injectable treatment."},
    {name:"Radiesse", price:319, description:"Collagen-stimulating dermal filler. Restore volume and smooth wrinkles for a natural, youthful look."},
    {name:"PDRN Treatment", price:299, description:"Advanced skin regeneration treatment. Improve skin texture, tone, and elasticity with polynucleotide therapy."},
    {name:"Nose Fillers – Non-Surgical Rhinoplasty", price:299, description:"Reshape your nose without surgery. Correct bumps, asymmetry, and enhance your profile."},
    {name:"Sculptra", price:399, description:"Long-lasting collagen stimulator. Restore facial volume and achieve natural-looking results that last up to 2 years."},
    {name:"Skinbooster", price:199, description:"Deep skin hydration treatment. Improve skin quality, texture, and radiance from within."},
    {name:"Anti-Wrinkles – 1 Area", price:160, description:"Smooth wrinkles in one area (forehead, crow's feet, or frown lines). Quick treatment with natural results."},
    {name:"Anti-Wrinkles – 2 Areas", price:260, description:"Comprehensive wrinkle treatment for two areas. Achieve a refreshed, youthful appearance."},
    {name:"Hair Mesotherapy", price:145, description:"Stimulate hair growth and reduce hair loss. Nourish your scalp with vitamins and growth factors."},
    {name:"PRP Hair Loss Treatment (Consultation Fee)", price:40, description:"Platelet-rich plasma therapy for hair restoration. Natural treatment using your own blood to stimulate growth."},
    {name:"PRP Skin Treatment – Vampire Facial (Consultation Fee)", price:40, description:"Rejuvenate your skin with your own platelets. Improve texture, tone, and reduce fine lines."},
    {name:"Lip Filler", price:189, description:"Enhance your lips with natural-looking volume. Achieve fuller, more defined lips that suit your face."},
    {name:"Anti-Wrinkles – 3 Areas", price:249, description:"Complete upper face rejuvenation. Smooth forehead, crow's feet, and frown lines for a youthful look."},
    {name:"Under-Eye Filler", price:199, description:"Reduce dark circles and hollows. Achieve a refreshed, well-rested appearance."},
    {name:"Nasolabial Folds Filler", price:275, description:"Smooth smile lines and restore youthful contours. Natural-looking results that enhance your features."}
  ],
  skin: [
    {name:"Deep Pore Cleansing Facial", price:49.99, description:"Professional deep cleansing treatment. Remove impurities, unclog pores, and refresh your skin."},
    {name:"Fractional Laser Resurfacing with Fotona", price:179, description:"Advanced laser skin resurfacing. Reduce wrinkles, scars, and improve skin texture with minimal downtime."},
    {name:"Microneedling", price:229, description:"Collagen induction therapy. Improve skin texture, reduce scars, and achieve a radiant glow."},
    {name:"Laser Thread Vein Removal", price:40, description:"Remove visible veins and capillaries. Achieve clear, even-toned skin with laser precision."},
    {name:"HIFU Facial", price:249, description:"Non-surgical facelift using ultrasound technology. Lift and tighten skin for a youthful appearance."},
    {name:"Chemical Peels (Consultation Fee)", price:40, description:"Exfoliate and renew your skin. Reduce pigmentation, fine lines, and achieve a radiant complexion."},
    {name:"Skin Cleansing with Diamond Peeling", price:75, description:"Mechanical exfoliation treatment. Remove dead skin cells and reveal smooth, glowing skin."}
  ],
  body: [
    {name:"Radio Frequency", price:299, description:"Non-invasive body contouring. Tighten skin, reduce cellulite, and improve body shape with RF technology."},
    {name:"Fat Dissolving Injections", price:259, description:"Target stubborn fat deposits. Non-surgical solution for chin, abdomen, and other problem areas."},
    {name:"Lipocavitation", price:299, description:"Ultrasound fat reduction. Break down fat cells and sculpt your body without surgery."},
    {name:"Velashape", price:369, description:"Advanced body contouring and cellulite reduction. Combine RF, infrared, and massage for visible results."},
    {name:"Intimate Whitening (Consultation Fee)", price:40, description:"Lighten intimate areas safely. Restore confidence with professional whitening treatment."},
    {name:"Lemon Bottle", price:99, description:"Premium fat dissolving treatment. Fast-acting solution for targeted fat reduction."},
    {name:"Cryolipolysis Fat Freezing", price:149, description:"Freeze away fat cells. Non-invasive treatment for stubborn areas that resist diet and exercise."},
    {name:"Shockwave Therapy", price:250, description:"Break down cellulite and improve skin texture. Effective treatment for body contouring and toning."}
  ],
  massage: [
    {name:"Hot Stone Massage", price:55, description:"Relaxing massage with heated stones. Melt away tension and stress with this therapeutic treatment."},
    {name:"Deep Tissue Massage", price:80, description:"Intensive massage for chronic pain and tension. Target deep muscle layers for lasting relief."},
    {name:"Myofascial Release", price:79.99, description:"Release muscle tension and improve mobility. Specialized technique for pain relief and recovery."},
    {name:"Specific Treatment (Consultation Fee)", price:45, description:"Customized massage therapy. Address your specific needs with a tailored treatment plan."},
    {name:"Lymphatic Drainage Massage", price:49.99, description:"Detoxify and reduce swelling. Gentle massage to boost your lymphatic system and improve circulation."},
    {name:"Shaping Massage", price:60, description:"Body contouring massage. Reduce cellulite and improve body shape with targeted techniques."},
    {name:"Relaxing Massage", price:60, description:"Full-body relaxation massage. Unwind and de-stress with our soothing therapeutic massage."}
  ]
};

// ============= UPSELL SUGGESTIONS =============

const UPSELL_MAP = {
  "Full Leg": {upsell: "Underarms", price: 42},
  "Underarms": {upsell: "Full Bikini & Underarm", price: 90},
  "Lip Filler": {upsell: "Skinbooster", price: 199},
  "Anti-Wrinkles – 1 Area": {upsell: "Anti-Wrinkles – 3 Areas", price: 249},
  "HIFU Facial": {upsell: "Skinbooster", price: 199},
  "Cryolipolysis Fat Freezing": {upsell: "Radio Frequency", price: 299},
  "Deep Tissue Massage": {upsell: "Lymphatic Drainage Massage", price: 49.99}
};

// ============= ESTADO DO BOT =============

let botState = {
  lang: "en",
  step: "lang_select",
  selectedCategory: null,
  selectedTreatment: null,
  lastIntent: null,
  preEvaluation: {
    goal: null,
    concern: null,
    age: null,
    reason: null,
    step: 0
  },
  appointment: {
    category: null,
    treatment: null,
    name: null,
    date: null,
    time: null,
    contact: null,
    upsell: null,
    aiUpsell: null,
    total: 0,
    isDirect: false, // <--- NOVO: marca se veio do fluxo "tratamento + data" escrito
    extraTreatments: [],
    isAddingExtra: false
   }
  }

// ============= DOM ELEMENTS =============

const openBtn = document.getElementById('openBtn');
const chatPanel = document.getElementById('chatPanel');
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatTitle = document.getElementById('chatTitle');
const chatSubtitle = document.getElementById('chatSubtitle');

// ============= EVENT LISTENERS =============

openBtn.addEventListener('click', () => {
  const isOpen = chatPanel.style.display === 'flex';
  chatPanel.style.display = isOpen ? 'none' : 'flex';
  if (!isOpen && botState.step === "lang_select") {
    startLanguageSelect();
  }
});

chatSend.addEventListener('click', () => {
  const text = chatInput.value.trim();
  if (text) {
    handleUserText(text);
    chatInput.value = '';
  }
});

chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    chatSend.click();
  }
});

// ============= HELPER FUNCTIONS =============

function setHeaderTexts() {
  chatTitle.textContent = `${CLINIC_CONFIG.botName} – ${CLINIC_CONFIG.name}`;
  chatSubtitle.textContent = CLINIC_CONFIG.taglines[botState.lang] || CLINIC_CONFIG.taglines.en;
}

function updateInputPlaceholder() {
  const placeholders = {
    en: "Type your message...",
    pt: "Digite sua mensagem...",
    es: "Escribe tu mensaje..."
  };
  chatInput.placeholder = placeholders[botState.lang] || placeholders.en;
}

// Cache para traduções
const translationCache = {};

// Sistema de fallback para quando API falha
async function getAIFallback(message, lang) {
  const fallbacks = {
    'preço': {
      pt: 'Posso te mostrar nossos preços por categoria! Escolha uma opção:',
      en: 'I can show you our prices by category! Choose an option:',
      es: '¡Puedo mostrarte nuestros precios por categoría! Elige una opción:'
    },
    'price': {
      pt: 'Posso te mostrar nossos preços por categoria! Escolha uma opção:',
      en: 'I can show you our prices by category! Choose an option:',
      es: '¡Puedo mostrarte nuestros precios por categoría! Elige una opción:'
    },
    'horário': {
      pt: 'Nosso horário de funcionamento é das 9h às 18h, de segunda a sábado.',
      en: 'Our business hours are from 9am to 6pm, Monday to Saturday.',
      es: 'Nuestro horario de atención es de 9am a 6pm, de lunes a sábado.'
    },
    'time': {
      pt: 'Nosso horário de funcionamento é das 9h às 18h, de segunda a sábado.',
      en: 'Our business hours are from 9am to 6pm, Monday to Saturday.',
      es: 'Nuestro horario de atención es de 9am a 6pm, de lunes a sábado.'
    },
    'funcionamento': {
      pt: 'Funcionamos de segunda a sábado, das 9h às 18h.',
      en: 'We are open Monday to Saturday, from 9am to 6pm.',
      es: 'Estamos abiertos de lunes a sábado, de 9am a 6pm.'
    }
  };

  const lowerMessage = message.toLowerCase();
  
  for (const [key, responses] of Object.entries(fallbacks)) {
    if (lowerMessage.includes(key)) {
      return responses[lang] || responses.pt;
    }
  }
  
  // Fallback genérico
  const genericFallbacks = {
    pt: 'Desculpe, não entendi completamente. Pode reformular ou escolher uma opção do menu?',
    en: "Sorry, I didn't quite understand that. Can you rephrase or choose an option from the menu?",
    es: 'Lo siento, no entendí completamente. ¿Puedes reformular o elegir una opción del menú?'
  };
  
  return genericFallbacks[lang] || genericFallbacks.pt;
}

// Sistema de loading states
function setLoadingState(loading) {
  chatInput.disabled = loading;
  chatSend.disabled = loading;
  chatSend.textContent = loading ? '...' : 'Send';
  
  if (loading) {
    chatInput.placeholder = tx('typing');
  } else {
    updateInputPlaceholder();
  }
}

// Verificação de conexão
function checkConnection() {
  if (!navigator.onLine) {
    addMessage('📶 Parece que você está offline. Algumas funcionalidades podem não estar disponíveis.', 'bot', true);
    return false;
  }
  return true;
}

// Validação de dados de agendamento
function validateAppointmentData(appointment) {
  const errors = [];
  
  if (!appointment.name || appointment.name.trim().length < 2) {
    errors.push('Nome deve ter pelo menos 2 caracteres');
  }
  
  if (!appointment.date || !isValidDate(appointment.date)) {
    errors.push('Data inválida');
  }
  
  if (!appointment.time) {
    errors.push('Horário é obrigatório');
  }
  
  if (!appointment.treatment || !appointment.treatment.name) {
    errors.push('Tratamento é obrigatório');
  }
  
  return errors;
}

// Fila de mensagens para controlar o delay
let messageQueue = [];
let isProcessingQueue = false;

// Função para adicionar mensagem com efeito de digitação
function addMessage(html, sender = 'bot', skipTyping = false) {
  if (sender === 'user' || skipTyping) {
    // Mensagens do usuário aparecem imediatamente
    addMessageInstant(html, sender);
  } else {
    // Mensagens do bot vão para a fila
    messageQueue.push({html, sender});
    if (!isProcessingQueue) {
      processMessageQueue();
    }
  }
}

// Processar fila de mensagens com delay e typing indicator
async function processMessageQueue() {
  if (messageQueue.length === 0) {
    isProcessingQueue = false;
    return;
  }

  isProcessingQueue = true;
  const {html, sender} = messageQueue.shift();

  // Mostrar "Eliza is typing..."
  const typingIndicator = showTypingIndicator();

  // Delay de 1-1.5 segundos (rápido mas natural)
  const delay = 1000 + Math.random() * 500;
  await new Promise(resolve => setTimeout(resolve, delay));

  // Remover typing indicator
  if (typingIndicator && typingIndicator.parentNode) {
    typingIndicator.remove();
  }

  // Adicionar mensagem com efeito de digitação
  await addMessageWithTypingEffect(html, sender);

  // Processar próxima mensagem da fila
  if (messageQueue.length > 0) {
    await processMessageQueue();
  } else {
    isProcessingQueue = false;
  }
}

// Mostrar indicador "Eliza is typing..."
function showTypingIndicator() {
  const row = document.createElement('div');
  row.className = 'msg-row bot typing-indicator';
  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble typing-bubble';
  bubble.innerHTML = `<span class="typing-dots">${tx('typing')}</span>`;
  row.appendChild(bubble);
  chatBody.appendChild(row);
  chatBody.scrollTop = chatBody.scrollHeight;
  return row;
}

// Adicionar mensagem com efeito de digitação letra por letra
async function addMessageWithTypingEffect(html, sender) {
  const row = document.createElement('div');
  row.className = `msg-row ${sender}`;
  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  row.appendChild(bubble);
  chatBody.appendChild(row);

  // SEMPRE usar innerHTML para renderizar HTML corretamente
  bubble.innerHTML = html;
  chatBody.scrollTop = chatBody.scrollHeight;
  
  // Se a mensagem tiver HTML complexo (tags), mostrar de uma vez SEM efeito de digitação
  if (html.includes('<b>') || html.includes('<br>') || html.includes('<ul>') || html.includes('<span>') || html.includes('<li>')) {
    return;
  }

  // Efeito de digitação letra por letra para texto simples
  // Limpar conteúdo e digitar novamente
  bubble.innerHTML = '';
  const text = html;
  let currentText = '';
  const typingSpeed = 30; // milissegundos por caractere

  for (let i = 0; i < text.length; i++) {
    currentText += text[i];
    bubble.textContent = currentText;
    chatBody.scrollTop = chatBody.scrollHeight;
    await new Promise(resolve => setTimeout(resolve, typingSpeed));
  }
}

// Adicionar mensagem instantaneamente (sem efeito)
function addMessageInstant(html, sender) {
  const row = document.createElement('div');
  row.className = `msg-row ${sender}`;
  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.innerHTML = html;
  row.appendChild(bubble);
  chatBody.appendChild(row);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function clearQuickReplies() {
  const existing = chatBody.querySelector('.quick-replies');
  if (existing) existing.remove();
}

// Adicionar botões SOMENTE após todas as mensagens serem exibidas
function addQuickReplies(options) {
  // Aguardar a fila de mensagens terminar antes de mostrar botões
  waitForQueueThenShowButtons(options);
}

async function waitForQueueThenShowButtons(options) {
  // Aguardar até que a fila de mensagens esteja vazia
  while (isProcessingQueue || messageQueue.length > 0) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Agora que todas as mensagens foram exibidas, mostrar botões
  clearQuickReplies();
  const wrap = document.createElement('div');
  wrap.className = 'quick-replies';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'qr-btn';
    btn.textContent = opt.label;
    btn.dataset.action = opt.action;
    btn.addEventListener('click', () => handleAction(opt.action));
    wrap.appendChild(btn);
  });
  chatBody.appendChild(wrap);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function getCategoryName(catKey) {
  const map = {
    laserHim: tx('catLaserHim'),
    laserHer: tx('catLaserHer'),
    injectables: tx('catInjectables'),
    skin: tx('catSkin'),
    body: tx('catBody'),
    massage: tx('catMassage')
  };
  return map[catKey] || catKey;
}

// ============= FLUXO INICIAL / MENU =============

function startLanguageSelect() {
  // Mensagem de idioma aparece SEM efeito de digitação (imediata)
  addMessage(tx('langQuestion'), 'bot', true);
  // Botões de idioma aparecem IMEDIATAMENTE (sem aguardar fila)
  addQuickRepliesImmediate([
    {label: tx('langEN'), action: 'lang_en'},
    {label: tx('langPT'), action: 'lang_pt'},
    {label: tx('langES'), action: 'lang_es'}
  ]);
}

// Função para mostrar botões imediatamente (sem aguardar fila)
function addQuickRepliesImmediate(options) {
  clearQuickReplies();
  const wrap = document.createElement('div');
  wrap.className = 'quick-replies';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'qr-btn';
    btn.textContent = opt.label;
    btn.dataset.action = opt.action;
    btn.addEventListener('click', () => handleAction(opt.action));
    wrap.appendChild(btn);
  });
  chatBody.appendChild(wrap);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function startConversation() {
  addMessage(tx('welcome1'));
  addMessage(tx('welcome2'));
  addMessage(tx('howHelp'));
  // Botões aparecem SOMENTE após todas as mensagens serem exibidas
  showMainMenu();
  botState.step = "main_menu";
}

function showMainMenu() {
  addQuickReplies([
    {label: tx('mExplore'), action: "menu_explore"},
    {label: tx('mBook'), action: "menu_book"},
    {label: tx('mPrices'), action: "menu_prices"},
    {label: tx('mPre'), action: "menu_pre"},
    {label: tx('mFaq'), action: "menu_faq"}
  ]);
}

// ============= ACTION HANDLER =============

function handleAction(action) {
  clearQuickReplies();

  // Idioma
  if (action === "lang_en" || action === "lang_pt" || action === "lang_es") {
    botState.lang = action === "lang_en" ? "en" : action === "lang_pt" ? "pt" : "es";
    botState.step = "welcome";
    setHeaderTexts();
    updateInputPlaceholder();
    startConversation();
    return;
  }

  // Menu principal
  if (action === "menu_home") {
    botState.step = "main_menu";
    botState.selectedCategory = null;
    botState.selectedTreatment = null;
    addMessage(tx('menuTitle'));
    showMainMenu();
    return;
  }

  if (action === "menu_explore") {
    botState.step = "explore_category";
    addMessage(tx('catQuestionTreat'));
    showCategoryButtons();
    return;
  }

  if (action === "menu_prices") {
    botState.step = "prices_category";
    addMessage(tx('catQuestionPrices'));
    showCategoryButtons();
    return;
  }

  if (action === "menu_book") {
  // Se estiver em modo de adicionar extra, muda o texto
  if (botState.appointment.isAddingExtra) {
    botState.step = "book_category_extra";
    addMessage("Ok! Escolha outro tratamento para adicionar ao seu agendamento:");
  } else {
    botState.step = "book_category";
    addMessage(tx('catQuestionBook')); // texto normal do primeiro agendamento
  }
  showCategoryButtons();
  return;
}

  if (action === "menu_pre") {
    startPreEvaluation();
    return;
  }

  if (action === "menu_faq") {
    showFAQ();
    return;
  }

  // Categorias
  if (action.startsWith("cat_")) {
    const catKey = action.replace("cat_", "");
    botState.selectedCategory = catKey;
    handleCategoryChosen(catKey);
    return;
  }

  // Tratamentos individuais (Explorar Tratamentos)
  if (action.startsWith("treat_")) {
    const treatmentName = action.replace("treat_", "").replace(/_/g, " ");
    showTreatmentDetails(treatmentName);
    return;
  }

  // Agendar tratamento EXTRA (quando o cliente já tem um agendamento em andamento)
  if (action.startsWith("extra_book_treat_")) {
    const treatmentName = action.replace("extra_book_treat_", "").replace(/_/g, " ");
    const treatment = findTreatmentByName(treatmentName);

    if (!treatment) {
      addMessage(tx('errorTreatmentNotFound'));
      return;
    }

    // Garante o array de extras
    if (!botState.appointment.extraTreatments) {
      botState.appointment.extraTreatments = [];
    }

    // Salva o extra e soma ao total
    botState.appointment.extraTreatments.push(treatment);
    botState.appointment.total += treatment.price;

    // Mensagem de "adicionei X ao seu agendamento"
    let msgAdd;
    if (botState.lang === "pt") {
      msgAdd = `Perfeito! Adicionei <b>${treatment.name}</b> por <b>€${treatment.price.toFixed(2)}</b> ao seu agendamento.`;
    } else if (botState.lang === "es") {
      msgAdd = `¡Perfecto! He añadido <b>${treatment.name}</b> por <b>€${treatment.price.toFixed(2)}</b> a tu reserva.`;
    } else {
      msgAdd = `Perfect! I've added <b>${treatment.name}</b> for <b>€${treatment.price.toFixed(2)}</b> to your booking.`;
    }
    addMessage(msgAdd, 'bot', true);

    const total = botState.appointment.total.toFixed(2);

    // Mensagem do total
    let msgTotal;
    if (botState.lang === "pt") {
      msgTotal = `Seu total agora é de <b>€${total}</b>. Gostaria de adicionar mais algum tratamento?`;
    } else if (botState.lang === "es") {
      msgTotal = `Tu total ahora es de <b>€${total}</b>. ¿Te gustaría añadir otro tratamiento?`;
    } else {
      msgTotal = `Your total is now <b>€${total}</b>. Would you like to add another treatment?`;
    }
    addMessage(msgTotal);

    // Labels dos botões
    const addMoreLabel =
      botState.lang === "pt" ? "Adicionar mais um tratamento" :
      botState.lang === "es" ? "Añadir otro tratamiento" :
                               "Add another treatment";

    const finishLabel =
      botState.lang === "pt" ? "Finalizar e continuar" :
      botState.lang === "es" ? "Terminar y continuar" :
                               "Finish and continue";

    addQuickReplies([
      { label: addMoreLabel, action: "direct_help_yes" },
      { label: finishLabel, action: "direct_upsell_continue" }
    ]);

    return;
  }

  if (action.startsWith("book_treat_")) {
    const treatmentName = action.replace("book_treat_", "").replace(/_/g, " ");
    const treatment = findTreatmentByName(treatmentName);

    if (!treatment) {
      addMessage(tx('errorTreatmentNotFound'));
      return;
    }

    // 👉 CASO ESPECIAL: estamos adicionando MAIS UM tratamento
    if (botState.appointment.isAddingExtra) {
      // garante array
      if (!botState.appointment.extraTreatments) {
        botState.appointment.extraTreatments = [];
      }
      botState.appointment.extraTreatments.push(treatment);

      // soma ao total (mantendo o que já tinha)
      botState.appointment.total += treatment.price;

      const totalNow = botState.appointment.total.toFixed(2);

      const msg = `Perfeito! Adicionei <b>${treatment.name}</b> por <b>€${treatment.price.toFixed(2)}</b> ao seu agendamento.<br>Seu total agora é de <b>€${totalNow}</b>.`;
      addMessage(msg);

      // Agora vamos direto para contato:
      botState.step = "book_contact";

      if (!botState.appointment.contact) {
        // já temos nome e horário, então aqui só pedimos o telefone
        addMessage("Qual seu número de telefone (WhatsApp)?");
      } else {
        // se por algum motivo o contato já existir, finaliza direto
        finalizeBooking();
      }
      return;
    }

    // 👉 FLUXO NORMAL (primeiro tratamento do agendamento)
    botState.appointment.treatment = treatment;
    botState.appointment.total = treatment.price;
    botState.appointment.category = treatment.category || null;

    const msg = tx('excellentChoice')
      .replace('{treatment}', treatment.name)
      .replace('{price}', treatment.price.toFixed(2));
    addMessage(msg);

    // segue fluxo normal: pedir nome
    proceedToAskName();
    return;
  }

  // Voltar às categorias
  if (action === "back_to_categories") {
    if (botState.step === "explore_treatments" || botState.step === "explore_category") {
      botState.step = "explore_category";
      addMessage(tx('catQuestionTreat'));
    } else if (botState.step === "prices_list" || botState.step === "prices_category") {
      botState.step = "prices_category";
      addMessage(tx('catQuestionPrices'));
    }
    showCategoryButtons();
    return;
  }

  // Agendar a partir dos preços
  if (action === "schedule_from_prices") {
    botState.step = "prices_select_treatment";
    addMessage(tx('whichTreatmentSchedule'));
    showTreatmentButtonsForCategory(botState.selectedCategory, "book_treat_");
    return;
  }

  // Horários disponíveis
 if (action.startsWith("time_")) {
  const raw = action.replace("time_", ""); // ex: "09_00" ou "09:00"
  const time = raw.replace("_", ":");      // sempre vira "09:00"

  botState.appointment.time = time;
  handleTimeSelected(time);
  return;
}

  // Confirmação do fluxo direto (tratamento + data na mensagem)
  if (action === "direct_confirm_yes") {
    if (!botState.appointment.name) {
        botState.appointment.name = "Cliente MovMore";
    }

    // 👉 Agora entra no mesmo fluxo que funciona nos outros casos!
    proceedToAskTime();
    return;
  }

  if (action === "direct_confirm_no") {
    // Limpa dados para evitar lixo
    botState.appointment.treatment = null;
    botState.appointment.date = null;
    botState.appointment.time = null;

    // Volta para o menu principal
    botState.step = "main_menu";
    addMessage("Sem problemas! Vamos voltar ao início. Escolha uma opção:");
    addMessage(tx('menuTitle'));

    showMainMenu();
    return;
  }

  // Upsell inicial (antes de pedir nome)
  if (action === "upsell_initial_yes") {
    handleInitialUpsellAccepted();
    return;
  }

  if (action === "upsell_initial_ai_yes") {
    handleInitialAIUpsellAccepted();
    return;
  }

  if (action === "upsell_initial_no") {
    handleInitialUpsellDeclined();
    return;
  }

  // Upsell (após escolher horário - REMOVIDO)
  if (action === "upsell_yes") {
    handleUpsellAccepted();
    return;
  }

  if (action === "upsell_no") {
    handleUpsellDeclined();
    return;
  }

  // Upsell do agendamento direto (mapeado)
  if (action === "direct_upsell_yes") {
    // Garante que não quebra se o tratamento não existir
    const treatment = botState.appointment.treatment || null;
    const upsell =
      treatment && treatment.name && UPSELL_MAP[treatment.name]
        ? UPSELL_MAP[treatment.name]
        : null;

    // Se tiver upsell mapeado, adiciona ao estado e ao total
    if (upsell) {
      botState.appointment.upsell = upsell;
      botState.appointment.total =
        (botState.appointment.total || 0) + upsell.price;
    }

    // Garante que sempre temos um número para o total
    const totalNumber = botState.appointment.total || 0;
    const total = totalNumber.toFixed(2);

    const lang = botState.lang || "en";
    let msg;

    if (lang === "pt") {
      msg = `Perfeito, seu total agora é de €${total}! Gostaria de adicionar mais algum tratamento?`;
    } else if (lang === "es") {
      msg = `Perfecto, tu total ahora es de €${total}. ¿Te gustaría añadir otro tratamiento?`;
    } else {
      msg = `Perfect, your total is now €${total}! Would you like to add another treatment?`;
    }

    addMessage(msg, 'bot', true);

    const yesLabel = lang === "pt" ? "Sim" : lang === "es" ? "Sí" : "Yes";
    const noLabel  = lang === "pt" ? "Não" : lang === "es" ? "No" : "No";

    addQuickReplies([
      { label: yesLabel, action: "direct_help_yes" },
      { label: noLabel, action: "direct_help_no" }
    ]);

    return;
  }

  // Upsell do agendamento direto vindo da IA
  if (action === "direct_upsell_ai_yes") {
    const aiUpsell = botState.aiSuggestedUpsell;

    if (aiUpsell) {
      botState.appointment.aiUpsell = aiUpsell;
      botState.appointment.total += aiUpsell.price || 0;
    }

    const total = botState.appointment.total.toFixed(2);

    let msg;
    if (botState.lang === "pt") {
      msg = `Perfeito, seu total agora é de €${total}. Gostaria de adicionar mais algum tratamento?`;
    } else if (botState.lang === "es") {
      msg = `Perfecto, tu total ahora es de €${total}. ¿Te gustaría añadir otro tratamiento?`;
    } else {
      msg = `Perfect, your total is now €${total}. Would you like to add another treatment?`;
    }

    addMessage(msg, 'bot', true);

    const yesLabel = botState.lang === "pt" ? "Sim"
      : botState.lang === "es" ? "Sí"
      : "Yes";

    const noLabel = botState.lang === "pt" ? "Não"
      : botState.lang === "es" ? "No"
      : "No";

    addQuickReplies([
      { label: yesLabel, action: "direct_help_yes" },
      { label: noLabel, action: "direct_help_no" }
    ]);

    return;
  }

  if (action === "direct_upsell_continue") {
    let msg;
    if (botState.lang === "pt") {
      msg = "Posso te ajudar em mais alguma coisa?";
    } else if (botState.lang === "es") {
      msg = "¿Puedo ayudarte con algo más?";
    } else {
      msg = "Can I help you with anything else?";
    }

    addMessage(msg);

    const yesLabel =
      botState.lang === "pt" ? "Sim" :
      botState.lang === "es" ? "Sí" :
      "Yes";

    const noLabel =
      botState.lang === "pt" ? "Não" :
      botState.lang === "es" ? "No" :
      "No";

    addQuickReplies([
      { label: yesLabel, action: "direct_help_yes" },
      { label: noLabel, action: "direct_help_no" }
    ]);
    return;
  }

  if (action === "direct_help_yes") {
    // Marca que o cliente está adicionando mais tratamentos no mesmo agendamento
    botState.appointment.isAddingExtra = true;

    // Se ainda não temos o nome real, pedir agora (usando texto traduzido)
    if (!botState.appointment.name || botState.appointment.name === "Cliente MovMore") {
      botState.step = "extra_name";
      addMessage(tx('askName')); // já está traduzido em EN/PT/ES
      return;
    }

    // Já temos o nome → manda direto escolher outra categoria de tratamento
    botState.step = "extra_category";
    // usa copy que você já tem nas três línguas
    addMessage(tx('addMoreTreatmentTitle'));
    showCategoryButtons();
    return;
  }

  if (action === "direct_help_no") {
    botState.step = "book_contact";

    if (!botState.appointment.name || botState.appointment.name === "Cliente MovMore") {
      botState.appointment.name = null;
      addMessage(tx('askName')); // pergunta nome na língua certa
    } else {
      addMessage(tx('askContact')); // "We're almost done..." / "Quase acabando..." etc
      const muted = getComputedStyle(document.documentElement)
        .getPropertyValue('--muted');
      addMessage(
        `<span style="font-size:13px;color:${muted};">${tx('privacyNote')}</span>`,
        'bot',
        true
      );
    }
    return;
  }

  // Clique em "Pagar agora"
  if (action === "payment_complete") {
    const bookingId = botState.appointment.bookingId;
    const amount = botState.appointment.total
      ? botState.appointment.total.toFixed(2)
      : "";

    let paymentUrl = CLINIC_CONFIG.paymentUrl;
    if (bookingId) {
      paymentUrl = `${CLINIC_CONFIG.paymentUrl}?booking=${bookingId}&amount=${amount}`;
    }

    // 1º balão – link de pagamento (AGORA TRADUZIDO)
    addMessage(
      `${tx('paymentLinkIntro')}<br>` +
      `<a href="${paymentUrl}" target="_blank">${paymentUrl}</a>`,
      'bot',
      true
    );

    // 2º balão – confirmação
    addMessage(tx('confirmationSent'));

    // 3º balão – agradecimento
    addMessage(tx('thanks'));

    clearQuickReplies();
    botState.step = "complete";
    return;
  }

  // Finalizar sem pagamento
  if (action === "finish_chat") {
    // Mesmo fechamento, só sem mostrar o link
    addMessage(tx('confirmationSent'));
    addMessage(tx('thanks'));
    clearQuickReplies();
    botState.step = "complete";
    return;
  }
}

// ============= CATEGORIAS =============

function showCategoryButtons() {
  addQuickReplies([
    {label: tx('catLaserHim'), action: "cat_laserHim"},
    {label: tx('catLaserHer'), action: "cat_laserHer"},
    {label: tx('catInjectables'), action: "cat_injectables"},
    {label: tx('catSkin'), action: "cat_skin"},
    {label: tx('catBody'), action: "cat_body"},
    {label: tx('catMassage'), action: "cat_massage"},
    {label: tx('mBack'), action: "menu_home"}
  ]);
}

function handleCategoryChosen(catKey) {
  const catName = getCategoryName(catKey);

  if (botState.step === "explore_category") {
    // FLUXO EXPLORAR TRATAMENTOS
    botState.step = "explore_treatments";
    addMessage(tx('treatmentsInCategory').replace('{cat}', catName));
    addMessage(tx('selectTreatmentToLearn'));
    showTreatmentButtonsForCategory(catKey, "treat_");

  } else if (botState.step === "prices_category") {
    // FLUXO VER PREÇOS
    botState.step = "prices_list";
    showPricesList(catKey, catName);

  } else if (botState.step === "book_category") {
    // FLUXO AGENDAMENTO NORMAL
    botState.step = "book_select_treatment";
    addMessage(tx('treatmentsInCategory').replace('{cat}', catName));
    showTreatmentButtonsForCategory(catKey, "book_treat_");

  } else if (botState.step === "extra_category") {
    // ⚡ FLUXO DE ADICIONAR MAIS UM TRATAMENTO NO MESMO AGENDAMENTO
    botState.step = "extra_select_treatment";

    let msg;
    if (botState.lang === "pt") {
      msg = "Aqui estão os tratamentos. Qual você quer adicionar ao seu agendamento?";
    } else if (botState.lang === "es") {
      msg = "Aquí están los tratamientos. ¿Cuál quieres añadir a tu reserva?";
    } else {
      msg = "Here are the treatments. Which one would you like to add to your booking?";
    }

    addMessage(msg);
    showTreatmentButtonsForCategory(catKey, "extra_book_treat_");
  }
}

function showTreatmentButtonsForCategory(catKey, actionPrefix) {
  const list = treatments[catKey] || [];
  const buttons = list.map(t => ({
    label: `${t.name} (€${t.price})`,
    action: `${actionPrefix}${t.name.replace(/ /g, "_")}`
  }));
  buttons.push({label: tx('backToCategories'), action: "back_to_categories"});
  buttons.push({label: tx('mBack'), action: "menu_home"});
  addQuickReplies(buttons);
}

function showPricesList(catKey, catName) {
  const list = treatments[catKey] || [];
  let html = tx('pricesIntro').replace('{cat}', catName) + "<br><ul style='padding-left:20px;margin:6px 0;'>";
  list.forEach(t => {
    html += `<li><b>${t.name}</b> – €${t.price.toFixed(2)}</li>`;
  });
  html += "</ul>";
  addMessage(html);
  addMessage(tx('askScheduleFromPrices'));
  addQuickReplies([
    {label: tx('yesSchedule'), action: "schedule_from_prices"},
    {label: tx('backToCategories'), action: "back_to_categories"},
    {label: tx('mBack'), action: "menu_home"}
  ]);
}

// ============= EXPLORAR TRATAMENTOS =============

async function showTreatmentDetails(treatmentName) {
  const treatment = findTreatmentByName(treatmentName);
  if (!treatment) {
    addMessage(tx('errorTreatmentNotFound'));
    return;
  }

  // Traduzir descrição se idioma não for inglês
  let description = treatment.description;
  if (botState.lang !== 'en') {
    description = await translateDescription(treatment.description, botState.lang);
  }

  const msg = `<b>${treatment.name}</b> (€${treatment.price.toFixed(2)})<br><br>${description}`;
  addMessage(msg);
  addMessage(tx('askBookTreatment'));
  addQuickReplies([
    {label: tx('yesBook'), action: `book_treat_${treatment.name.replace(/ /g, "_")}`},
    {label: tx('backToCat'), action: "back_to_categories"},
    {label: tx('mBack'), action: "menu_home"}
  ]);
}

// Função para traduzir descrições usando cache
async function translateDescription(text, targetLang) {
  const cacheKey = `${text}_${targetLang}`;
  
  // Verificar cache
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }

  // Se falhar, retornar original
  try {
    const response = await fetch(`${API_BASE}/api/translate`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ text, targetLang })
    });
    
    const data = await response.json();
    
    if (data.ok && data.translation) {
      translationCache[cacheKey] = data.translation;
      return data.translation;
    }
  } catch (error) {
    console.error("Error translating:", error);
  }

  // Fallback: retornar texto original
  return text;
}

// ============= AGENDAMENTO =============

async function startBookingWithTreatment(treatmentName) {
  const treatment = findTreatmentByName(treatmentName);
  if (!treatment) {
    addMessage(tx('errorTreatmentNotFound'));
    return;
  }

  botState.appointment.isDirect = false;

  // Preenche o tratamento e o total
  botState.appointment.treatment = treatment;
  botState.appointment.total = treatment.price;

  // 1) Mensagem de "Excelente escolha!"
  const msg = tx('excellentChoice')
    .replace('{treatment}', treatment.name)
    .replace('{price}', treatment.price.toFixed(2));
  addMessage(msg);

  // 2) Já entra no passo de NOME (sem depender de outra função)
  botState.step = "book_name";
  clearQuickReplies();
  addMessage(tx('askName'));
}

// Função para mostrar upsell inteligente usando IA
async function showIntelligentUpsell(mainTreatment) {
  // Verificar se existe upsell mapeado
  const mappedUpsell = UPSELL_MAP[mainTreatment.name];
  
  if (mappedUpsell) {
    // Usar upsell mapeado
    botState.step = "book_upsell_initial";
    const msg = tx('upsellIntro')
      .replace('{main}', mainTreatment.name)
      .replace('{upsell}', mappedUpsell.upsell)
      .replace('{price}', mappedUpsell.price.toFixed(2));
    addMessage(msg);
    addQuickReplies([
      {label: tx('yesAddUpsell'), action: "upsell_initial_yes"},
      {label: tx('noUpsell'), action: "upsell_initial_no"}
    ]);
  } else {
    // Usar IA para sugerir tratamento complementar
    try {
      const response = await fetch(`${API_BASE}/api/suggest-upsell`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          treatment: mainTreatment.name,
          category: mainTreatment.category,
          language: botState.lang
        })
      });
      
      const data = await response.json();
      
      if (data.ok && data.suggestion) {
        botState.step = "book_upsell_initial";
        botState.aiSuggestedUpsell = data.suggestion;
        addMessage(data.suggestion.message);
        addQuickReplies([
          {label: tx('yesAddUpsell'), action: "upsell_initial_ai_yes"},
          {label: tx('noUpsell'), action: "upsell_initial_no"}
        ]);
      } else {
        // Se IA falhar, ir direto para pedir nome
        proceedToAskName();
      }
    } catch (error) {
      console.error("Error getting AI upsell:", error);
      // Se falhar, ir direto para pedir nome
      proceedToAskName();
    }
  }
}

// Função para prosseguir pedindo nome
function proceedToAskName() {
  botState.step = "book_name";
  clearQuickReplies();
  addMessage(tx('askName'));
}

function proceedToAskTime() {
  botState.step = "book_time";
  const date = botState.appointment.date;

  // Buscar horários disponíveis
  fetch(`${API_BASE}/api/availability?date=${date}`)
    .then(res => res.json())
    .then(data => {
      // usar availableSlots (nome correto vindo do backend)
      const slots = data.availableSlots || data.slots || [];

      if (data.ok && slots.length > 0) {
        const msg = tx('availableSlots').replace('{date}', date);
        addMessage(msg);

        addQuickReplies(
          slots.map(slot => ({
            label: slot,
            action: `time_${slot.replace(':', '_')}`
          }))
        );
      } else {
        addMessage(tx('noSlotsAvailable'));
        botState.step = "book_date";
        addMessage(
          tx('askDate').replace('{name}', botState.appointment.name || '')
        );
      }
    })
    .catch(err => {
      console.error("Error loading slots:", err);
      addMessage(tx('errorLoadingSlots'));
      botState.step = "book_time_manual";
      addMessage(tx('askTime'));
    });
}

// ⚠️ NOVA função, fora da anterior, não dentro dela
function proceedToAskTimeDirect() {
  botState.step = "book_time";
  const date = botState.appointment.date;

  fetch(`${API_BASE}/api/availability?date=${date}`)
    .then(res => res.json())
    .then(data => {
      if (data.ok && data.slots && data.slots.length > 0) {
        const question = "Para qual horário você gostaria de agendar seu tratamento?";
        addMessage(question);
        addQuickReplies(data.slots.map(slot => ({
          label: slot,
          action: `time_${slot.replace(':', '_')}`
        })));
      } else {
        addMessage(tx('noSlotsAvailable'));
        botState.step = "book_date";
        addMessage(tx('askDate').replace('{name}', botState.appointment.name || ''));
      }
    })
    .catch(err => {
      console.error("Error loading slots (direct):", err);
      addMessage(tx('errorLoadingSlots'));
      botState.step = "book_time_manual";
      addMessage(tx('askTime'));
    });
}

// Handler para aceitar upsell inicial (mapeado)
function handleInitialUpsellAccepted() {
  const treatment = botState.appointment.treatment;
  const upsell = UPSELL_MAP[treatment.name];

  // Se por algum motivo não tiver upsell mapeado, só segue o fluxo normal
  if (!upsell) {
    proceedToAskName();
    return;
  }

  // Garante que o preço é número
  const upsellPrice = Number(upsell.price) || 0;

  botState.appointment.upsell = upsell;
  botState.appointment.total += upsellPrice;

  const msg = tx('upsellAdded')
    .replace('{upsell}', upsell.upsell)
    .replace('{price}', upsellPrice.toFixed(2));

  addMessage(msg, 'bot', true); // mantém o HTML certinho
  proceedToAskName();
}

// Handler para aceitar upsell inicial (sugerido por IA)
function handleInitialAIUpsellAccepted() {
  const aiUpsell = botState.aiSuggestedUpsell;

  if (!aiUpsell) {
    proceedToAskName();
    return;
  }

  const upsellPrice = Number(aiUpsell.price) || 0;

  botState.appointment.aiUpsell = aiUpsell;
  botState.appointment.total += upsellPrice;

  const label =
    aiUpsell.name || aiUpsell.upsell || "extra treatment";

  const msg = tx('upsellAdded')
    .replace('{upsell}', label)
    .replace('{price}', upsellPrice.toFixed(2));

  addMessage(msg, 'bot', true);
  proceedToAskName();
}

// Handler para recusar upsell inicial
function handleInitialUpsellDeclined() {
  // Ir direto para pedir nome
  proceedToAskName();
}

function findTreatmentByName(name) {
  const normalized = name.toLowerCase().trim();
  for (const [cat, list] of Object.entries(treatments)) {
    for (const t of list) {
      if (t.name.toLowerCase() === normalized) {
        return t;
      }
    }
  }
  return null;
}

// ============= USER TEXT HANDLER =============

async function handleUserText(text) {
  addMessage(text, 'user');
  if (botState.step === "extra_name") {
    const value = text.trim();
    botState.appointment.name = value;

    const firstName = value.split(" ")[0] || "";
    addMessage(`Perfeito, ${firstName}! Em que mais posso te ajudar?`);

    botState.step = "main_menu";
    showMainMenu();
    return;
  }

  // Nome
  if (botState.step === "book_name") {
    botState.appointment.name = text;
    botState.step = "book_date";
    const msg = tx('askDate').replace('{name}', text);
    addMessage(msg);
    const muted = getComputedStyle(document.documentElement).getPropertyValue('--muted');
    addMessage(`<span style="font-size:13px;color:${muted};">${tx('askDateHint')}</span>`, 'bot', true);
    return;
  }

  // Data
  if (botState.step === "book_date") {
    if (!isValidDate(text)) {
      addMessage(tx('invalidDate'));
      return;
    }
    botState.appointment.date = text;
    botState.step = "book_time";
    await showAvailableSlots(text);
    return;
  }

  // Horário manual (quando API falha)
  if (botState.step === "book_time_manual") {
    botState.appointment.time = text;
    botState.step = "book_contact";
    addMessage(tx('askContact'));
    const muted = getComputedStyle(document.documentElement).getPropertyValue('--muted');
    addMessage(`<span style="font-size:13px;color:${muted};">${tx('privacyNote')}</span>`, 'bot', true);
    return;
  }

  // Contato
  if (botState.step === "book_contact") {
    const value = text.trim();

    // 1ª vez em book_contact: ainda não temos nome → essa resposta é o NOME
    if (!botState.appointment.name) {
      botState.appointment.name = value;
      const firstName = value.split(" ")[0] || "";

      // 👉 FLUXO ESCRITO (isDirect = true): primeiro "Perfeito, Henrique!",
      // depois o upsell estilizado
      if (botState.appointment.isDirect) {
        const treatment = botState.appointment.treatment;

        // 1) mensagem de confirmação do nome
        addMessage(`Perfeito, ${firstName}!`, 'bot');

        // 2) se tiver upsell, mostra o cartão SPECIAL OFFER
        if (treatment && typeof showDirectBookingUpsell === "function") {
          showDirectBookingUpsell(treatment);
          return;
        }

        // 3) se por algum motivo não tiver upsell, cai pro telefone
        addMessage("Qual seu número de telefone (WhatsApp)?");
        return;
      }

      // 👉 FLUXO NORMAL (não veio por texto direto): já pergunta nome + telefone juntos
      addMessage(`Perfeito, ${firstName}! Qual seu número de telefone (WhatsApp)?`);
      return;
    }

    // 2ª vez: já temos nome, agora é o TELEFONE
    if (!botState.appointment.contact) {
      botState.appointment.contact = value;
      await finalizeBooking();
      return;
    }

    // Se por algum motivo já tivermos nome e contato
    addMessage("Já tenho seu nome e seu contato. Se quiser alterar algo, me diga o que deseja mudar.");
    return;
  }

  // Pré-avaliação
  if (botState.step.startsWith("pre_eval_")) {
    handlePreEvaluationAnswer(text);
    return;
  }

  // Fallback: enviar para IA
  await sendToAI(text);
}

function isValidDate(dateStr) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateStr)) return false;
  const date = new Date(dateStr);
  return date instanceof Date && !isNaN(date);
}

function formatDateShort(dateStr) {
  // Converte "YYYY-MM-DD" para "DD/MM"
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const [year, month, day] = parts;
  return `${day}/${month}`;
}

async function showAvailableSlots(date) {
  try {
    const response = await fetch(`${API_BASE}/api/availability?date=${date}`);
    const data = await response.json();

    const slots = data.availableSlots || data.slots || [];

    if (!data.ok || slots.length === 0) {
      addMessage(tx('noSlotsAvailable'));
      botState.step = "book_date";
      return;
    }

    addMessage(tx('availableSlots').replace('{date}', date));

    const buttons = slots.slice(0, 12).map(slot => ({
      label: slot,                                  // mostra "09:00"
      action: `time_${slot.replace(':', '_')}`      // action "time_09_00"
    }));
    addQuickReplies(buttons);
  } catch (error) {
    console.error("Error fetching availability:", error);
    addMessage(tx('errorLoadingSlots'));
    botState.step = "book_time_manual";
    addMessage(tx('askTime'));
  }
}

function handleTimeSelected(time) {
  botState.appointment.time = time;

  const treatment = botState.appointment.treatment;

  // Se temos tratamento e função de upsell
  if (treatment && typeof showDirectBookingUpsell === "function") {

    // 👉 FLUXO ESCRITO: primeiro nome, upsell só depois do nome
    if (botState.appointment.isDirect) {
      botState.step = "book_contact";

      // ainda não temos nome real
      if (!botState.appointment.name || botState.appointment.name === "Cliente MovMore") {
        botState.appointment.name = null; // garante que vamos pedir o nome de verdade
        addMessage("Perfeito! Antes de finalizar, qual é o seu nome completo?");
      } else {
        // (caso raro) já temos nome → pedir contato normal
        addMessage(tx('askContact'));
        const muted = getComputedStyle(document.documentElement).getPropertyValue('--muted');
        addMessage(
          `<span style="font-size:13px;color:${muted};">${tx('privacyNote')}</span>`,
          'bot',
          true
        );
      }
      return;
    }

    // 👉 FLUXOS NORMAIS (por botão): upsell logo após escolher o horário
    showDirectBookingUpsell(treatment);
    return;
  }

  // Fallback: se não tiver tratamento, segue para contato
  botState.step = "book_contact";
  addMessage(tx('askContact'));
  const muted = getComputedStyle(document.documentElement).getPropertyValue('--muted');
  addMessage(
    `<span style="font-size:13px;color:${muted};">${tx('privacyNote')}</span>`,
    'bot',
    true
  );
}

function handleUpsellAccepted() {
  const treatment = botState.appointment.treatment;
  const upsell = UPSELL_MAP[treatment.name];
  botState.appointment.upsell = upsell;
  botState.appointment.total += upsell.price;

  const msg = tx('upsellAdded')
    .replace('{upsell}', upsell.upsell)
    .replace('{price}', upsell.price.toFixed(2));
  addMessage(msg, 'bot', true); // Skip typing para renderizar HTML

  botState.step = "book_contact";
  addMessage(tx('askContact'));
  const muted = getComputedStyle(document.documentElement).getPropertyValue('--muted');
  addMessage(`<span style="font-size:13px;color:${muted};">${tx('privacyNote')}</span>`, 'bot', true);
}

function handleUpsellDeclined() {
  botState.step = "book_contact";
  addMessage(tx('askContact'));
  const muted = getComputedStyle(document.documentElement).getPropertyValue('--muted');
  addMessage(`<span style="font-size:13px;color:${muted};">${tx('privacyNote')}</span>`, 'bot', true);
}

async function finalizeBooking() {
  try {
    // ✅ Segurança: garantir que temos todos os dados essenciais
    const ap = botState.appointment || {};

    const safeName = ap.name && ap.name.trim()
      ? ap.name.trim()
      : "Cliente MovMore";

    const safeTreatmentName =
      ap.treatment && ap.treatment.name ? ap.treatment.name : null;

    const safeDate = ap.date || null;
    const safeTime = ap.time || null;

    // Se faltar algum campo crítico, nem chama o backend
    if (!safeTreatmentName || !safeDate || !safeTime) {
      console.error("⚠️ Dados incompletos antes de criar booking:", {
        treatmentName: safeTreatmentName,
        date: safeDate,
        time: safeTime,
        name: safeName,
      });

      addMessage(
        "Tivemos um problema com algumas informações do seu agendamento. " +
        "Vamos voltar ao início para garantir que tudo fique certinho, ok?"
      );
      botState.step = "main_menu";
      addMessage(tx('menuTitle'));
      showMainMenu();
      return;
    }

    // Atualiza no estado (especialmente o name)
    botState.appointment.name = safeName;

    const total = ap.total || (ap.treatment ? ap.treatment.price : null);

const payload = {
  sourceBot: "Eliza",
  sourceVertical: "Aesthetic Clinic",
  clinicName: CLINIC_CONFIG.name,
  language: botState.lang,
  category: ap.category || null,
  treatmentName: safeTreatmentName,

  // 👇 agora mandamos o TOTAL real
  treatmentPrice: total,
  total: total,

  name: safeName,
  date: safeDate,
  time: safeTime,
  contact: ap.contact || null,
  sourceUrl: window.location.href,
};


    console.log("📤 Enviando booking:", payload);

    const response = await fetch(`${API_BASE}/api/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    console.log("📥 Resposta do backend /api/appointments:", data);

    if (data.ok) {
      const bookingId = data.appointmentId;
         // 🚀 AVISAR O N8N QUE TEVE UM NOVO AGENDAMENTO
   try {
     await fetch("https://btrix.app.n8n.cloud/webhook/bot-lead", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
         name: botState.appointment.name,
         contact: botState.appointment.contact || null,
         treatmentName: botState.appointment.treatment?.name || null,
         date: botState.appointment.date,
         time: botState.appointment.time,
         bookingId,
         source: "eliza-bot",
       }),
     });

     console.log("✅ Lead enviado para o n8n");
   } catch (err) {
     console.error("❌ Erro ao enviar lead para o n8n:", err);
   }

      // 1º balão – número da reserva
      const msg = tx("bookingConfirmed").replace("{id}", bookingId);
      addMessage(msg);

      // Monta lista de tratamentos (principal + upsell, se tiver)
      const ap = botState.appointment;
      const treatmentNames = [];

      // tratamento principal
      if (ap.treatment && ap.treatment.name) {
        treatmentNames.push(ap.treatment.name);
      }

      // tratamentos extras adicionados no fluxo "Adicionar mais um tratamento"
      if (Array.isArray(ap.extraTreatments)) {
        ap.extraTreatments.forEach(t => {
          if (t && t.name) {
            treatmentNames.push(t.name);
          }
        });
      }

      // upsell mapeado
      if (ap.upsell) {
        treatmentNames.push(ap.upsell.upsell);
      }

      // upsell da IA (se existir)
      if (ap.aiUpsell) {
        treatmentNames.push(ap.aiUpsell.name || ap.aiUpsell.upsell);
      }

      // junta tudo em uma string "A + B + C"
      const treatmentList = treatmentNames.join(" + ");

      // 2º balão – detalhes do agendamento
      const details = tx("confirmationDetails")
        .replace("{treatment}", treatmentList)
        .replace("{date}", botState.appointment.date)
        .replace("{time}", botState.appointment.time)
        .replace("{name}", botState.appointment.name)
        .replace("{contact}", botState.appointment.contact || "-")
        .replace("{total}", botState.appointment.total.toFixed(2));

      addMessage(details);

      // 3º balão – pergunta sobre pagamento
      addMessage(tx("paymentLink"));

      const paymentUrl = `${CLINIC_CONFIG.paymentUrl}?booking=${bookingId}&amount=${botState.appointment.total}`;

      // Armazena bookingId para usar no clique de "Pagar agora"
      botState.appointment.bookingId = bookingId;
      botState.step = "payment_pending";

      addQuickReplies([
        { label: tx("payNow"), action: "payment_complete" },
        { label: tx("finish"), action: "finish_chat" },
      ]);

      // marca como fluxo concluído
      botState.step = "booking_complete";
    } else {
      // ❗ Agora mostramos o erro real que veio do servidor
      console.error("❌ Erro ao criar booking:", data);

      const errorText = data.error || "Falha ao criar o agendamento.";
      addMessage(
        `Tivemos um problema ao criar seu agendamento: ${errorText}`
      );
    }
  } catch (error) {
    console.error("🔥 Error finalizing booking:", error);
    addMessage(tx("errorCreatingBooking"));
  }
}

// ============= PRÉ-AVALIAÇÃO =============

function startPreEvaluation() {
  botState.step = "pre_eval_1";
  botState.preEvaluation = {goal: null, concern: null, age: null, reason: null, step: 1};
  addMessage(tx('preIntro'));
  addMessage(tx('preQuestion1'));
  clearQuickReplies();
}

function handlePreEvaluationAnswer(text) {
  const step = botState.preEvaluation.step;

  if (step === 1) {
    botState.preEvaluation.goal = text;
    botState.preEvaluation.step = 2;
    botState.step = "pre_eval_2";
    addMessage(tx('preQuestion2'));
  } else if (step === 2) {
    botState.preEvaluation.concern = text;
    botState.preEvaluation.step = 3;
    botState.step = "pre_eval_3";
    addMessage(tx('preQuestion3'));
  } else if (step === 3) {
    botState.preEvaluation.age = text;
    botState.preEvaluation.step = 4;
    botState.step = "pre_eval_4";
    addMessage(tx('preQuestion4'));
  } else if (step === 4) {
    botState.preEvaluation.reason = text;
    botState.preEvaluation.step = 5;
    botState.step = "pre_eval_recommendations";
    generatePreEvaluationRecommendations();
  } else if (botState.step === "pre_eval_name") {
    botState.preEvaluation.name = text;
    botState.step = "pre_eval_phone";
    addMessage(tx('preAskPhone'));
  } else if (botState.step === "pre_eval_phone") {
    botState.preEvaluation.phone = text;
    botState.step = "pre_eval_email";
    addMessage(tx('preAskEmail'));
  } else if (botState.step === "pre_eval_email") {
    botState.preEvaluation.email = text;
    capturePreEvaluationLead();
  }
}

async function generatePreEvaluationRecommendations() {
  // NÃO recomendar tratamentos - apenas agradecer e pedir dados
  addMessage(tx('preThankYou'));
  
  botState.step = "pre_eval_name";
  addMessage(tx('preAskContact'));
  addMessage(tx('preAskName'));
}

async function capturePreEvaluationLead() {
  try {
    const payload = {
      type: "pre_evaluation",
      clinicName: CLINIC_CONFIG.name,
      language: botState.lang,
      name: botState.preEvaluation.name,
      phone: botState.preEvaluation.phone,
      email: botState.preEvaluation.email,
      goal: botState.preEvaluation.goal,
      concern: botState.preEvaluation.concern,
      age: botState.preEvaluation.age,
      reason: botState.preEvaluation.reason,
      sourceUrl: window.location.href
    };

    const response = await fetch(`${API_BASE}/api/leads`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (data.ok) {
      addMessage(tx('preLeadCaptured'));
      addQuickReplies([
        {label: tx('mBack'), action: "menu_home"},
        {label: tx('finish'), action: "finish_chat"}
      ]);
      botState.step = "pre_eval_complete";
    } else {
      addMessage(tx('errorCapturingLead'));
    }
  } catch (error) {
    console.error("Error capturing lead:", error);
    addMessage(tx('errorCapturingLead'));
  }
}

// ============= FAQ =============

function showFAQ() {
  botState.step = "faq";
  addMessage(`<b>${tx('faqTitle')}</b>`);
  addMessage(tx('faqQ1') + "<br>" + tx('faqA1'));
  addMessage(tx('faqQ2') + "<br>" + tx('faqA2'));
  addMessage(tx('faqQ3') + "<br>" + tx('faqA3'));
  addMessage(tx('faqQ4') + "<br>" + tx('faqA4').replace('{whatsapp}', CLINIC_CONFIG.whatsappUrl));
  addQuickReplies([
    {label: tx('mBack'), action: "menu_home"}
  ]);
}

// ============= IA =============

// Função para mostrar upsell no agendamento direto
async function showDirectBookingUpsell(treatment) {
  const mappedUpsell = UPSELL_MAP[treatment.name];

  // helper para exibir o upsell com o MESMO estilo dos outros flows
  const showStyledUpsell = (upsellName, upsellPrice, mode) => {
    // mode = "mapped" ou "ai"
    if (mode === "mapped") {
      botState.step = "direct_booking_upsell";
    } else if (mode === "ai") {
      botState.step = "direct_booking_upsell_ai";
    }

    // usa o MESMO template estilizado (OFERTA ESPECIAL / SPECIAL OFFER)
    const msg = tx('upsellIntro')
      .replace('{main}', treatment.name)
      .replace('{upsell}', upsellName)
      .replace('{price}', upsellPrice.toFixed(2));

    // usa tx() então já sai no idioma certo
    addMessage(msg, 'bot', true);

    addQuickReplies([
      {
        label: tx('yesAddUpsell'),
        action: mode === "ai" ? "direct_upsell_ai_yes" : "direct_upsell_yes"
      },
      {
        label: tx('continueBtn'),
        action: "direct_upsell_continue"
      }
    ]);
  };

  // 1) Upsell mapeado (tabela UPSELL_MAP)
  if (mappedUpsell) {
    showStyledUpsell(mappedUpsell.upsell, mappedUpsell.price, "mapped");
    return;
  }

  // 2) Se não tiver mapeado, tentar IA
  try {
    const response = await fetch(`${API_BASE}/api/suggest-upsell`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        treatment: treatment.name,
        category: treatment.category,
        language: botState.lang
      })
    });

    const data = await response.json();

    if (data.ok && data.suggestion) {
      botState.aiSuggestedUpsell = data.suggestion;

      const sugName =
        data.suggestion.name ||
        data.suggestion.upsell ||
        "Complementary treatment";

      const sugPrice = data.suggestion.price || 0;

      showStyledUpsell(sugName, sugPrice, "ai");
    } else {
      // ❌ Sem upsell → seguir fluxo normal, respeitando se já temos ou não o NOME
      botState.step = "book_contact";

      if (!botState.appointment.name || botState.appointment.name === "Cliente MovMore") {
        // Ainda não temos nome real → pedir nome primeiro
        botState.appointment.name = null; // garante que não fica o placeholder
        addMessage(tx('askName'));
      } else {
        // Já temos nome → pedir contato direto
        addMessage(tx('askContact'));
        const muted = getComputedStyle(document.documentElement)
          .getPropertyValue('--muted');
        addMessage(
          `<span style="font-size:13px;color:${muted};">${tx('privacyNote')}</span>`,
          'bot',
          true
        );
      }
    }
  } catch (error) {
    console.error("Error suggesting upsell:", error);
    botState.step = "book_contact";

    if (!botState.appointment.name || botState.appointment.name === "Cliente MovMore") {
      botState.appointment.name = null;
      addMessage(tx('askName'));
    } else {
      addMessage(tx('askContact'));
      const muted = getComputedStyle(document.documentElement)
        .getPropertyValue('--muted');
      addMessage(
        `<span style="font-size:13px;color:${muted};">${tx('privacyNote')}</span>`,
        'bot',
        true
      );
    }
  }
}

// Função sendToAI atualizada com fallbacks e loading states
async function sendToAI(text) {
  if (!checkConnection()) {
    const fallbackResponse = await getAIFallback(text, botState.lang);
    addMessage(fallbackResponse);
    return;
  }

  setLoadingState(true);
  
  try {
    const response = await fetch(`${API_BASE}/api/chat`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        message: text,
        clientId: CLINIC_CONFIG.name,
        language: botState.lang,
        context: {step: botState.step}
      })
    });

    if (!response.ok) {
      throw new Error('API response not ok');
    }

    const data = await response.json();

    if (data.ok) {
      // Processar intenção de agendamento (tratamento + data escritos)
      if (data.intent === "book_appointment" && data.treatment && data.treatment.name) {
        const treatment = findTreatmentByName(data.treatment.name);
        if (treatment) {
          // Preenche o tratamento e o valor, como nos outros flows
          botState.appointment.treatment = treatment;
          botState.appointment.total = treatment.price;
          botState.appointment.category = treatment.category || null;
          botState.appointment.isDirect = true;

          // Se a IA já trouxe a data na mesma frase
          if (data.date && isValidDate(data.date)) {
            botState.appointment.date = data.date;

            // Formata "YYYY-MM-DD" -> "DD/MM"
            const [year, month, day] = data.date.split("-");
            const shortDate = `${day}/${month}`;

            // Só uma frase curta + botões, SEM chamar horário ainda
            const confirmMsg = `Certo! ${treatment.name} para dia ${shortDate}, certo?`;
            addMessage(confirmMsg, 'bot', true);

            addQuickReplies([
              { label: "Sim", action: "direct_confirm_yes" },
              { label: "Não", action: "direct_confirm_no" }
            ]);
          } else {
            // Se não tiver data, entra no fluxo normal de agendamento
            await startBookingWithTreatment(treatment.name);
          }
          return;
        }
      }

      // Se não for agendamento, apenas responder
      addMessage(data.reply);
    } else {
      // Se IA não conseguiu processar, responder de forma genérica
      const fallbackResponse = await getAIFallback(text, botState.lang);
      addMessage(fallbackResponse);
    }
  } catch (error) {
    console.error("Error calling AI:", error);
    const fallbackResponse = await getAIFallback(text, botState.lang);
    addMessage(fallbackResponse);
  } finally {
    setLoadingState(false);
  }
}