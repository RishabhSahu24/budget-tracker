import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    full_name: {
      type: String,
      required: false,
    },
    current_project: {
      type: Schema.Types.ObjectId,
      ref: "Projects", // Reference to the Projects model
      default: null,
    },
  },
  { timestamps: true }
);

const Users = mongoose.models.Users || mongoose.model("Users", usersSchema);

export default Users;
