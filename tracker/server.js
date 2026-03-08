/**
 * Lyra Enterprises — Send Tracker Server
 * Persistent email & WhatsApp send count tracking using a JSON file database.
 * No native build tools required.
 * Run: node server.js  →  http://localhost:3737
 */

const express = require('express');
const cors    = require('cors');
const path    = require('path');
const fs      = require('fs');

const app     = express();
const PORT    = 3737;
const DB_FILE = path.join(__dirname, 'tracker-db.json');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// ─── JSON FILE DATABASE ───────────────────────────────────────────────────────

function readDB() {
  if (!fs.existsSync(DB_FILE)) return { contacts: [], sendLog: [], nextContactId: 1, nextLogId: 1 };
  try { return JSON.parse(fs.readFileSync(DB_FILE, 'utf8')); }
  catch { return { contacts: [], sendLog: [], nextContactId: 1, nextLogId: 1 }; }
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function now() {
  return new Date().toLocaleString('en-IN', {
    day:'2-digit', month:'short', year:'numeric',
    hour:'2-digit', minute:'2-digit', hour12: true
  });
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function getContactsWithCounts(db) {
  return db.contacts.map(c => {
    const logs = db.sendLog.filter(l => l.contact_id === c.id);
    const emailLogs = logs.filter(l => l.type === 'email');
    const waLogs    = logs.filter(l => l.type === 'whatsapp');
    return {
      ...c,
      emailCount: emailLogs.length,
      waCount:    waLogs.length,
      lastEmail:  emailLogs.length ? emailLogs[emailLogs.length - 1].sent_at : null,
      lastWa:     waLogs.length    ? waLogs[waLogs.length - 1].sent_at       : null,
    };
  });
}

// ─── CONTACTS API ─────────────────────────────────────────────────────────────

app.get('/api/contacts', (req, res) => {
  const db = readDB();
  res.json(getContactsWithCounts(db));
});

app.post('/api/contacts', (req, res) => {
  const { name, org = '', email = '', place = '', phone = '' } = req.body;
  if (!name || !name.trim()) return res.status(400).json({ error: 'Name is required' });
  const db = readDB();
  const contact = {
    id: db.nextContactId++,
    name: name.trim(), org: org.trim(), email: email.trim(),
    place: place.trim(), phone: phone.trim(),
    created_at: now()
  };
  db.contacts.push(contact);
  writeDB(db);
  res.status(201).json({ ...contact, emailCount: 0, waCount: 0, lastEmail: null, lastWa: null });
});

app.put('/api/contacts/:id', (req, res) => {
  const { name, org = '', email = '', place = '', phone = '' } = req.body;
  if (!name || !name.trim()) return res.status(400).json({ error: 'Name is required' });
  const db = readDB();
  const c = db.contacts.find(x => x.id === Number(req.params.id));
  if (!c) return res.status(404).json({ error: 'Not found' });
  Object.assign(c, { name: name.trim(), org: org.trim(), email: email.trim(), place: place.trim(), phone: phone.trim() });
  writeDB(db);
  res.json({ ok: true });
});

app.delete('/api/contacts/:id', (req, res) => {
  const db = readDB();
  const id = Number(req.params.id);
  db.contacts = db.contacts.filter(c => c.id !== id);
  db.sendLog  = db.sendLog.filter(l => l.contact_id !== id);
  writeDB(db);
  res.json({ ok: true });
});

// ─── SEND LOG API ─────────────────────────────────────────────────────────────

app.post('/api/contacts/:id/send', (req, res) => {
  const { type, note = '' } = req.body;
  if (!['email', 'whatsapp'].includes(type))
    return res.status(400).json({ error: 'type must be email or whatsapp' });
  const db = readDB();
  const contact = db.contacts.find(c => c.id === Number(req.params.id));
  if (!contact) return res.status(404).json({ error: 'Contact not found' });
  db.sendLog.push({
    id: db.nextLogId++,
    contact_id: Number(req.params.id),
    name: contact.name,
    org:  contact.org || '',
    type, note: note.trim(),
    sent_at: now()
  });
  writeDB(db);
  res.status(201).json({ ok: true });
});

app.delete('/api/contacts/:id/send', (req, res) => {
  const { type } = req.body;
  if (!['email', 'whatsapp'].includes(type))
    return res.status(400).json({ error: 'type must be email or whatsapp' });
  const db   = readDB();
  const id   = Number(req.params.id);
  const logs = db.sendLog.filter(l => l.contact_id === id && l.type === type);
  if (!logs.length) return res.status(404).json({ error: 'Nothing to undo' });
  const lastId = logs[logs.length - 1].id;
  db.sendLog = db.sendLog.filter(l => l.id !== lastId);
  writeDB(db);
  res.json({ ok: true });
});

app.get('/api/log', (req, res) => {
  const db = readDB();
  res.json([...db.sendLog].reverse().slice(0, 200));
});

app.delete('/api/log', (req, res) => {
  const db = readDB();
  db.sendLog = [];
  writeDB(db);
  res.json({ ok: true });
});

app.get('/api/stats', (req, res) => {
  const db = readDB();
  const reached = new Set(db.sendLog.map(l => l.contact_id)).size;
  res.json({
    totalContacts: db.contacts.length,
    totalEmail:    db.sendLog.filter(l => l.type === 'email').length,
    totalWa:       db.sendLog.filter(l => l.type === 'whatsapp').length,
    reached
  });
});

// ─── START ────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`\n✅  Lyra Send Tracker → http://localhost:${PORT}`);
  console.log(`📦  Database file: ${DB_FILE}\n`);
});
