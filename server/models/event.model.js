const mongoose = require('mongoose');


const ticketTierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true // e.g. "Platinum", "Gold", "Silver", "Copper"
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: "INR"
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  sold: {
    type: Number,
    default: 0
  },
  perks: {
    type: [String], // e.g. ["Free drinks", "Front row seating"]
    default: []
  }
}, { _id: false });

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ["Music", "Sports", "Conference", "Theatre", "Festival", "Workshop", "Other"],
    default: "Other"
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to organizer account
    required: true
  },
  venue: {
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    country: { type: String, default: "India" },
    postalCode: { type: String },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number }
    }
  },
  eventDate: {
    start: { type: Date, required: true },
    end: { type: Date }
  },
  time: {
    start: { type: String }, // e.g. "18:00"
    end: { type: String }
  },
  tickets: {
    tiers: {
      type: [ticketTierSchema],
      validate: {
        validator: function (value) {
          return value.length > 0; // Must have at least one tier
        },
        message: "At least one ticket tier is required."
      }
    },
    totalCapacity: { type: Number, required: true },
    totalSold: { type: Number, default: 0 }
  },
  images: {
    banner: { type: String }, // URL to banner image
    gallery: { type: [String], default: [] }
  },
  status: {
    type: String,
    enum: ["Draft", "Published", "Cancelled", "Completed"],
    default: "Draft"
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  tags: {
    type: [String],
    default: []
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

// Indexing for faster search
eventSchema.index({ title: "text", description: "text", tags: 1, category: 1 });
eventSchema.index({ "venue.city": 1, "venue.state": 1 });

const Event = mongoose.model("Event", eventSchema);
module.exports = Event
