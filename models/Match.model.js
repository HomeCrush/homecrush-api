const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
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

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;

//id *
//property i like *
//id property owner *
//id my own property  fill when other likes me