import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEducation extends Document {
  degree: string;
  school: string;
  period: string;
  description: string;
  isCertificate: boolean;
  certificateImage?: string;
  issuer?: string;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const EducationSchema = new Schema<IEducation>(
  {
    degree: {
      type: String,
      required: true,
      trim: true,
    },
    school: {
      type: String,
      required: true,
      trim: true,
    },
    period: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    isCertificate: {
      type: Boolean,
      default: false,
      index: true,
    },
    certificateImage: {
      type: String,
      default: '',
    },
    issuer: {
      type: String,
      default: '',
      trim: true,
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

export const Education: Model<IEducation> =
  mongoose.models.Education || mongoose.model<IEducation>('Education', EducationSchema);

export default Education;
