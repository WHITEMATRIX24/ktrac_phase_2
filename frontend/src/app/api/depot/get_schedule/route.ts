import { NextResponse } from "next/server";

export async function GET() {
  const API_URL =
    "https://k7bvw6t3fe.execute-api.ap-south-1.amazonaws.com/DEV/schedules";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`API error! status: ${response.status}`);
    }

    const userData = await response.json();
    return NextResponse.json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}
