'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export function MonthlySurrenderSummaryChart() {
  const data = {
    labels: ['Resignation', 'Termination', 'Retirement', 'Medical Leave'],
    datasets: [
      {
        label: 'Summary',
        data: [100, 40, 30, 50],
        backgroundColor: ['#b9b7a7', '#4e5166', '#235789', '#04724d'],
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Surrender Summary</CardTitle>
        <CardDescription>Breakdown by reason or category</CardDescription>
      </CardHeader>
      <div className="px-4 pb-6">
        <Bar data={data} options={options} />
      </div>
    </Card>
  );
}
