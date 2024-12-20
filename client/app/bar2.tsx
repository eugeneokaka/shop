"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
interface Category {
  clothes: number;
  electronics: number;
  food: number;
  others: number;
  stationary: number;
}
interface expensedata {
  total: number;
  sales: number;
  sold: number;
  category: Category;
}
interface stats {
  expense: expensedata;
  leastsolditem: object;
  leastprofit: object;
  maxprofit: object;
  mostsolditme: object;
}

export function Bar2() {
  const [data, setdata] = useState<stats>();
  const fetchdata = async () => {
    const res = await fetch(`http://localhost:5000/expense`, {
      cache: "no-cache",
    });

    const getdata: stats = await res.json();

    setdata(getdata);
    console.log(getdata);
  };
  useEffect(() => {
    fetchdata();
  }, []);
  const chartData = [
    {
      browser: "food",
      visitors: data?.expense.category.food,
      fill: "var(--color-chrome)",
    },
    {
      browser: "clothe",
      visitors: data?.expense.category.clothes,
      fill: "var(--color-chrome)",
    },
    // {
    //   browser: "clothes",
    //   visitors: data?.expense.category.clothes,
    //   fill: "var(--color-safari)",
    // },
    {
      browser: "electronics",
      visitors: data?.expense.category.electronics,
      fill: "var(--color-firefox)",
    },
    {
      browser: "others",
      visitors: data?.expense.category.others,
      fill: "var(--color-edge)",
    },
    {
      browser: "stationary",
      visitors: data?.expense.category.stationary,
      fill: "var(--color-other)",
    },
  ];

  const chartConfig = {
    visitors: {
      label: "Sales",
    },
    food: {
      label: "food",
      color: "hsl(var(--chart-1))",
    },
    clothe: {
      label: "clothe",
      color: "hsl(var(--chart-2))",
    },
    electronics: {
      label: "electronics",
      color: "hsl(var(--chart-3))",
    },
    others: {
      label: "others",
      color: "hsl(var(--chart-4))",
    },
    stationary: {
      label: "stationary",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales by category</CardTitle>
        <h1></h1>

        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="browser"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="visitors"
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                );
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div> */}
      </CardFooter>
    </Card>
  );
}
