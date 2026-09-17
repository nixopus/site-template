import { BarChart } from "@/components/blocks/charts/bar-chart";
import { BarList } from "@/components/blocks/charts/bar-list";
import { ChartFrame } from "@/components/blocks/charts/chart-frame";
import { LineChart } from "@/components/blocks/charts/line-chart";
import { StatTile } from "@/components/blocks/charts/stat-tile";
import { Specimen } from "./specimen";

// Fictional Ballast figures, labelled as such: a specimen of each chart block.
const weeks = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"].map((week, i) => ({
  week,
  booked: [12, 15, 14, 19, 22, 21, 25, 27][i],
  delivered: [10, 13, 14, 16, 19, 21, 22, 24][i],
  margin: [4.1, 3.2, -1.4, 2.8, 5.0, -0.6, 3.9, 4.4][i],
}));

export function ChartsBoard() {
  return (
    <Specimen title="Charts" note="blocks/charts, fictional demo data">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile label="Containers booked" value={27} delta={2} deltaLabel="vs last week" />
        <StatTile label="Demurrage paid" value={12410} unit="USD" delta={-890} higherIsBetter={false} deltaLabel="vs last week" />
        <StatTile label="On-time rate" value={91.4} unit="%" decimals={1} note="Last 8 weeks" />
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <ChartFrame title="Booked vs delivered" note="Containers per week" series={[{ key: "booked", label: "Booked" }, { key: "delivered", label: "Delivered" }]}>
          <LineChart data={weeks} x="week" series={[{ key: "booked", label: "Booked" }, { key: "delivered", label: "Delivered" }]} />
        </ChartFrame>
        <ChartFrame title="Weekly margin" note="Percent, negative weeks in the destructive tone">
          <BarChart data={weeks} x="week" y="margin" label="Margin" unit="%" decimals={1} signed />
        </ChartFrame>
      </div>
      <div className="mt-4">
        <ChartFrame title="Volume by lane" note="Share of containers">
          <BarList items={[{ label: "Shanghai to Oakland", value: 41 }, { label: "Busan to Tacoma", value: 23 }, { label: "Ningbo to LA", value: 36 }]} />
        </ChartFrame>
      </div>
    </Specimen>
  );
}
