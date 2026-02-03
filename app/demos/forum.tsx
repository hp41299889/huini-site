import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  ArrowLeft,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  CalendarDays,
  Search,
  Plus,
  Hash,
  TrendingUp,
  Award,
  Users,
  Flag,
  Share2,
  MoreHorizontal,
  Home,
  Zap,
  Coffee,
  Code
} from "lucide-react";
import { Separator } from "~/components/ui/separator";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { AiAssistant } from "~/components/ai-assistant";
import { useTranslation } from "react-i18next";

interface Reply {
  id: string;
  author: string;
  authorAvatar: string;
  date: string;
  content: string;
  likes: number;
}

interface Thread {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  authorRole: string;
  date: string;
  repliesCount: number;
  likes: number;
  content: string;
  category: string;
  tags: string[];
  replies: Reply[];
}

export default function ForumDemo() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState(t("forum.all_discussions"));

  // Mock Data inside component
  const threadsData: Thread[] = [
    {
      id: "t1",
      title: t("forum.threads.t1.title"),
      author: t("common.author", "Frontend Vet"),
      authorAvatar: "/images/erp-emp-1.jpg",
      authorRole: t("forum.roles.admin"),
      date: "2026-01-30",
      repliesCount: 42,
      likes: 156,
      category: t("forum.tech_talk"),
      tags: [t("blog.tags.frontend"), "Framework", t("blog.tags.career")],
      content: t("forum.threads.t1.content"),
      replies: [
        {
          id: "r1",
          author: "DevMaster",
          authorAvatar: "/images/erp-emp-2.jpg",
          date: "2h ago",
          content: t("forum.replies_content.r1"),
          likes: 24
        },
        {
          id: "r2",
          author: "Fullstack Eng",
          authorAvatar: "/images/erp-emp-1.jpg",
          date: "1h ago",
          content: t("forum.replies_content.r2"),
          likes: 12
        },
      ],
    },
    {
      id: "t2",
      title: t("forum.threads.t2.title"),
      author: "PM Assistant",
      authorAvatar: "/images/erp-emp-2.jpg",
      authorRole: t("forum.roles.core"),
      date: "2026-01-29",
      repliesCount: 28,
      likes: 89,
      category: t("forum.career_life"),
      tags: ["Remote Work", "Efficiency", "Life"],
      content: t("forum.threads.t2.content"),
      replies: [],
    },
  ];

  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [newReplyContent, setNewReplyContent] = useState("");

  const categories = [
    { name: t("forum.all_discussions"), icon: Home },
    { name: t("forum.tech_talk"), icon: Code },
    { name: t("forum.career_life"), icon: Coffee },
    { name: t("forum.announcements"), icon: Zap },
  ];

  const handleAddReply = () => {
    if (!newReplyContent.trim() || !selectedThread) return;
    const newReply: Reply = {
      id: `r${Date.now()}`,
      author: t("common.name", "User"),
      authorAvatar: "https://ui-avatars.com/api/?name=User&background=7C3AED&color=fff",
      date: t("common.date", "Just now"),
      content: newReplyContent,
      likes: 0
    };
    setSelectedThread({
      ...selectedThread,
      replies: [...selectedThread.replies, newReply],
      repliesCount: selectedThread.repliesCount + 1
    });
    setNewReplyContent("");
  };

  const renderThreadList = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{activeCategory}</h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="font-bold text-primary">{t("blog.most_popular")}</Button>
          <Button variant="ghost" size="sm">{t("common.all")}</Button>
        </div>
      </div>
      <AnimatePresence mode="popLayout">
        {threadsData.map((thread) => (
          <motion.div
            key={thread.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setSelectedThread(thread)}
          >
            <Card className="hover:border-primary/50 transition-all cursor-pointer group shadow-sm bg-background">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center gap-1 mt-1 text-foreground">
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary"><ThumbsUp className="h-4 w-4" /></Button>
                    <span className="text-xs font-bold">{thread.likes}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-red-500"><ThumbsDown className="h-4 w-4" /></Button>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={thread.authorAvatar} />
                        <AvatarFallback>{thread.author[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-bold">{thread.author}</span>
                      <span className="text-xs text-muted-foreground">{thread.date}</span>
                      <Badge variant="secondary" className="ml-auto text-[10px] py-0 h-5 bg-primary/10 text-primary border-none">
                        {thread.category}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{thread.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{thread.content}</p>
                    <div className="flex items-center gap-4 pt-2">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MessageSquare className="h-4 w-4" /> {thread.repliesCount} {t("forum.replies")}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Share2 className="h-4 w-4" /> {t("forum.share")}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  const renderThreadDetail = () => {
    if (!selectedThread) return null;
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => setSelectedThread(null)} className="group -ml-4">
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> {t("common.back")}
        </Button>
        
        <Card className="border-none shadow-none bg-transparent">
          <CardHeader className="px-0">
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedThread.authorAvatar} />
                <AvatarFallback>{selectedThread.author[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold">{selectedThread.author}</p>
                  <Badge className="text-[10px] h-4 px-1">{selectedThread.authorRole}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{selectedThread.date}</p>
              </div>
            </div>
            <CardTitle className="text-3xl font-black leading-tight">{selectedThread.title}</CardTitle>
            <div className="flex gap-2 pt-2">
              {selectedThread.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-[10px] font-medium">#{tag}</Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent className="px-0 pt-4 prose prose-slate dark:prose-invert max-w-none text-foreground">
            <p className="text-lg leading-relaxed">{selectedThread.content}</p>
          </CardContent>
          <CardFooter className="px-0 pt-6 border-t mt-8 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Button variant="secondary" className="gap-2 font-bold"><ThumbsUp className="h-4 w-4" /> {t("forum.support")} ({selectedThread.likes})</Button>
              <Button variant="ghost" size="icon"><Share2 className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
            </div>
          </CardFooter>
        </Card>

        <div className="space-y-4 mt-8">
          <h4 className="font-bold flex items-center gap-2">
            <MessageSquare className="h-5 w-5" /> {t("forum.all_replies")} ({selectedThread.replies.length})
          </h4>
          <div className="space-y-4 pl-4 border-l-2 border-muted ml-5">
            {selectedThread.replies.map((reply) => (
              <div key={reply.id} className="space-y-3 p-4 rounded-xl bg-muted/30 relative">
                <div className="flex items-center gap-3">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={reply.authorAvatar} />
                    <AvatarFallback>{reply.author[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-bold">{reply.author}</span>
                  <span className="text-xs text-muted-foreground">{reply.date}</span>
                </div>
                <p className="text-sm leading-relaxed">{reply.content}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <button className="hover:text-primary font-medium">{t("forum.support")} ({reply.likes})</button>
                  <button className="hover:text-primary font-medium">{t("forum.post_reply")}</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sticky bottom-4 pt-8">
          <Card className="shadow-xl border-2 bg-background">
            <CardContent className="p-4 flex gap-4">
              <Avatar className="h-8 w-8 hidden sm:flex">
                <AvatarFallback>Me</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <Textarea 
                  placeholder={t("forum.start_discussion") + "..."} 
                  className="min-h-[80px] bg-muted/50 focus:bg-background transition-colors border-none"
                  value={newReplyContent}
                  onChange={(e) => setNewReplyContent(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button onClick={handleAddReply} className="bg-primary font-bold text-white">{t("forum.post_reply")}</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="flex bg-muted/30 min-h-screen relative">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r bg-background p-6 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="flex items-center gap-2 font-black text-2xl text-primary mb-10">
          <Award className="h-8 w-8" />
          <span>{t("forum.sidebar_title")}</span>
        </div>
        <nav className="flex-1 space-y-2">
          {categories.map(cat => (
            <div
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all",
                activeCategory === cat.name ? "bg-primary text-white shadow-lg" : "hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <cat.icon className="h-5 w-5" />
              <span className="font-bold">{cat.name}</span>
            </div>
          ))}
        </nav>
        <div className="mt-auto p-4 rounded-2xl bg-muted text-slate-600 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold">
            <span>{t("forum.today_active")}</span>
            <Badge variant="secondary" className="bg-green-100 text-green-700 border-none">1.2K</Badge>
          </div>
          <p className="text-[10px] leading-relaxed">{t("forum.contribution_desc")}</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-10">
        <header className="mb-10 space-y-6">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder={t("common.search")} className="pl-10 rounded-full border-none shadow-sm h-12 bg-background" />
            </div>
            <Button className="rounded-full h-12 px-6 font-bold shadow-lg shadow-primary/20 bg-primary text-white">
              <Plus className="mr-2 h-5 w-5" /> {t("forum.start_discussion")}
            </Button>
          </div>
        </header>

        {selectedThread ? renderThreadDetail() : renderThreadList()}
      </main>

      {/* Right Sidebar */}
      <aside className="w-80 p-8 hidden xl:block sticky top-0 h-screen overflow-y-auto space-y-8">
        <Card className="rounded-[2rem] border-none shadow-sm bg-background">
          <CardHeader>
            <CardTitle className="text-lg font-bold">{t("blog.popular_tags")}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {[
              "React19", 
              "Remote Work", 
              "Interview", 
              "AI", 
              "Career"
            ].map(tag => (
              <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-white transition-all">#{tag}</Badge>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border-none shadow-sm bg-background">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" /> {t("forum.active_contributors")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Frontend Vet", points: 2450, avatar: "F" },
              { name: "DevMaster", points: 1890, avatar: "D" },
              { name: "DesignGuru", points: 1560, avatar: "G" },
            ].map((u, i) => (
              <div key={i} className="flex items-center justify-between text-foreground">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">{u.avatar}</div>
                  <span className="text-sm font-bold">{u.name}</span>
                </div>
                <span className="text-xs text-muted-foreground font-mono">{u.points}p</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="p-6 rounded-[2rem] bg-gradient-to-br from-primary to-purple-600 text-white space-y-4 shadow-xl">
          <Users className="h-10 w-10 opacity-50" />
          <h4 className="text-xl font-black">{t("forum.join_premium")}</h4>
          <p className="text-xs opacity-80 leading-relaxed">{t("forum.premium_desc")}</p>
          <Button variant="secondary" className="w-full font-bold">{t("forum.learn_more")}</Button>
        </div>
      </aside>
      <AiAssistant context="forum" />
    </div>
  );
}