const bcrypt = require('bcryptjs');
const AdminUser = require('../models/adminUser');

async function ensureAdminUser() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.warn('ADMIN_EMAIL or ADMIN_PASSWORD not set; admin auto-seed skipped.');
    return;
  }

  const existing = await AdminUser.findOne({ email: email.toLowerCase() });
  if (existing) return;

  const passwordHash = await bcrypt.hash(password, 12);
  await AdminUser.create({
    email,
    passwordHash,
    name: process.env.ADMIN_NAME || 'Store Admin'
  });
  console.log(`Seeded admin user ${email}`);
}

module.exports = { ensureAdminUser };
