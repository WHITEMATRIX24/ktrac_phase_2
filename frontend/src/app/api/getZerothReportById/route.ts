
import { NextResponse } from 'next/server';

export async function GET() {
    const API_URL = 'https://px02q616lk.execute-api.ap-south-1.amazonaws.com/DEV/get_by_accident_id?accident_id=KKD/06/25/0001';

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`API error! status: ${response.status}`);
        }

        const userData = await response.json();
        return NextResponse.json(userData);
    } catch (error) {
        console.error('Error fetching user data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch user data' },
            { status: 500 }
        );
    }
};
