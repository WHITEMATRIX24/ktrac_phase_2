"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartEntry {
  date: string; // "2025-06", "2025-07", etc.
  depot: string;
  actual: number;
  forecast: number;
  budget: number;
}

interface RevenueLineChartProps {
  chartData: ChartEntry[];
}

const colors: Record<string, string> = {
  EKM: "#3b82f6",
  TVM: "#10b981",
  KLM: "#f59e0b",
};

const RevenueLineChart: React.FC<RevenueLineChartProps> = ({ chartData }) => {
  const labels = Array.from(new Set(chartData.map(d => d.date))).sort();
  const depots = Array.from(new Set(chartData.map(d => d.depot)));

  // Only include Forecast datasets now
  const datasets = depots.map(depot => {
    const depotData = chartData.filter(d => d.depot === depot);
    return {
      label: `${depot} - Forecast`,
      data: labels.map(label => depotData.find(d => d.date === label)?.forecast ?? null),
      borderColor: colors[depot],
      borderDash: [5, 5],
      backgroundColor: colors[depot] + "66",
      tension: 0.4,
      fill: false,
    };
  });

  const data: ChartData<"line"> = {
    labels,
    datasets,
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
      title: {
        display: true,
        text: "Depot-wise Monthly Forecast",
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Revenue (INR)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
    },
  };

  return (
    <div className="h-[400px] w-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default RevenueLineChart;
