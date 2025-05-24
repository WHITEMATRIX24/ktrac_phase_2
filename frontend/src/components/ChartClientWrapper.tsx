'use client';

import SunburstChart from "./BusPositionSunBurst";



export default function ChartClientWrapper({ data }: { data: any[] }) {
   return <SunburstChart data={data} />;
}



