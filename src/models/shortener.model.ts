import mongoose from "mongoose";

const ShortenerScheme = new mongoose.Schema({
  short: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },

  url: {
    type: String,
    required: true,
  },

  ip: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Shortener = mongoose.models.Shortener || mongoose.model("Shortener", ShortenerScheme);

export default Shortener;
