import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const LAMBDA_FILTER_URL =
  "https://py8t6eino8.execute-api.ap-south-1.amazonaws.com/DEV/filter?";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const date = searchParams.get("date");
  const district = searchParams.get("district");
  const depo = searchParams.get("depo");
  const bonnetNo = searchParams.get("bonnet_no");

  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${LAMBDA_FILTER_URL}date=${date}&district=${district}&bonet_no=${bonnetNo}&depot=${depo}`,
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
