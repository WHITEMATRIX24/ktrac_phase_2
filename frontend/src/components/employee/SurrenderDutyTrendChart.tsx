'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export function SurrenderDutyTrendChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Employees Surrendered Duty',
        data: [5, 8, 4, 6, 7, 10, 9],
        fill: false,
        borderColor: '#6366F1',
        backgroundColor: '#6366F1',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 2,
        },
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Surrender Duty Trend</CardTitle>
        <CardDescription>Monthly surrender activity by employees</CardDescription>
      </CardHeader>
      <div className="p-0 min-h-[350px]">
        <Line data={data} options={options} />
      </div>
    </Card>
  );
}
