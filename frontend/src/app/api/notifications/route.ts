import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const res = await fetch("https://aag0vttrrf.execute-api.ap-south-1.amazonaws.com/DEV/notifications");

        if (!res.ok) {
            throw new Error(`API error: ${res.status}`);
        }

        const data = await res.json();
        return NextResponse.json({ data: data.response.data }); // Properly structure the response
    } catch (error) {
        console.error("Error fetching from new notification API:", error);
        return NextResponse.json(
            { error: "Failed to fetch notifications" },
            { status: 500 }
        );
    }
}