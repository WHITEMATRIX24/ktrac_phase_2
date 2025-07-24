import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const LAMBDA_URL = "schedule_url";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const config = {
      method: "post",
      url: `${LAMBDA_URL}`,
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
    console.error("Error in creating schedule", error);

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
