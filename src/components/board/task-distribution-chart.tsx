import { Legend, Pie, PieChart, Cell } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface TaskDistributionChartProps {
  stoppedTasks: number;
  inProgressTasks: number;
  completedTasks: number;
}

const chartConfig = {
  stopped: {
    label: "Stopped",
    color: "#854d0e",
  },
  inProgress: {
    label: "In Progress",
    color: "#075985",
  },
  completed: {
    label: "Completed",
    color: "#115e59",
  },
};

export const TaskDistributionChart = ({
  stoppedTasks,
  inProgressTasks,
  completedTasks,
}: TaskDistributionChartProps) => {
  const data = [
    { name: "stopped", value: stoppedTasks },
    { name: "inProgress", value: inProgressTasks },
    { name: "completed", value: completedTasks },
  ];

  return (
    <ChartContainer className="min-h-[220px]" config={chartConfig}>
      <PieChart data={data} className="[&>div:first-of-type]:!bottom-20">
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          nameKey="name"
          endAngle={180}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={chartConfig[entry.name as keyof typeof chartConfig].color}
            />
          ))}
        </Pie>
        <ChartTooltip
          content={
            <ChartTooltipContent className="bg-neutral-800 text-neutral-300" />
          }
        />
        <ChartLegend content={<ChartLegendContent className="p-0" />} />
      </PieChart>
    </ChartContainer>
  );
};
