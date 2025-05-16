import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  data?: {
    title: string;
    subData: {
      title: string;
      value: number;
    }[];
  }[];
}

export function SectionCards({ data }: Props) {
  if (!data) return;
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card bg-themeYellow/50 border-none">
        <CardHeader className="flex flex-col gap-5">
          <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
            {data[0].title}
          </CardTitle>
          <CardDescription>
            {data[0].subData.map((sdata, index) => (
              <CardDescription
                key={index}
              >{`${sdata.title} ${sdata.value}`}</CardDescription>
            ))}
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="@container/card bg-themeBlue/50 border-none">
        <CardHeader className="flex flex-col gap-5">
          <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
            {data[1].title}
          </CardTitle>
          <CardDescription>
            {data[1].subData.map((sdata, index) => (
              <CardDescription
                key={index}
              >{`${sdata.title} ${sdata.value}`}</CardDescription>
            ))}
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="@container/card bg-themeGreen/50 border-none">
        <CardHeader className="flex flex-col gap-5">
          <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
            {data[2].title}
          </CardTitle>
          <CardDescription>
            {data[2].subData.map((sdata, index) => (
              <CardDescription
                key={index}
              >{`${sdata.title} ${sdata.value}`}</CardDescription>
            ))}
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="@container/card bg-themeRed/50 border-none">
        <CardHeader className="flex flex-col gap-5">
          <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
            {data[3].title}
          </CardTitle>
          <CardDescription>
            {data[3].subData.map((sdata, index) => (
              <CardDescription
                key={index}
              >{`${sdata.title} ${sdata.value}`}</CardDescription>
            ))}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
