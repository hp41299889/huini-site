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
import {
  PlayCircleIcon,
  BookOpenIcon,
  CheckCircle2Icon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "lucide-react";
import { Input } from "~/components/ui/input";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  rating: number;
  lessons: Lesson[];
  progress: number; // 0-100%
}

interface Lesson {
  id: string;
  title: string;
  type: "video" | "quiz" | "text";
  duration?: string; // e.g., "15分"
  completed: boolean;
}

const coursesData: Course[] = [
  {
    id: "c1",
    title: "React 前端開發實戰",
    description: "從入門到精通，學習使用 React 構建現代化前端應用。",
    instructor: "王老師",
    rating: 4.8,
    progress: 30,
    lessons: [
      {
        id: "l1",
        title: "環境配置與基礎概念",
        type: "video",
        duration: "20分",
        completed: false,
      },
      {
        id: "l2",
        title: "組件化開發思維",
        type: "video",
        duration: "25分",
        completed: false,
      },
      {
        id: "l3",
        title: "狀態管理與 Hook",
        type: "video",
        duration: "30分",
        completed: false,
      },
      { id: "l4", title: "React 測驗一", type: "quiz", completed: false },
    ],
  },
  {
    id: "c2",
    title: "Node.js 後端開發入門",
    description: "學習使用 Node.js 和 Express 構建高效能的後端服務。",
    instructor: "李老師",
    rating: 4.5,
    progress: 0,
    lessons: [
      {
        id: "l5",
        title: "Node.js 基礎",
        type: "video",
        duration: "18分",
        completed: false,
      },
      {
        id: "l6",
        title: "Express 框架",
        type: "video",
        duration: "22分",
        completed: false,
      },
      { id: "l7", title: "資料庫整合", type: "text", completed: false },
    ],
  },
];

export default function LmsDemo() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [expandedLessons, setExpandedLessons] = useState<string[]>([]); // To manage lesson expansion

  const toggleLessonExpansion = (lessonId: string) => {
    setExpandedLessons((prev) =>
      prev.includes(lessonId)
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId],
    );
  };

  const handleCompleteLesson = (courseId: string, lessonId: string) => {
    // Simulate updating lesson completion and course progress
    setSelectedCourse((prevCourse) => {
      if (!prevCourse || prevCourse.id !== courseId) return prevCourse;

      const updatedLessons = prevCourse.lessons.map((lesson) =>
        lesson.id === lessonId ? { ...lesson, completed: true } : lesson,
      );
      const completedCount = updatedLessons.filter(
        (lesson) => lesson.completed,
      ).length;
      const newProgress = Math.round(
        (completedCount / updatedLessons.length) * 100,
      );

      return { ...prevCourse, lessons: updatedLessons, progress: newProgress };
    });
  };

  if (selectedCourse) {
    return (
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <Button
          variant="outline"
          onClick={() => setSelectedCourse(null)}
          className="mb-6"
        >
          <ChevronRightIcon className="rotate-180 mr-2 h-4 w-4" /> 返回課程列表
        </Button>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{selectedCourse.title}</CardTitle>
            <CardDescription>
              講師: {selectedCourse.instructor} • 評分: {selectedCourse.rating}{" "}
              / 5.0
            </CardDescription>
            <p className="text-muted-foreground mt-2">
              {selectedCourse.description}
            </p>
            <div className="flex items-center mt-4 space-x-2">
              <span className="text-sm">學習進度:</span>
              <Progress
                value={selectedCourse.progress}
                className="w-full h-2"
              />
              <span className="text-sm font-semibold">
                {selectedCourse.progress}%
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-2xl font-bold mb-4">課程內容</h3>
            {selectedCourse.lessons.map((lesson) => (
              <div key={lesson.id} className="border-b last:border-b-0 py-4">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleLessonExpansion(lesson.id)}
                >
                  <div className="flex items-center space-x-3">
                    {lesson.type === "video" ? (
                      <PlayCircleIcon className="h-5 w-5 text-primary" />
                    ) : lesson.type === "quiz" ? (
                      <CheckCircle2Icon className="h-5 w-5 text-purple-500" />
                    ) : (
                      <BookOpenIcon className="h-5 w-5 text-blue-500" />
                    )}
                    <span
                      className={`text-lg ${lesson.completed ? "line-through text-muted-foreground" : ""}`}
                    >
                      {lesson.title}
                    </span>
                    {lesson.duration && (
                      <span className="text-sm text-muted-foreground">
                        ({lesson.duration})
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {lesson.completed && (
                      <CheckCircle2Icon className="h-5 w-5 text-green-500" />
                    )}
                    {expandedLessons.includes(lesson.id) ? (
                      <ChevronDownIcon className="h-4 w-4" />
                    ) : (
                      <ChevronRightIcon className="h-4 w-4" />
                    )}
                  </div>
                </div>
                {expandedLessons.includes(lesson.id) && (
                  <div className="mt-4 pl-8 border-l-2 border-primary ml-2">
                    {lesson.type === "video" && (
                      <div className="w-full bg-gray-200 aspect-video rounded-md flex items-center justify-center text-muted-foreground">
                        [影片播放器佔位符 - {lesson.title}]
                      </div>
                    )}
                    {lesson.type === "quiz" && (
                      <div className="space-y-4">
                        <p className="font-semibold">
                          測驗題目: 這是一個關於 {lesson.title} 的模擬測驗。
                        </p>
                        <Input placeholder="您的答案..." />
                        <Button
                          className="mt-2"
                          onClick={() =>
                            handleCompleteLesson(selectedCourse.id, lesson.id)
                          }
                        >
                          提交測驗
                        </Button>
                      </div>
                    )}
                    {lesson.type === "text" && (
                      <p className="text-muted-foreground">
                        這是關於 {lesson.title}{" "}
                        的課程內容。這是一個文本內容的佔位符。
                      </p>
                    )}
                    {!lesson.completed && lesson.type !== "quiz" && (
                      <Button
                        className="mt-4"
                        onClick={() =>
                          handleCompleteLesson(selectedCourse.id, lesson.id)
                        }
                      >
                        標記為完成
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">LMS 系統 Demo - 課程列表</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coursesData.map((course) => (
          <Card key={course.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">{course.title}</CardTitle>
              <CardDescription>講師: {course.instructor}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {course.description}
              </p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <PlayCircleIcon className="h-4 w-4 text-primary" />
                  <span>{course.lessons.length} 節課</span>
                </div>
                <span>進度: {course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2 mt-2" />
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => setSelectedCourse(course)}
              >
                查看課程詳情
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
