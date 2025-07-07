import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Ambulance, File, FileCheck2, FileClock } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  data?: {
    name: string;
    value: number;
  }[];
}

export function AccidentDashboardCards({ data }: Props) {
  if (!data) return;
  return (
    // <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-b *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card
        className="@container/card bg-white border-gray relative shadow-md h-[130px] py-1"
        style={{ borderLeft: "8px solid #4e5166" }}
      >
        <CardHeader className="flex flex-col gap-0 w-10/12">
          <CardTitle className="text-[14px] tabular-nums text-black font-medium">
            {data[0].name || ""}
          </CardTitle>

          <CardDescription className="text-[38px] text-center font-extralight tabular-nums text-Black drop-shadow-md">
            {data[0].value || 0}
          </CardDescription>
        </CardHeader>
        <div className="absolute top-5 right-3">
          <Ambulance className="w-12 h-12 text-grey opacity-40" />
        </div>
      </Card>
      <Card
        className="@container/card bg-white border-gray relative shadow-md h-[130px] py-1"
        style={{ borderLeft: "8px solid green" }}
      >
        <CardHeader className="flex flex-col gap-0 w-10/12">
          <CardTitle className="text-[14px] font-medium tabular-nums text-black">
            {data[1].name || ""}
          </CardTitle>
          <CardDescription className="text-[38px] text-center font-extralight tabular-nums text-black drop-shadow-md">
            {data[1].value || 0}
          </CardDescription>
        </CardHeader>
        <div className="absolute border-black top-5  right-3">
          <File className="w-12 h-12 text-grey opacity-40" />
        </div>
      </Card>
      <Card
        className="@container/card bg-white border-gray relative shadow-md h-[130px] py-1"
        style={{ borderLeft: "8px solid #C1292E" }}
      >
        <CardHeader className="flex flex-col gap-0 w-10/12">
          <CardTitle className="text-[14px] font-medium tabular-nums text-black">
            {data[2].name || ""}
          </CardTitle>
          <CardDescription className="text-[38px] text-center tabular-nums text-black drop-shadow-md">
            {data[2].value || 0}
          </CardDescription>
        </CardHeader>
        <div className="absolute top-5 right-3">
          <FileClock className="w-12 h-12 text-grey opacity-40" />
        </div>
      </Card>
      <Card
        className="@container/card bg-white border-gray relative shadow-md h-[130px] py-1"
        style={{ borderLeft: "8px solid #610345" }}
      >
        <CardHeader className="flex flex-col gap-0 w-10/12">
          <CardTitle className="text-[14px] font-medium tabular-nums text-black">
            {data[3].name || ""}
          </CardTitle>
          <CardDescription className="text-[38px] text-center tabular-nums text-black drop-shadow-md">
            {data[3].value || 0}
          </CardDescription>
        </CardHeader>
        <div className="absolute top-5 right-3">
          <FileCheck2 className="w-12 h-12 text-grey opacity-40" />
        </div>
      </Card>
    </div>
  );
}
