const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
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

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;

//id *
//property i like *
//id property owner *
//id my own property  fill whe other likes me