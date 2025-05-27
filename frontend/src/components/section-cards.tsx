import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReactNode } from "react";

interface Props {
  data?: {
    title: string;
    value: number;
    change?: string;
    icon: ReactNode;
  }[];
}

export function SectionCards({ data }: Props) {
  if (!data) return;
  return (
    // <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-b *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card
        className="@container/card bg-white border-gray relative shadow-md h-[130px]"
        style={{ borderLeft: "8px solid #4e5166" }}
      >
        <CardHeader className="flex flex-col gap-0">
          <CardTitle className="text-[14px] tabular-nums text-black font-medium">
            {data[0].title}
          </CardTitle>

          <CardDescription className="text-[38px] text-center font-extralight tabular-nums text-Black drop-shadow-md">
            {data[0].value}
            {data[0].change != "0" && (
              <p
                className={`${
                  data[0].change?.indexOf("+") !== -1
                    ? "text-green-800"
                    : data[0].change?.indexOf("-") !== -1
                    ? "text-red-800"
                    : ""
                } text-[14px] text-start font-semibold tabular-nums text-grey drop-shadow-md`}
              >
                {data[0].change}
              </p>
            )}
          </CardDescription>
        </CardHeader>
        <div className="absolute top-5 right-3">{data[0].icon}</div>
      </Card>
      <Card
        className="@container/card bg-white border-gray relative shadow-md h-[130px]"
        style={{ borderLeft: "8px solid green" }}
      >
        <CardHeader className="flex flex-col gap-0">
          <CardTitle className="text-[14px] font-medium tabular-nums text-black">
            {data[1].title}
          </CardTitle>
          <CardDescription className="text-[38px] text-center font-extralight tabular-nums text-black drop-shadow-md">
            {data[1].value}
            {data[1].change != "0" && (
              <p
                className={`${
                  data[0].change?.indexOf("+") !== -1
                    ? "text-green-800"
                    : data[0].change?.indexOf("-") !== -1
                    ? "text-red-800"
                    : ""
                } text-[14px] text-start font-semibold tabular-nums text-grey drop-shadow-md`}
              >
                {data[1].change}
              </p>
            )}
          </CardDescription>
        </CardHeader>
        <div className="absolute border-black top-9  right-3">
          {data[1].icon}
        </div>
      </Card>
      <Card
        className="@container/card bg-white border-gray relative shadow-md h-[130px]"
        style={{ borderLeft: "8px solid #C1292E" }}
      >
        <CardHeader className="flex flex-col gap-0">
          <CardTitle className="text-[14px] font-medium tabular-nums text-black">
            {data[2].title}
          </CardTitle>
          <CardDescription className="text-[38px] text-center tabular-nums text-black drop-shadow-md">
            {data[2].value}
            {data[2].change != "0" && (
              <p
                className={`${
                  data[2].change?.indexOf("+") !== -1
                    ? "text-green-800"
                    : data[2].change?.indexOf("-") !== -1
                    ? "text-red-800"
                    : ""
                } text-[14px] text-start font-semibold tabular-nums text-grey drop-shadow-md`}
              >
                {data[2].change}
              </p>
            )}
          </CardDescription>
        </CardHeader>
        <div className="absolute top-9 right-3">{data[2].icon}</div>
      </Card>
      <Card
        className="@container/card bg-white border-gray relative shadow-md h-[130px]"
        style={{ borderLeft: "8px solid #610345" }}
      >
        <CardHeader className="flex flex-col gap-0">
          <CardTitle className="text-[14px] font-medium tabular-nums text-black">
            {data[3].title}
          </CardTitle>
          <CardDescription className="text-[38px] text-center tabular-nums text-black drop-shadow-md">
            {data[3].value}
            {data[3].change != "0" && (
              <p
                className={`${
                  data[3].change?.indexOf("+") !== -1
                    ? "text-green-800"
                    : data[3].change?.indexOf("-") !== -1
                    ? "text-red-800"
                    : ""
                } text-[14px] text-start font-semibold tabular-nums text-grey drop-shadow-md`}
              >
                {data[3].change}
              </p>
            )}
          </CardDescription>
        </CardHeader>
        <div className="absolute top-9 right-3">{data[3].icon}</div>
      </Card>
    </div>
  );
}
