import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    created_at: { type: String, default: Date },
  },
  { collection: "admin" }
);

export default mongoose.model("admin", adminSchema);
