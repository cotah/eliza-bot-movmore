// ===============================
// PERSISTÊNCIA DE DADOS
// ===============================

import { MongoClient } from 'mongodb';
import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';

let dbClient;
let db;
let usingMongoDB = false;

// ===============================
// CONFIGURAÇÃO DO BANCO
// ===============================

export async function connectDatabase() {
  try {
    // Tenta conectar ao MongoDB primeiro
    if (process.env.MONGODB_URI) {
      dbClient = new MongoClient(process.env.MONGODB_URI);
      await dbClient.connect();
      db = dbClient.db('movmore-clinic');
      usingMongoDB = true;
      console.log('✅ Conectado ao MongoDB');
      
      // Criar índices para melhor performance
      await db.collection('appointments').createIndex({ date: 1, time: 1 });
      await db.collection('appointments').createIndex({ createdAt: -1 });
      await db.collection('leads').createIndex({ createdAt: -1 });
      
      return;
    }
    
    // Fallback para SQLite
    console.log('📁 Usando SQLite como banco de dados');
    initSQLite();
    
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB, usando SQLite:', error.message);
    initSQLite();
  }
}

function initSQLite() {
  const dbPath = './data/movmore.db';
  
  // Garantir que a pasta data existe
  const dataDir = path.dirname(dbPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  db = new sqlite3.Database(dbPath);
  
  // Criar tabelas
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS appointments (
      id TEXT PRIMARY KEY,
      sourceBot TEXT,
      sourceVertical TEXT,
      clinicName TEXT,
      language TEXT,
      category TEXT,
      treatmentName TEXT,
      treatmentPrice REAL,
      name TEXT,
      date TEXT,
      time TEXT,
      contact TEXT,
      sourceUrl TEXT,
      status TEXT,
      paymentConfirmedAt TEXT,
      transactionId TEXT,
      createdAt TEXT,
      updatedAt TEXT
    )`);
    
    db.run(`CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      type TEXT,
      clinicName TEXT,
      language TEXT,
      name TEXT,
      phone TEXT,
      email TEXT,
      goal TEXT,
      concern TEXT,
      age TEXT,
      reason TEXT,
      sourceUrl TEXT,
      createdAt TEXT
    )`);
    
    // Índices para melhor performance
    db.run('CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date)');
    db.run('CREATE INDEX IF NOT EXISTS idx_appointments_created ON appointments(createdAt)');
    db.run('CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(createdAt)');
  });
}

// ===============================
// FUNÇÕES PARA APPOINTMENTS
// ===============================

export async function saveAppointment(appointment) {
  if (usingMongoDB) {
    const result = await db.collection('appointments').insertOne({
      ...appointment,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return result.insertedId;
  } else {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO appointments (
        id, sourceBot, sourceVertical, clinicName, language, category,
        treatmentName, treatmentPrice, name, date, time, contact,
        sourceUrl, status, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        appointment.id, appointment.sourceBot, appointment.sourceVertical,
        appointment.clinicName, appointment.language, appointment.category,
        appointment.treatmentName, appointment.treatmentPrice, appointment.name,
        appointment.date, appointment.time, appointment.contact,
        appointment.sourceUrl, appointment.status || 'pending_payment',
        new Date().toISOString(), new Date().toISOString()
      ], function(err) {
        if (err) reject(err);
        else resolve(appointment.id);
      });
    });
  }
}

export async function getAppointments() {
  if (usingMongoDB) {
    return await db.collection('appointments')
      .find()
      .sort({ createdAt: -1 })
      .toArray();
  } else {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM appointments ORDER BY createdAt DESC`, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
}

