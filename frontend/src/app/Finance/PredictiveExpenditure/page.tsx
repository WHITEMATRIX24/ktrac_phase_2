import { SectionCards } from "@/components/section-cards";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Banknote,
  Bus,
  Calculator,
  ChartBarDecreasing,
  ChartBarIncreasing,
  ChartLine,
  ChartLineIcon,
  Clock,
  FuelIcon,
  IndentIncrease,
  UserCheck,
  Wallet,
} from "lucide-react";
import { VendorPaymentTable } from "@/components/finance/vendorPayementTable";
import { BudgetComparisonChart } from "@/components/finance/budgetComparisonChart";
import { RevenueExpenseChart } from "@/components/finance/revenueChart";
import { TicketingTrendChart } from "@/components/finance/ticketingTrends";
import { ExpenditureLineChartComponent } from "@/components/predictiveExpenditureLineChart";
import { ForecastStackedBarChart } from "@/components/ForecastedExpenseStackedBarChart";

export default function PredictiveExpensePage() {
  const expenditurePredictiveData = [
    {
      title: "Forecasted Total Spend",
      value: 1240000,
      change: "+5.4% vs Last Month",
      icon: <ChartLine className="w-12 h-12 text-grey opacity-40" />,
    },
    {
      title: "Highest Expenditure - Fuel Charge",
      value: 480000,
      change: "38.7% of Total Forecast",
      icon: <ChartLineIcon className="w-12 h-12 text-grey opacity-40" />,
    },
    {
      title: "Depots Forecast Over Budget",
      value: 3,
      change: "Most: EKM Depot (+12.5%)",
      icon: <Bus className="w-12 h-12 text-grey opacity-40" />,
    },
    {
      title: "Prediction Accuracy",
      value: 92.3,
      change: "Based on actual vs predicted",
      icon: <Calculator className="w-12 h-12 text-grey opacity-40" />,
    },
  ];

  const chartData = [
    {
      date: "2025-06-01",
      depot: "EKM",
      actual: 100000,
      forecast: 105000,
      budget: 95000,
    },
    {
      date: "2025-06-01",
      depot: "ADR",
      actual: 90000,
      forecast: 100000,
      budget: 80000,
    },
    {
      date: "2025-06-01",
      depot: "ALY",
      actual: 120000,
      forecast: 130000,
      budget: 100000,
    },

    {
      date: "2025-07-01",
      depot: "ADR",
      actual: 110000,
      forecast: 115000,
      budget: 108000,
    },
    {
      date: "2025-07-01",
      depot: "ANG",
      actual: 140000,
      forecast: 125000,
      budget: 118000,
    },
    {
      date: "2025-07-01",
      depot: "KTM",
      actual: 150000,
      forecast: 125000,
      budget: 128000,
    },
    {
      date: "2025-08-01",
      depot: "ANG",
      actual: 100000,
      forecast: 105000,
      budget: 95000,
    },
    {
      date: "2025-08-01",
      depot: "ALY",
      actual: 120000,
      forecast: 145000,
      budget: 90000,
    },
    {
      date: "2025-05-01",
      depot: "ALV",
      actual: 110000,
      forecast: 115000,
      budget: 108000,
    },
    {
      date: "2025-05-01",
      depot: "EKM",
      actual: 150000,
      forecast: 155000,
      budget: 148000,
    },
    {
      date: "2025-04-01",
      depot: "ATG",
      actual: 100000,
      forecast: 105000,
      budget: 95000,
    },
    {
      date: "2025-05-01",
      depot: "TVM",
      actual: 110000,
      forecast: 115000,
      budget: 108000,
    },
    // Add more months...
  ];

  //sample data
  const forecastCategoryData = [
    {
      date: "2025-04",
      depot: "EKM",
      category: "Fuel",
      forecast: 12000,
      actual: 11500,
    },
    {
      date: "2025-04",
      depot: "EKM",
      category: "Maintenance",
      forecast: 8000,
      actual: 8500,
    },
    {
      date: "2025-04",
      depot: "EKM",
      category: "Salaries",
      forecast: 15000,
      actual: 14800,
    },
    {
      date: "2025-04",
      depot: "EKM",
      category: "Insurance",
      forecast: 4000,
      actual: 3900,
    },
    {
      date: "2025-04",
      depot: "EKM",
      category: "Misc",
      forecast: 2000,
      actual: 1800,
    },

    {
      date: "2025-04",
      depot: "TVM",
      category: "Fuel",
      forecast: 10000,
      actual: 10200,
    },
    {
      date: "2025-04",
      depot: "TVM",
      category: "Maintenance",
      forecast: 9000,
      actual: 9200,
    },
    {
      date: "2025-04",
      depot: "TVM",
      category: "Salaries",
      forecast: 14000,
      actual: 13900,
    },
    {
      date: "2025-04",
      depot: "TVM",
      category: "Insurance",
      forecast: 3500,
      actual: 3600,
    },
    {
      date: "2025-04",
      depot: "TVM",
      category: "Misc",
      forecast: 1800,
      actual: 1700,
    },

    {
      date: "2025-05",
      depot: "EKM",
      category: "Fuel",
      forecast: 11000,
      actual: 10800,
    },
    {
      date: "2025-05",
      depot: "EKM",
      category: "Maintenance",
      forecast: 8500,
      actual: 8300,
    },
    {
      date: "2025-05",
      depot: "EKM",
      category: "Salaries",
      forecast: 15500,
      actual: 15700,
    },
    {
      date: "2025-05",
      depot: "EKM",
      category: "Insurance",
      forecast: 4200,
      actual: 4100,
    },
    {
      date: "2025-05",
      depot: "EKM",
      category: "Misc",
      forecast: 2200,
      actual: 2000,
    },

    {
      date: "2025-05",
      depot: "TVM",
      category: "Fuel",
      forecast: 9500,
      actual: 9800,
    },
    {
      date: "2025-05",
      depot: "TVM",
      category: "Maintenance",
      forecast: 8800,
      actual: 8700,
    },
    {
      date: "2025-05",
      depot: "TVM",
      category: "Salaries",
      forecast: 13500,
      actual: 13200,
    },
    {
      date: "2025-05",
      depot: "TVM",
      category: "Insurance",
      forecast: 3900,
      actual: 4000,
    },
    {
      date: "2025-05",
      depot: "TVM",
      category: "Misc",
      forecast: 1900,
      actual: 1950,
    },

    {
      date: "2025-06",
      depot: "EKM",
      category: "Fuel",
      forecast: 11500,
      actual: 11700,
    },
    {
      date: "2025-06",
      depot: "EKM",
      category: "Maintenance",
      forecast: 8700,
      actual: 8600,
    },
    {
      date: "2025-06",
      depot: "EKM",
      category: "Salaries",
      forecast: 16000,
      actual: 15800,
    },
    {
      date: "2025-06",
      depot: "EKM",
      category: "Insurance",
      forecast: 4100,
      actual: 4000,
    },
    {
      date: "2025-06",
      depot: "EKM",
      category: "Misc",
      forecast: 2100,
      actual: 2000,
    },

    {
      date: "2025-06",
      depot: "TVM",
      category: "Fuel",
      forecast: 9700,
      actual: 9600,
    },
    {
      date: "2025-06",
      depot: "TVM",
      category: "Maintenance",
      forecast: 8900,
      actual: 9100,
    },
    {
      date: "2025-06",
      depot: "TVM",
      category: "Salaries",
      forecast: 13700,
      actual: 13500,
    },
    {
      date: "2025-06",
      depot: "TVM",
      category: "Insurance",
      forecast: 3600,
      actual: 3700,
    },
    {
      date: "2025-06",
      depot: "TVM",
      category: "Misc",
      forecast: 2000,
      actual: 1900,
    },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards data={expenditurePredictiveData} />

          <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-1 gap-4 mx-6">
            <ExpenditureLineChartComponent chartData={chartData} />
            <ForecastStackedBarChart data={forecastCategoryData} />
          </div>
          {/* <div className="grid grid-cols-1 gap-4 mx-4">
            <Card>
              <CardHeader>
                <CardTitle>Vendor Payment Status</CardTitle>
                <CardDescription>
                  Pending and completed vendor transactions
                </CardDescription>
              </CardHeader>
              <div className="px-4 lg:pl-6">
                <VendorPaymentTable />
              </div>
            </Card>
          </div> */}
        </div>
      </div>
    </div>
  );
}
