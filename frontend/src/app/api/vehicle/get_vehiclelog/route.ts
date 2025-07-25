import { NextResponse } from "next/server";

export async function GET() {
  const API_URL =
    "https://oyz7r1xfrf.execute-api.ap-south-1.amazonaws.com/DEV/vehicles";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`API error! status: ${response.status}`);
    }

    const busData = await response.json();
    return NextResponse.json(busData);
  } catch (error) {
    console.error("Error fetching bus log data:", error);
    return NextResponse.json(
      { error: "Failed to fetch bus log data" },
      { status: 500 }
    );
  }
}
