import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProfile extends Document {
  name: string;
  headline: string;
  title: string;
  shortBio: string;
  fullBio: string[];
  email: string;
  phone: string;
  location: string;
  avatarUrl: string;
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl?: string;
  availabilityStatus: 'available' | 'busy' | 'selective';
  availabilityNote?: string;
  yearsOfExperience: number;
  completedProjectsCount: number;
  rotatingPhrases: string[];
  highlights: Array<{
    title: string;
    desc: string;
    icon: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema = new Schema<IProfile>(
  {
    name: {
      type: String,
      required: true,
      default: 'Hussnain Ahmed',
    },
    headline: {
      type: String,
      required: true,
      default: 'Full-Stack Developer & WordPress Specialist',
    },
    title: {
      type: String,
      required: true,
      default: 'Full-Stack Web Developer',
    },
    shortBio: {
      type: String,
      required: true,
      default:
        'Passionate MERN and Full-Stack developer crafting beautiful, scalable web experiences with modern technologies.',
    },
    fullBio: {
      type: [String],
      default: [
        "Hello! I'm Hussnain Ahmed, a dedicated MERN & Full-Stack Developer with expertise in building fast, scalable, and user-centric web applications. I specialize in modern technologies like React, Next.js, Node.js, and WordPress.",
        'With a comprehensive background in frontend and backend development, I focus on writing high-quality, maintainable code and designing seamless user interfaces. My experience spans from custom e-commerce platforms to sophisticated admin dashboards.',
        'I am a continuous learner, constantly exploring new industry standards to deliver cutting-edge solutions. Whether working independently or as part of a team, I bring a proactive approach and a strong commitment to excellence.',
        'Outside of work, I enjoy tech meetups, mentoring juniors, and contributing to open source or personal projects.',
      ],
    },
    email: {
      type: String,
      required: true,
      default: 'hussnain.ahmed.dev@gmail.com',
    },
    phone: {
      type: String,
      required: true,
      default: '+92 340 6999701',
    },
    location: {
      type: String,
      required: true,
      default: 'Islamabad, Pakistan',
    },
    avatarUrl: {
      type: String,
      default: '/profile/image.jpg',
    },
    resumeUrl: {
      type: String,
      default: '/cv/HUSSNAIN-AHMED-CV.pdf',
    },
    githubUrl: {
      type: String,
      default: 'https://github.com/hussnain-143',
    },
    linkedinUrl: {
      type: String,
      default: 'https://www.linkedin.com/in/hussnain-ahmed143/',
    },
    twitterUrl: {
      type: String,
      default: '',
    },
    availabilityStatus: {
      type: String,
      enum: ['available', 'busy', 'selective'],
      default: 'available',
    },
    availabilityNote: {
      type: String,
      default: 'Available for freelance, remote, and full-time opportunities',
    },
    yearsOfExperience: {
      type: Number,
      default: 2,
    },
    completedProjectsCount: {
      type: Number,
      default: 6,
    },
    rotatingPhrases: {
      type: [String],
      default: [
        'Full-Stack Web Developer',
        'Next.js & React Specialist',
        'Scalable Node.js Backends',
        'Custom WordPress Engineer',
      ],
    },
    highlights: [
      {
        title: { type: String, required: true },
        desc: { type: String, required: true },
        icon: { type: String, default: 'code' },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Profile: Model<IProfile> =
  mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);

export default Profile;
