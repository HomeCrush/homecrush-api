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
        type: String,
        enum: ["accepted", "rejected", "pending"],
        default: "pending",
      },

      userTwo: {
        type: String,
        enum: ["accepted", "rejected", "pending"],
        default: "pending",
      },
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

