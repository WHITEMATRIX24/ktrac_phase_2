import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const LAMBDA_DATE_URL =
  "https://py8t6eino8.execute-api.ap-south-1.amazonaws.com/DEV/filter-by-date";
const LAMBDA_DISTRICT_URL =
  "https://py8t6eino8.execute-api.ap-south-1.amazonaws.com/DEV/filter-by-district";
const LAMBDA_DEPO_URL =
  "https://py8t6eino8.execute-api.ap-south-1.amazonaws.com/DEV/filter-by-depot";
const LAMBDA_BONNETNO_URL =
  "https://py8t6eino8.execute-api.ap-south-1.amazonaws.com/DEV/filter-by-bonet";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const date = searchParams.get("date");
  const district = searchParams.get("district");
  const depo = searchParams.get("depo");
  const bonnetNo = searchParams.get("bonnet_no");

  try {
    const dateRequest = axios.get(`${LAMBDA_DATE_URL}?date=${date}`);
    const districtRequest = axios.get(
      `${LAMBDA_DISTRICT_URL}?district=${district}`
    );
    const depoRequest = axios.get(`${LAMBDA_DEPO_URL}?operated_depot=${depo}`);
    const bonnetNoRequest = axios.get(
      `${LAMBDA_BONNETNO_URL}?bonet_no=${bonnetNo}`
    );
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
