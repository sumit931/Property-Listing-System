const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  type: String,
  typeId: { type: mongoose.Schema.Types.ObjectId },
  price: Number,
  state: String,
  city: String,
  stateId: { type: mongoose.Schema.Types.ObjectId },
  cityId: { type: mongoose.Schema.Types.ObjectId },
  areaSqFt: Number,
  bedrooms: Number,
  bathrooms: Number,
  amenities: [String], // Stored as pipe-separated values, we can split this later
  amenityIds: [{ type: mongoose.Schema.Types.ObjectId }],
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
  tagIds: [{ type: mongoose.Schema.Types.ObjectId }],
  colorTheme: String,
  rating: Number,
  isVerified: Boolean,
  listingType: {
    type: String,
    enum: ['sale', 'rent']
  },
  listerId : {type : mongoose.Schema.Types.ObjectId}
});

module.exports = mongoose.model('Property', propertySchema);
