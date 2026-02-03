import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Progress } from "~/components/ui/progress";
import { Badge } from "~/components/ui/badge";
import { 
  PlayCircle, 
  BookOpen, 
  CheckCircle2, 
  ChevronRight, 
  LayoutDashboard, 
  GraduationCap, 
  Search,
  Trophy,
  Settings,
  LogOut,
  Clock,
  Star,
  Play
} from "lucide-react";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { AiAssistant } from "~/components/ai-assistant";

// Types
interface Lesson {
  id: string;
  title: string;
  type: "video" | "quiz" | "text";
  duration?: string;
  completed: boolean;
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  rating: number;
  lessons: Lesson[];
  progress: number;
  image: string;
  category: string;
}

export default function LmsDemo() {
  const { t } = useTranslation();
  const [activeView, setActiveView] = useState<"dashboard" | "my-courses" | "course-detail">("dashboard");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

  // Mock Data inside component to use t()
  const coursesData: Course[] = [
    {
      id: "c1",
      title: t("lms.courses.c1.title"),
      description: t("lms.courses.c1.desc"),
      instructor: t("common.author", "Teacher Wang"),
      rating: 4.8,
      progress: 30,
      category: t("common.category", "Frontend"),
      image: "/images/lms-course-1.jpg",
      lessons: [
        { id: "l1", title: t("lms.courses.c1.l1"), type: "video", duration: "20m", completed: true },
        { id: "l2", title: t("lms.courses.c1.l2"), type: "video", duration: "25m", completed: false },
        { id: "l3", title: t("lms.courses.c1.l3"), type: "video", duration: "30m", completed: false },
        { id: "l4", title: t("lms.courses.c1.l4"), type: "quiz", completed: false },
      ],
    },
    {
      id: "c2",
      title: t("lms.courses.c2.title"),
      description: t("lms.courses.c2.desc"),
      instructor: t("common.author", "Teacher Li"),
      rating: 4.5,
      progress: 0,
      category: t("common.category", "Backend"),
      image: "/images/lms-course-2.jpg",
      lessons: [
        { id: "l5", title: t("lms.courses.c2.l1"), type: "video", duration: "18m", completed: false },
        { id: "l6", title: t("lms.courses.c2.l2"), type: "video", duration: "22m", completed: false },
        { id: "l7", title: t("lms.courses.c2.l3"), type: "text", completed: false },
      ],
    },
  ];

  const sidebarItems = [
    { id: "dashboard", label: t("lms.sidebar.dashboard"), icon: LayoutDashboard },
    { id: "my-courses", label: t("lms.sidebar.my_courses"), icon: GraduationCap },
    { id: "achievements", label: t("lms.sidebar.achievements"), icon: Trophy },
    { id: "settings", label: t("lms.sidebar.settings"), icon: Settings },
  ];

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setActiveView("course-detail");
    setCurrentLesson(course.lessons[0]);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("lms.stats.learning_time")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{t("lms.stats.time_val")}</div>
            <p className="text-xs opacity-70">{t("lms.stats.time_diff")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("lms.stats.completed_courses")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{t("lms.stats.course_val")}</div>
            <p className="text-xs text-muted-foreground">{t("lms.stats.course_pending")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("lms.stats.certificates")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{t("lms.stats.cert_val")}</div>
            <p className="text-xs text-muted-foreground">{t("lms.stats.cert_rank")}</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-bold">{t("lms.continue_learning")}</h2>
      <div className="grid gap-4">
        {coursesData.filter(c => c.progress > 0).map(course => (
          <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer bg-background" onClick={() => handleSelectCourse(course)}>
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-48 bg-teal-500 overflow-hidden">
                <img src={course.image} className="w-full h-full object-cover" alt={course.title} />
              </div>
              <div className="flex-1 p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge variant="secondary" className="mb-2">{course.category}</Badge>
                    <h3 className="text-xl font-bold">{course.title}</h3>
                  </div>
                  <Button size="sm">{t("common.continue")}</Button>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("project.progress")}: {course.progress}%</span>
                    <span className="font-medium">12/35 {t("lms.course_chapters")}</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMyCourses = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {coursesData.map((course) => (
        <Card key={course.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-all group bg-background">
          <div className="aspect-video bg-teal-600 overflow-hidden">
            <img src={course.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={course.title} />
          </div>
          <CardHeader>
            <div className="flex justify-between items-center mb-2">
              <Badge variant="outline">{course.category}</Badge>
              <div className="flex items-center text-amber-500 gap-1">
                <Star className="h-3 w-3 fill-current" />
                <span className="text-xs font-bold">{course.rating}</span>
              </div>
            </div>
            <CardTitle className="text-lg">{course.title}</CardTitle>
            <CardDescription>{course.instructor}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <PlayCircle className="h-4 w-4" />
              <span>{course.lessons.length} {t("lms.course_chapters")}</span>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button className="w-full" onClick={() => handleSelectCourse(course)}>
              {t("common.continue")}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );

  const renderCourseDetail = () => {
    if (!selectedCourse) return null;
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="aspect-video bg-black rounded-xl overflow-hidden relative group">
            <img src="/images/lms-video-bg.jpg" className="absolute inset-0 w-full h-full object-cover opacity-60" alt="Video Background" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="lg" className="rounded-full h-16 w-16 p-0">
                <Play className="h-8 w-8 fill-current" />
              </Button>
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-white p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-lg font-bold">{currentLesson?.title}</h3>
              <p className="text-sm opacity-80">{selectedCourse.title}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{currentLesson?.title}</h2>
              <Button variant="outline" size="sm">
                <BookOpen className="mr-2 h-4 w-4" /> {t("lms.download_materials")}
              </Button>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              In this lesson, we will deep dive into {currentLesson?.title}...
            </p>
          </div>
          
          <AiAssistant context="lms" variant="inline" />
        </div>

        <Card className="h-fit bg-background">
          <CardHeader>
            <CardTitle>{t("lms.course_chapters")}</CardTitle>
            <CardDescription>{t("common.status")}: {selectedCourse.lessons.filter(l => l.completed).length} / {selectedCourse.lessons.length}</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {selectedCourse.lessons.map((lesson) => (
                <div 
                  key={lesson.id} 
                  className={cn(
                    "p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors",
                    currentLesson?.id === lesson.id && "bg-primary/5 border-l-4 border-primary"
                  )}
                  onClick={() => setCurrentLesson(lesson)}
                >
                  <div className="flex items-center gap-3">
                    {lesson.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-muted flex items-center justify-center text-[10px]">
                        {lesson.type === 'video' ? <PlayCircle className="h-3 w-3" /> : <BookOpen className="h-3 w-3" />}
                      </div>
                    )}
                    <div>
                      <p className={cn("text-sm font-medium", lesson.completed && "text-muted-foreground")}>
                        {lesson.title}
                      </p>
                      <span className="text-[10px] text-muted-foreground">{lesson.duration || '5m'}</span>
                    </div>
                  </div>
                  {currentLesson?.id === lesson.id && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="p-4 border-t">
            <Button className="w-full" variant="outline" onClick={() => setActiveView("my-courses")}>
              {t("common.back")}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      {/* Sidebar */}
      <div className="w-64 border-r bg-muted/20 flex flex-col hidden md:flex">
        <div className="p-6">
          <div className="flex items-center gap-2 font-bold text-xl text-teal-600">
            <GraduationCap className="h-8 w-8" />
            <span>{t("demos_list.lms_title")}</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {sidebarItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveView(item.id as any)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all",
                activeView === item.id ? "bg-primary text-primary-foreground shadow-md" : "hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <div className="p-4 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white space-y-3">
            <p className="text-xs font-bold uppercase opacity-80">{t("lms.daily_goal")}</p>
            <p className="text-sm font-medium">{t("lms.daily_goal_text")}</p>
            <Button size="sm" variant="secondary" className="w-full text-xs font-bold">{t("lms.view_plan")}</Button>
          </div>
          <Separator className="my-4" />
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive">
            <LogOut className="mr-2 h-4 w-4" /> {t("lms.sidebar.logout")}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden text-foreground">
        <header className="h-16 border-b flex items-center justify-between px-8 bg-background/50 backdrop-blur-md">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder={t("common.search")} className="pl-9 bg-muted/50 border-none" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold">Xiaoming</p>
              <p className="text-xs text-muted-foreground">Premium</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
              X
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                  {activeView === "dashboard" && `${t("lms.dashboard_welcome")}, Xiaoming`}
                  {activeView === "my-courses" && t("lms.sidebar.my_courses")}
                  {activeView === "course-detail" && selectedCourse?.title}
                </h1>
                <p className="text-muted-foreground">
                  {activeView === "dashboard" && "Today is a great day to learn."}
                  {activeView === "my-courses" && "Continue your learning journey."}
                  {activeView === "course-detail" && `Instructor: ${selectedCourse?.instructor}`}
                </p>
              </div>

              {activeView === "dashboard" && renderDashboard()}
              {activeView === "my-courses" && renderMyCourses()}
              {activeView === "course-detail" && renderCourseDetail()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      
      <AiAssistant context="lms" />
    </div>
  );
}
