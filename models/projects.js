import mongoose, { Schema } from "mongoose";

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
