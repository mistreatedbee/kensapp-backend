require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());

function parseClientOrigins(value) {
  if (!value) return true;

  return value
    .split(',')
    .map((origin) => origin.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean);
}

const corsOptions = {
  origin: parseClientOrigins(process.env.CLIENT_ORIGIN),
  credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

const MONGODB_URI = process.env.MONGODB_URI || '';

async function connectDb() {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI not set in environment.');
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: 'kensapp'
    });
    console.log('Connected to MongoDB');
    await require('./lib/admin').ensureAdminUser();
  } catch (err) {
    console.error('MongoDB connection error:', err.message || err);
  }
}

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/uploads', require('./routes/uploads'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.get('/api/info', (req, res) => {
  res.json({ name: 'Kens App Backend', env: process.env.NODE_ENV || 'development' });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: process.env.NODE_ENV === 'production' && status === 500
      ? 'Server error'
      : err.message
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
connectDb();
