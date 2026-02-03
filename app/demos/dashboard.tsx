import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  DollarSign,
  Users,
  ArrowUpRight,
  TrendingUp,
  CalendarDays,
  Search,
  Download,
  Filter,
  MoreVertical,
  Activity,
  ShieldCheck,
  Zap,
  Bell,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Switch } from "~/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Input } from "~/components/ui/input";
import { Progress } from "~/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "~/stores/use-theme-store";
import { AiAssistant } from "~/components/ai-assistant";
import { useTranslation } from "react-i18next";
import { cn } from "~/lib/utils";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

export default function DashboardDemo() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [chartType, setChartType] = useState<"revenue" | "users">("revenue");
  const { theme, toggleTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  const revenueData = [
    { name: t("dashboard.months.jan"), total: 1200, users: 400 },
    { name: t("dashboard.months.feb"), total: 2100, users: 700 },
    { name: t("dashboard.months.mar"), total: 1800, users: 600 },
    { name: t("dashboard.months.apr"), total: 2400, users: 800 },
    { name: t("dashboard.months.may"), total: 2300, users: 750 },
    { name: t("dashboard.months.jun"), total: 3200, users: 1100 },
    { name: t("dashboard.months.jul"), total: 2800, users: 950 },
    { name: t("dashboard.months.aug"), total: 3600, users: 1300 },
    { name: t("dashboard.months.sep"), total: 4100, users: 1500 },
    { name: t("dashboard.months.oct"), total: 3800, users: 1400 },
    { name: t("dashboard.months.nov"), total: 4800, users: 1800 },
    { name: t("dashboard.months.dec"), total: 5400, users: 2100 },
  ];

  const categoryData = [
    { name: t("ecommerce.tabs.software"), value: 45 },
    { name: t("ecommerce.tabs.hardware"), value: 25 },
    { name: t("ecommerce.tabs.consulting"), value: 20 },
    { name: t("common.all", "Other"), value: 10 },
  ];

  const kpiData = {
    totalRevenue: { value: 45231.89, change: "+20.1%", trend: "up" },
    subscriptions: { value: 2350, change: "+180.1%", trend: "up" },
    sales: { value: 12234, change: "+19%", trend: "up" },
    activeUsers: { value: 573, change: "-2.4%", trend: "down" },
  };

  const recentSales = [
    {
      customer: "Olivia Martin",
      email: "olivia.martin@example.com",
      type: t("ecommerce.tabs.hardware"),
      amount: 1999.0,
      status: t("erp.finance.status.approved"),
    },
    {
      customer: "Jackson Lee",
      email: "jackson.lee@example.com",
      type: t("ecommerce.tabs.software"),
      amount: 39.0,
      status: t("project.columns.in_progress"),
    },
    {
      customer: "Isabella Nguyen",
      email: "isabella.nguyen@example.com",
      type: t("ecommerce.tabs.hardware"),
      amount: 299.0,
      status: t("erp.finance.status.approved"),
    },
    {
      customer: "William Kim",
      email: "william.kim@example.com",
      type: t("ecommerce.tabs.hardware"),
      amount: 99.0,
      status: t("erp.finance.status.approved"),
    },
    {
      customer: "Sofia Davis",
      email: "sofia.davis@example.com",
      type: t("ecommerce.tabs.software"),
      amount: 39.0,
      status: "Refunded",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const filteredSales = recentSales.filter(
    (sale) =>
      sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <motion.div
      className="container mx-auto p-4 md:p-6 lg:p-8 space-y-8 relative text-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {t("dashboard.center_title")}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t("dashboard.center_desc")}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2 bg-muted/50 p-2 rounded-lg border">
            <Switch
              id="theme-mode"
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
            />
            <label htmlFor="theme-mode" className="text-sm font-medium">
              {theme === "dark" ? "Dark" : "Light"}
            </label>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="relative bg-background"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border-2 border-background"></span>
          </Button>
          <Button size="sm" className="shadow-lg shadow-blue-500/20">
            <Download className="mr-2 h-4 w-4" />{" "}
            {t("dashboard.download_report")}
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: t("erp.stats.revenue"),
            value: `NT$ ${kpiData.totalRevenue.value.toLocaleString()}`,
            icon: DollarSign,
            color: "text-blue-500",
            border: "border-l-blue-500",
            trend: kpiData.totalRevenue.change,
            trendUp: true,
          },
          {
            title: t("erp.stats.orders"),
            value: `+${kpiData.subscriptions.value}`,
            icon: Users,
            color: "text-emerald-500",
            border: "border-l-emerald-500",
            trend: kpiData.subscriptions.change,
            trendUp: true,
          },
          {
            title: t("common.amount"),
            value: `+${kpiData.sales.value}`,
            icon: Zap,
            color: "text-amber-500",
            border: "border-l-amber-500",
            trend: kpiData.sales.change,
            trendUp: true,
          },
          {
            title: t("erp.stats.employees"),
            value: `+${kpiData.activeUsers.value}`,
            icon: Activity,
            color: "text-rose-500",
            border: "border-l-rose-500",
            trend: kpiData.activeUsers.change,
            trendUp: false,
          },
        ].map((kpi, i) => (
          <motion.div key={i} whileHover={{ y: -5 }}>
            <Card
              className={`hover:shadow-xl transition-all duration-300 cursor-pointer border-l-4 ${kpi.border} group overflow-hidden relative h-full bg-background`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  {kpi.title}
                </CardTitle>
                <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold tracking-tighter">
                  {kpi.value}
                </div>
                <div className="flex items-center pt-2">
                  <Badge
                    variant={kpi.trendUp ? "default" : "destructive"}
                    className="text-[10px] py-0 px-1.5 h-5"
                  >
                    {kpi.trend}
                  </Badge>
                  <span className="text-xs text-muted-foreground ml-2">
                    {t("dashboard.vs_last_period")}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <motion.div className="col-span-4">
          <Card className="shadow-md h-full bg-background">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-xl">
                  {t("dashboard.growth_trend")}
                </CardTitle>
                <CardDescription>2026 Monthly Core Metrics</CardDescription>
              </div>
              <Tabs
                defaultValue="revenue"
                className="w-full sm:w-[180px]"
                onValueChange={(v) => setChartType(v as "revenue" | "users")}
              >
                <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                  <TabsTrigger value="revenue">{t("erp.finance.revenue")}</TabsTrigger>
                  <TabsTrigger value="users">{t("cms.sidebar.users")}</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="h-[380px] pt-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    strokeOpacity={0.3}
                  />
                  <XAxis
                    dataKey="name"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) =>
                      chartType === "revenue" ? `$${v}` : v
                    }
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey={chartType === "revenue" ? "total" : "users"}
                    stroke={chartType === "revenue" ? "#3b82f6" : "#10b981"}
                    fillOpacity={0.1}
                    fill={chartType === "revenue" ? "#3b82f6" : "#10b981"}
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div className="col-span-3">
          <Card className="shadow-md h-full bg-background">
            <CardHeader>
              <CardTitle>{t("dashboard.resource_allocation")}</CardTitle>
              <CardDescription>Revenue Source Distribution</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex flex-col items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={95}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "none",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-4 w-full px-4 mt-4">
                {categoryData.map((cat, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[i] }}
                    ></div>
                    <span className="text-xs font-medium">
                      {cat.name}: {cat.value}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <Card className="shadow-md overflow-hidden bg-background">
            <CardHeader className="bg-muted/30 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle>{t("dashboard.realtime_transactions")}</CardTitle>
                  <CardDescription>Recent 5 transactions</CardDescription>
                </div>
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t("common.search")}
                    className="pl-9 h-10 w-full sm:w-[240px] bg-background"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredSales.map((sale, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors group cursor-default text-foreground"
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                        {sale.customer.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-bold">{sale.customer}</p>
                        <p className="text-xs text-muted-foreground">
                          {sale.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <Badge
                        variant={
                          sale.status === "Approved" ? "default" : "outline"
                        }
                      >
                        {sale.status}
                      </Badge>
                      <div className="text-right">
                        <p className="text-sm font-black">
                          +NT$ {sale.amount.toLocaleString()}
                        </p>
                        <p className="text-[10px] text-muted-foreground uppercase">
                          {t("common.date", "2 mins ago")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-3 space-y-6">
          <Card className="shadow-md bg-background">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <ShieldCheck className="h-5 w-5 mr-2 text-emerald-500" />{" "}
                {t("dashboard.system_health")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { label: t("dashboard.health_metrics.server"), val: 42 },
                { label: t("dashboard.health_metrics.db"), val: 15, text: "12ms" },
                { label: t("dashboard.health_metrics.api"), val: 99.9, color: "bg-emerald-500" },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-medium">
                      {item.label}
                    </span>
                    <span className="font-bold">
                      {item.text || `${item.val}%`}
                    </span>
                  </div>
                  <Progress
                    value={item.val}
                    className={cn(
                      "h-2 bg-muted",
                      item.color && `[&>div]:${item.color}`,
                    )}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-md bg-gradient-to-br from-indigo-600 to-blue-700 text-white overflow-hidden relative group">
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
              <Zap className="h-32 w-32" />
            </div>
            <CardHeader>
              <CardTitle className="text-white">
                {t("dashboard.smart_suggestions")}
              </CardTitle>
              <CardDescription className="text-indigo-100">
                AI Optimization Plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed opacity-90">
                {t("dashboard.suggestion_text")}
              </p>
            </CardContent>
            <CardFooter>
              <Button
                variant="secondary"
                size="sm"
                className="w-full font-bold"
              >
                {t("common.details")}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <AiAssistant context="dashboard" />
    </motion.div>
  );
}