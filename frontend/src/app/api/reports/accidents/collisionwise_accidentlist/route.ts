import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const LAMBDA_URL =
  "https://42evgsmvw5.execute-api.ap-south-1.amazonaws.com/DEV/CollisionType";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("start_date");
    const endDate = searchParams.get("end_date");
    const collision_type = searchParams.get("collision_type");


    if (!startDate || !endDate || !collision_type) {
      return NextResponse.json(
        { error: "start date and end date  and collision type is required" },
        { status: 400 }
      );
    }

    const config = {
      method: "get",
      url: `${LAMBDA_URL}?start_date=${startDate}&end_date=${endDate}&collision_type=${collision_type}`,
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
