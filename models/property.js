const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  type: String,
  price: Number,
  state: String,
  city: String,
  areaSqFt: Number,
  bedrooms: Number,
  bathrooms: Number,
  amenities: [String], // Stored as pipe-separated values, we can split this later
  furnished: {
    type: String,
    enum: ['Furnished', 'Unfurnished', 'Semi']
  },
  availableFrom: Date,
  listedBy: {
    type: String,
    enum: ['Builder', 'Owner', 'Agent']
  },
  tags: [String], // Also stored as pipe-separated, split during import
  colorTheme: String,
  rating: Number,
  isVerified: Boolean,
  listingType: {
    type: String,
    enum: ['sale', 'rent']
  }
});

module.exports = mongoose.model('Property', propertySchema);
