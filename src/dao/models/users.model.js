import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      min: 0,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 16,
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Carts",
      required: true,
      default: null
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
    }
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model("Users", userSchema);

export default UserModel;