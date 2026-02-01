import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  ArrowLeftIcon,
  MessageSquare,
  ThumbsUp,
  CalendarDays,
} from "lucide-react";
import { Separator } from "~/components/ui/separator";

interface Thread {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  date: string;
  repliesCount: number;
  likes: number;
  content: string;
  replies: Reply[];
}

interface Reply {
  id: string;
  author: string;
  authorAvatar: string;
  date: string;
  content: string;
}

const threadsData: Thread[] = [
  {
    id: "t1",
    title: "關於前端框架選擇的討論",
    author: "前端老鳥",
    authorAvatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cfdfee26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4OTAyMnwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMTg4NTcwMHw&ixlib=rb-4.0.3&q=80&w=200",
    date: "2026-01-28",
    repliesCount: 15,
    likes: 25,
    content:
      "大家覺得目前市場上主流的前端框架（React, Vue, Angular）各自的優缺點是什麼？對於新專案的啟動，你們會推薦哪一個？",
    replies: [
      {
        id: "r1",
        author: "開發小新手",
        authorAvatar:
          "https://images.unsplash.com/photo-1507003211169-e695d7ea6d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4OTAyMnwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMTg4NTcwMHw&ixlib=rb-4.0.3&q=80&w=200",
        date: "2026-01-28",
        content: "我個人比較喜歡 React 的靈活性和豐富的生態。",
      },
      {
        id: "r2",
        author: "全端工程師",
        authorAvatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4OTAyMnwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMTg4NTcwMHw&ixlib=rb-4.0.3&q=80&w=200",
        date: "2026-01-29",
        content: "Vue 學習曲線確實更平滑，適合快速啟動小型專案。",
      },
    ],
  },
  {
    id: "t2",
    title: "分享你的效率工具！",
    author: "PM小助理",
    authorAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29329?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4OTAyMnwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMjAwNjc1MHw&ixlib=rb-4.0.3&q=80&w=200",
    date: "2026-01-27",
    repliesCount: 8,
    likes: 18,
    content:
      "大家在日常工作中都用哪些工具來提升效率呢？例如專案管理、程式碼編輯器插件、筆記軟體等，歡迎分享！",
    replies: [],
  },
];

export default function ForumDemo() {
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [newReplyContent, setNewReplyContent] = useState("");

  const handleAddReply = () => {
    if (newReplyContent.trim() === "" || !selectedThread) return;

    const newReply: Reply = {
      id: `r${Date.now()}`,
      author: "我", // Simulating current user
      authorAvatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4OTAyMnwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMTg4NTcwMHw&ixlib=rb-4.0.3&q=80&w=200",
      date: "剛剛",
      content: newReplyContent,
    };

    setSelectedThread((prev) =>
      prev
        ? {
            ...prev,
            replies: [...prev.replies, newReply],
            repliesCount: prev.repliesCount + 1,
          }
        : null,
    );
    setNewReplyContent("");
  };

  if (selectedThread) {
    return (
      <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-4xl">
        <Button
          variant="outline"
          onClick={() => setSelectedThread(null)}
          className="mb-6"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" /> 返回討論區
        </Button>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-3xl font-bold mb-2">
              {selectedThread.title}
            </CardTitle>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <Avatar className="h-8 w-8">
                <AvatarImage src={selectedThread.authorAvatar} />
                <AvatarFallback>
                  {selectedThread.author.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span>{selectedThread.author}</span>
              <span>•</span>
              <div className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-1" /> {selectedThread.date}
              </div>
            </div>
            <Separator className="my-4" />
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-6">{selectedThread.content}</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-muted-foreground">
                <ThumbsUp className="h-5 w-5 mr-1" /> {selectedThread.likes}
              </div>
              <div className="flex items-center text-muted-foreground">
                <MessageSquare className="h-5 w-5 mr-1" />{" "}
                {selectedThread.repliesCount}
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-4">
          回覆 ({selectedThread.replies.length})
        </h2>
        <div className="space-y-4 mb-6">
          {selectedThread.replies.map((reply) => (
            <Card key={reply.id}>
              <CardContent className="p-4 flex space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={reply.authorAvatar} />
                  <AvatarFallback>{reply.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">
                    {reply.author}{" "}
                    <span className="text-sm text-muted-foreground">
                      • {reply.date}
                    </span>
                  </p>
                  <p className="text-muted-foreground">{reply.content}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>新增回覆</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="輸入您的回覆..."
                value={newReplyContent}
                onChange={(e) => setNewReplyContent(e.target.value)}
                rows={4}
              />
              <Button onClick={handleAddReply}>發布回覆</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        論壇/社群網站 Demo
      </h1>

      <div className="grid grid-cols-1 gap-6">
        {threadsData.map((thread) => (
          <Card
            key={thread.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedThread(thread)}
          >
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                {thread.title}
              </CardTitle>
              <CardDescription className="flex items-center space-x-2 text-muted-foreground">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={thread.authorAvatar} />
                  <AvatarFallback>{thread.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{thread.author}</span>
                <span>•</span>
                <span>{thread.date}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-2">
                {thread.content}
              </p>
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex items-center text-muted-foreground">
                  <ThumbsUp className="h-4 w-4 mr-1" /> {thread.likes}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MessageSquare className="h-4 w-4 mr-1" />{" "}
                  {thread.repliesCount}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
