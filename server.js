const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// ---------- Configuration (override with environment variables) ----------
const CONFIG = {
  port: process.env.PORT || 3000,
  adminUser: process.env.ADMIN_USER || 'admin',
  adminPassword: process.env.ADMIN_PASSWORD || 'changeme123',
  shopNameEn: process.env.SHOP_NAME_EN || 'The Aesthetic Corner',
  shopNameBn: process.env.SHOP_NAME_BN || 'দ্য এস্থেটিক কর্নার',
  bkashNumber: process.env.BKASH_NUMBER || '01712507280', // shown to customers; change when your bKash number changes
  bkashType: process.env.BKASH_TYPE || 'Personal', // Personal or Merchant
  whatsappNumber: process.env.WHATSAPP_NUMBER || '8801733403122', // country code, no + or spaces
  contactEmail: process.env.CONTACT_EMAIL || 'asmarahman1809@gmail.com',
  currency: process.env.CURRENCY || '৳',
  showViews: process.env.SHOW_VIEWS !== '0', // set SHOW_VIEWS=0 to hide view counts from visitors (you still see them in admin)
};

const DATA_DIR = path.join(__dirname, 'data');
const UPLOAD_DIR = path.join(__dirname, 'uploads');
const PAINTINGS_FILE = path.join(DATA_DIR, 'paintings.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const STATS_FILE = path.join(DATA_DIR, 'stats.json');
fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// ---------- Tiny JSON "database" ----------
function readJson(file) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return []; }
}
function writeJson(file, data) {
  const tmp = file + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
  fs.renameSync(tmp, file); // atomic replace
}
const newId = () => crypto.randomBytes(6).toString('hex');

// View counters: { siteViews: 12, paintings: { <paintingId>: 5 } }
function readStats() {
  try {
    const s = JSON.parse(fs.readFileSync(STATS_FILE, 'utf8'));
    return { siteViews: Number(s.siteViews) || 0, paintings: s.paintings && typeof s.paintings === 'object' ? s.paintings : {} };
  } catch { return { siteViews: 0, paintings: {} }; }
}
const BOT = /bot|crawl|spider|slurp|facebookexternalhit/i;

// ---------- Sessions ----------
const sessions = new Map(); // token -> expiry
const SESSION_MS = 1000 * 60 * 60 * 8; // 8 hours

