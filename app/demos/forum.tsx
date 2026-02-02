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

const threadsData: Thread[] = [
  {
    id: "t1",
    title: "2026 年前端框架選擇：React vs Vue vs Svelte",
    author: "前端老鳥",
    authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cfdfee26?auto=format&fit=crop&q=80&w=200",
    authorRole: "版主",
    date: "2026-01-30",
    repliesCount: 42,
    likes: 156,
    category: "技術討論",
    tags: ["前端", "框架", "趨勢"],
    content: "隨著 React 19 的穩定和 Svelte 5 的正式發布，大家對於 2026 年的中大型專案選擇有什麼看法？在效能與開發體驗之間，你們會如何權衡？",
    replies: [
      {
        id: "r1",
        author: "DevMaster",
        authorAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200",
        date: "2小時前",
        content: "我認為 Svelte 的 Runes 真的改變了遊戲規則，開發效率提升非常明顯。",
        likes: 24
      },
      {
        id: "r2",
        author: "全端工程師",
        authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
        date: "1小時前",
        content: "React 的生態系依然是無法忽視的優勢，特別是在大型企業環境下。",
        likes: 12
      },
    ],
  },
  {
    id: "t2",
    title: "遠端工作的效率秘訣：如何保持專注？",
    author: "PM小助理",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29329?auto=format&fit=crop&q=80&w=200",
    authorRole: "核心成員",
    date: "2026-01-29",
    repliesCount: 28,
    likes: 89,
    category: "職場生活",
    tags: ["遠端工作", "效率", "生活"],
    content: "在家工作已經兩年了，最近感到有點倦怠。大家有什麼維持生活規規和工作專注度的小技巧嗎？",
    replies: [],
  },
];

export default function ForumDemo() {
  const { t } = useTranslation();
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [newReplyContent, setNewReplyContent] = useState("");
  const [activeCategory, setActiveCategory] = useState(t("forum.all_discussions"));

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
      author: "惠尼用戶",
      authorAvatar: "https://ui-avatars.com/api/?name=User&background=7C3AED&color=fff",
      date: "剛剛",
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
          <Button variant="ghost" size="sm" className="font-bold text-primary">最熱門</Button>
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
                      <span className="text-xs text-muted-foreground">發布於 {thread.date}</span>
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
                  <button className="hover:text-primary font-medium">回覆</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sticky bottom-4 pt-8">
          <Card className="shadow-xl border-2 bg-background">
            <CardContent className="p-4 flex gap-4">
              <Avatar className="h-8 w-8 hidden sm:flex">
                <AvatarFallback>我</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <Textarea 
                  placeholder="發表您的看法..." 
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
            <span>今日活躍</span>
            <Badge variant="secondary" className="bg-green-100 text-green-700 border-none">1.2K</Badge>
          </div>
          <p className="text-[10px] leading-relaxed">您的貢獻度擊敗了 92% 的用戶，繼續保持！</p>
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
            {["React19", "遠端工作", "面試指南", "咖啡生活", "AI應用", "職涯規劃"].map(tag => (
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
              { name: "前端老鳥", points: 2450, avatar: "老" },
              { name: "DevMaster", points: 1890, avatar: "D" },
              { name: "設計大師", points: 1560, avatar: "設" },
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
          <h4 className="text-xl font-black">加入高級社群</h4>
          <p className="text-xs opacity-80 leading-relaxed">解鎖專屬頭銜、進階數據分析以及優先討論權限。</p>
          <Button variant="secondary" className="w-full font-bold">了解更多</Button>
        </div>
      </aside>
      <AiAssistant context="forum" />
    </div>
  );
}
