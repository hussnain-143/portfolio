import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOpenSource extends Document {
  title: string;
  slug: string;
  repoName: string;
  description: string;
  githubUrl: string;
  liveUrl?: string;
  role: 'Author' | 'Maintainer' | 'Contributor';
  stars: number;
  forks: number;
  language: string;
  tags: string[];
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
  highlights?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const OpenSourceSchema = new Schema<IOpenSource>(
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
    repoName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    githubUrl: {
      type: String,
      required: true,
      trim: true,
    },
    liveUrl: {
      type: String,
      default: '',
      trim: true,
    },
    role: {
      type: String,
      enum: ['Author', 'Maintainer', 'Contributor'],
      default: 'Author',
    },
    stars: {
      type: Number,
      default: 0,
    },
    forks: {
      type: Number,
      default: 0,
    },
    language: {
      type: String,
      default: 'TypeScript',
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    isFeatured: {
      type: Boolean,
      default: true,
      index: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
      index: true,
    },
    highlights: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const OpenSource: Model<IOpenSource> =
  mongoose.models.OpenSource || mongoose.model<IOpenSource>('OpenSource', OpenSourceSchema);

export default OpenSource;
