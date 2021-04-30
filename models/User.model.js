const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {
  v4: uuidv4
} = require("uuid");

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
const SALT_ROUNDS = 10;


const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: "The email field is required",
    unique: true,
    lowercase: true,
    match: [EMAIL_PATTERN, "The email is not valid"],
    trim: true,
  },

  password: {
    type: String,
    required: "Password is required",
    match: [
      PASSWORD_PATTERN,
      "Your password must contain at least 1 number, 1 uppercase, 1 lowercase and 8 characters.",
    ],
  },

  name: {
    type: String,
  },

  image: {
    type: String,
    validate: {
      validator: (value) => {
        try {
          const url = new URL(value);

          return url.protocol === "http:" || url.protocol === "https:";
        } catch (err) {
          return false;
        }
      },
      message: () => "Invalid image URL",
    },
  },

  activationToken: {
    type: String,
    default: () => {
      return uuidv4();
    },
  },

  active: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (document, returnValue) => {
      returnValue.id = document._id;
      delete returnValue._id;
      delete returnValue.__v;
      delete returnValue.password;
      return returnValue;
    },
  },
});


userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, SALT_ROUNDS).then((hash) => {
      this.password = hash;
      next();
    });
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function (passwordToCheck) {
  console.log(passwordToCheck)
  return bcrypt.compare(passwordToCheck, this.password);
};

userSchema.virtual("properties", {
  ref: "Property",
  localField: "_id",
  foreignField: "owner",
});

userSchema.virtual("likes", {
  ref: "Like",
  localField: "_id",
  foreignField: "user",
});

const User = mongoose.model("User", userSchema);
module.exports = User;