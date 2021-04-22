const mongoose = require("mongoose");

const rejectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    property: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Property",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Reject = mongoose.model("Reject", rejectSchema);

module.exports = Reject;

