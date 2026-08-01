import mongoose from 'mongoose';

const colorSchema = new mongoose.Schema(
  {
    nombreColor: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Color', colorSchema);