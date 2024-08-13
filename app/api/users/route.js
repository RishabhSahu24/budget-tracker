import { NextResponse } from "next/server";
import connectMongoDB from "../../../lib/mongodb";
import Users from "../../../models/users";

export async function GET(request) {
  await connectMongoDB();

  // Get query parameters from the request URL
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const name = searchParams.get("name");
  const full_name = searchParams.get("full_name");

  if (!email || !name || !full_name) {
    return NextResponse.json(
      { error: "Email, name, and full_name query parameters are required." },
      { status: 400 }
    );
  }

  // Check if a user with the provided email exists
  const existingUser = await Users.findOne({ email });

  if (existingUser) {
    return NextResponse.json({ newUser: false, user: existingUser });
  }

  // Create a new user if it doesn't exist
  const newUser = new Users({
    name,
    email,
    full_name,
    current_project: null, // Set default for current_project
  });

  await newUser.save();

  return NextResponse.json({ newUser: true, user: newUser });
}

export async function POST(request) {
  await connectMongoDB();

  // Parse the request body to get email and projectId
  const { email, projectId } = await request.json();

  if (!email || !projectId) {
    return NextResponse.json(
      { error: "Email and projectId are required." },
      { status: 400 }
    );
  }

  try {
    // Find the user by email and update the current_project field
    const updatedUser = await Users.findOneAndUpdate(
      { email },
      { current_project: projectId },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while updating the user." },
      { status: 500 }
    );
  }
}
