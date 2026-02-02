import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '~/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { Progress } from '~/components/ui/progress';
import { Badge } from '~/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Button } from '~/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { 
  DollarSign, 
  Users, 
  Package, 
  TrendingUp, 
  ShoppingCart, 
  Warehouse, 
  ClipboardList, 
  BarChart3,
  Truck,
  AlertCircle,
  Clock,
  Briefcase
} from 'lucide-react';
import { motion } from 'framer-motion';
import { AiAssistant } from '~/components/ai-assistant';
import { useTranslation } from "react-i18next";

// Mock Data
const inventoryData = [
  { id: 'SKU-001', name: '高階處理器 A1', category: '電子零件', stock: 45, minStock: 50, status: '低庫存' },
  { id: 'SKU-002', name: '液晶顯示面板', category: '螢幕組件', stock: 120, minStock: 30, status: '正常' },
  { id: 'SKU-003', name: '鋰電池 5000mAh', category: '電池', stock: 8, minStock: 20, status: '缺貨' },
  { id: 'SKU-004', name: '散熱風扇', category: '散熱系統', stock: 300, minStock: 100, status: '正常' },
];

const employeeData = [
  { name: '王小明', role: '生產線經理', status: '在職', department: '生產部', image: '' },
  { name: '李美華', role: '財務分析師', status: '開會中', department: '財務部', image: '' },
  { name: '張大千', role: '軟體工程師', status: '休假', department: '技術部', image: '' },
  { name: '陳小春', role: '採購主管', status: '在職', department: '供應鏈', image: '' },
];

const financialData = [
  { month: '1月', revenue: 450000, expense: 320000 },
  { month: '2月', revenue: 520000, expense: 340000 },
  { month: '3月', revenue: 480000, expense: 310000 },
];

