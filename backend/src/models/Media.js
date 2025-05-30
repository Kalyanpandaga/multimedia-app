const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    originalFileName: {
      type: String,
      required: true,
    },
    secureUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    resourceType: {
      type: String,
      enum: ["image", "video", "raw", "audio"],
      required: true,
    },
    format: {
      type: String,
    },
    bytes: {
      type: Number,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    tags: {
      type: [String],
      default: [],
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Media = mongoose.model("Media", mediaSchema);
module.exports = Media;
