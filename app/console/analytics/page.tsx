"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  LineChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts"
import { CalendarIcon, Download } from "lucide-react"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: new Date(2024, 1, 9),
  })

  // Enhanced analytics data
  const playerActivityData = [
    { time: "00:00", players: 1200, revenue: 450, sessions: 800 },
    { time: "04:00", players: 800, revenue: 320, sessions: 600 },
    { time: "08:00", players: 2100, revenue: 890, sessions: 1400 },
    { time: "12:00", players: 3500, revenue: 1200, sessions: 2800 },
    { time: "16:00", players: 4200, revenue: 1580, sessions: 3200 },
    { time: "20:00", players: 5100, revenue: 2100, sessions: 4100 },
    { time: "24:00", players: 2800, revenue: 980, sessions: 2200 },
  ]

  const cohortData = [
    { week: "Week 1", day0: 100, day1: 85, day7: 42, day14: 28, day30: 18 },
    { week: "Week 2", day0: 100, day1: 88, day7: 45, day14: 32, day30: 22 },
    { week: "Week 3", day0: 100, day1: 82, day7: 38, day14: 25, day30: 15 },
    { week: "Week 4", day0: 100, day1: 90, day7: 48, day14: 35, day30: 25 },
  ]

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-heading text-white">Advanced Analytics</h1>
            <p className="text-slate-400">Comprehensive insights into your game's performance</p>
          </div>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700/50">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-600" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  className="text-white"
                />
              </PopoverContent>
            </Popover>
            <Button className="bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Enhanced Multi-metric Chart */}
        <Card className="glass-card bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Player Activity, Revenue & Sessions</CardTitle>
            <CardDescription className="text-slate-400">Multi-dimensional performance view</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={playerActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9ca3af" />
                <YAxis yAxisId="left" stroke="#9ca3af" />
                <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px",
                    color: "#ffffff",
                  }}
                />
                <Legend />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="sessions"
                  fill="#8b5cf6"
                  fillOpacity={0.3}
                  stroke="#8b5cf6"
                  name="Sessions"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="players"
                  stroke="#00bcd4"
                  strokeWidth={3}
                  name="Active Players"
                />
                <Bar yAxisId="right" dataKey="revenue" fill="#ff007f" name="Revenue ($)" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cohort Analysis */}
        <Card className="glass-card bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Cohort Retention Analysis</CardTitle>
            <CardDescription className="text-slate-400">Player retention by cohort over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={cohortData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="week" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px",
                    color: "#ffffff",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="day1" stroke="#ff007f" strokeWidth={2} name="Day 1" />
                <Line type="monotone" dataKey="day7" stroke="#00bcd4" strokeWidth={2} name="Day 7" />
                <Line type="monotone" dataKey="day14" stroke="#8b5cf6" strokeWidth={2} name="Day 14" />
                <Line type="monotone" dataKey="day30" stroke="#f59e0b" strokeWidth={2} name="Day 30" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
