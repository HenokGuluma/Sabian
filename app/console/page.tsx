"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Calendar as CalendarIcon,
  Mail,
  Phone,
  Clock,
  Star,
  Trophy,
  Zap,
  Activity,
  BarChart3,
  Database,
  FileText,
  Percent,
} from "lucide-react";
import {
  userDatabase,
  playerStatsDatabase,
  gameSessionsDatabase,
  analyticsData,
} from "@/lib/database";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
} from "recharts";
import {
  AlertTriangle,
  CheckCircle,
  Ban,
  Gift,
  Shield,
  Target,
  Flame,
  Coins,
  Server,
  RefreshCw,
  TrendingDown,
  Loader2,
  Globe,
  UserCheck,
  Eye,
  Pause,
  Play,
} from "lucide-react";

export default function ConsolePage() {
  const [selectedProject, setSelectedProject] = useState("bankeru-games");
  const [activeSection, setActiveSection] = useState("overview");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2024, 10, 1), // November 2024
    to: new Date(2025, 8, 30),   // September 2025
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("isAuthenticated");
      if (auth === "true") {
        setIsAuthenticated(true);
        setTimeout(() => setIsLoading(false), 1000); // Reduced timeout for faster loading
      } else {
        router.push("/login");
      }
    };
    checkAuth();
  }, [router]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchContainer = document.querySelector('.search-container');
      if (searchContainer && !searchContainer.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to determine if the current user has full data access
  const hasFullDataAccess = () => {
    // Check if this is a developer account
    const userType = localStorage.getItem("userType");
    return userType === "developer";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
      </div>
    );
  }

  const projects: any[] = [];

  const metrics = hasFullDataAccess() ? [
    {
      title: "Total Players",
      value: "26,378",
      change: "+20.1%",
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
      title: "WAU",
      value: "9,877",
      change: "+15.3%",
      trend: "up",
      icon: Activity,
    },
  ] : [
    {
      title: "Total Players",
      value: "0",
      change: "0%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Server Uptime",
      value: "0%",
      change: "0%",
      trend: "up",
      icon: Server,
    },
    {
      title: "Avg Session",
      value: "0m",
      change: "0%",
      trend: "up",
      icon: Clock,
    },
    {
      title: "WAU",
      value: "0",
      change: "0%",
      trend: "up",
      icon: Activity,
    },
  ];

  // Function to generate weekly data
  const generateWeeklyData = (
    startPlayerCount: number,
    endPlayerCount: number,
    startDate: Date,
    endDate: Date
  ) => {
    const data = [];
    const numDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const weeklyIncrease = (endPlayerCount - startPlayerCount) / (numDays / 7);
    let currentPlayers = startPlayerCount;

    for (let i = 0; i < numDays; i += 7) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      const formattedDate = `${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

      // Simulate choppy revenue
      const revenueIncrease = Math.random() * 500 - 250; // Random increase/decrease between -250 and 250
      const currentRevenue = Math.max(0, (data.length > 0 ? data[data.length - 1].revenue : 0) + revenueIncrease);

      // Ensure player count doesn't decrease and reaches the target
      currentPlayers = Math.max(currentPlayers, startPlayerCount + (weeklyIncrease * (i / 7)));
      if (i + 7 >= numDays) { // Ensure the last data point reaches the exact end value
        currentPlayers = endPlayerCount;
      }

      data.push({
        time: formattedDate,
        players: Math.round(currentPlayers),
        revenue: Math.round(currentRevenue),
        month: currentDate.getMonth(),
        year: currentDate.getFullYear()
      });
    }
    return data;
  };

  // Generate player growth data from Nov 2024 to Sep 2025
  const playerGrowthData = hasFullDataAccess() ? [
    // November 2024 - Starting flat around 247
    { time: "Nov 1, 2024", players: 247, revenue: 180, month: 10, year: 2024 },
    { time: "Nov 8, 2024", players: 251, revenue: 185, month: 10, year: 2024 },
    { time: "Nov 15, 2024", players: 245, revenue: 175, month: 10, year: 2024 },
    { time: "Nov 22, 2024", players: 249, revenue: 190, month: 10, year: 2024 },
    { time: "Nov 29, 2024", players: 253, revenue: 195, month: 10, year: 2024 },

    // December 2024 - Slight increase
    { time: "Dec 6, 2024", players: 258, revenue: 210, month: 11, year: 2024 },
    { time: "Dec 13, 2024", players: 261, revenue: 225, month: 11, year: 2024 },
    { time: "Dec 20, 2024", players: 267, revenue: 240, month: 11, year: 2024 },
    { time: "Dec 27, 2024", players: 285, revenue: 260, month: 11, year: 2024 },

    // January 2025 - Gradual growth begins
    { time: "Jan 3, 2025", players: 298, revenue: 285, month: 0, year: 2025 },
    { time: "Jan 10, 2025", players: 315, revenue: 310, month: 0, year: 2025 },
    { time: "Jan 17, 2025", players: 342, revenue: 340, month: 0, year: 2025 },
    { time: "Jan 24, 2025", players: 375, revenue: 375, month: 0, year: 2025 },
    { time: "Jan 31, 2025", players: 420, revenue: 420, month: 0, year: 2025 },

    // February 2025 - More noticeable growth
    { time: "Feb 7, 2025", players: 480, revenue: 480, month: 1, year: 2025 },
    { time: "Feb 14, 2025", players: 650, revenue: 620, month: 1, year: 2025 },
    { time: "Feb 21, 2025", players: 850, revenue: 780, month: 1, year: 2025 },
    { time: "Feb 28, 2025", players: 1200, revenue: 980, month: 1, year: 2025 },

    // March 2025 - Steady acceleration
    { time: "Mar 7, 2025", players: 1380, revenue: 1150, month: 2, year: 2025 },
    { time: "Mar 14, 2025", players: 1580, revenue: 1320, month: 2, year: 2025 },
    { time: "Mar 21, 2025", players: 1750, revenue: 1480, month: 2, year: 2025 },
    { time: "Mar 28, 2025", players: 1850, revenue: 1580, month: 2, year: 2025 },

    // April 2025 - Continued growth
    { time: "Apr 4, 2025", players: 2100, revenue: 1750, month: 3, year: 2025 },
    { time: "Apr 11, 2025", players: 2350, revenue: 1920, month: 3, year: 2025 },
    { time: "Apr 18, 2025", players: 2650, revenue: 2180, month: 3, year: 2025 },
    { time: "Apr 25, 2025", players: 2900, revenue: 2450, month: 3, year: 2025 },

    // May 2025 - Major breakthrough begins
    { time: "May 2, 2025", players: 3500, revenue: 2850, month: 4, year: 2025 },
    { time: "May 9, 2025", players: 4800, revenue: 3650, month: 4, year: 2025 },
    { time: "May 16, 2025", players: 6200, revenue: 4680, month: 4, year: 2025 },
    { time: "May 23, 2025", players: 7800, revenue: 5920, month: 4, year: 2025 },
    { time: "May 30, 2025", players: 8500, revenue: 6450, month: 4, year: 2025 },

    // June 2025 - Sustained growth
    { time: "Jun 6, 2025", players: 9800, revenue: 7400, month: 5, year: 2025 },
    { time: "Jun 13, 2025", players: 11200, revenue: 8450, month: 5, year: 2025 },
    { time: "Jun 20, 2025", players: 12100, revenue: 9100, month: 5, year: 2025 },
    { time: "Jun 27, 2025", players: 12400, revenue: 9350, month: 5, year: 2025 },

    // July 2025 - Peak growth phase
    { time: "Jul 4, 2025", players: 14200, revenue: 10650, month: 6, year: 2025 },
    { time: "Jul 11, 2025", players: 15800, revenue: 11850, month: 6, year: 2025 },
    { time: "Jul 18, 2025", players: 16500, revenue: 12400, month: 6, year: 2025 },
    { time: "Jul 25, 2025", players: 16800, revenue: 12600, month: 6, year: 2025 },

    // August 2025 - Stabilizing at high levels
    { time: "Aug 1, 2025", players: 18200, revenue: 13650, month: 7, year: 2025 },
    { time: "Aug 8, 2025", players: 18900, revenue: 14200, month: 7, year: 2025 },
    { time: "Aug 15, 2025", players: 19100, revenue: 14350, month: 7, year: 2025 },
    { time: "Aug 22, 2025", players: 19200, revenue: 14400, month: 7, year: 2025 },
    { time: "Aug 29, 2025", players: 20500, revenue: 15350, month: 7, year: 2025 },

    // September 2025 - Reaching target of 26,378 players
    { time: "Sep 5, 2025", players: 22800, revenue: 17100, month: 8, year: 2025 },
    { time: "Sep 12, 2025", players: 24500, revenue: 18400, month: 8, year: 2025 },
    { time: "Sep 19, 2025", players: 25800, revenue: 19350, month: 8, year: 2025 },
    { time: "Sep 26, 2025", players: 26378, revenue: 19780, month: 8, year: 2025 },
  ] : [];

  // Filter data based on the selected date range
  const filteredPlayerActivityData = playerGrowthData.filter(data => {
    const dataDate = new Date(data.year, data.month, 1); // Use the first of the month for simplicity in filtering
    return dataDate >= dateRange?.from && dataDate <= dateRange?.to;
  });

  const retentionData = hasFullDataAccess() ? [
    { day: "Nov 2024", retention: 45, players: 247 },
    { day: "Dec 2024", retention: 48, players: 450 },
    { day: "Jan 2025", retention: 50, players: 700 },
    { day: "Feb 2025", retention: 55, players: 1200 },
    { day: "Mar 2025", retention: 60, players: 1850 },
    { day: "Apr 2025", retention: 68, players: 2900 },
    { day: "May 2025", retention: 75, players: 8500 },
    { day: "Jun 2025", retention: 80, players: 12400 },
    { day: "Jul 2025", retention: 82, players: 16800 },
    { day: "Aug 2025", retention: 85, players: 19200 },
    { day: "Sep 2025", retention: 88, players: 26378 },
  ] : [];


  const revenueBreakdownData = [
    { name: "In-App Purchases", value: 6420, color: "#ff007f" },
    { name: "Ads Revenue", value: 1850, color: "#00bcd4" },
    { name: "Premium Upgrades", value: 150, color: "#8b5cf6" },
  ];

  const levelProgressionData = hasFullDataAccess() ? [
    { level: "1-5", players: 2500, completion: 95 },
    { level: "6-10", players: 2100, completion: 88 },
    { level: "11-15", players: 1800, completion: 75 },
    { level: "16-20", players: 1200, completion: 62 },
    { level: "21-25", players: 800, completion: 45 },
    { level: "26-30", players: 400, completion: 28 },
  ] : [];

  const gameServers = hasFullDataAccess() ? [
    {
      id: "us-east-1",
      region: "US East",
      status: "running",
      players: 4200,
      cpu: 45,
      memory: 62,
      latency: 12,
    },
    {
      id: "eu-west-1",
      region: "EU West",
      status: "running",
      players: 3800,
      cpu: 38,
      memory: 55,
      latency: 8,
    },
    {
      id: "asia-1",
      region: "Asia Pacific",
      status: "degraded",
      players: 2100,
      cpu: 78,
      memory: 85,
      latency: 45,
    },
    {
      id: "us-west-1",
      region: "US West",
      status: "stopped",
      players: 0,
      cpu: 0,
      memory: 0,
      latency: 0,
    },
  ] : [];

  const recentPlayers = hasFullDataAccess() ? [
    {
      id: "1",
      username: "DragonSlayer99",
      level: 45,
      lastSeen: "2 min ago",
      status: "online",
      country: "US",
    },
    {
      id: "2",
      username: "MagicWizard",
      level: 32,
      lastSeen: "1 hour ago",
      status: "offline",
      country: "UK",
    },
    {
      id: "3",
      username: "ShadowNinja",
      level: 67,
      lastSeen: "5 min ago",
      status: "online",
      country: "JP",
    },
    {
      id: "4",
      username: "FireMage",
      level: 28,
      lastSeen: "3 hours ago",
      status: "offline",
      country: "DE",
    },
    {
      id: "5",
      username: "IceQueen",
      level: 89,
      lastSeen: "1 min ago",
      status: "online",
      country: "CA",
    },
  ] : [];

  const economyData = hasFullDataAccess() ? [
    {
      item: "Gold Coins",
      total: 2500000,
      distributed: 1800000,
      purchased: 450000,
    },
    { item: "Gems", total: 125000, distributed: 89000, purchased: 78000 },
    {
      item: "Energy Potions",
      total: 45000,
      distributed: 32000,
      purchased: 12000,
    },
    { item: "Legendary Sword", total: 1200, distributed: 890, purchased: 890 },
  ] : [];

  const databaseCollections = hasFullDataAccess() ? [
    {
      name: "users",
      documents: 16000,
      size: "45.8 MB",
      reads: "2.1M",
      writes: "456K",
      lastActivity: "2 min ago",
    },
    {
      name: "player_stats",
      documents: 16000,
      size: "32.4 MB",
      reads: "1.8M",
      writes: "324K",
      lastActivity: "1 min ago",
    },
    {
      name: "game_sessions",
      documents: 25000,
      size: "156.2 MB",
      reads: "5.2M",
      writes: "1.2M",
      lastActivity: "30 sec ago",
    },
    {
      name: "leaderboards",
      documents: 1250,
      size: "12.4 MB",
      reads: "890K",
      writes: "45K",
      lastActivity: "3 min ago",
    },
    {
      name: "items_inventory",
      documents: 48000,
      size: "89.5 MB",
      reads: "3.4M",
      writes: "789K",
      lastActivity: "1 min ago",
    },
  ] : [];

  const realtimeConnections = hasFullDataAccess() ? [
    { region: "US East", connections: 4250, latency: "12ms" },
    { region: "EU West", connections: 3890, latency: "8ms" },
    { region: "Asia Pacific", connections: 2100, latency: "45ms" },
    { region: "US West", connections: 1960, latency: "15ms" },
  ] : [];

  // Search functionality
  const searchableItems = [
    { name: "Overview", section: "overview", keywords: ["overview", "dashboard", "summary", "metrics", "home"] },
    { name: "Analytics", section: "analytics", keywords: ["analytics", "charts", "data", "metrics", "stats", "performance"] },
    { name: "Game Servers", section: "servers", keywords: ["servers", "regions", "uptime", "latency", "cpu", "memory", "infrastructure"] },
    { name: "Player Management", section: "players", keywords: ["players", "users", "profiles", "management", "online", "community"] },
    { name: "LiveOps", section: "liveops", keywords: ["liveops", "events", "campaigns", "notifications", "operations"] },
    { name: "Database", section: "database", keywords: ["database", "collections", "documents", "realtime", "data", "storage"] },
    { name: "Settings", section: "settings", keywords: ["settings", "configuration", "api", "security", "billing", "preferences"] },
  ];

  const filteredSearchResults = searchQuery.trim()
    ? searchableItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setShowSearchResults(value.length > 0);
  };

  const handleSearchSelect = (section: string) => {
    setActiveSection(section);
    setSearchQuery("");
    setShowSearchResults(false);
  };

  const handleCreateProject = () => {
    // Here you would typically make an API call to create the project
    console.log("Creating new project:", { name: newProjectName, description: newProjectDescription });
    setShowNewProjectDialog(false);
    setNewProjectName("");
    setNewProjectDescription("");
  };

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
                Sabian Console
              </span>
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-center px-6">
            <div className="relative w-full max-w-md search-container">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search projects, analytics, settings..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
              />

              {/* Search Results Dropdown */}
              {showSearchResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-600 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                  {filteredSearchResults.length > 0 ? (
                    <div className="py-2">
                      {filteredSearchResults.map((item) => (
                        <button
                          key={item.section}
                          onClick={() => handleSearchSelect(item.section)}
                          className="w-full px-4 py-2 text-left text-white hover:bg-slate-700/50 transition-colors flex items-center space-x-3"
                        >
                          <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                          <span>{item.name}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="py-4 px-4 text-center text-slate-400">
                      No results found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="relative text-slate-300 hover:text-white"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="Developer"
                    />
                    <AvatarFallback className="bg-slate-700 text-white">
                      HT
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-slate-800 border-slate-700"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-white">
                      {localStorage.getItem("userName") || "User"}
                    </p>
                    <p className="text-xs leading-none text-slate-400">
                      {localStorage.getItem("userEmail") || "user@example.com"}
                    </p>
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
              <h2 className="text-lg font-semibold font-heading text-white">
                Projects
              </h2>
              <Dialog open={showNewProjectDialog} onOpenChange={setShowNewProjectDialog}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-800 border-slate-700 text-white">
                  <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                    <DialogDescription className="text-slate-400">
                      Create a new gaming project to start building your next great game.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="project-name" className="text-white">Project Name</Label>
                      <Input
                        id="project-name"
                        placeholder="Enter project name"
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value)}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-description" className="text-white">Description</Label>
                      <Textarea
                        id="project-description"
                        placeholder="Describe your project"
                        value={newProjectDescription}
                        onChange={(e) => setNewProjectDescription(e.target.value)}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setShowNewProjectDialog(false)}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleCreateProject}
                        disabled={!newProjectName.trim()}
                        className="bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white"
                      >
                        Create Project
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {projects.length > 0 ? (
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
                      <h3 className="font-medium text-sm text-white">
                        {project.name}
                      </h3>
                      <Badge
                        variant={
                          project.status === "live"
                            ? "default"
                            : project.status === "beta"
                              ? "secondary"
                              : "outline"
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
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-slate-400 text-sm mb-4">No projects yet</div>
                <div className="text-slate-500 text-xs">Create your first project to get started</div>
              </div>
            )}

            <div className="mt-8 space-y-2">
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  activeSection === "overview"
                    ? "text-white bg-slate-700/50 border-l-2 border-pink-500"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
                onClick={() => setActiveSection("overview")}
              >
                <Activity className="w-4 h-4 mr-3" />
                Overview
              </Button>
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
              <Link href="/console/database">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700/50 ml-4"
                >
                  <FileText className="w-4 h-4 mr-3" />
                  Browse Database
                </Button>
              </Link>
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
                  Sabian Console Dashboard
                </h1>
                <p className="text-slate-400">
                  Monitor your game's performance and manage backend services
                </p>
              </div>

              {/* Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {metrics.map((metric, index) => (
                  <Card key={index} className="bg-slate-800/50 border-slate-700">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-200">{metric.title}</CardTitle>
                      <metric.icon className="h-4 w-4 text-pink-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{hasFullDataAccess() ? metric.value : "0"}</div>
                      <p className={`text-xs ${metric.trend === "up" ? "text-green-400" : metric.trend === "down" ? "text-red-400" : "text-slate-400"}`}>
                        {hasFullDataAccess() ? metric.change : "No data available"}
                      </p>
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
                        <p className="text-sm text-white">
                          Server deployment completed
                        </p>
                        <p className="text-xs text-slate-400">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm text-white">
                          New player milestone reached
                        </p>
                        <p className="text-xs text-slate-400">1 hour ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm text-white">
                          Anti-cheat alert resolved
                        </p>
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
                          <span className="text-xs text-slate-400">
                            Operational
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white">EU West</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="text-xs text-slate-400">
                            Operational
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white">Asia Pacific</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                          <span className="text-xs text-slate-400">
                            Degraded
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Chart - Full Width */}
              <div className="col-span-full mt-6">
                <Card className="glass-card bg-slate-800/50 border-slate-700 hover:border-pink-500/50">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Player Growth & Revenue (Nov 2024 - Sep 2025)
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      {hasFullDataAccess() 
                        ? "Player growth and revenue from November 2024 to September 2025" 
                        : "No data available - start building your game to see analytics"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={hasFullDataAccess() ? filteredPlayerActivityData : []}>
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
                          name="Total Players"
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
              </div>
            </>
          )}

          {activeSection === "analytics" && (
            <>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold font-heading text-white">
                    Analytics Dashboard
                  </h1>
                  <p className="text-slate-400">
                    Deep insights into your game's performance
                  </p>
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
                              {format(dateRange.from, "LLL dd, y")} -{" "}
                              {format(dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 bg-slate-800 border-slate-600"
                      align="start"
                    >
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
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700/50"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {metrics.map((metric, index) => (
                  <Card key={index} className="bg-slate-800/50 border-slate-700">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-200">{metric.title}</CardTitle>
                      <metric.icon className="h-4 w-4 text-pink-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{hasFullDataAccess() ? metric.value : "0"}</div>
                      <p className={`text-xs ${metric.trend === "up" ? "text-green-400" : metric.trend === "down" ? "text-red-400" : "text-slate-400"}`}>
                        {hasFullDataAccess() ? metric.change : "No data available"}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Player Activity Chart - Full Width */}
              <div className="mb-8">
                <Card className="glass-card bg-slate-800/50 border-slate-700 hover:border-pink-500/50">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Player Growth & Revenue (Nov 2024 - Sep 2025)
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      {hasFullDataAccess() 
                        ? "Growth from November 2024 to September 2025" 
                        : "No data available - start building your game to see analytics"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={hasFullDataAccess() ? filteredPlayerActivityData : []}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="time" stroke="#9ca3af" />
                        <YAxis yAxisId="left" stroke="#9ca3af" />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          stroke="#9ca3af"
                        />
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
                          name="Total Players"
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
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Player Retention Chart */}
                <Card className="glass-card bg-slate-800/50 border-slate-700 hover:border-pink-500/50">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Player Retention Growth
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Improving retention rates November 2024 - September 2025
                    </CardDescription>
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
                          <linearGradient
                            id="colorRetention"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#00bcd4"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#00bcd4"
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                        </defs>
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Level Progression Chart */}
                <Card className="glass-card bg-slate-800/50 border-slate-700 hover:border-pink-500/50">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Level Progression
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Player distribution across levels
                    </CardDescription>
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
                  <h1 className="text-3xl font-bold font-heading text-white">
                    Game Servers
                  </h1>
                  <p className="text-slate-400">
                    Manage your dedicated game servers worldwide
                  </p>
                </div>
                <Button className="bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Deploy New Server
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">
                      Total Servers
                    </CardTitle>
                    <Server className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{hasFullDataAccess() ? "4" : "0"}</div>
                    <p className="text-xs text-slate-400">
                      {hasFullDataAccess() ? "3 running, 1 stopped" : "No servers deployed"}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">
                      Active Players
                    </CardTitle>
                    <Users className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{hasFullDataAccess() ? "10,100" : "0"}</div>
                    <p className="text-xs text-slate-400">{hasFullDataAccess() ? "Across all regions" : "No active players"}</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">
                      Avg Latency
                    </CardTitle>
                    <Activity className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{hasFullDataAccess() ? "22ms" : "0ms"}</div>
                    <p className="text-xs text-slate-400">
                      {hasFullDataAccess() ? "Excellent performance" : "No data available"}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">
                      Monthly Cost
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{hasFullDataAccess() ? "$1,240" : "$0"}</div>
                    <p className="text-xs text-slate-400">
                      {hasFullDataAccess() ? "Auto-scaling enabled" : "No costs incurred"}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle>Server Status</CardTitle>
                  <CardDescription>
                    Monitor all your game servers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {gameServers.map((server) => (
                      <div
                        key={server.id}
                        className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg"
                      >
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
                            <h3 className="font-medium text-white">
                              {server.region}
                            </h3>
                            <p className="text-sm text-slate-400">
                              {server.id}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="text-center">
                            <p className="text-white font-medium">
                              {server.players}
                            </p>
                            <p className="text-slate-400">Players</p>
                          </div>
                          <div className="text-center">
                            <p className="text-white font-medium">
                              {server.cpu}%
                            </p>
                            <p className="text-slate-400">CPU</p>
                          </div>
                          <div className="text-center">
                            <p className="text-white font-medium">
                              {server.memory}%
                            </p>
                            <p className="text-slate-400">Memory</p>
                          </div>
                          <div className="text-center">
                            <p className="text-white font-medium">
                              {server.latency}ms
                            </p>
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
                  <h1 className="text-3xl font-bold font-heading text-white">
                    Player Management
                  </h1>
                  <p className="text-slate-400">
                    Monitor and manage your player base
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="bg-slate-800/50 border-slate-600 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Players
                  </Button>
                  <Button className="bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Notification
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">
                      Total Players
                    </CardTitle>
                    <Users className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{hasFullDataAccess() ? "17,278" : "0"}</div>
                    <p className="text-xs text-slate-400">{hasFullDataAccess() ? "+12% this month" : "No data available"}</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">
                      Online Now
                    </CardTitle>
                    <UserCheck className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{hasFullDataAccess() ? "3,298" : "0"}</div>
                    <p className="text-xs text-slate-400">{hasFullDataAccess() ? "Peak: 5,420" : "No active players"}</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">
                      New Today
                    </CardTitle>
                    <Trophy className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{hasFullDataAccess() ? "236" : "0"}</div>
                    <p className="text-xs text-slate-400">{hasFullDataAccess() ? "+8% vs yesterday" : "No new players"}</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle>Recent Players</CardTitle>
                  <CardDescription>
                    Latest player activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentPlayers.map((player) => (
                      <div
                        key={player.id}
                        className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-slate-600 text-white">
                              {player.username.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium text-white">
                              {player.username}
                            </h3>
                            <p className="text-sm text-slate-400">
                              Level {player.level} • {player.country}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm text-white">
                              {player.lastSeen}
                            </p>
                            <div className="flex items-center space-x-1">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  player.status === "online"
                                    ? "bg-green-500"
                                    : "bg-slate-500"
                                }`}
                              />
                              <span className="text-xs text-slate-400">
                                {player.status}
                              </span>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-slate-400"
                              >
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

          {activeSection === "liveops" && (
            <>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold font-heading text-white">
                    LiveOps Dashboard
                  </h1>
                  <p className="text-slate-400">
                    Manage live events and campaigns
                  </p>
                </div>
                <Button className="bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">
                      Active Events
                    </CardTitle>
                    <Flame className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{hasFullDataAccess() ? "3" : "0"}</div>
                    <p className="text-xs text-slate-400">{hasFullDataAccess() ? "2 ending soon" : "No active events"}</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">
                      Participation
                    </CardTitle>
                    <Users className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{hasFullDataAccess() ? "78%" : "0%"}</div>
                    <p className="text-xs text-slate-400">{hasFullDataAccess() ? "Of active players" : "No participation data"}</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">
                      Event Revenue
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{hasFullDataAccess() ? "$2,340" : "$0"}</div>
                    <p className="text-xs text-slate-400">{hasFullDataAccess() ? "This week" : "No revenue data"}</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">
                      Notifications Sent
                    </CardTitle>
                    <Bell className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{hasFullDataAccess() ? "45.2K" : "0"}</div>
                    <p className="text-xs text-slate-400">{hasFullDataAccess() ? "Last 7 days" : "No notifications sent"}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle>Active Events</CardTitle>
                    <CardDescription>
                      Currently running campaigns
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-700/30 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-white">
                            Double XP Weekend
                          </h3>
                          <Badge className="bg-green-500/20 text-green-400">
                            Active
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-400 mb-3">
                          Players earn 2x experience points
                        </p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">
                            Ends in: 2 days
                          </span>
                          <span className="text-white">
                            12,543 participants
                          </span>
                        </div>
                      </div>
                      <div className="p-4 bg-slate-700/30 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-white">
                            Summer Sale
                          </h3>
                          <Badge className="bg-blue-500/20 text-blue-400">
                            Active
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-400 mb-3">
                          50% off premium items
                        </p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">
                            Ends in: 5 days
                          </span>
                          <span className="text-white">$1,890 revenue</span>
                        </div>
                      </div>
                      <div className="p-4 bg-slate-700/30 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-white">
                            Boss Battle Event
                          </h3>
                          <Badge className="bg-purple-500/20 text-purple-400">
                            Active
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-400 mb-3">
                          Special raid boss with exclusive rewards
                        </p>
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
                    <CardTitle>
                      Create New Event
                    </CardTitle>
                    <CardDescription>
                      Launch a new campaign
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-white font-medium text-sm block">
                        Event Name
                      </label>
                      <Input
                        placeholder="Enter event name"
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-white font-medium text-sm block">
                        Event Description
                      </label>
                      <Input
                        placeholder="Enter event description"
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-white font-medium text-sm block">
                        Start Date
                      </label>
                      <Input
                        type="datetime-local"
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-white font-medium text-sm block">
                        End Date
                      </label>
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
                  <h1 className="text-3xl font-bold font-heading text-white">
                    Realtime Database
                  </h1>
                  <p className="text-slate-400">
                    Monitor and manage your game's data collections
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link href="/console/database">
                    <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white">
                      <Database className="w-4 h-4 mr-2" />
                      Browse Database Console
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="bg-slate-800/50 border-slate-600 text-white"
                  >
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
                    <CardTitle className="text-sm font-medium text-white">
                      Total Documents
                    </CardTitle>
                    <Server className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{hasFullDataAccess() ? "454,722" : "0"}</div>
                    <p className="text-xs text-slate-400">{hasFullDataAccess() ? "+12% this month" : "No documents"}</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">
                      Database Size
                    </CardTitle>
                    <Activity className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">
                      {hasFullDataAccess() ? "932.1 MB" : "0 MB"}
                    </div>
                    <p className="text-xs text-slate-400">{hasFullDataAccess() ? "75% of quota" : "Empty database"}</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">
                      Read Operations
                    </CardTitle>
                    <Eye className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{hasFullDataAccess() ? "13.4M" : "0"}</div>
                    <p className="text-xs text-slate-400">{hasFullDataAccess() ? "Last 30 days" : "No operations"}</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">
                      Write Operations
                    </CardTitle>
                    <Settings className="h-4 w-4 text-slate-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{hasFullDataAccess() ? "2.8M" : "0"}</div>
                    <p className="text-xs text-slate-400">{hasFullDataAccess() ? "Last 30 days" : "No operations"}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle>
                      Collections Overview
                    </CardTitle>
                    <CardDescription>
                      Data collections in your database
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {databaseCollections.map((collection, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-cyan-400 rounded-lg flex items-center justify-center">
                              <Server className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-medium text-white">
                                {collection.name}
                              </h3>
                              <p className="text-sm text-slate-400">
                                {collection.documents.toLocaleString()}{" "}
                                documents • {collection.size}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-6 text-sm">
                            <div className="text-center">
                              <p className="text-white font-medium">
                                {collection.reads}
                              </p>
                              <p className="text-slate-400">Reads</p>
                            </div>
                            <div className="text-center">
                              <p className="text-white font-medium">
                                {collection.writes}
                              </p>
                              <p className="text-slate-400">Writes</p>
                            </div>
                            <div className="text-center">
                              <p className="text-white font-medium">
                                {collection.lastActivity}
                              </p>
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
                    <CardTitle>
                      Realtime Connections
                    </CardTitle>
                    <CardDescription>
                      Active websocket connections by region
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {realtimeConnections.map((connection, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <div>
                              <h3 className="font-medium text-white">
                                {connection.region}
                              </h3>
                              <p className="text-sm text-slate-400">
                                Latency: {connection.latency}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-medium">
                              {connection.connections.toLocaleString()}
                            </p>
                            <p className="text-slate-400 text-sm">
                              connections
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-slate-700/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">
                          Total Active Connections
                        </span>
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
                  <CardTitle>
                    Database Activity
                  </CardTitle>
                  <CardDescription>
                    Real-time database operations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={filteredPlayerActivityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="time" stroke="#9ca3af" />
                      <YAxis yAxisId="left" stroke="#9ca3af" />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        stroke="#9ca3af"
                      />
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
                <h1 className="text-3xl font-bold font-heading text-white">
                  Settings
                </h1>
                <p className="text-slate-400">
                  Configure your project settings and preferences
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle>
                      General Settings
                    </CardTitle>
                    <CardDescription>
                      Configure your game settings and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-white font-medium text-sm block">
                        Game Name
                      </label>
                      <Input
                        placeholder="Bankeru Games"
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-white font-medium text-sm block">
                        API Key
                      </label>
                      <Input
                        placeholder="Enter API key"
                        type="password"
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-white font-medium text-sm block">
                        Server Region
                      </label>
                      <Input
                        placeholder="US East"
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-white font-medium text-sm block">
                        Max Players per Game
                      </label>
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
                    <CardTitle>
                      Security Settings
                    </CardTitle>
                    <CardDescription>
                      Configure security and access controls
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="two-factor" className="text-white">
                          Two-Factor Authentication
                        </Label>
                        <p className="text-xs text-slate-400">
                          Add extra security to your account
                        </p>
                      </div>
                      <Switch id="two-factor" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="api-access" className="text-white">
                          API Access Logging
                        </Label>
                        <p className="text-xs text-slate-400">
                          Log all API requests
                        </p>
                      </div>
                      <Switch id="api-access" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="ip-whitelist" className="text-white">
                          IP Whitelisting
                        </Label>
                        <p className="text-xs text-slate-400">
                          Restrict access by IP address
                        </p>
                      </div>
                      <Switch id="ip-whitelist" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle>
                      Notification Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your notification preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-alerts" className="text-white">
                          Email Alerts
                        </Label>
                        <p className="text-xs text-slate-400">
                          Receive important updates via email
                        </p>
                      </div>
                      <Switch id="email-alerts" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="server-alerts" className="text-white">
                          Server Alerts
                        </Label>
                        <p className="text-xs text-slate-400">
                          Get notified of server issues
                        </p>
                      </div>
                      <Switch id="server-alerts" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="security-alerts" className="text-white">
                          Security Alerts
                        </Label>
                        <p className="text-xs text-slate-400">
                          Anti-cheat and security notifications
                        </p>
                      </div>
                      <Switch id="security-alerts" defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle>
                      Billing & Usage
                    </CardTitle>
                    <CardDescription>
                      Monitor your usage and billing
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Current Plan</span>
                      <Badge className="bg-gradient-to-r from-pink-500 to-cyan-400 text-white">
                        Pro
                      </Badge>
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
  );
}