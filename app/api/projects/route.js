import { NextResponse } from "next/server";
import connectMongoDB from "../../../lib/mongodb";
import Projects from "../../../models/projects";

export async function GET(request) {
  await connectMongoDB();

  // Extract email query parameter from the request URL
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "Email query parameter is required." },
      { status: 400 }
    );
  }

  // Find all projects by email
  try {
    const projects = await Projects.find({ email });
    const count = projects.length;

    if (count === 0) {
      return NextResponse.json(
        { message: "No projects found for the provided email.", count },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Projects found.",
      count,
      data: projects,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while retrieving the projects." },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  await connectMongoDB();

  // Parse request body
  const { name, description, email, owner_name, role } = await request.json();

  // Validate required fields
  if (!name || !email || !owner_name || !role) {
    return NextResponse.json(
      { error: "Name, email, owner_name, and role are required." },
      { status: 400 }
    );
  }

  // Check if a project with the same name already exists for the given email
  try {
    const existingProject = await Projects.findOne({ email, name });

    // If a project with the same name exists for the given email, return an error
    if (existingProject) {
      return NextResponse.json(
        {
          error: "A project with this name already exists for the given email.",
        },
        { status: 400 }
      );
    }

    // Create a new project
    const newProject = new Projects({
      name,
      description,
      email,
      owner_name,
      role,
    });

    await newProject.save();

    return NextResponse.json({ newProject: true, project: newProject });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while creating the project." },
      { status: 500 }
    );
  }
}
