
import { DotLineChart } from "@/components/dot_line_chart";
import { ReportDataTable } from "@/components/report_datatable";
import { SectionCards } from "@/components/section-cards";
import { Card } from "@/components/ui/card";
import { BusFront, CalendarClock, TriangleAlert, Wrench } from "lucide-react";

export default function Page() {
    const dummyData = [
        {
            title: "Total No. of Buses",
            value: 5450,
            icon: <BusFront className="w-15 h-15 text-white opacity-70" />,
        },
        {
            title: "Buses Under Maintenance",
            value: 383,
            icon: <Wrench className="w-15 h-15 text-white opacity-70" />,
        },
        {
            title: "High Risk Alerts",
            value: 124,
            icon: <TriangleAlert className="w-15 h-15 text-white opacity-70" />,
        },
        {
            title: "Upcoming Services",
            value: 340,
            icon: <CalendarClock className="w-15 h-15 text-white opacity-70" />,
        },
    ];
    const partsInventoryData = [
        {
            partName: "Brake Pads",
            inStock: 12,
            predictedNeed: 18,
            status: "Shortage",
        },
        {
            partName: "Oil Filters",
            inStock: 40,
            predictedNeed: 25,
            status: "Sufficient",
        },
        {
            partName: "Battery Units",
            inStock: 5,
            predictedNeed: 9,
            status: "Shortage",
        },
        {
            partName: "Headlights",
            inStock: 20,
            predictedNeed: 15,
            status: "Sufficient",
        },
        {
            partName: "Wiper Blades",
            inStock: 8,
            predictedNeed: 10,
            status: "Shortage",
        },
        {
            partName: "Air Filters",
            inStock: 25,
            predictedNeed: 20,
            status: "Sufficient",
        },
        {
            partName: "Clutch Plates",
            inStock: 6,
            predictedNeed: 8,
            status: "Shortage",
        },
    ];
    const columns = [
        {
            accessorKey: "partName",
            header: "Part Name",
            id: "partName",
        },
        {
            accessorKey: "inStock",
            header: "In Stock",
            id: "inStock",
        },
        {
            accessorKey: "predictedNeed",
            header: "Predicted Need",
            id: "predictedNeed",
        },
        {
            accessorKey: "status",
            header: "Status",
            id: "status",
        },
    ];
    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <SectionCards data={dummyData} />
                    <div className="grid grid-cols-2 gap-4 mx-6 ">
                        <Card>
                            <div className="px-4 lg:pl-6">

                                <ReportDataTable
                                    data={partsInventoryData}
                                    columns={columns}
                                    searchKey="partName"
                                /></div>
                        </Card>

                        <div className="pl-4 lg:pl-6">
                            <DotLineChart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
