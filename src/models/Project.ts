import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  detailedDescription: string;
  coverImage: string;
  galleryImages: string[];
  tags: string[];
  category: string;
  projectStatus: 'completed' | 'in-progress' | 'archived';
  isFeatured: boolean;
  displayOrder: number;
  githubUrl: string;
  liveUrl: string;
  caseStudyContent?: {
    overview?: string;
    challenges?: string;
    solutions?: string;
    keyFeatures?: string[];
    architecture?: string;
  };
  seoTitle?: string;
  seoDescription?: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    detailedDescription: {
      type: String,
      default: '',
    },
    coverImage: {
      type: String,
      required: true,
      default: '/project/rosy-garden.png',
    },
    galleryImages: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    category: {
      type: String,
      default: 'Full-Stack',
      index: true,
    },
    projectStatus: {
      type: String,
      enum: ['completed', 'in-progress', 'archived'],
      default: 'completed',
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
      index: true,
    },
    githubUrl: {
      type: String,
      default: '',
      trim: true,
    },
    liveUrl: {
      type: String,
      default: '',
      trim: true,
    },
    caseStudyContent: {
      overview: { type: String, default: '' },
      challenges: { type: String, default: '' },
      solutions: { type: String, default: '' },
      keyFeatures: { type: [String], default: [] },
      architecture: { type: String, default: '' },
    },
    seoTitle: {
      type: String,
      trim: true,
    },
    seoDescription: {
      type: String,
      trim: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
