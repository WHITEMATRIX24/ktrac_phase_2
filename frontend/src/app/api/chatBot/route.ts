import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const LAMBDA_URL = "http://15.207.68.224:8000/chat";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data) {
      return NextResponse.json({ error: "query required" }, { status: 400 });
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
