import mongoose, { Schema } from "mongoose";
import Users from "./users";

const projectsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      validate: {
        async validator(email) {
          const user = await Users.findOne({ email });
          return !!user;
        },
        message: "User with this email does not exist",
      },
    },
    owner_name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["owner", "member"],
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

const Projects =
  mongoose.models.Projects || mongoose.model("Projects", projectsSchema);

export default Projects;
