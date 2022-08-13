//* IMPORTS
const mongoose = require("mongoose");

//* VARIABLES
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    city: { type: String, required: true },
    imgPath: { type: String, required: false },
    isCleaner: { type: Boolean, default: false },
    fee: { type: Number, default: null },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