export async function findAppointmentById(id) {
  if (usingMongoDB) {
    return await db.collection('appointments').findOne({ id });
  } else {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM appointments WHERE id = ?`, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }
}

export async function updateAppointmentStatus(id, status, transactionId = null) {
  if (usingMongoDB) {
    const updateData = {
      status,
      updatedAt: new Date().toISOString()
    };
    
    if (status === 'confirmed') {
      updateData.paymentConfirmedAt = new Date().toISOString();
      updateData.transactionId = transactionId;
    }
    
    return await db.collection('appointments').updateOne(
      { id },
      { $set: updateData }
    );
  } else {
    return new Promise((resolve, reject) => {
      let query = `UPDATE appointments SET status = ?, updatedAt = ?`;
      const params = [status, new Date().toISOString()];
      
      if (status === 'confirmed') {
        query += `, paymentConfirmedAt = ?, transactionId = ?`;
        params.push(new Date().toISOString(), transactionId);
      }
      
      query += ` WHERE id = ?`;
      params.push(id);
      
      db.run(query, params, function(err) {
        if (err) reject(err);
        else resolve({ modifiedCount: this.changes });
      });
    });
  }
}

export async function getAvailableSlots(date) {
  if (usingMongoDB) {
    const bookedSlots = await db.collection('appointments')
      .find({ 
        date, 
        status: { $in: ['pending_payment', 'confirmed'] } 
      })
      .project({ time: 1 })
      .toArray();
    
    return bookedSlots.map(slot => slot.time);
  } else {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT time FROM appointments WHERE date = ? AND status IN ('pending_payment', 'confirmed')`,
        [date],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows.map(row => row.time));
        }
      );
    });
  }
}

// ===============================
// FUNÇÕES PARA LEADS
// ===============================

export async function saveLead(lead) {
  if (usingMongoDB) {
    const result = await db.collection('leads').insertOne({
      ...lead,
      createdAt: new Date().toISOString()
    });
    return result.insertedId;
  } else {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO leads (
        id, type, clinicName, language, name, phone, email,
        goal, concern, age, reason, sourceUrl, createdAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        lead.id, lead.type, lead.clinicName, lead.language,
        lead.name, lead.phone, lead.email, lead.goal,
        lead.concern, lead.age, lead.reason, lead.sourceUrl,
        new Date().toISOString()
      ], function(err) {
        if (err) reject(err);
        else resolve(lead.id);
      });
    });
  }
}

export async function getLeads() {
  if (usingMongoDB) {
    return await db.collection('leads')
      .find()
      .sort({ createdAt: -1 })
      .toArray();
  } else {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM leads ORDER BY createdAt DESC`, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
}

// ===============================
// ESTATÍSTICAS
// ===============================

export async function getStats() {
  if (usingMongoDB) {
    const totalAppointments = await db.collection('appointments').countDocuments();
    const confirmedAppointments = await db.collection('appointments').countDocuments({ status: 'confirmed' });
    const totalLeads = await db.collection('leads').countDocuments();
    
    // Agendamentos por tratamento (top 5)
    const popularTreatments = await db.collection('appointments')
      .aggregate([
        { $group: { _id: '$treatmentName', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ])
      .toArray();
    
    return {
      totalAppointments,
      confirmedAppointments,
      totalLeads,
      popularTreatments
    };
  } else {
    return new Promise((resolve, reject) => {
      const stats = {};
      
      // Contagem total de agendamentos
      db.get(`SELECT COUNT(*) as count FROM appointments`, (err, row) => {
        if (err) return reject(err);
        stats.totalAppointments = row.count;
        
        // Agendamentos confirmados
        db.get(`SELECT COUNT(*) as count FROM appointments WHERE status = 'confirmed'`, (err, row) => {
          if (err) return reject(err);
          stats.confirmedAppointments = row.count;
          
          // Total de leads
          db.get(`SELECT COUNT(*) as count FROM leads`, (err, row) => {
            if (err) return reject(err);
            stats.totalLeads = row.count;
            
            // Tratamentos populares
            db.all(`
              SELECT treatmentName, COUNT(*) as count 
              FROM appointments 
              GROUP BY treatmentName 
              ORDER BY count DESC 
              LIMIT 5
            `, (err, rows) => {
              if (err) return reject(err);
              stats.popularTreatments = rows;
              resolve(stats);
            });
          });
        });
      });
    });
  }
}

export function closeDatabase() {
  if (usingMongoDB && dbClient) {
    dbClient.close();
  } else if (db) {
    db.close();
  }
}