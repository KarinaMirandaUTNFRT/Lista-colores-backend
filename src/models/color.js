import mongoose from 'mongoose';

const colorSchema = new mongoose.Schema({
  nombreColor: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 30
  }
}, {
  timestamps: true 
});

const Color = mongoose.model('color', colorSchema);

export default Color;