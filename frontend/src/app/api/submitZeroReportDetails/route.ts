import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const LAMBDA_URL = 'https://lh2tiovrbr2yfyqy42yiqx42pm0rniwi.lambda-url.ap-south-1.on.aws/';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        if (!data.vehicle_info || !data.vehicle_info[0]?.bonet_no) {
            return NextResponse.json(
                { error: 'Vehicle information is required' },
                { status: 400 }
            );
        }

        const config = {
            method: 'post',
            url: LAMBDA_URL,
            headers: {
                'content-type': 'application/json',
            },
            data,
            timeout: 30000,
            maxBodyLength: Infinity,
        };

        const response = await axios.request(config);

        console.log('Lambda response:', response.data);

        return NextResponse.json(response.data, {
            status: response.status,
        });
    } catch (error: any) {
        console.error('Error processing zeroth report:', error);

        if (axios.isAxiosError(error) && error.response) {
            return NextResponse.json(
                { error: error.response.data || 'Error from Lambda' },
                { status: error.response.status }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
