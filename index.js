require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

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
  } catch (err) {
    console.error('MongoDB connection error:', err.message || err);
    process.exit(1);
  }
}

app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/settings', require('./routes/settings'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.get('/api/info', (req, res) => {
  res.json({ name: 'Kens App Backend', env: process.env.NODE_ENV || 'development' });
});

const PORT = process.env.PORT || 4000;

connectDb().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
