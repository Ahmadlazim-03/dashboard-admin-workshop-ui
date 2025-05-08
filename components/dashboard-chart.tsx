"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const data = [
  {
    name: "Jan",
    total: 1200,
  },
  {
    name: "Feb",
    total: 1900,
  },
  {
    name: "Mar",
    total: 1500,
  },
  {
    name: "Apr",
    total: 2200,
  },
  {
    name: "May",
    total: 2800,
  },
  {
    name: "Jun",
    total: 2600,
  },
  {
    name: "Jul",
    total: 3100,
  },
]

export function DashboardChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
        <XAxis
          dataKey="name"
          stroke="currentColor"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          className="text-muted-foreground"
        />
        <YAxis
          stroke="currentColor"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `Rp${value / 1000}k`}
          className="text-muted-foreground"
        />
        <Tooltip
          formatter={(value) => [`Rp${value}`, "Total"]}
          labelFormatter={(label) => `Bulan: ${label}`}
          contentStyle={{
            borderRadius: "8px",
            border: "1px solid var(--border)",
            backgroundColor: "var(--background)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Bar
          dataKey="total"
          radius={[4, 4, 0, 0]}
          className="fill-primary/80 hover:fill-primary"
          animationDuration={1500}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
