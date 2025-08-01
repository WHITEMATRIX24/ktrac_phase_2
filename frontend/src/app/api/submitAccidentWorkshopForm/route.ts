import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const LAMBDA_URL =
  "https://fdzauph2n1.execute-api.ap-south-1.amazonaws.com/DEV";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.accident_id) {
      return NextResponse.json(
        { error: "accident  information is required" },
        { status: 400 }
      );
    }

    const config = {
      method: "post",
      url: LAMBDA_URL,
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
