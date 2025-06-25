import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const LAMBDA_URL = 'https://1gvpkja936.execute-api.ap-south-1.amazonaws.com/DEV/photos';
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData(); // ✅ parse multipart/form-data

        const uuid = formData.get("uuid")?.toString();
        if (!uuid) {
            return NextResponse.json(
                { error: 'Accident ID (uuid) is required' },
                { status: 400 }
            );
        }

        const files = formData.getAll("photos") as File[];
        const descriptions = formData.getAll("description");
        const timestamps = formData.getAll("timestamp");
        const categories = formData.getAll("category");

        const photos = await Promise.all(
            files.map(async (file, index) => {
                const arrayBuffer = await file.arrayBuffer();
                const base64 = Buffer.from(arrayBuffer).toString("base64");

                return {
                    filename: file.name,
                    data: base64,
                    description: descriptions[index]?.toString() || "",
                    timestamp: timestamps[index]?.toString() || new Date().toISOString(),
                    category: categories[index]?.toString() || "damage"
                };
            })
        );

        const lambdaPayload = {
            uuid,
            photos,
        };

        const config = {
            method: 'post',
            url: LAMBDA_URL,
            headers: {
                'content-type': 'application/json',
            },
            data: lambdaPayload,
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
