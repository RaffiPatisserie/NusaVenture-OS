/**
 * NUSAVENTURE OS v6.0 - WATERFALL PHASE 3: ENTERPRISE B2B INVENTORY & OAUTH SERVER
 * Arsitektur: Modular Middleware (Auth + RBAC) + Google OAuth 2.0 + B2B Inventory Controllers
 *
 * Cara Menjalankan:
 *   1. npm init -y
 *   2. npm install express cors crypto
 *   3. node server.js
 */

const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;
const DB_FILE = path.join(__dirname, 'nusa-db.json');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'NUSAVENTURE_GOOGLE_OAUTH_CLIENT_ID';

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(__dirname));

// ================= DATABASE HELPER =================
function readDB() {
  if (fs.existsSync(DB_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    } catch (e) {
      return null;
    }
  }
  return null;
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// ================= CORE MASS-BALANCE FORMULA =================
function evaluateMassBalanceServer(mb) {
  const input = Number(mb?.inputUnits) || 0;
  const accounted =
    (Number(mb?.posSalesUnits) || 0) +
    (Number(mb?.warehouseStockUnits) || 0) +
    (Number(mb?.verifiedRejectUnits) || 0);
  const gap = Math.max(0, input - accounted);
  const pct = input > 0 ? Number(((gap / input) * 100).toFixed(2)) : 0;
  return { gap, pct, isAlert: pct > 3.0 };
}

// ================= WATERFALL PHASE 3: AUTH & RBAC MIDDLEWARES =================
const activeTokens = new Map();

function issueSessionToken(user) {
  const token = crypto.randomBytes(24).toString('hex');
  activeTokens.set(token, {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    entityId: user.entityId || null,
    issuedAt: Date.now()
  });
  return token;
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ ok: false, error: 'UNAUTHORIZED: Token sesi tidak ditemukan.' });
  }
  const token = authHeader.split(' ')[1];
  const session = activeTokens.get(token);
  if (!session) {
    return res.status(401).json({ ok: false, error: 'INVALID_SESSION: Sesi telah berakhir, silakan login ulang.' });
  }
  req.user = session;
  next();
}

function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        ok: false,
        error: `FORBIDDEN_RBAC: Akses ditolak. Endpoint ini membutuhkan peran: ${allowedRoles.join(' / ')}`
      });
    }
    next();
  };
}

