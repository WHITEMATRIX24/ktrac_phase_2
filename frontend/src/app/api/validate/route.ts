
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const LAMBDA_URL = 'https://5xrhx7t63zdswfhc2ztypyyo440spcxl.lambda-url.ap-south-1.on.aws/';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Proxying request to Lambda:', body);
    const { bonet_no, driver_pen_no, conductor_pen_no } = body;
    if (!bonet_no || !driver_pen_no || !conductor_pen_no) {
      return NextResponse.json(
        {
          status_code: '400',
          message: 'Missing required fields: bonet_no, driver_pen_no, conductor_pen_no'
        },
        { status: 400 }
      );
    }

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: LAMBDA_URL,
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify({
        bonet_no,
        driver_pen_no,
        conductor_pen_no
      }),
      timeout: 30000
    };


    const response = await axios.request(config);

    console.log('Lambda response:', response.data);


    return NextResponse.json(response.data, {
      status: response.status
    });

  } catch (error: any) {
    console.error('Proxy error:', error);


    if (error.response) {

      return NextResponse.json(
        error.response.data,
        { status: error.response.status }
      );
    } else if (error.request) {

      return NextResponse.json(
        {
          status_code: '503',
          message: 'Lambda service unavailable'
        },
        { status: 503 }
      );
    } else {

      return NextResponse.json(
        {
          status_code: '500',
          message: 'Internal server error'
        },
        { status: 500 }
      );
    }
  }
}