export default function ErpDemo() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');

  const erpStats = [
    { title: t("erp.stats.revenue"), value: 'NT$ 4,250,000', change: '+12.5%', icon: DollarSign, color: 'text-blue-600' },
    { title: t("erp.stats.orders"), value: '156', change: '-5%', icon: ShoppingCart, color: 'text-orange-600' },
    { title: t("erp.stats.inventory_turnover"), value: '4.2', change: '+0.8', icon: Package, color: 'text-green-600' },
    { title: t("erp.stats.employees"), value: '84', change: '+2', icon: Users, color: 'text-purple-600' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("erp.title")}</h1>
          <p className="text-muted-foreground">{t("erp.subtitle")}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">{t("common.export")}</Button>
          <Button>{t("common.add")}</Button>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" /> {t("erp.tabs.dashboard")}
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Warehouse className="h-4 w-4" /> {t("erp.tabs.inventory")}
          </TabsTrigger>
          <TabsTrigger value="hr" className="flex items-center gap-2">
            <Users className="h-4 w-4" /> {t("erp.tabs.hr")}
          </TabsTrigger>
          <TabsTrigger value="finance" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" /> {t("erp.tabs.finance")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <motion.div 
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {erpStats.map((stat, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>{t("erp.production.title")}</CardTitle>
                <CardDescription>{t("erp.production.desc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: '智慧型手機組裝', progress: 85, eta: '2小時' },
                    { name: '平板電腦測試', progress: 45, eta: '5小時' },
                    { name: '伺服器機殼噴漆', progress: 15, eta: '1天' },
                  ].map((job, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{job.name}</span>
                        <span className="text-muted-foreground">{t("erp.production.eta")}: {job.eta}</span>
                      </div>
                      <Progress value={job.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>{t("erp.supply_chain.title")}</CardTitle>
                <CardDescription>{t("erp.supply_chain.desc")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: t("erp.supply_chain.logistics_delay"), desc: t("erp.supply_chain.logistics_delay_desc"), type: 'error', icon: Truck },
                  { title: t("erp.supply_chain.raw_material_shortage"), desc: t("erp.supply_chain.raw_material_shortage_desc"), type: 'warning', icon: AlertCircle },
                  { title: t("erp.supply_chain.contract_expiring"), desc: t("erp.supply_chain.contract_expiring_desc"), type: 'info', icon: ClipboardList },
                ].map((alert, i) => (
                  <div key={i} className="flex items-start gap-4 p-3 rounded-lg border bg-muted/30">
                    <div className={`p-2 rounded-full ${alert.type === 'error' ? 'bg-red-100 text-red-600' : alert.type === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                      <alert.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">{alert.title}</h4>
                      <p className="text-xs text-muted-foreground">{alert.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inventory">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{t("erp.inventory.title")}</CardTitle>
                <CardDescription>{t("erp.inventory.desc")}</CardDescription>
              </div>
              <Button size="sm" variant="outline">
                <Warehouse className="mr-2 h-4 w-4" /> {t("erp.inventory.warehouse_scheduling")}
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("common.id")}</TableHead>
                    <TableHead>{t("common.name")}</TableHead>
                    <TableHead>{t("common.category")}</TableHead>
                    <TableHead className="text-right">{t("erp.inventory.stock")}</TableHead>
                    <TableHead className="text-right">{t("erp.inventory.min_stock")}</TableHead>
                    <TableHead>{t("common.status")}</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono text-xs">{item.id}</TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell className="text-right font-bold">{item.stock}</TableCell>
                      <TableCell className="text-right text-muted-foreground">{item.minStock}</TableCell>
                      <TableCell>
                        <Badge variant={item.status === '正常' ? 'default' : item.status === '低庫存' ? 'secondary' : 'destructive'}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">{t("erp.inventory.purchase")}</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hr">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>{t("erp.hr.title")}</CardTitle>
                <CardDescription>{t("erp.hr.desc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  {employeeData.map((emp, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>{emp.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="text-sm font-bold">{emp.name}</h4>
                          <p className="text-xs text-muted-foreground">{emp.role} · {emp.department}</p>
                        </div>
                      </div>
                      <Badge variant={emp.status === '在職' ? 'default' : emp.status === '開會中' ? 'secondary' : 'outline'}>
                        {emp.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="justify-center border-t p-4">
                <Button variant="link">{t("erp.hr.view_all")}</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t("erp.hr.today_attendance")}</CardTitle>
                <CardDescription>{t("erp.hr.attendance_rate")}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center space-y-4 py-6">
                <div className="relative h-40 w-40">
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle className="text-muted stroke-current" strokeWidth="10" fill="transparent" r="40" cx="50" cy="50" />
                    <circle className="text-primary stroke-current" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="25.12" strokeLinecap="round" fill="transparent" r="40" cx="50" cy="50" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">90%</span>
                    <span className="text-xs text-muted-foreground">{t("erp.hr.attendance_rate")}</span>
                  </div>
                </div>
                <div className="w-full space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{t("erp.hr.normal")}</span>
                    <span className="font-bold">75</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{t("erp.hr.leave")}</span>
                    <span className="font-bold">6</span>
                  </div>
                  <div className="flex justify-between text-sm text-red-600">
                    <span>{t("erp.hr.missing_clock")}</span>
                    <span className="font-bold">3</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="finance">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t("erp.finance.title")}</CardTitle>
                <CardDescription>{t("erp.finance.desc")}</CardDescription>
              </CardHeader>
              <CardContent className="h-[250px] flex items-end justify-around gap-2 pt-6">
                {financialData.map((data, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 flex-1">
                    <div className="flex gap-1 w-full items-end justify-center">
                      <div className="bg-primary w-1/3 rounded-t" style={{ height: `${(data.revenue / 600000) * 100}%` }}></div>
                      <div className="bg-muted-foreground/30 w-1/3 rounded-t" style={{ height: `${(data.expense / 600000) * 100}%` }}></div>
                    </div>
                    <span className="text-xs font-medium">{data.month}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="flex justify-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-primary rounded-sm"></div> {t("erp.finance.revenue")}
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-muted-foreground/30 rounded-sm"></div> {t("erp.finance.expense")}
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("erp.finance.pending_bills")}</CardTitle>
                <CardDescription>{t("erp.finance.pending_bills_desc")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { vendor: '電力公司', amount: 'NT$ 12,000', due: '3天內', status: '待支付' },
                  { vendor: '雲端服務商', amount: 'NT$ 45,000', due: '7天內', status: '已審核' },
                  { vendor: '辦公設備租賃', amount: 'NT$ 8,500', due: '已逾期', status: '逾期' },
                ].map((bill, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <h4 className="text-sm font-semibold">{bill.vendor}</h4>
                      <p className="text-xs text-muted-foreground">{t("erp.finance.due_date")}: {bill.due}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{bill.amount}</p>
                      <Badge variant={bill.status === '逾期' ? 'destructive' : 'outline'} className="text-[10px] px-1 h-4">
                        {bill.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">{t("erp.finance.enter_system")}</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <AiAssistant context="erp" />
    </div>
  );
}