// app/api/getAllDepot/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
    const API_URL = 'https://nj2w71zd9k.execute-api.ap-south-1.amazonaws.com/DEV/depots';

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`API error! status: ${response.status}`);
        }

        const userData = await response.json();
        return NextResponse.json(userData);
    } catch (error) {
        console.error('Error fetching depot data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch depot data' },
            { status: 500 }
        );
    }
}
