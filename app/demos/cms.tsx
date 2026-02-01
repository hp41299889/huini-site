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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { PencilIcon, Trash2Icon, EyeIcon, PlusCircleIcon } from "lucide-react";

// Hardcoded data for demonstration purposes
const articles = [
  {
    id: "1",
    title: "網站改版：提升使用者體驗的關鍵策略",
    author: "張三",
    status: "published",
    views: 1245,
    date: "2026-01-28",
  },
  {
    id: "2",
    title: "SEO 優化指南：讓您的網站排名更靠前",
    author: "李四",
    status: "draft",
    views: 0,
    date: "2026-01-27",
  },
  {
    id: "3",
    title: "如何選擇適合的雲端服務供應商",
    author: "王五",
    status: "published",
    views: 890,
    date: "2026-01-25",
  },
  {
    id: "4",
    title: "2026 年前端開發趨勢預測",
    author: "趙六",
    status: "pending",
    views: 50,
    date: "2026-01-24",
  },
];

export default function CmsDemo() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">內容管理系統 Demo</h1>
        <Button asChild>
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          {/* 新增文章 */}
        </Button>
      </div>

      <div className="grid gap-6 mb-8 lg:grid-cols-3 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>總文章數</CardTitle>
            <CardDescription>所有發布和草稿中的文章</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">4</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>已發布</CardTitle>
            <CardDescription>目前上線的文章</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">2</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>草稿</CardTitle>
            <CardDescription>尚未發布的文章</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">1</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>文章列表</CardTitle>
          <CardDescription>管理您的所有網站內容</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>標題</TableHead>
                <TableHead>作者</TableHead>
                <TableHead>狀態</TableHead>
                <TableHead>瀏覽量</TableHead>
                <TableHead>發布日期</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>{article.author}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        article.status === "published"
                          ? "default"
                          : article.status === "draft"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {article.status === "published"
                        ? "已發布"
                        : article.status === "draft"
                          ? "草稿"
                          : "待審核"}
                    </Badge>
                  </TableCell>
                  <TableCell>{article.views}</TableCell>
                  <TableCell>{article.date}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash2Icon className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
