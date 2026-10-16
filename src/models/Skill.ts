import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISkill extends Document {
  category: string;
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner';
  icon?: string;
  displayOrder: number;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>(
  {
    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: String,
      enum: ['Expert', 'Advanced', 'Intermediate', 'Beginner'],
      default: 'Advanced',
    },
    icon: {
      type: String,
      default: '',
    },
    displayOrder: {
      type: Number,
      default: 0,
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Skill: Model<ISkill> =
  mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);

export default Skill;