// ================= GOOGLE OAUTH 2.0 & IDENTITY CONTROLLERS =================
app.post('/api/auth/google', async (req, res) => {
  try {
    const { credential, simulatedProfile, requestedRole = 'MITRA', portalName = 'B2B Portal' } = req.body;
    let googlePayload = simulatedProfile;

    // Jika menerima Google ID Token JWT asli dari Google Identity Services
    if (credential && !simulatedProfile) {
      const parts = credential.split('.');
      if (parts.length === 3) {
        googlePayload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf-8'));
      }
    }

    if (!googlePayload || !googlePayload.email) {
      return res.status(400).json({ ok: false, error: 'Payload Google OAuth tidak valid.' });
    }

    const db = readDB() || { users: [], authLogs: [], umkmList: [] };
    db.users = db.users || [];
    db.authLogs = db.authLogs || [];

    const emailClean = googlePayload.email.trim().toLowerCase();
    let user = db.users.find(u => u.email.toLowerCase() === emailClean);

    if (!user) {
      user = {
        id: `USR-GOOG-${Math.floor(1000 + Math.random() * 9000)}`,
        role: requestedRole,
        authProvider: 'GOOGLE_OAUTH_2',
        googleSub: googlePayload.sub || `goog-${Date.now()}`,
        name: googlePayload.name || emailClean.split('@')[0],
        email: emailClean,
        avatar: googlePayload.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(googlePayload.name || 'Nusa')}&background=52584E&color=fff`,
        phone: googlePayload.phone || '-',
        entityId: requestedRole === 'MITRA' ? 'UMKM-001' : null,
        entityName: googlePayload.entityName || (requestedRole === 'MITRA' ? 'Mitra B2B Terverifikasi' : 'Institutional Investor'),
        kycStatus: 'OAUTH_VERIFIED',
        registeredAt: new Date().toLocaleString('id-ID'),
        lastLoginAt: new Date().toLocaleString('id-ID'),
        loginCount: 1
      };
      db.users.unshift(user);
    } else {
      user.lastLoginAt = new Date().toLocaleString('id-ID');
      user.loginCount = (user.loginCount || 0) + 1;
      user.authProvider = 'GOOGLE_OAUTH_2';
    }

    const token = issueSessionToken(user);

    db.authLogs.unshift({
      id: `LOG-${Date.now()}`,
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      action: 'GOOGLE_OAUTH_LOGIN',
      portal: portalName,
      timestamp: user.lastLoginAt
    });

    writeDB(db);
    res.json({ ok: true, token, user, clientId: GOOGLE_CLIENT_ID });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Endpoint Registrasi & Login Standar
app.post('/api/auth/register', (req, res) => {
  try {
    const newUser = req.body;
    const db = readDB() || { users: [], authLogs: [] };
    db.users = db.users || [];
    db.authLogs = db.authLogs || [];

    const exists = db.users.some(u => u.email.toLowerCase() === (newUser.email || '').toLowerCase());
    if (!exists) db.users.unshift(newUser);

    const token = issueSessionToken(newUser);
    db.authLogs.unshift({
      id: `LOG-${Date.now()}`,
      userId: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      action: 'STANDARD_REGISTER',
      timestamp: new Date().toLocaleString('id-ID')
    });
    writeDB(db);
    res.json({ ok: true, token, user: newUser });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { email, role, timestamp } = req.body;
    const db = readDB() || { users: [], authLogs: [] };
    const user = (db.users || []).find(u => u.email.toLowerCase() === (email || '').toLowerCase());
    let token = null;
    if (user) {
      user.lastLoginAt = timestamp || new Date().toLocaleString('id-ID');
      user.loginCount = (user.loginCount || 0) + 1;
      token = issueSessionToken(user);
      db.authLogs = db.authLogs || [];
      db.authLogs.unshift({
        id: `LOG-${Date.now()}`,
        userId: user.id,
        name: user.name,
        email: user.email,
        role: role || user.role,
        action: 'STANDARD_LOGIN',
        timestamp: user.lastLoginAt
      });
      writeDB(db);
    }
    res.json({ ok: true, token });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ================= B2B INVENTORY & STATE CONTROLLERS =================
app.get('/api/state', (req, res) => {
  const db = readDB();
  if (db) return res.json(db);
  return res.json({ status: 'INITIAL_CLIENT_SEED' });
});

app.get('/api/inventory', (req, res) => {
  const db = readDB();
  const category = req.query.category;
  const search = (req.query.q || '').toLowerCase();
  let catalog = db?.b2bCatalog || [];
  if (category && category !== 'ALL') {
    catalog = catalog.filter(item => item.categoryCode === category || item.category === category);
  }
  if (search) {
    catalog = catalog.filter(
      item =>
        item.itemName.toLowerCase().includes(search) ||
        item.supplierName.toLowerCase().includes(search) ||
        (item.sku && item.sku.toLowerCase().includes(search))
    );
  }
  res.json({ ok: true, count: catalog.length, items: catalog });
});

app.post('/api/inventory/restock', authenticateToken, requireRole('ADMIN', 'MITRA'), (req, res) => {
  const { itemId, addedStock } = req.body;
  const qty = Number(addedStock);
  if (!Number.isInteger(qty) || qty < 1 || qty > 10000) {
    return res.status(400).json({ ok: false, error: 'BVA_VALIDATION_ERROR: Jumlah restock harus bilangan bulat antara 1 hingga 10.000 unit.' });
  }
  const db = readDB();
  if (!db) return res.status(404).json({ ok: false, error: 'Database belum diinisialisasi.' });
  const item = (db.b2bCatalog || []).find(i => i.id === itemId);
  if (!item) return res.status(404).json({ ok: false, error: 'SKU Inventaris tidak ditemukan.' });

  item.stock += qty;
  writeDB(db);
  res.json({ ok: true, item });
});

app.post('/api/sync', (req, res) => {
  try {
    const state = req.body;
    if (state && Array.isArray(state.umkmList)) {
      state.umkmList.forEach(umkm => {
        const audit = evaluateMassBalanceServer(umkm.massBalance);
        umkm.trancheFrozen = audit.isAlert;
      });
      writeDB(state);
    }
    res.json({ ok: true, syncedAt: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.get('/api/users', (req, res) => {
  const db = readDB() || { users: [], authLogs: [] };
  const users = (db.users || []).map(u => {
    const copy = { ...u };
    delete copy.password;
    return copy;
  });
  res.json({ totalUsers: users.length, users, authLogs: db.authLogs || [] });
});

app.listen(PORT, () => {
  console.log('======================================================================');
  console.log(` NUSAVENTURE OS v6.0 (WATERFALL + BLACK-BOX UI + GOOGLE OAUTH)`);
  console.log(` Server Aktif di: http://localhost:${PORT}`);
  console.log('======================================================================');
  console.log(` 1. Public B2B Catalog & KYB : http://localhost:${PORT}/1-public-portal.html`);
  console.log(` 2. Partner Inventory & POS  : http://localhost:${PORT}/2-partner-umkm.html`);
  console.log(` 3. Investor NusaBit Exchange: http://localhost:${PORT}/3-investor-bit.html`);
  console.log(` 4. Admin Command & AI Audit : http://localhost:${PORT}/4-admin-command.html`);
  console.log('======================================================================');
});