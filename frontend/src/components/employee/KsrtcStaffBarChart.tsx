// components/employee/KsrtcStaffBarChart.tsx
"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function KsrtcStaffBarChart() {
    const labels = ["South Zone", "Central Zone", "North Zone"];

    const data = {
        labels,
        datasets: [
            {
                label: "Top-Level Staff",
                data: [100, 125, 130], // GM, DGM, Managers, etc.
                backgroundColor: "#b9b7a7",
            },
            {
                label: "Mid-Level Staff",
                data: [150, 150, 120], // AEs, Depot Engineers, etc.
                backgroundColor: "#4e5166",
            },
            {
                label: "Field Staff",
                data: [180, 200, 250], // Drivers, Conductors, Mechanics, etc.
                backgroundColor: "#235789",
            },
        ],
    };

    const options = {
        responsive: true,
        layout: {
            padding: {
                top: 20,      // Space between legend and chart area
            },
        },
        plugins: {
            legend: {
                position: "top" as const,
                labels: {
                    boxWidth: 20,
                    padding: 20, // Space between heading and legend
                }
            },
            title: {
                display: true,
                text: "KSRTC Staff Distribution by Department and Level",
                padding: {
                    top: 0,
                    bottom: 0, // Space between title and legend
                },
            },
        },

    };

    return (

        <Card>
            <CardHeader>
                <CardTitle>Staff Distribution Summary</CardTitle>
                <CardDescription>Zone Level Staff Distribution </CardDescription>
            </CardHeader>
            <div className="min-h-[350px]">
                <Bar className="mt-5" options={options} data={data} />
            </div>
        </Card>
    );
}
