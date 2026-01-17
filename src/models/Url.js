const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
    },
    accessCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

UrlSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

module.exports = mongoose.model("Url", UrlSchema);
