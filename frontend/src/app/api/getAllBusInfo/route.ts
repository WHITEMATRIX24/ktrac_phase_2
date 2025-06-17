// app/api/getBusDetail/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
    const API_URL = 'https://mqd8wss5p5.execute-api.ap-south-1.amazonaws.com/DEV/bus_info';

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`API error! status: ${response.status}`);
        }

        const busData = await response.json();
        return NextResponse.json(busData);
    } catch (error) {
        console.error('Error fetching bus data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch bus data' },
            { status: 500 }
        );
    }
}