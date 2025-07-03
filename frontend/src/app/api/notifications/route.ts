// app/api/notifications/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const res = await fetch("https://aag0vttrrf.execute-api.ap-south-1.amazonaws.com/prod/notifications");

        if (!res.ok) {
            throw new Error(`API error: ${res.status}`);
        }

        const { notifications } = await res.json();
        return NextResponse.json({ notifications });
    } catch (error) {
        console.error("Error fetching from new notification API:", error);
        return NextResponse.json(
            { error: "Failed to fetch notifications" },
            { status: 500 }
        );
    }
}
