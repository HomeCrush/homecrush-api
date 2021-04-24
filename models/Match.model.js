const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    userOne: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },

    userOneProperty: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Property",
    },

    userTwo: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },

    userTwoProperty: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Property",
      required: true,
    },

    match: {
      type: Boolean,
      default: false,
    },

    accepted: {
      userOne: {
        enum: ["accepted", "rejected"],
      },
      
      userTwo: {
        enum: ["accepted", "rejected"],
      },
    }

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