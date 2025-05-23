"use client"
import { Badge } from "@/components/ui/badge"


const upcomingServicesData = [
    {
        id: "KL-15-XX-1012",
        model: "Ashok Leyland",
        type: "Engine Check",
        date: "2025-06-02",
        technician: "Suresh",
        status: "Scheduled",
    },
    {
        id: "KL-07-YY-2234",
        model: "Tata Starbus",
        type: "Brake Inspection",
        date: "2025-06-05",
        technician: "Anees",
        status: "Pending",
    },
    {
        id: "KL-58-AB-9910",
        model: "Volvo 9600",
        type: "Oil Change",
        date: "2025-06-07",
        technician: "Mohan",
        status: "Scheduled",
    },
    {
        id: "KL-01-CB-4420",
        model: "Eicher Skyline",
        type: "Full Service",
        date: "2025-06-10",
        technician: "Nithin",
        status: "Scheduled",
    },
]

export default function UpcomingServicesTable() {
    return (

        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase border-b">
                    <tr>
                        <th className="py-2 px-3">Bus ID</th>
                        <th className="py-2 px-3">Model</th>
                        <th className="py-2 px-3">Service Type</th>
                        <th className="py-2 px-3">Date</th>
                        <th className="py-2 px-3">Status</th>

                    </tr>
                </thead>
                <tbody>
                    {upcomingServicesData.map((bus) => (
                        <tr key={bus.id} className="border-b hover:bg-muted/50">
                            <td className="py-2 px-3">{bus.id}</td>
                            <td className="py-2 px-3">{bus.model}</td>
                            <td className="py-2 px-3">{bus.type}</td>
                            <td className="py-2 px-3">{bus.date}</td>
                            <td className="py-2 px-3">
                                <Badge
                                    variant={
                                        bus.status === "Scheduled"
                                            ? "default"
                                            : bus.status === "Pending"
                                                ? "secondary"
                                                : "outline"
                                    }
                                >
                                    {bus.status}
                                </Badge>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
