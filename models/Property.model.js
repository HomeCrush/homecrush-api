const mongoose = require("mongoose");


const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: "Title field is required",
    },

    description: {
      type: String,
      required: "Description field is required",
    },

    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },

    images: {
      type: [String],
      required: "Images are required at least one",
    },

    available: {
      type: Boolean,
      required: "Available field is required",
      default: true
    },

    availableDates: {
      from: {
        type: Date,
      },
      to: {
        type: Date,
      },
    },

    location: {
      type: String,
      required: "Location field is required",
    },

    homeType: {
      type: String,
      enum: {
        values: ["house", "apartment"],
        message:
          "It is necessary to choose a type of property house or apartment",
      },
    },

    beds: {
      singleBeds: {
        type: Number,
        min: [0, "Must be greater than or equal to zero"],
        default: 0,
      },

      doubleBeds: {
        type: Number,
        min: [0, "Must be greater than or equal to zero"],
        default: 0,
      },
    },

    bedRooms: {
      type: Number,
      min: [0, "Must be greater than or equal to zero"],
      default: 0,
    },

    bathRooms: {
      type: Number,
      min: [0, "Must be greater than or equal to zero"],
      default: 0,
    },

    surfaceArea: {
      type: Number,
      min: [0, "Must be greater than or equal to zero"],
      default: 0,
    },

    amenities: {
      tv: {
        type: Boolean,
        default: false,
      },

      wifi: {
        type: Boolean,
        default: false,
      },

      equippedKitchen: {
        type: Boolean,
        default: false,
      },

      livingRoom: {
        type: Boolean,
        default: false,
      },

      dinningRoom: {
        type: Boolean,
        default: false,
      },

      workArea: {
        type: Boolean,
        default: false,
      },

      courtyard: {
        type: Boolean,
        default: false,
      },

      jacuzzi: {
        type: Boolean,
        default: false,
      },

      pool: {
        type: Boolean,
        default: false,
      },

      washingMachine: {
        type: Boolean,
        default: false,
      },

      parking: {
        type: Boolean,
        default: false,
      },

      gym: {
        type: Boolean,
        default: false,
      },
    },

    rules: {
      smokersWelcome: {
        type: Boolean,
        default: false,
      },

      petsWelcome: {
        type: Boolean,
        default: false,
      },

      childrenWelcome: {
        type: Boolean,
        default: false,
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

propertySchema.virtual("likes", {
    ref: "Like",
    localField: "_id",
    foreignField: "property",
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;