import mongoose from 'mongoose';

const EntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title.'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Please provide content.'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  }],
}, {
  timestamps: true
});

export default mongoose.models.Entry || mongoose.model('Entry', EntrySchema);