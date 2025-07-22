import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const LAMBDA_URL =
  "https://9uicld54la.execute-api.ap-south-1.amazonaws.com/DEV/accident-comparison";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month");
    const year = searchParams.get("year");

    if (!month || !year) {
      return NextResponse.json(
        { error: "Month and Year is required" },
        { status: 400 }
      );
    }

    const config = {
      method: "get",
      url: `${LAMBDA_URL}?month=${month}&year=${year}`,
      timeout: 30000,
      maxBodyLength: Infinity,
    };

    const response = await axios.request(config);

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
