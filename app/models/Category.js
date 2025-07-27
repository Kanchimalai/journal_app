import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

CategorySchema.index({ name: 1, user: 1 }, { unique: true });

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);