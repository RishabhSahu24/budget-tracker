import { NextResponse } from "next/server";
import connectMongoDB from "../../../lib/mongodb";
import Projects from "../../../models/projects";
import { ObjectId } from "mongodb";

export async function GET(request) {
  await connectMongoDB();

  // Extract project ID from the request URL
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("id");

  if (!projectId) {
    return NextResponse.json(
      { error: "Project ID query parameter is required." },
      { status: 400 }
    );
  }

  // Validate the project ID
  if (!ObjectId.isValid(projectId)) {
    return NextResponse.json(
      { error: "Invalid project ID format." },
      { status: 400 }
    );
  }

  // Find the project by ID
  try {
    const project = await Projects.findById(projectId);

    if (!project) {
      return NextResponse.json(
        { message: "Project not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Project found.",
      data: project,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while retrieving the project." },
      { status: 500 }
    );
  }
}