function parseCookies(req) {
  const out = {};
  (req.headers.cookie || '').split(';').forEach((p) => {
    const i = p.indexOf('=');
    if (i > -1) out[p.slice(0, i).trim()] = decodeURIComponent(p.slice(i + 1).trim());
  });
  return out;
}
function isAdmin(req) {
  const token = parseCookies(req).session;
  const exp = token && sessions.get(token);
  if (!exp) return false;
  if (exp < Date.now()) { sessions.delete(token); return false; }
  return true;
}
function requireAdmin(req, res, next) {
  if (!isAdmin(req)) return res.status(401).json({ error: 'Not logged in' });
  next();
}
function safeEqual(a, b) {
  const ha = crypto.createHash('sha256').update(String(a)).digest();
  const hb = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

// Basic brute-force protection: max 8 attempts per IP per 10 minutes
const attempts = new Map();
function tooManyAttempts(ip) {
  const now = Date.now();
  const list = (attempts.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  attempts.set(ip, list);
  return list.length >= 8;
}

// ---------- App ----------
const app = express();
app.disable('x-powered-by');
// On most hosting services the site sits behind their proxy. Set TRUST_PROXY=1 there so
// visitors' real IP addresses are used (needed for the login attempt limit).
if (process.env.TRUST_PROXY === '1') app.set('trust proxy', 1);
app.use(express.json({ limit: '100kb' }));
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Image upload (JPG / PNG / WEBP, max 8 MB)
const EXT = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp' };
const upload = multer({
  storage: multer.diskStorage({
    destination: UPLOAD_DIR,
    filename: (req, file, cb) => cb(null, newId() + crypto.randomBytes(4).toString('hex') + EXT[file.mimetype]),
  }),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (EXT[file.mimetype]) cb(null, true);
    else cb(new Error('Only JPG, PNG or WEBP images are allowed'));
  },
});

const clean = (v, max = 500) => String(v == null ? '' : v).trim().slice(0, max);

function paintingFromBody(b) {
  return {
    titleEn: clean(b.titleEn, 120),
    titleBn: clean(b.titleBn, 120),
    descriptionEn: clean(b.descriptionEn, 1500),
    descriptionBn: clean(b.descriptionBn, 1500),
    size: clean(b.size, 80),            // e.g. 24 x 36 inch
    typeEn: clean(b.typeEn, 80),        // e.g. Oil on canvas
    typeBn: clean(b.typeBn, 80),
    materialsEn: clean(b.materialsEn, 200),
    materialsBn: clean(b.materialsBn, 200),
    colourEn: clean(b.colourEn, 120),
    colourBn: clean(b.colourBn, 120),
    year: clean(b.year, 10),
    price: Math.max(0, Number(b.price) || 0),
  };
}

// ---------- Public API ----------
app.get('/api/config', (req, res) => {
  const { adminUser, adminPassword, port, ...publicCfg } = CONFIG;
  res.json(publicCfg);
});

app.get('/api/paintings', (req, res) => {
  const list = readJson(PAINTINGS_FILE).sort((a, b) => b.createdAt - a.createdAt);
  if (CONFIG.showViews || isAdmin(req)) {
    const stats = readStats();
    list.forEach((p) => { p.views = stats.paintings[p.id] || 0; });
  }
  res.json(list);
});

// ---------- View counts ----------
// A visit is counted once per browser session (the page decides), never for bots,
// and never when the admin is logged in, so your own browsing does not add up.
const countable = (req) => !isAdmin(req) && !BOT.test(req.headers['user-agent'] || '');

app.get('/api/stats', (req, res) => {
  if (!CONFIG.showViews && !isAdmin(req)) return res.json({});
  res.json({ siteViews: readStats().siteViews });
});

app.post('/api/views/site', (req, res) => {
  const stats = readStats();
  if (countable(req)) { stats.siteViews += 1; writeJson(STATS_FILE, stats); }
  res.json(CONFIG.showViews || isAdmin(req) ? { siteViews: stats.siteViews } : {});
});

app.post('/api/views/painting/:id', (req, res) => {
  const painting = readJson(PAINTINGS_FILE).find((p) => p.id === req.params.id);
  if (!painting) return res.status(404).json({ error: 'Not found' });
  const stats = readStats();
  if (countable(req)) {
    stats.paintings[painting.id] = (stats.paintings[painting.id] || 0) + 1;
    writeJson(STATS_FILE, stats);
  }
  res.json(CONFIG.showViews || isAdmin(req) ? { views: stats.paintings[painting.id] || 0 } : {});
});

app.post('/api/orders', (req, res) => {
  const b = req.body || {};
  const paintings = readJson(PAINTINGS_FILE);
  const painting = paintings.find((p) => p.id === b.paintingId);
  if (!painting) return res.status(404).json({ error: 'Painting not found' });
  if (painting.status !== 'available') return res.status(409).json({ error: 'unavailable' });

  const order = {
    id: newId(),
    paintingId: painting.id,
    paintingTitle: painting.titleEn || painting.titleBn,
    price: painting.price,
    name: clean(b.name, 100),
    phone: clean(b.phone, 30),
    email: clean(b.email, 120),
    address: clean(b.address, 300),
    trxId: clean(b.trxId, 40).toUpperCase(),
    senderNumber: clean(b.senderNumber, 30),
    note: clean(b.note, 300),
    status: 'pending',
    createdAt: Date.now(),
  };
  if (!order.name || !order.phone || !order.address || !order.trxId) {
    return res.status(400).json({ error: 'Please fill in name, phone, address and Bkash TrxID' });
  }
  if (!/^[A-Z0-9]{6,20}$/.test(order.trxId)) {
    return res.status(400).json({ error: 'Invalid TrxID format' });
  }

  const orders = readJson(ORDERS_FILE);
  if (orders.some((o) => o.trxId === order.trxId && o.status !== 'rejected')) {
    return res.status(409).json({ error: 'This TrxID has already been submitted' });
  }
  orders.push(order);
  writeJson(ORDERS_FILE, orders);

  painting.status = 'reserved'; // hold it until the admin verifies payment
  writeJson(PAINTINGS_FILE, paintings);
  res.json({ ok: true, orderId: order.id });
});

// ---------- Auth ----------
app.post('/api/login', (req, res) => {
  const ip = req.ip;
  if (tooManyAttempts(ip)) return res.status(429).json({ error: 'Too many attempts. Try again later.' });
  const { username, password } = req.body || {};
  if (safeEqual(username, CONFIG.adminUser) && safeEqual(password, CONFIG.adminPassword)) {
    const token = crypto.randomBytes(32).toString('hex');
    sessions.set(token, Date.now() + SESSION_MS);
    const secure = req.secure || req.headers['x-forwarded-proto'] === 'https' ? '; Secure' : '';
    res.setHeader('Set-Cookie', `session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${SESSION_MS / 1000}${secure}`);
    return res.json({ ok: true });
  }
  attempts.get(ip).push(Date.now());
  res.status(401).json({ error: 'Wrong username or password' });
});

app.post('/api/logout', (req, res) => {
  const token = parseCookies(req).session;
  if (token) sessions.delete(token);
  res.setHeader('Set-Cookie', 'session=; HttpOnly; Path=/; Max-Age=0');
  res.json({ ok: true });
});

app.get('/api/me', (req, res) => res.json({ loggedIn: isAdmin(req) }));

// ---------- Admin API ----------
app.post('/api/admin/paintings', requireAdmin, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Please choose a painting photo' });
  const data = paintingFromBody(req.body);
  if (!data.titleEn && !data.titleBn) {
    fs.unlink(req.file.path, () => {});
    return res.status(400).json({ error: 'Please enter a title (English or Bangla)' });
  }
  const painting = { id: newId(), ...data, image: '/uploads/' + req.file.filename, status: 'available', createdAt: Date.now() };
  const list = readJson(PAINTINGS_FILE);
  list.push(painting);
  writeJson(PAINTINGS_FILE, list);
  res.json(painting);
});

