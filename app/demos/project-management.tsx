import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { 
  PlusCircleIcon, 
  GripVerticalIcon, 
  Search, 
  MoreVertical, 
  Trash2, 
  Edit2, 
  Calendar as CalendarIcon,
  X,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "~/lib/utils";
import { AiAssistant } from "~/components/ai-assistant";
import { useTranslation } from "react-i18next";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "待辦" | "進行中" | "已完成";
  priority: "高" | "中" | "低";
  dueDate: string;
  progress: number;
}

export default function ProjectManagementDemo() {
  const { t } = useTranslation();
  
  // Mock Data inside component
  const initialTasks: Task[] = [
    { id: "1", title: t("project.tasks.t1.title"), description: t("project.tasks.t1.desc"), status: t("project.columns.in_progress") as any, priority: t("project.priority.high") as any, dueDate: "2026-02-10", progress: 65 },
    { id: "2", title: t("project.tasks.t2.title"), description: t("project.tasks.t2.desc"), status: t("project.columns.todo") as any, priority: t("project.priority.high") as any, dueDate: "2026-02-20", progress: 0 },
    { id: "3", title: t("project.tasks.t3.title"), description: t("project.tasks.t3.desc"), status: t("project.columns.todo") as any, priority: t("project.priority.medium") as any, dueDate: "2026-02-15", progress: 0 },
    { id: "4", title: t("project.tasks.t4.title"), description: t("project.tasks.t4.desc"), status: t("project.columns.done") as any, priority: t("project.priority.low") as any, dueDate: "2026-01-30", progress: 100 },
    { id: "5", title: t("project.tasks.t5.title"), description: t("project.tasks.t5.desc"), status: t("project.columns.in_progress") as any, priority: t("project.priority.high") as any, dueDate: "2026-02-18", progress: 30 },
  ];

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  // Form State
  const [formData, setFormData] = useState<Partial<Task>>({
    title: "",
    description: "",
    priority: t("project.priority.medium") as any,
    status: t("project.columns.todo") as any,
    dueDate: new Date().toISOString().split('T')[0],
    progress: 0
  });

  const statuses: ("待辦" | "進行中" | "已完成")[] = [t("project.columns.todo") as any, t("project.columns.in_progress") as any, t("project.columns.done") as any];

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tasks, searchTerm]);

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleDrop = (e: React.DragEvent, newStatus: Task["status"]) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, status: newStatus, progress: newStatus === t("project.columns.done") ? 100 : t.progress } : t
    ));
  };

  const addTask = () => {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title || t("common.no_data"),
      description: formData.description || "",
      priority: formData.priority as any || t("project.priority.medium"),
      status: formData.status as any || t("project.columns.todo"),
      dueDate: formData.dueDate || "",
      progress: formData.status === t("project.columns.done") ? 100 : (formData.progress || 0)
    };
    setTasks([...tasks, newTask]);
    setIsAddingTask(false);
    resetForm();
  };

  const updateTask = () => {
    if (!editingTask) return;
    setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, ...formData } : t));
    setEditingTask(null);
    resetForm();
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", priority: t("project.priority.medium") as any, status: t("project.columns.todo") as any, dueDate: new Date().toISOString().split('T')[0], progress: 0 });
  };

  const openEdit = (task: Task) => {
    setEditingTask(task);
    setFormData(task);
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("project.title")}</h1>
          <p className="text-muted-foreground">{t("project.subtitle")}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-[200px] md:w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder={t("common.search")} 
              className="pl-9 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsAddingTask(true)} className="w-full sm:w-auto">
            <PlusCircleIcon className="mr-2 h-4 w-4" /> {t("project.add_task")}
          </Button>
        </div>
      </div>

      {/* Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statuses.map((status) => (
          <div
            key={status}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
            className="flex flex-col rounded-xl border bg-muted/30 p-4 min-h-[300px] md:min-h-[600px]"
          >
            <div className="flex items-center justify-between mb-4 px-2">
              <h2 className="font-bold flex items-center gap-2">
                {status === t("project.columns.todo") && <Clock className="h-4 w-4 text-slate-500" />}
                {status === t("project.columns.in_progress") && <AlertCircle className="h-4 w-4 text-blue-500" />}
                {status === t("project.columns.done") && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                {status}
                <Badge variant="secondary" className="ml-2 bg-background/50">
                  {filteredTasks.filter(t => t.status === status).length}
                </Badge>
              </h2>
            </div>

            <div className="space-y-4 flex-1">
              <AnimatePresence mode="popLayout">
                {filteredTasks
                  .filter((task) => task.status === status)
                  .map((task) => (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                    >
                      <Card className="group cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow relative overflow-hidden bg-background">
                        <div className={cn(
                          "absolute top-0 left-0 w-1 h-full",
                          task.priority === t("project.priority.high") ? "bg-red-500" : task.priority === t("project.priority.medium") ? "bg-amber-500" : "bg-blue-500"
                        )} />
                        <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
                          <CardTitle className="text-sm font-bold leading-tight group-hover:text-primary transition-colors cursor-pointer" onClick={() => openEdit(task)}>
                            {task.title}
                          </CardTitle>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openEdit(task)}>
                                <Edit2 className="mr-2 h-4 w-4" /> {t("common.edit")}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive" onClick={() => deleteTask(task.id)}>
                                <Trash2 className="mr-2 h-4 w-4" /> {t("common.delete")}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 space-y-3">
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {task.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="outline" className="text-[10px] py-0 h-5">
                              {task.priority}
                            </Badge>
                            <div className="flex items-center text-[10px] text-muted-foreground">
                              <CalendarIcon className="mr-1 h-3 w-3" />
                              {task.dueDate}
                            </div>
                          </div>
                          {status === t("project.columns.in_progress") && (
                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px] font-medium">
                                <span>{t("project.progress")}</span>
                                <span>{task.progress}%</span>
                              </div>
                              <Progress value={task.progress} className="h-1" />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Modal for Add/Edit */}
      <AnimatePresence>
        {(isAddingTask || editingTask) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-background w-full max-w-lg rounded-xl shadow-2xl border overflow-hidden"
            >
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="text-xl font-bold">{editingTask ? t("project.edit_task") : t("project.add_task")}</h2>
                <Button variant="ghost" size="icon" onClick={() => { setIsAddingTask(false); setEditingTask(null); resetForm(); }}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label>{t("project.task_title")}</Label>
                  <Input 
                    placeholder="e.g. Design Homepage" 
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t("project.description")}</Label>
                  <Textarea 
                    placeholder={t("cms.placeholders.summary")} 
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t("project.priority_label")}</Label>
                    <Select value={formData.priority} onValueChange={(v) => setFormData({ ...formData, priority: v as any })}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("project.priority_label")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={t("project.priority.high")}>{t("project.priority.high")}</SelectItem>
                        <SelectItem value={t("project.priority.medium")}>{t("project.priority.medium")}</SelectItem>
                        <SelectItem value={t("project.priority.low")}>{t("project.priority.low")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t("project.due_date")}</Label>
                    <Input 
                      type="date" 
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>{t("project.progress")} ({formData.progress}%)</Label>
                  <Input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={formData.progress}
                    onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                    className="h-6"
                  />
                </div>
              </div>
              <div className="p-6 border-t bg-muted/30 flex justify-end gap-3">
                <Button variant="outline" onClick={() => { setIsAddingTask(false); setEditingTask(null); resetForm(); }}>
                  {t("common.cancel")}
                </Button>
                <Button onClick={editingTask ? updateTask : addTask}>
                  {editingTask ? t("common.save") : t("common.confirm")}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <AiAssistant context="project" />
    </div>
  );
}