import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    dateOfBirth: { type: String },
    securityCode: { type: Number },
    email: { type: String },
    password: { type: String },
    phone: { type: String },
    Location: { type: String },
    created_at: { type: String, default: Date },
    passwordResetCode: { type: String },
    updated_at: { type: String, default: Date },
  },
  { collection: "users" }
);

export default mongoose.model("userSchema", userSchema);