app.put('/api/admin/paintings/:id', requireAdmin, upload.single('image'), (req, res) => {
  const list = readJson(PAINTINGS_FILE);
  const p = list.find((x) => x.id === req.params.id);
  if (!p) return res.status(404).json({ error: 'Not found' });
  Object.assign(p, paintingFromBody(req.body));
  if (['available', 'reserved', 'sold'].includes(req.body.status)) p.status = req.body.status;
  if (req.file) {
    fs.unlink(path.join(__dirname, p.image), () => {});
    p.image = '/uploads/' + req.file.filename;
  }
  writeJson(PAINTINGS_FILE, list);
  res.json(p);
});

app.delete('/api/admin/paintings/:id', requireAdmin, (req, res) => {
  const list = readJson(PAINTINGS_FILE);
  const i = list.findIndex((x) => x.id === req.params.id);
  if (i < 0) return res.status(404).json({ error: 'Not found' });
  const [removed] = list.splice(i, 1);
  fs.unlink(path.join(__dirname, removed.image), () => {});
  writeJson(PAINTINGS_FILE, list);
  const stats = readStats();
  if (stats.paintings[removed.id] != null) { delete stats.paintings[removed.id]; writeJson(STATS_FILE, stats); }
  res.json({ ok: true });
});

app.get('/api/admin/orders', requireAdmin, (req, res) => {
  res.json(readJson(ORDERS_FILE).sort((a, b) => b.createdAt - a.createdAt));
});

// Confirm (payment verified -> painting sold) or reject (painting available again)
app.patch('/api/admin/orders/:id', requireAdmin, (req, res) => {
  const action = (req.body || {}).action;
  if (!['confirm', 'reject'].includes(action)) return res.status(400).json({ error: 'Bad action' });
  const orders = readJson(ORDERS_FILE);
  const order = orders.find((o) => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Not found' });
  order.status = action === 'confirm' ? 'confirmed' : 'rejected';
  writeJson(ORDERS_FILE, orders);

  const paintings = readJson(PAINTINGS_FILE);
  const p = paintings.find((x) => x.id === order.paintingId);
  if (p) {
    p.status = action === 'confirm' ? 'sold' : 'available';
    writeJson(PAINTINGS_FILE, paintings);
  }
  res.json(order);
});

// ---------- Static files ----------
app.use('/uploads', express.static(UPLOAD_DIR, { maxAge: '7d' }));
app.use(express.static(path.join(__dirname, 'public')));

// Upload / validation errors -> JSON
app.use((err, req, res, next) => {
  res.status(400).json({ error: err.message || 'Something went wrong' });
});

app.listen(CONFIG.port, () => {
  console.log(`Painting shop running on http://localhost:${CONFIG.port}`);
  console.log(`Admin page:            http://localhost:${CONFIG.port}/admin.html`);
  if (CONFIG.adminPassword === 'changeme123') {
    console.log('WARNING: using the default admin password. Set ADMIN_PASSWORD before going live.');
  }
});
