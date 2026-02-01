import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  DollarSign,
  Users,
  ArrowUpRight,
  TrendingUp,
  CalendarDays,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Switch } from "~/components/ui/switch";

// Hardcoded data for demonstration purposes
const kpiData = {
  totalRevenue: { value: 45231.89, change: "+20.1% from last month" },
  subscriptions: { value: 2350, change: "+180.1% from last month" },
  sales: { value: 12234, change: "+19% from last month" },
  activeUsers: { value: 573, change: "+20.1% from last month" },
};

const recentSales = [
  {
    customer: "Olivia Martin",
    email: "olivia.martin@example.com",
    type: "銷售",
    amount: 1999.0,
  },
  {
    customer: "Jackson Lee",
    email: "jackson.lee@example.com",
    type: "訂閱",
    amount: 39.0,
  },
  {
    customer: "Isabella Nguyen",
    email: "isabella.nguyen@example.com",
    type: "銷售",
    amount: 299.0,
  },
  {
    customer: "William Kim",
    email: "william.kim@example.com",
    type: "銷售",
    amount: 99.0,
  },
  {
    customer: "Sofia Davis",
    email: "sofia.davis@example.com",
    type: "訂閱",
    amount: 39.0,
  },
];

export default function DashboardDemo() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">儀表板 Demo</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <CalendarDays className="mr-2 h-4 w-4" /> 2026年1月
          </Button>
          <Button size="sm">下載報告</Button>
          <div className="flex items-center space-x-2">
            <Switch id="dark-mode" />
            <label htmlFor="dark-mode" className="text-sm">深色模式</label>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">總營收</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              NT$ {kpiData.totalRevenue.value.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {kpiData.totalRevenue.change}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">訂閱量</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              +{kpiData.subscriptions.value}
            </div>
            <p className="text-xs text-muted-foreground">
              {kpiData.subscriptions.change}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">銷售額</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{kpiData.sales.value}</div>
            <p className="text-xs text-muted-foreground">
              {kpiData.sales.change}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活躍用戶</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              +{kpiData.activeUsers.value}
            </div>
            <p className="text-xs text-muted-foreground">
              {kpiData.activeUsers.change}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>概覽</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {/* Placeholder for a chart */}
            <div className="h-[300px] w-full bg-muted flex items-center justify-center text-muted-foreground rounded-lg">
              [圖表佔位符]
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>近期銷售</CardTitle>
            <CardDescription>
              您本月獲得了 {kpiData.sales.value} 筆銷售。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentSales.map((sale, index) => (
                <div key={index} className="flex items-center">
                  <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm">
                    {sale.customer.charAt(0)}
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {sale.customer}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {sale.email}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    +NT$ {sale.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
