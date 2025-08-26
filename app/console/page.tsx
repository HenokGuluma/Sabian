"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Users,
  TrendingUp,
  Gamepad2,
  DollarSign,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  Upload,
  MoreHorizontal,
  Edit,
  Trash,
  Plus,
  Calendar,
  Mail,
  Phone,
  Clock,
  Star,
  Trophy,
  Zap,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Database,
  FileText,
  RefreshCw,
} from "lucide-react"
import { userDatabase, playerStatsDatabase, gameSessionsDatabase, analyticsData } from "@/lib/database"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"
import { AlertTriangle, CheckCircle, Ban, Mail, Gift, Shield, Target, Flame, Coins, Server, Clock, CalendarIcon, Download, RefreshCw, DollarSign, Activity } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export default function ConsolePage() {
  const [selectedProject, setSelectedProject] = useState("bankeru-games")
  const [activeSection, setActiveSection] = useState("overview")
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: new Date(2024, 1, 9),
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
  }

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("isAuthenticated")
      if (auth === "true") {
        setIsAuthenticated(true)
        // Simulate data loading
        setTimeout(() => setIsLoading(false), 3000)
      } else {
        router.push("/login")
      }
    }
    checkAuth()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
      </div>
    )
  }

  const projects = [
    {
      id: "bankeru-games",
      name: "Bankeru Games",
      status: "live",
      players: "17.2K",
      revenue: "$14.5K",
      uptime: "99.9%",
    },
  ]

  const metrics = [
    {
      title: "Active Players",
      value: "17,278",
      change: "+24.8%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Server Uptime",
      value: "99.9%",
      change: "+0.1%",
      trend: "up",
      icon: Server,
    },
    {
      title: "Avg Session",
      value: "24.5m",
      change: "-2.1%",
      trend: "down",
      icon: Clock,
    },
    {
      title: "DAU",
      value: "14,523",
      change: "+10.5%",
      trend: "up",
      icon: Activity,
    },
  ]

  const playerActivityData = [
    { time: "00:00", players: 1200, revenue: 450, sessions: 800 },
    { time: "04:00", players: 800, revenue: 320, sessions: 600 },
    { time: "08:00", players: 2100, revenue: 890, sessions: 1400 },
    { time: "12:00", players: 3500, revenue: 1200, sessions: 2200 },
    { time: "16:00", players: 4200, revenue: 1580, sessions: 2800 },
    { time: "20:00", players: 5100, revenue: 2100, sessions: 3400 },
    { time: "24:00", players: 2800, revenue: 980, sessions: 1900 },
  ]

  const retentionData = [
    { day: "Day 1", retention: 85, players: 8500 },
    { day: "Day 3", retention: 65, players: 6500 },
    { day: "Day 7", retention: 42, players: 4200 },
    { day: "Day 14", retention: 28, players: 2800 },
    { day: "Day 30", retention: 18, players: 1800 },
  ]

  const revenueBreakdownData = [
    { name: "In-App Purchases", value: 6420, color: "#ff007f" },
    { name: "Ads Revenue", value: 1850, color: "#00bcd4" },
    { name: "Premium Upgrades", value: 150, color: "#8b5cf6" },
  ]

  const levelProgressionData = [
    { level: "1-5", players: 2500, completion: 95 },
    { level: "6-10", players: 2100, completion: 88 },
    { level: "11-15", players: 1800, completion: 75 },
    { level: "16-20", players: 1200, completion: 62 },
    { level: "21-25", players: 800, completion: 45 },
    { level: "26-30", players: 400, completion: 28 },
  ]

  const gameServers = [
    { id: "us-east-1", region: "US East", status: "running", players: 4200, cpu: 45, memory: 62, latency: 12 },
    { id: "eu-west-1", region: "EU West", status: "running", players: 3800, cpu: 38, memory: 55, latency: 8 },
    { id: "asia-1", region: "Asia Pacific", status: "degraded", players: 2100, cpu: 78, memory: 85, latency: 45 },
    { id: "us-west-1", region: "US West", status: "stopped", players: 0, cpu: 0, memory: 0, latency: 0 },
  ]

  const recentPlayers = [
    { id: "1", username: "DragonSlayer99", level: 45, lastSeen: "2 min ago", status: "online", country: "US" },
    { id: "2", username: "MagicWizard", level: 32, lastSeen: "1 hour ago", status: "offline", country: "UK" },
    { id: "3", username: "ShadowNinja", level: 67, lastSeen: "5 min ago", status: "online", country: "JP" },
    { id: "4", username: "FireMage", level: 28, lastSeen: "3 hours ago", status: "offline", country: "DE" },
    { id: "5", username: "IceQueen", level: 89, lastSeen: "1 min ago", status: "online", country: "CA" },
  ]

  const economyData = [
    { item: "Gold Coins", total: 2500000, distributed: 1800000, purchased: 450000 },
    { item: "Gems", total: 125000, distributed: 89000, purchased: 78000 },
    { item: "Energy Potions", total: 45000, distributed: 32000, purchased: 12000 },
    { item: "Legendary Sword", total: 1200, distributed: 890, purchased: 890 },
  ]

  const databaseCollections = [
    {
      name: "users",
      documents: 45231,
      size: "128.5 MB",
      reads: "2.1M",
      writes: "456K",
      lastActivity: "2 min ago"
    },
    {
      name: "player_stats",
      documents: 45231,
      size: "89.2 MB",
      reads: "1.8M",
      writes: "324K",
      lastActivity: "1 min ago"
    },
    {
      name: "game_sessions",
      documents: 128450,
      size: "256.8 MB",
      reads: "5.2M",
      writes: "1.2M",
      lastActivity: "30 sec ago"
    },
    {
      name: "leaderboards",
      documents: 1250,
      size: "12.4 MB",
      reads: "890K",
      writes: "45K",
      lastActivity: "3 min ago"
    },
    {
      name: "items_inventory",
      documents: 234560,
      size: "445.2 MB",
      reads: "3.4M",
      writes: "789K",
      lastActivity: "1 min ago"
    }
  ]

  const realtimeConnections = [
    { region: "US East", connections: 4250, latency: "12ms" },
    { region: "EU West", connections: 3890, latency: "8ms" },
    { region: "Asia Pacific", connections: 2100, latency: "45ms" },
    { region: "US West", connections: 1960, latency: "15ms" }
  ]

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-800/95 backdrop-blur-sm border-0 border-b border-slate-700">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-heading bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
                Bankeru Games Console
              </span>
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-center px-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search projects, analytics, settings..."
                className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative text-slate-300 hover:text-white">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Developer" />
                    <AvatarFallback className="bg-slate-700 text-white">JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-slate-800 border-slate-700" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-white">John Developer</p>
                    <p className="text-xs leading-none text-slate-400">john@gamedev.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700/50">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-slate-300 hover:text-white hover:bg-slate-700/50"
                >
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-800/50 border-0 border-r border-slate-700 min-h-[calc(100vh-4rem)]">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold font-heading text-white">Projects</h2>
              <Button
                size="sm"
                className="bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                New
              </Button>
            </div>

            <div className="space-y-2">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedProject === project.id
                      ? "bg-slate-700/50 border border-pink-500/50"
                      : "hover:bg-slate-700/30"
                  }`}
                  onClick={() => setSelectedProject(project.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm text-white">{project.name}</h3>
                    <Badge
                      variant={
                        project.status === "live" ? "default" : project.status === "beta" ? "secondary" : "outline"
                      }
                      className="text-xs"
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-400 space-y-1">
                    <div className="flex justify-between">
                      <span>Players:</span>
                      <span className="text-white">{project.players}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenue:</span>
                      <span className="text-white">{project.revenue}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-2">
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  activeSection === "analytics"
                    ? "text-white bg-slate-700/50 border-l-2 border-pink-500"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
                onClick={() => setActiveSection("analytics")}
              >
                <BarChart3 className="w-4 h-4 mr-3" />
                Analytics
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  activeSection === "servers"
                    ? "text-white bg-slate-700/50 border-l-2 border-pink-500"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
                onClick={() => setActiveSection("servers")}
              >
                <Server className="w-4 h-4 mr-3" />
                Game Servers
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  activeSection === "players"
                    ? "text-white bg-slate-700/50 border-l-2 border-pink-500"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
                onClick={() => setActiveSection("players")}
              >
                <Users className="w-4 h-4 mr-3" />
                Player Management
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  activeSection === "economy"
                    ? "text-white bg-slate-700/50 border-l-2 border-pink-500"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
                onClick={() => setActiveSection("economy")}
              >
                <Coins className="w-4 h-4 mr-3" />
                Economy
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  activeSection === "anticheat"
                    ? "text-white bg-slate-700/50 border-l-2 border-pink-500"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
                onClick={() => setActiveSection("anticheat")}
              >
                <Shield className="w-4 h-4 mr-3" />
                Anti-Cheat
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  activeSection === "liveops"
                    ? "text-white bg-slate-700/50 border-l-2 border-pink-500"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
                onClick={() => setActiveSection("liveops")}
              >
                <Zap className="w-4 h-4 mr-3" />
                LiveOps
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  activeSection === "database"
                    ? "text-white bg-slate-700/50 border-l-2 border-pink-500"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
                onClick={() => setActiveSection("database")}
              >
                <Database className="w-4 h-4 mr-3" />
                Realtime Database
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  activeSection === "settings"
                    ? "text-white bg-slate-700/50 border-l-2 border-pink-500"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
                onClick={() => setActiveSection("settings")}
              >
                <Settings className="w-4 h-4 mr-3" />
                Settings
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeSection === "overview" && (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold font-heading mb-2 text-white">
                  Bankeru Games Dashboard
                </h1>
                <p className="text-slate-400">Monitor your game's performance and manage backend services</p>
              </div>

              {/* Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {metrics.map((metric, index) => (
                  <Card
                    key={index}
                    className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all"
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-white">{metric.title}</CardTitle>
                      <metric.icon className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{metric.value}</div>
                      <div className="flex items-center text-xs text-slate-400">
                        {metric.trend === "up" ? (
                          <TrendingUp className="w-3 h-3 mr-1 text-green-400" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-1 text-red-400" />
                        )}
                        <span className={metric.trend === "up" ? "text-green-400" : "text-red-400"}>
                          {metric.change}
                        </span>
                        <span className="ml-1">from last month</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <Card className="glass-card bg-slate-800/50 border-slate-700 hover:border-pink-500/50">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white">
                      <Activity className="w-5 h-5 mr-2 text-slate-400" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm text-white">Server deployment completed</p>
                        <p className="text-xs text-slate-400">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm text-white">New player milestone reached</p>
                        <p className="text-xs text-slate-400">1 hour ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm text-white">Anti-cheat alert resolved</p>
                        <p className="text-xs text-slate-400">3 hours ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Server Status */}
                <Card className="glass-card bg-slate-800/50 border-slate-700 hover:border-pink-500/50">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white">
                      <Globe className="w-5 h-5 mr-2 text-slate-400" />
                      Global Server Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white">US East</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="text-xs text-slate-400">Operational</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white">EU West</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="text-xs text-slate-400">Operational</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white">Asia Pacific</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                          <span className="text-xs text-slate-400">Degraded</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Chart */}
              <Card className="glass-card bg-slate-800/50 border-slate-700 hover:border-pink-500/50 mt-6">
                <CardHeader>
                  <CardTitle className="text-white">Player Activity (Last 7 Days)</CardTitle>
                  <CardDescription className="text-slate-400">Concurrent players over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={playerActivityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="time" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          border: "1px solid #475569",
                          borderRadius: "8px",
                          color: "#ffffff",
                        }}
                      />
                      <Line type="monotone" dataKey="players" stroke="#00bcd4" strokeWidth={3} name="Active Players" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </>
          )}

          {activeSection === "analytics" && (
            <>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold font-heading text-white">Analytics Dashboard</h1>
                  <p className="text-slate-400">Deep insights into your game's performance</p>
                </div>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700/50"
                      >
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
                  <Select defaultValue="7d">
                    <SelectTrigger className="w-32 bg-slate-800/50 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="1d">Last 24h</SelectItem>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                      <SelectItem value="90d">Last 90 days</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700/50"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {metrics.map((metric, index) => (
                  <Card
                    key={index}
                    className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all"
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-white">{metric.title}</CardTitle>
                      <metric.icon className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{metric.value}</div>
                      <div className="flex items-center text-xs text-slate-400">
                        {metric.trend === "up" ? (
                          <TrendingUp className="w-3 h-3 mr-1 text-green-400" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-1 text-red-400" />
                        )}
                        <span className={metric.trend === "up" ? "text-green-400" : "text-red-400"}>
                          {metric.change}
                        </span>
                        <span className="ml-1">from last period</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Player Activity Chart */}
                <Card className="glass-card bg-slate-800/50 border-slate-700 hover:border-pink-500/50">
                  <CardHeader>
                    <CardTitle className="text-white">Player Activity & Revenue</CardTitle>
                    <CardDescription className="text-slate-400">
                      Concurrent players and revenue over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={playerActivityData}>
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
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="players"
                          stroke="#00bcd4"
                          strokeWidth={3}
                          name="Active Players"
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="revenue"
                          stroke="#ff007f"
                          strokeWidth={3}
                          name="Revenue ($)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Revenue Breakdown Pie Chart */}
                <Card className="glass-card bg-slate-800/50 border-slate-700 hover:border-pink-500/50">
                  <CardHeader>
                    <CardTitle className="text-white">Revenue Breakdown</CardTitle>
                    <CardDescription className="text-slate-400">Revenue sources distribution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={revenueBreakdownData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {revenueBreakdownData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1e293b",
                            border: "1px solid #475569",
                            borderRadius: "8px",
                            color: "#ffffff",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Player Retention Chart */}
                <Card className="glass-card bg-slate-800/50 border-slate-700 hover:border-pink-500/50">
                  <CardHeader>
                    <CardTitle className="text-white">Player Retention</CardTitle>
                    <CardDescription className="text-slate-400">Retention rates over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={retentionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="day" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1e293b",
                            border: "1px solid #475569",
                            borderRadius: "8px",
                            color: "#ffffff",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="retention"
                          stroke="#00bcd4"
                          fill="url(#colorRetention)"
                          strokeWidth={3}
                        />
                        <defs>
                          <linearGradient id="colorRetention" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00bcd4" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#00bcd4" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Level Progression Chart */}
                <Card className="glass-card bg-slate-800/50 border-slate-700 hover:border-pink-500/50">
                  <CardHeader>
                    <CardTitle className="text-white">Level Progression</CardTitle>
                    <CardDescription className="text-slate-400">Player distribution across levels</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={levelProgressionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="level" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1e293b",
                            border: "1px solid #475569",
                            borderRadius: "8px",
                            color: "#ffffff",
                          }}
                        />
                        <Bar dataKey="players" fill="#ff007f" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {activeSection === "servers" && (
            <>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold font-heading text-white">Game Servers</h1>
                  <p className="text-slate-400">Manage your dedicated game servers worldwide</p>
                </div>
                <Button className="bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Deploy New Server
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Total Servers</CardTitle>
                    <Server className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">4</div>
                    <p className="text-xs text-slate-400">3 running, 1 stopped</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Active Players</CardTitle>
                    <Users className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">10,100</div>
                    <p className="text-xs text-slate-400">Across all regions</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Avg Latency</CardTitle>
                    <Activity className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">22ms</div>
                    <p className="text-xs text-green-400">Excellent performance</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Monthly Cost</CardTitle>
                    <DollarSign className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">$1,240</div>
                    <p className="text-xs text-slate-400">Auto-scaling enabled</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Server Status</CardTitle>
                  <CardDescription className="text-slate-400">Monitor all your game servers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {gameServers.map((server) => (
                      <div key={server.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              server.status === "running"
                                ? "bg-green-500"
                                : server.status === "degraded"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                          />
                          <div>
                            <h3 className="font-medium text-white">{server.region}</h3>
                            <p className="text-sm text-slate-400">{server.id}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="text-center">
                            <p className="text-white font-medium">{server.players}</p>
                            <p className="text-slate-400">Players</p>
                          </div>
                          <div className="text-center">
                            <p className="text-white font-medium">{server.cpu}%</p>
                            <p className="text-slate-400">CPU</p>
                          </div>
                          <div className="text-center">
                            <p className="text-white font-medium">{server.memory}%</p>
                            <p className="text-slate-400">Memory</p>
                          </div>
                          <div className="text-center">
                            <p className="text-white font-medium">{server.latency}ms</p>
                            <p className="text-slate-400">Latency</p>
                          </div>
                          <div className="flex space-x-2">
                            {server.status === "running" ? (
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-slate-600 text-slate-300 bg-transparent"
                              >
                                <Pause className="w-4 h-4" />
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-slate-600 text-slate-300 bg-transparent"
                              >
                                <Play className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-slate-600 text-slate-300 bg-transparent"
                            >
                              <Settings className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeSection === "players" && (
            <>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold font-heading text-white">Player Management</h1>
                  <p className="text-slate-400">Monitor and manage your player base</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="bg-slate-800/50 border-slate-600 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Export Players
                  </Button>
                  <Button className="bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Notification
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Total Players</CardTitle>
                    <Users className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">45,231</div>
                    <p className="text-xs text-green-400">+12% this month</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Online Now</CardTitle>
                    <UserCheck className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">12,543</div>
                    <p className="text-xs text-slate-400">Peak: 18,420</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">New Today</CardTitle>
                    <Trophy className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">1,234</div>
                    <p className="text-xs text-green-400">+8% vs yesterday</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Banned</CardTitle>
                    <Ban className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">89</div>
                    <p className="text-xs text-red-400">Anti-cheat actions</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Players</CardTitle>
                  <CardDescription className="text-slate-400">Latest player activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentPlayers.map((player) => (
                      <div key={player.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-slate-600 text-white">
                              {player.username.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium text-white">{player.username}</h3>
                            <p className="text-sm text-slate-400">
                              Level {player.level} • {player.country}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm text-white">{player.lastSeen}</p>
                            <div className="flex items-center space-x-1">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  player.status === "online" ? "bg-green-500" : "bg-slate-500"
                                }`}
                              />
                              <span className="text-xs text-slate-400">{player.status}</span>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-slate-400">
                                <Settings className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-slate-800 border-slate-700">
                              <DropdownMenuItem className="text-slate-300">
                                <Eye className="mr-2 h-4 w-4" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-slate-300">
                                <Mail className="mr-2 h-4 w-4" />
                                Send Message
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-400">
                                <Ban className="mr-2 h-4 w-4" />
                                Ban Player
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeSection === "economy" && (
            <>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold font-heading text-white">Virtual Economy</h1>
                  <p className="text-slate-400">Manage in-game currencies and items</p>
                </div>
                <Button className="bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Item
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">$8,420</div>
                    <p className="text-xs text-green-400">+15% this month</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Items Sold</CardTitle>
                    <Coins className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">23,456</div>
                    <p className="text-xs text-slate-400">Last 30 days</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">ARPU</CardTitle>
                    <Target className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">$6.72</div>
                    <p className="text-xs text-green-400">+3% vs last month</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Conversion</CardTitle>
                    <TrendingUp className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">4.2%</div>
                    <p className="text-xs text-slate-400">Players who purchase</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Virtual Items</CardTitle>
                  <CardDescription className="text-slate-400">Manage your in-game economy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {economyData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-cyan-400 rounded-lg flex items-center justify-center">
                            <Coins className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{item.item}</h3>
                            <p className="text-sm text-slate-400">Total: {item.total.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="text-center">
                            <p className="text-white font-medium">{item.distributed.toLocaleString()}</p>
                            <p className="text-slate-400">Distributed</p>
                          </div>
                          <div className="text-center">
                            <p className="text-white font-medium">{item.purchased.toLocaleString()}</p>
                            <p className="text-slate-400">Purchased</p>
                          </div>
                          <div className="text-center">
                            <p className="text-white font-medium">
                              {((item.purchased / item.distributed) * 100).toFixed(1)}%
                            </p>
                            <p className="text-slate-400">Conversion</p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-slate-600 text-slate-300 bg-transparent"
                          >
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeSection === "anticheat" && (
            <>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold font-heading text-white">Anti-Cheat System</h1>
                  <p className="text-slate-400">Monitor and prevent cheating in your game</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="bg-slate-800/50 border-slate-600 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                  <Button className="bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white">
                    <Shield className="w-4 h-4 mr-2" />
                    Update Rules
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Threats Blocked</CardTitle>
                    <Shield className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">1,234</div>
                    <p className="text-xs text-green-400">Last 30 days</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Players Banned</CardTitle>
                    <Ban className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">89</div>
                    <p className="text-xs text-red-400">Permanent bans</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Detection Rate</CardTitle>
                    <Target className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">99.7%</div>
                    <p className="text-xs text-green-400">Excellent coverage</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">False Positives</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">0.3%</div>
                    <p className="text-xs text-slate-400">Very low rate</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Detections</CardTitle>
                    <CardDescription className="text-slate-400">Latest anti-cheat actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                          <div>
                            <p className="text-sm font-medium text-white">Speed Hack Detected</p>
                            <p className="text-xs text-slate-400">Player: CheatMaster99</p>
                          </div>
                        </div>
                        <Badge variant="destructive">Banned</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Shield className="w-5 h-5 text-yellow-400" />
                          <div>
                            <p className="text-sm font-medium text-white">Suspicious Activity</p>
                            <p className="text-xs text-slate-400">Player: SuspiciousUser</p>
                          </div>
                        </div>
                        <Badge variant="secondary">Monitoring</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <div>
                            <p className="text-sm font-medium text-white">False Positive Resolved</p>
                            <p className="text-xs text-slate-400">Player: LegitPlayer123</p>
                          </div>
                        </div>
                        <Badge variant="outline">Cleared</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Protection Settings</CardTitle>
                    <CardDescription className="text-slate-400">Configure anti-cheat rules</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="speed-detection" className="text-white">
                          Speed Hack Detection
                        </Label>
                        <p className="text-xs text-slate-400">Detect abnormal movement speeds</p>
                      </div>
                      <Switch id="speed-detection" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="memory-protection" className="text-white">
                          Memory Protection
                        </Label>
                        <p className="text-xs text-slate-400">Prevent memory manipulation</p>
                      </div>
                      <Switch id="memory-protection" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="statistical-analysis" className="text-white">
                          Statistical Analysis
                        </Label>
                        <p className="text-xs text-slate-400">Analyze player behavior patterns</p>
                      </div>
                      <Switch id="statistical-analysis" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="auto-ban" className="text-white">
                          Automatic Banning
                        </Label>
                        <p className="text-xs text-slate-400">Auto-ban confirmed cheaters</p>
                      </div>
                      <Switch id="auto-ban" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {activeSection === "liveops" && (
            <>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold font-heading text-white">LiveOps Dashboard</h1>
                  <p className="text-slate-400">Manage live events and campaigns</p>
                </div>
                <Button className="bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Active Events</CardTitle>
                    <Flame className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">3</div>
                    <p className="text-xs text-green-400">2 ending soon</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Participation</CardTitle>
                    <Users className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">78%</div>
                    <p className="text-xs text-slate-400">Of active players</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Event Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">$2,340</div>
                    <p className="text-xs text-green-400">This week</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Notifications Sent</CardTitle>
                    <Bell className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">45.2K</div>
                    <p className="text-xs text-slate-400">Last 7 days</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Active Events</CardTitle>
                    <CardDescription className="text-slate-400">Currently running campaigns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-700/30 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-white">Double XP Weekend</h3>
                          <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                        </div>
                        <p className="text-sm text-slate-400 mb-3">Players earn 2x experience points</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Ends in: 2 days</span>
                          <span className="text-white">12,543 participants</span>
                        </div>
                      </div>
                      <div className="p-4 bg-slate-700/30 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-white">Summer Sale</h3>
                          <Badge className="bg-blue-500/20 text-blue-400">Active</Badge>
                        </div>
                        <p className="text-sm text-slate-400 mb-3">50% off premium items</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Ends in: 5 days</span>
                          <span className="text-white">$1,890 revenue</span>
                        </div>
                      </div>
                      <div className="p-4 bg-slate-700/30 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-white">Boss Battle Event</h3>
                          <Badge className="bg-purple-500/20 text-purple-400">Active</Badge>
                        </div>
                        <p className="text-sm text-slate-400 mb-3">Special raid boss with exclusive rewards</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Ends in: 1 day</span>
                          <span className="text-white">8,921 participants</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Create New Event</CardTitle>
                    <CardDescription className="text-slate-400">Launch a new campaign</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-white font-medium text-sm block">Event Name</label>
                      <Input
                        placeholder="Enter event name"
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-white font-medium text-sm block">Event Description</label>
                      <Input
                        placeholder="Enter event description"
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-white font-medium text-sm block">Start Date</label>
                      <Input
                        type="datetime-local"
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-white font-medium text-sm block">End Date</label>
                      <Input
                        type="datetime-local"
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white">
                      <Gift className="w-4 h-4 mr-2" />
                      Create Event
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {activeSection === "database" && (
            <>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold font-heading text-white">Realtime Database</h1>
                  <p className="text-slate-400">Monitor and manage your game's data collections</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="bg-slate-800/50 border-slate-600 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                  <Button className="bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    New Collection
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Total Documents</CardTitle>
                    <Server className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">454,722</div>
                    <p className="text-xs text-green-400">+12% this month</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Database Size</CardTitle>
                    <Activity className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">932.1 MB</div>
                    <p className="text-xs text-slate-400">75% of quota</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Read Operations</CardTitle>
                    <Eye className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">13.4M</div>
                    <p className="text-xs text-green-400">Last 30 days</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Write Operations</CardTitle>
                    <Settings className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">2.8M</div>
                    <p className="text-xs text-slate-400">Last 30 days</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Collections Overview</CardTitle>
                    <CardDescription className="text-slate-400">Data collections in your database</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {databaseCollections.map((collection, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-cyan-400 rounded-lg flex items-center justify-center">
                              <Server className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-medium text-white">{collection.name}</h3>
                              <p className="text-sm text-slate-400">{collection.documents.toLocaleString()} documents • {collection.size}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-6 text-sm">
                            <div className="text-center">
                              <p className="text-white font-medium">{collection.reads}</p>
                              <p className="text-slate-400">Reads</p>
                            </div>
                            <div className="text-center">
                              <p className="text-white font-medium">{collection.writes}</p>
                              <p className="text-slate-400">Writes</p>
                            </div>
                            <div className="text-center">
                              <p className="text-white font-medium">{collection.lastActivity}</p>
                              <p className="text-slate-400">Last Activity</p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-slate-600 text-slate-300 bg-transparent"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Realtime Connections</CardTitle>
                    <CardDescription className="text-slate-400">Active websocket connections by region</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {realtimeConnections.map((connection, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <div>
                              <h3 className="font-medium text-white">{connection.region}</h3>
                              <p className="text-sm text-slate-400">Latency: {connection.latency}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-medium">{connection.connections.toLocaleString()}</p>
                            <p className="text-slate-400 text-sm">connections</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-slate-700/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">Total Active Connections</span>
                        <span className="text-white font-bold">12,200</span>
                      </div>
                      <div className="text-sm text-slate-400">
                        Peak today: 18,420 connections
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Database Activity</CardTitle>
                  <CardDescription className="text-slate-400">Real-time database operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={playerActivityData}>
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
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="players"
                        stroke="#00bcd4"
                        strokeWidth={3}
                        name="Read Operations (K)"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="sessions"
                        stroke="#ff007f"
                        strokeWidth={3}
                        name="Write Operations"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </>
          )}

          {activeSection === "settings" && (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold font-heading text-white">Settings</h1>
                <p className="text-slate-400">Configure your project settings and preferences</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">General Settings</CardTitle>
                    <CardDescription className="text-slate-400">Configure your game settings and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-white font-medium text-sm block">Game Name</label>
                      <Input
                        placeholder="Bankeru Games"
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-white font-medium text-sm block">API Key</label>
                      <Input
                        placeholder="Enter API key"
                        type="password"
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-white font-medium text-sm block">Server Region</label>
                      <Input
                        placeholder="US East"
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-white font-medium text-sm block">Max Players per Game</label>
                      <Input
                        placeholder="100"
                        type="number"
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Security Settings</CardTitle>
                    <CardDescription className="text-slate-400">Configure security and access controls</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="two-factor" className="text-white">
                          Two-Factor Authentication
                        </Label>
                        <p className="text-xs text-slate-400">Add extra security to your account</p>
                      </div>
                      <Switch id="two-factor" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="api-access" className="text-white">
                          API Access Logging
                        </Label>
                        <p className="text-xs text-slate-400">Log all API requests</p>
                      </div>
                      <Switch id="api-access" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="ip-whitelist" className="text-white">
                          IP Whitelisting
                        </Label>
                        <p className="text-xs text-slate-400">Restrict access by IP address</p>
                      </div>
                      <Switch id="ip-whitelist" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Notification Settings</CardTitle>
                    <CardDescription className="text-slate-400">Manage your notification preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-alerts" className="text-white">
                          Email Alerts
                        </Label>
                        <p className="text-xs text-slate-400">Receive important updates via email</p>
                      </div>
                      <Switch id="email-alerts" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="server-alerts" className="text-white">
                          Server Alerts
                        </Label>
                        <p className="text-xs text-slate-400">Get notified of server issues</p>
                      </div>
                      <Switch id="server-alerts" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="security-alerts" className="text-white">
                          Security Alerts
                        </Label>
                        <p className="text-xs text-slate-400">Anti-cheat and security notifications</p>
                      </div>
                      <Switch id="security-alerts" defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Billing & Usage</CardTitle>
                    <CardDescription className="text-slate-400">Monitor your usage and billing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Current Plan</span>
                      <Badge className="bg-gradient-to-r from-pink-500 to-cyan-400 text-white">Pro</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Monthly Usage</span>
                      <span className="text-slate-400">$1,240 / $2,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Next Billing</span>
                      <span className="text-slate-400">March 15, 2024</span>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full border-slate-600 text-white hover:bg-slate-700/50 bg-transparent"
                    >
                      View Billing Details
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}