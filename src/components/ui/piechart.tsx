"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import type { PieSectorDataItem } from "recharts/types/polar/Pie"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
const desktopData = [
  { month: "january", desktop: 186, fill: "var(--color-january)" },
  { month: "february", desktop: 305, fill: "var(--color-february)" },
  { month: "march", desktop: 237, fill: "var(--color-march)" },
  { month: "april", desktop: 173, fill: "var(--color-april)" },
  { month: "may", desktop: 209, fill: "var(--color-may)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
  },
  mobile: {
    label: "Mobile",
  },
  january: {
    label: "January",
    color: "hsl(var(--chart-1))",
  },
  february: {
    label: "February",
    color: "hsl(var(--chart-2))",
  },
  march: {
    label: "March",
    color: "hsl(var(--chart-3))",
  },
  april: {
    label: "April",
    color: "hsl(var(--chart-4))",
  },
  may: {
    label: "May",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

// Update the MyPieChart component to handle dark mode colors better
export function MyPieChart({ darkmode = false }: { darkmode?: boolean }) {
  const id = "pie-interactive"
  const [activeMonth, setActiveMonth] = React.useState(desktopData[0].month)

  const activeIndex = React.useMemo(() => desktopData.findIndex((item) => item.month === activeMonth), [activeMonth])
  const months = React.useMemo(() => desktopData.map((item) => item.month), [])

  // Define chart config with explicit colors for dark mode
  const enhancedChartConfig = {
    visitors: {
      label: "Visitors",
    },
    desktop: {
      label: "Desktop",
    },
    mobile: {
      label: "Mobile",
    },
    january: {
      label: "January",
      theme: {
        light: "hsl(var(--chart-1))",
        dark: "hsl(4, 90%, 58%)", // Bright red for dark mode
      },
    },
    february: {
      label: "February",
      theme: {
        light: "hsl(var(--chart-2))",
        dark: "hsl(25, 95%, 53%)", // Bright orange for dark mode
      },
    },
    march: {
      label: "March",
      theme: {
        light: "hsl(var(--chart-3))",
        dark: "hsl(43, 96%, 56%)", // Bright yellow for dark mode
      },
    },
    april: {
      label: "April",
      theme: {
        light: "hsl(var(--chart-4))",
        dark: "hsl(262, 83%, 58%)", // Bright purple for dark mode
      },
    },
    may: {
      label: "May",
      theme: {
        light: "hsl(var(--chart-5))",
        dark: "hsl(176, 87%, 44%)", // Bright teal for dark mode
      },
    },
  } satisfies ChartConfig

  return (
    <Card data-chart={id} className={`flex flex-col ${darkmode ? "dark" : ""}`}>
      <ChartStyle id={id} config={enhancedChartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Pie Chart - Interactive</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </div>
        <Select value={activeMonth} onValueChange={setActiveMonth}>
          <SelectTrigger className="ml-auto h-7 w-[130px] rounded-lg pl-2.5" aria-label="Select a value">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {months.map((key) => {
              const config = enhancedChartConfig[key as keyof typeof enhancedChartConfig]

              if (!config) {
                return null
              }

              return (
                <SelectItem key={key} value={key} className="rounded-lg [&_span]:flex">
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: `var(--color-${key})`,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={enhancedChartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
          darkmode={darkmode}
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={desktopData}
              dataKey="desktop"
              nameKey="month"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector {...props} outerRadius={outerRadius + 25} innerRadius={outerRadius + 12} />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {desktopData[activeIndex].desktop.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

