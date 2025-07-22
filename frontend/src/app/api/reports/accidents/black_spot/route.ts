import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const LAMBDA_URL =
  "https://cud4qdwv8i.execute-api.ap-south-1.amazonaws.com/DEV/BlackSpot";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("start_date");
    const endDate = searchParams.get("end_date");

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: "start date and end date is required" },
        { status: 400 }
      );
    }

    const config = {
      method: "get",
      url: `${LAMBDA_URL}?start_date=${startDate}&end_date=${endDate}`,
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
