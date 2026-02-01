import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { Progress } from '~/components/ui/progress';
import { Badge } from '~/components/ui/badge';
import { DollarSign, Users, Package, TrendingUp } from 'lucide-react';

// Hardcoded data for demonstration purposes
const salesData = {
  totalRevenue: 1250000,
  monthlySales: 150000,
  growthRate: 12, // percentage
};

const recentOrders = [
  { id: 'ORD001', customer: '張先生', amount: 5000, status: '已完成', date: '2026-01-29' },
  { id: 'ORD002', customer: '李小姐', amount: 2300, status: '處理中', date: '2026-01-28' },
  { id: 'ORD003', customer: '王先生', amount: 7800, status: '已出貨', date: '2026-01-28' },
  { id: 'ORD004', customer: '陳女士', amount: 1200, status: '已完成', date: '2026-01-27' },
];

const projects = [
  { id: 'PRJ001', name: '新產品開發', progress: 75, status: '進行中' },
  { id: 'PRJ002', name: '市場推廣活動', progress: 90, status: '已完成' },
  { id: 'PRJ003', name: '系統升級', progress: 30, status: '延遲' },
];

export default function ErpDemo() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">ERP 系統 Demo - 儀表板</h1>

      {/* Overview Cards */}
      <div className="grid gap-6 mb-8 lg:grid-cols-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">總營收</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">NT$ {salesData.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20.1% 從上個月</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">月銷售額</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">NT$ {salesData.monthlySales.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{salesData.growthRate}% 從上個月</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活躍客戶</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+50</div>
            <p className="text-xs text-muted-foreground">上個月新客戶</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">庫存商品</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,500</div>
            <p className="text-xs text-muted-foreground">目前庫存單位</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>最新訂單</CardTitle>
          <CardDescription>顯示最近的交易活動</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>訂單號</TableHead>
                <TableHead>客戶</TableHead>
                <TableHead>金額</TableHead>
                <TableHead>狀態</TableHead>
                <TableHead>日期</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>NT$ {order.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={order.status === '已完成' ? 'default' : order.status === '處理中' ? 'secondary' : 'outline'}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Project Progress */}
      <Card>
        <CardHeader>
          <CardTitle>專案進度</CardTitle>
          <CardDescription>追蹤當前專案的進度</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="grid grid-cols-4 items-center gap-4">
              <div className="col-span-1 text-sm font-medium">{project.name}</div>
              <div className="col-span-2">
                <Progress value={project.progress} className="h-2" />
              </div>
              <div className="col-span-1 text-right">
                <Badge variant={project.status === '已完成' ? 'default' : project.status === '進行中' ? 'secondary' : 'destructive'}>
                  {project.progress}% ({project.status})
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
