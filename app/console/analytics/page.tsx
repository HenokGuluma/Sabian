'use client'

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
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Gamepad2,
  // Calendar,
  Activity
} from 'lucide-react'
import { analyticsData, weeklyPlayerGrowth } from '@/lib/database'

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2024, 10, 1), // November 1, 2024
    to: new Date(2025, 7, 27),   // August 27, 2025
  })

  // Filter weekly data based on selected date range
  const getFilteredWeeklyData = () => {
    if (!dateRange?.from || !dateRange?.to) return weeklyPlayerGrowth

    return weeklyPlayerGrowth.filter(item => {
      const itemDate = new Date(item.date)
      return itemDate >= dateRange.from! && itemDate <= dateRange.to!
    })
  }

  const filteredPlayerData = getFilteredWeeklyData()

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

  const data = [
    {
      week: "Week 1",
      desktop: 186,
      mobile: 80,
    },
    {
      week: "Week 2", 
      desktop: 305,
      mobile: 200,
    },
    {
      week: "Week 3",
      desktop: 237,
      mobile: 120,
    },
    {
      week: "Week 4",
      desktop: 173,
      mobile: 190,
    },
    {
      week: "Week 5",
      desktop: 209,
      mobile: 130,
    },
    {
      week: "Week 6",
      desktop: 214,
      mobile: 140,
    },
    {
      week: "Week 7",
      desktop: 290,
      mobile: 180,
    },
    {
      week: "Week 8",
      desktop: 320,
      mobile: 220,
    },
  ]

  const revenueData = [
    { week: "Week 1", revenue: 2400, players: 1800 },
    { week: "Week 2", revenue: 1398, players: 2200 },
    { week: "Week 3", revenue: 2800, players: 2800 },
    { week: "Week 4", revenue: 3908, players: 1900 },
    { week: "Week 5", revenue: 4800, players: 2400 },
    { week: "Week 6", revenue: 3800, players: 2100 },
    { week: "Week 7", revenue: 4200, players: 2600 },
    { week: "Week 8", revenue: 3900, players: 2350 },
    { week: "Week 9", revenue: 4500, players: 26239 },
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

        {/* Weekly Player Growth Chart */}
        <Card className="glass-card bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Weekly Player Growth</CardTitle>
            <CardDescription className="text-slate-400">
              Weekly active players from November 2024 - showing steady growth with major breakthrough in May 2025
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={filteredPlayerData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="week" 
                  stroke="#9ca3af" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={10}
                />
                <YAxis yAxisId="left" stroke="#9ca3af" />
                <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px",
                    color: "#ffffff",
                  }}
                  labelFormatter={(label, payload) => {
                    const data = payload?.[0]?.payload
                    return data ? `${data.week} (${data.month})` : label
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
            <div className="mt-4 p-4 bg-slate-700/30 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-xs text-slate-400">Nov 2024 Start</p>
                  <p className="text-white font-bold">52 players</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Jan 2025 Growth</p>
                  <p className="text-green-400 font-bold">420 players</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">May 2025 Peak</p>
                  <p className="text-cyan-400 font-bold">8,500 players</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Aug 2025 Current</p>
                  <p className="text-pink-400 font-bold">19,200 players</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Player Retention */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Player Retention</CardTitle>
              <CardDescription className="text-slate-300">30-day retention rate - showing steady improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-3xl font-bold text-white">85.2%</div>
                <Progress value={85.2} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Day 1</span>
                  <span className="text-slate-400">Day 30</span>
                </div>
                <p className="text-sm text-green-400">+12.8% improvement since February</p>
                <div className="space-y-2 pt-2 border-t border-slate-700">
                  <div className="text-xs text-slate-300">Monthly Retention Progress:</div>
                  {analyticsData.slice(-3).map((data) => (
                    <div key={data.month} className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">{data.month}</span>
                      <span className="text-green-400">{data.retention}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
      </div>
    </div>
  )
}