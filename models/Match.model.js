const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    userOne: {
      type: mongoose.SchemaTypes.ObjectId, //bob  // añice
      ref: "User",
      required: true,
    },

    userOneProperty: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Property",
    },

    userTwo: {
      type: mongoose.SchemaTypes.ObjectId, //alice  //bob
      ref: "User",
      required: true,
    },

    userTwoProperty: {
      type: mongoose.SchemaTypes.ObjectId, //playa  //montaña
      ref: "Property",
      required: true,
    },

    match: {
      type: Boolean,
      default: false,
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