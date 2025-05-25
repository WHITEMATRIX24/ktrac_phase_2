
import { DotLineChart } from "@/components/maintenance/dot_line_chart";
import { CriticalAlertsTable } from "@/components/maintenance/critical_alert_table";
import { SectionCards } from "@/components/section-cards";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BusFront, CalendarClock, TriangleAlert, Wrench } from "lucide-react";
import { LowStockPartsTable } from "@/components/maintenance/parts_low_table";
import { BreakdownTrendChart } from "@/components/maintenance/breakdown_report";

export default function Page() {
    const dummyData = [
        {
            title: "Total No. of Buses",
            value: 5450,
            change:'0',
            icon: <BusFront className="w-12 h-12 text-grey opacity-70" />,
        },
        {
            title: "Buses Under Maintenance",
            value: 383,
            change:'0',
            icon: <Wrench className="w-12 h-12 text-grey opacity-70" />,
        },
        {
            title: "High Risk Alerts",
            value: 124,
            change:'0',
            icon: <TriangleAlert className="w-12 h-12 text-grey opacity-70" />,
        },
        {
            title: "Upcoming Services",
            value: 340,
            change:'0',
            icon: <CalendarClock className="w-12 h-12 text-grey opacity-70" />,
        },
    ];
    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <SectionCards data={dummyData} />
                    <div className="grid grid-cols-2 gap-2 mx-6 ">
                        <Card>
                            <CardHeader>
                                <CardTitle>Critical Alert Table</CardTitle>
                                <CardDescription>Upcoming predicted failures for top at-risk buses</CardDescription>
                            </CardHeader>
                            <div className="px-4 lg:pl-6">
                                <CriticalAlertsTable />
                            </div>
                        </Card>

                        <div className="pl-4 lg:pl-6">
                            <DotLineChart />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mx-6 ">
                        <Card>
                            <CardHeader>
                                <CardTitle>Predictive Stock Requirement Table</CardTitle>
                                <CardDescription>Upcoming predicted parts requirement and their availablitiy</CardDescription>
                            </CardHeader>
                            <div className="px-4 lg:pl-6">
                                <LowStockPartsTable />
                            </div>
                        </Card>

                        <div className="pl-4 lg:pl-6">
                            <BreakdownTrendChart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
