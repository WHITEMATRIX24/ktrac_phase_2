"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, Tooltip } from "recharts"
import { useIsMobile } from "@/hooks/use-mobile"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"

type RevenueData = {
    date: string
    ordinary: number
    fastPassenger: number
    superFast: number
    swift: number
    depot: string
}

const depots = ["Thiruvananthapuram", "Ernakulam", "Kozhikode", "Thrissur", "Kannur"]

const generateDummyData = (): RevenueData[] => {
    const data: RevenueData[] = []
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()

    for (let i = 0; i < 365; i++) {
        const date = new Date(currentYear, currentMonth - 1, i + 1)

        data.push({
            date: date.toISOString().split('T')[0],
            ordinary: Math.floor(Math.random() * 500000) + 200000,
            fastPassenger: Math.floor(Math.random() * 300000) + 100000,
            superFast: Math.floor(Math.random() * 200000) + 50000,
            swift: Math.floor(Math.random() * 100000) + 20000,
            depot: depots[Math.floor(Math.random() * depots.length)]
        })
    }
    return data
}

const chartData = generateDummyData()

const chartConfig = {
    totalRevenue: {
        label: "Total Revenue",
        color: "#8884d8",
    },
    ordinary: {
        label: "Ordinary",
        color: "#8884d8",
    },
    fastPassenger: {
        label: "Fast Passenger",
        color: "#82ca9d",
    },
    superFast: {
        label: "Super Fast",
        color: "#ffc658",
    },
    swift: {
        label: "Swift",
        color: "#ff8042",
    },
} satisfies ChartConfig

