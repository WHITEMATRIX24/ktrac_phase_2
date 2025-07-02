import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const LAMBDA_FILTER_URL =
  "https://d6vs3cus00.execute-api.ap-south-1.amazonaws.com/DEV/accident-report";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const accidentReferenceNumber = searchParams.get("accident_reference_number");

  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${LAMBDA_FILTER_URL}/${accidentReferenceNumber}`,
      headers: {
        "content-type": "application/json",
      },
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
