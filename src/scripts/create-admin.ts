import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { AdminUser } from '../models/AdminUser';

dotenv.config({ path: '.env.local' });
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

export async function createAdmin(email: string, password: string, name = 'Hussnain Ahmed') {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is required to provision admin.');
  }

  if (!email || !password) {
    throw new Error('Email and password are required. Usage: npx ts-node src/scripts/create-admin.ts <email> <password>');
  }

  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters.');
  }

  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB.');

  const passwordHash = await bcrypt.hash(password, 12);
  const normalizedEmail = email.toLowerCase().trim();

  const user = await AdminUser.findOneAndUpdate(
    { email: normalizedEmail },
    {
      email: normalizedEmail,
      passwordHash,
      name,
      role: 'superadmin',
    },
    { upsert: true, new: true }
  );

  console.log(`✓ Admin user successfully provisioned: ${user.email} (${user.role})`);
  await mongoose.disconnect();
}

const args = process.argv.slice(2);
if (args.length >= 2) {
  createAdmin(args[0], args[1], args[2] || 'Hussnain Ahmed')
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Error provisioning admin:', err.message);
      process.exit(1);
    });
}
