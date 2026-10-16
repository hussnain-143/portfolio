import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISiteSettings extends Document {
  siteName: string;
  siteUrl: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  ogImageUrl: string;
  footerText: string;
  showClock: boolean;
  showAvailabilityBadge: boolean;
  emailNotificationsEnabled: boolean;
  notificationEmail?: string;
  navLinks: Array<{
    label: string;
    path: string;
    icon: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    siteName: {
      type: String,
      default: 'Hussnain Ahmed — Full-Stack Developer',
    },
    siteUrl: {
      type: String,
      default: 'https://h-a-portfolio.netlify.app',
    },
    defaultSeoTitle: {
      type: String,
      default: 'Hussnain Ahmed - Full Stack Developer | Next.js & React Specialist',
    },
    defaultSeoDescription: {
      type: String,
      default:
        'Portfolio of Hussnain Ahmed: Full-Stack Developer specializing in React, Next.js, Node.js, and WordPress. Explore projects, technical skills, and case studies.',
    },
    ogImageUrl: {
      type: String,
      default: '/profile/image.jpg',
    },
    footerText: {
      type: String,
      default: 'Built with Next.js, Tailwind CSS, and MongoDB Atlas.',
    },
    showClock: {
      type: Boolean,
      default: true,
    },
    showAvailabilityBadge: {
      type: Boolean,
      default: true,
    },
    emailNotificationsEnabled: {
      type: Boolean,
      default: false,
    },
    notificationEmail: {
      type: String,
      default: 'hussnain.ahmed.dev@gmail.com',
    },
    navLinks: [
      {
        label: { type: String, required: true },
        path: { type: String, required: true },
        icon: { type: String, default: 'home' },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings || mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);

export default SiteSettings;
