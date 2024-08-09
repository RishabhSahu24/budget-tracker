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
