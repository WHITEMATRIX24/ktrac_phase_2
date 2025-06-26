import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const LAMBDA_URL =
  "https://nj2w71zd9k.execute-api.ap-south-1.amazonaws.com/DEV/depots";
export async function GET(request: NextRequest) {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: LAMBDA_URL,
      timeout: 30000,
    };

    const response = await axios(config);

    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error: any) {
    console.error("Proxy error:", error);

    if (error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    } else if (error.request) {
      return NextResponse.json(
        {
          status_code: "503",
          message: "Lambda service unavailable",
        },
        { status: 503 }
      );
    } else {
      return NextResponse.json(
        {
          status_code: "500",
          message: "Internal server error",
        },
        { status: 500 }
      );
    }
  }
}
