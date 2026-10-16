import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IExperience extends Document {
  role: string;
  company: string;
  location?: string;
  period: string;
  isCurrent: boolean;
  description: string;
  achievements: string[];
  skills: string[];
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    role: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      default: '',
      trim: true,
    },
    period: {
      type: String,
      required: true,
      trim: true,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    achievements: {
      type: [String],
      default: [],
    },
    skills: {
      type: [String],
      default: [],
    },
    displayOrder: {
      type: Number,
      default: 0,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Experience: Model<IExperience> =
  mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema);

export default Experience;
