import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const LAMBDA_FILTER_URL =
  "https://fdzauph2n1.execute-api.ap-south-1.amazonaws.com/DEV";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const accidentId = searchParams.get("accident_id");

  try {
    const url = `${LAMBDA_FILTER_URL}?accident_id=${accidentId || ""}`;

    const response = await axios.get(url, {
      headers: { "content-type": "application/json" },
      timeout: 30000,
    });

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
        { status_code: "503", message: "Lambda service unavailable" },
        { status: 503 }
      );
    } else {
      return NextResponse.json(
        { status_code: "500", message: "Internal server error" },
        { status: 500 }
      );
    }
  }
}
