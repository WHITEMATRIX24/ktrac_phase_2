import { RevenueAnalysisChart } from "@/components/revenue-chart"
import { SectionCards } from "@/components/section-cards"

export default function Page() {
    const dummyData = [
        {
            title: "Yesterday's Collection",
            subData: [
                { title: "Total", value: 15230 },
            ],
        },
        {
            title: "Revenue",
            subData: [
                { title: "Total", value: 8000 },
            ],
        },
        {
            title: "Expenses",
            subData: [
                { title: "Fuel", value: 3200 },
                { title: "Maintenance", value: 1500 },
            ],
        },
        {
            title: "Total Passengers",
            subData: [
                { title: "Count", value: 1340 },
            ],
        },
    ];

    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <SectionCards data={dummyData} />
                    <div className="px-4 lg:px-6">
                        <RevenueAnalysisChart />
                    </div>
                </div>
            </div>
        </div>
    );
}
