import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import { PlusCircleIcon, GripVerticalIcon } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "待辦" | "進行中" | "已完成";
  priority: "高" | "中" | "低";
  dueDate: string;
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "設計網站首頁",
    description: "完成響應式首頁的UI/UX設計",
    status: "進行中",
    priority: "高",
    dueDate: "2026-02-10",
  },
  {
    id: "2",
    title: "開發後端API",
    description: "實現使用者認證和數據接口",
    status: "待辦",
    priority: "高",
    dueDate: "2026-02-20",
  },
  {
    id: "3",
    title: "撰寫測試案例",
    description: "為核心功能編寫單元和整合測試",
    status: "待辦",
    priority: "中",
    dueDate: "2026-02-15",
  },
  {
    id: "4",
    title: "部署到測試環境",
    description: "將應用程式部署到Staging環境",
    status: "已完成",
    priority: "低",
    dueDate: "2026-01-30",
  },
  {
    id: "5",
    title: "優化資料庫查詢",
    description: "改進慢查詢的性能",
    status: "進行中",
    priority: "高",
    dueDate: "2026-02-18",
  },
];

export default function ProjectManagementDemo() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const statuses: ("待辦" | "進行中" | "已完成")[] = [
    "待辦",
    "進行中",
    "已完成",
  ];

  // Simplified drag-and-drop simulation
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent,
    newStatus: "待辦" | "進行中" | "已完成",
  ) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  };

  const getStatusBadgeVariant = (status: Task["status"]) => {
    switch (status) {
      case "待辦":
        return "secondary";
      case "進行中":
        return "default";
      case "已完成":
        return "success"; // Assuming 'success' variant exists or define one
      default:
        return "outline";
    }
  };

  const getPriorityBadgeVariant = (priority: Task["priority"]) => {
    switch (priority) {
      case "高":
        return "destructive";
      case "中":
        return "warning"; // Assuming 'warning' variant exists or define one
      case "低":
        return "info"; // Assuming 'info' variant exists or define one
      default:
        return "outline";
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">專案管理工具 Demo - 看板</h1>
        <Button>
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          新增任務
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statuses.map((status) => (
          <div
            key={status}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
            className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 min-h-[400px]"
          >
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              {status} ({tasks.filter((t) => t.status === status).length})
            </h2>
            <div className="space-y-4">
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <Card
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    className="bg-background cursor-grab active:cursor-grabbing"
                  >
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                      <CardTitle className="text-lg">{task.title}</CardTitle>
                      <GripVerticalIcon className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0 text-sm">
                      <p className="text-muted-foreground mb-2 line-clamp-2">
                        {task.description}
                      </p>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant={getPriorityBadgeVariant(task.priority)}>
                          {task.priority}優先級
                        </Badge>
                        <Badge variant="outline">截止: {task.dueDate}</Badge>
                      </div>
                      {status === "進行中" && (
                        <div>
                          <Progress
                            value={
                              tasks.find((t) => t.id === task.id)?.id === "1"
                                ? 60
                                : 30
                            }
                            className="h-2 my-2"
                          />
                          <span className="text-xs text-muted-foreground">
                            進度:{" "}
                            {tasks.find((t) => t.id === task.id)?.id === "1"
                              ? 60
                              : 30}
                            %
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