export function RevenueAnalysisChart() {
    const isMobile = useIsMobile()
    const currentDate = new Date()
    const [selectedDepot, setSelectedDepot] = React.useState("All")
    const [timeRange, setTimeRange] = React.useState<"month" | "year">("month")
    const [selectedMonth, setSelectedMonth] = React.useState(currentDate.getMonth() + 1)
    const [selectedYear, setSelectedYear] = React.useState(currentDate.getFullYear())
    const [selectedBusTypes, setSelectedBusTypes] = React.useState<string[]>(["ordinary", "fastPassenger", "superFast", "swift"])

    const filteredData = React.useMemo(() => {
        let data = chartData.filter(d =>
            selectedDepot === "All" || d.depot === selectedDepot
        )

        if (timeRange === "month") {
            data = data.filter(d => {
                const date = new Date(d.date)
                return date.getMonth() + 1 === selectedMonth &&
                    date.getFullYear() === selectedYear
            })
        } else {
            data = data.filter(d => new Date(d.date).getFullYear() === selectedYear)
        }

        // Calculate total revenue when showing all bus types
        const showTotal = selectedBusTypes.length === 4

        return data.map(d => ({
            date: d.date,
            ...(showTotal && {
                totalRevenue: Object.entries(d)
                    .filter(([key]) => selectedBusTypes.includes(key))
                    .reduce((acc, [_, value]) => acc + (typeof value === 'number' ? value : 0), 0)
            }),
            ...(!showTotal && {
                ...(selectedBusTypes.includes("ordinary") && { ordinary: d.ordinary }),
                ...(selectedBusTypes.includes("fastPassenger") && { fastPassenger: d.fastPassenger }),
                ...(selectedBusTypes.includes("superFast") && { superFast: d.superFast }),
                ...(selectedBusTypes.includes("swift") && { swift: d.swift }),
            })
        }))
    }, [selectedDepot, timeRange, selectedMonth, selectedYear, selectedBusTypes])

    const processedData = React.useMemo(() => {
        if (timeRange === "year") {
            const monthlyData: Record<string, any> = {}
            filteredData.forEach(d => {
                const month = new Date(d.date).getMonth()
                const year = new Date(d.date).getFullYear()
                const key = `${year}-${month}`

                if (!monthlyData[key]) {
                    monthlyData[key] = {
                        date: new Date(year, month).toLocaleString('default', { month: 'short' }),
                        totalRevenue: 0,
                        ordinary: 0,
                        fastPassenger: 0,
                        superFast: 0,
                        swift: 0
                    }
                }

                Object.keys(monthlyData[key]).forEach(k => {
                    if (k in d) monthlyData[key][k] += d[k as keyof typeof d] as number
                })
            })
            return Object.values(monthlyData)
        }
        return filteredData
    }, [filteredData, timeRange])

    return (
        <Card className="@container/card">
            <CardHeader>
                <CardTitle>KSRTC Revenue Analysis</CardTitle>
                <CardDescription>
                    {timeRange === "month"
                        ? `Showing data for ${new Date(selectedYear, selectedMonth - 1).toLocaleString('default', { month: 'long', year: 'numeric' })}`
                        : `Yearly data for ${selectedYear}`}
                </CardDescription>
                <CardAction className="flex flex-col gap-4 @[540px]/card:flex-row">
                    <Select value={selectedDepot} onValueChange={setSelectedDepot}>
                        <SelectTrigger className="w-48">
                            <SelectValue>{selectedDepot === "All" ? "All Depots" : selectedDepot}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Depots</SelectItem>
                            {depots.map(depot => (
                                <SelectItem key={depot} value={depot}>{depot}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <ToggleGroup
                        type="single"
                        value={timeRange}
                        onValueChange={(v) => setTimeRange(v as "month" | "year")}
                        variant="outline"
                    >
                        <ToggleGroupItem value="month">Month View</ToggleGroupItem>
                        <ToggleGroupItem value="year">Year View</ToggleGroupItem>
                    </ToggleGroup>

                    {timeRange === "month" ? (
                        <div className="flex gap-2">
                            <Select
                                value={selectedMonth.toString()}
                                onValueChange={(v) => setSelectedMonth(parseInt(v))}
                            >
                                <SelectTrigger className="w-28">
                                    <SelectValue>
                                        {new Date(selectedYear, selectedMonth - 1).toLocaleString('default', { month: 'short' })}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {Array.from({ length: 12 }, (_, i) => (
                                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                                            {new Date(selectedYear, i).toLocaleString('default', { month: 'long' })}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select
                                value={selectedYear.toString()}
                                onValueChange={(v) => setSelectedYear(parseInt(v))}
                            >
                                <SelectTrigger className="w-28">
                                    <SelectValue>{selectedYear}</SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {[2023, 2024, 2025].map(year => (
                                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    ) : (
                        <Select
                            value={selectedYear.toString()}
                            onValueChange={(v) => setSelectedYear(parseInt(v))}
                        >
                            <SelectTrigger className="w-28">
                                <SelectValue>{selectedYear}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {[2023, 2024].map(year => (
                                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}

                    <Select
                        value={selectedBusTypes.join(",")}
                        onValueChange={(v) => setSelectedBusTypes(v === "all" ? ["ordinary", "fastPassenger", "superFast", "swift"] : v.split(","))}
                    >
                        <SelectTrigger className="w-48">
                            <SelectValue>
                                {selectedBusTypes.length === 4 ? "All Bus Types" : `${selectedBusTypes.length} Selected`}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Bus Types</SelectItem>
                            {Object.entries(chartConfig).map(([key, config]) => {
                                if (key === 'totalRevenue') return null
                                return (
                                    <SelectItem key={key} value={key}>
                                        {config.label}
                                    </SelectItem>
                                )
                            })}
                        </SelectContent>
                    </Select>
                </CardAction>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[400px] w-full"
                >
                    <AreaChart data={processedData}>
                        <defs>
                            {Object.entries(chartConfig).map(([key, config]) => {
                                if (key === 'totalRevenue' && selectedBusTypes.length !== 4) return null
                                return (
                                    <linearGradient key={key} id={`fill-${key}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={config.color} stopOpacity={0.8} />
                                        <stop offset="95%" stopColor={config.color} stopOpacity={0.1} />
                                    </linearGradient>
                                )
                            })}
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => value}
                        />
                        <Tooltip
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => value}
                                    valueFormatter={(value) => `₹${value.toLocaleString()}`}
                                />
                            }
                        />
                        {selectedBusTypes.length === 4 ? (
                            <Area
                                type="monotone"
                                dataKey="totalRevenue"
                                stackId="1"
                                stroke={chartConfig.totalRevenue.color}
                                fill={`url(#fill-totalRevenue)`}
                            />
                        ) : (
                            selectedBusTypes.map((busType) => (
                                <Area
                                    key={busType}
                                    type="monotone"
                                    dataKey={busType}
                                    stackId="1"
                                    stroke={(chartConfig as any)[busType].color}
                                    fill={`url(#fill-${busType})`}
                                />
                            ))
                        )}
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}