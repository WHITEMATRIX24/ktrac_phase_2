// app/api/getBusDetail/route.ts
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const API_URL =
    "https://mqd8wss5p5.execute-api.ap-south-1.amazonaws.com/DEV/bus_info";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`API error! status: ${response.status}`);
    }

    const busData = await response.json();
    return NextResponse.json(busData);
  } catch (error) {
    console.error("Error fetching bus data:", error);
    return NextResponse.json(
      { error: "Failed to fetch bus data" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const API_URL =
    "https://mqd8wss5p5.execute-api.ap-south-1.amazonaws.com/DEV/bus_info";

  try {
    const data = await request.json();

    const config = {
      method: "post",
      url: API_URL,
      headers: {
        "content-type": "application/json",
      },
      data,
      timeout: 30000,
      maxBodyLength: Infinity,
    };

    const response = await axios.request(config);

    console.log("Lambda response:", response.data);

    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        { error: error.response.data || "Error from Lambda" },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
