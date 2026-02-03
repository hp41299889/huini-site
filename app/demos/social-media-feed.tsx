import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Home,
  Search,
  Bell,
  Mail,
  User,
  Hash,
  Bookmark,
  Image as ImageIcon,
  Smile,
  Calendar,
  Send,
  Zap,
  TrendingUp,
  Settings
} from "lucide-react";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { AiAssistant } from "~/components/ai-assistant";
import { useTranslation } from "react-i18next";

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    handle: string;
    verified?: boolean;
  };
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  retweets: number;
  timestamp: string;
  likedByCurrentUser: boolean;
}

export default function SocialMediaFeedDemo() {
  const { t } = useTranslation();
  
  // Mock Data inside component
  const initialPosts: Post[] = [
    {
      id: "p1",
      author: {
        name: t("common.author", "Xiaoming"),
        avatar: "/images/erp-emp-1.jpg",
        handle: "@xiaoming",
        verified: true
      },
      content: t("social.posts.p1"),
      imageUrl: "/images/social-post-1.jpg",
      likes: 124,
      comments: 12,
      retweets: 5,
      timestamp: t("common.date", "2h ago"),
      likedByCurrentUser: false,
    },
    {
      id: "p2",
      author: {
        name: "Jessica Wang",
        avatar: "/images/erp-emp-2.jpg",
        handle: "@jess_design",
      },
      content: t("social.posts.p2"),
      imageUrl: "/images/social-post-2.jpg",
      likes: 256,
      comments: 45,
      retweets: 18,
      timestamp: t("common.date", "5h ago"),
      likedByCurrentUser: true,
    },
  ];

  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPostContent, setNewPostContent] = useState("");

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likedByCurrentUser ? post.likes - 1 : post.likes + 1, likedByCurrentUser: !post.likedByCurrentUser } 
        : post
    ));
  };

  const handlePostSubmit = () => {
    if (!newPostContent.trim()) return;
    const newPost: Post = {
      id: Date.now().toString(),
      author: { name: t("common.name", "You"), handle: "@current_user", avatar: "Y" },
      content: newPostContent,
      likes: 0,
      comments: 0,
      retweets: 0,
      timestamp: t("common.date", "Just now"),
      likedByCurrentUser: false,
    };
    setPosts([newPost, ...posts]);
    setNewPostContent("");
  };

  return (
    <div className="flex bg-background min-h-screen relative">
      {/* Left Sidebar */}
      <aside className="w-20 lg:w-64 border-r flex flex-col items-center lg:items-start px-4 py-6 sticky top-0 h-screen">
        <div className="mb-8 px-2">
          <Zap className="h-8 w-8 text-rose-500 fill-rose-500" />
        </div>
        <nav className="flex-1 space-y-4 w-full">
          {[
            { icon: Home, label: t("social.sidebar.home"), active: true },
            { icon: Hash, label: t("social.sidebar.explore") },
            { icon: Bell, label: t("social.sidebar.notifications") },
            { icon: Mail, label: t("social.sidebar.messages") },
            { icon: Bookmark, label: t("social.sidebar.bookmarks") },
            { icon: User, label: t("social.sidebar.profile") },
            { icon: Settings, label: t("social.sidebar.settings") },
          ].map((item, i) => (
            <div 
              key={i} 
              className={cn(
                "flex items-center gap-4 p-3 rounded-full cursor-pointer transition-colors group",
                item.active ? "text-rose-500 bg-rose-50 dark:bg-rose-900/20 font-bold" : "hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-6 w-6", item.active && "fill-rose-500")} />
              <span className="text-lg hidden lg:block">{item.label}</span>
            </div>
          ))}
          <Button className="w-full rounded-full py-6 mt-4 hidden lg:flex bg-rose-500 hover:bg-rose-600 font-bold text-lg shadow-lg shadow-rose-200">
            {t("social.sidebar.post")}
          </Button>
          <Button size="icon" className="rounded-full h-12 w-12 lg:hidden bg-rose-500">
            <Send className="h-5 w-5" />
          </Button>
        </nav>
      </aside>

      {/* Main Feed */}
      <main className="flex-1 max-w-2xl border-r">
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b p-4">
          <h2 className="text-xl font-bold">{t("social.feed_title")}</h2>
        </header>

        {/* Post Creation */}
        <div className="p-4 border-b space-y-4">
          <div className="flex gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-muted">Me</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <textarea 
                placeholder={t("social.whats_happening")} 
                className="w-full bg-transparent border-none resize-none focus:ring-0 text-xl min-h-[100px] outline-none"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center text-rose-500">
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-rose-50"><ImageIcon className="h-5 w-5" /></Button>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-rose-50"><Hash className="h-5 w-5" /></Button>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-rose-50"><Smile className="h-5 w-5" /></Button>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-rose-50"><Calendar className="h-5 w-5" /></Button>
                </div>
                <Button 
                  className="rounded-full px-6 bg-rose-500 hover:bg-rose-600 font-bold"
                  disabled={!newPostContent.trim()}
                  onClick={handlePostSubmit}
                >
                  {t("social.post_button")}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Feed Posts */}
        <div className="divide-y">
          <AnimatePresence>
            {posts.map((post) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 hover:bg-muted/30 transition-colors cursor-pointer group"
              >
                <div className="flex gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="font-bold hover:underline decoration-2">{post.author.name}</span>
                        <span className="text-muted-foreground text-sm">{post.author.handle}</span>
                        <span className="text-muted-foreground text-sm">· {post.timestamp}</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100"><MoreHorizontal className="h-4 w-4" /></Button>
                    </div>
                    <p className="text-[15px] leading-normal">{post.content}</p>
                    {post.imageUrl && (
                      <div className="mt-3 rounded-2xl overflow-hidden border">
                        <img src={post.imageUrl} className="w-full object-cover max-h-[500px]" alt="Content" />
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-3 max-w-md text-muted-foreground">
                      <Button variant="ghost" size="sm" className="rounded-full hover:text-blue-500 hover:bg-blue-50 transition-colors gap-2">
                        <MessageCircle className="h-4 w-4" /> {post.comments}
                      </Button>
                      <Button variant="ghost" size="sm" className="rounded-full hover:text-green-500 hover:bg-green-50 transition-colors gap-2">
                        <TrendingUp className="h-4 w-4" /> {post.retweets}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={cn(
                          "rounded-full hover:text-rose-500 hover:bg-rose-50 transition-colors gap-2",
                          post.likedByCurrentUser && "text-rose-500"
                        )}
                        onClick={(e) => { e.stopPropagation(); handleLike(post.id); }}
                      >
                        <Heart className={cn("h-4 w-4", post.likedByCurrentUser && "fill-current")} /> {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="rounded-full hover:text-blue-500 hover:bg-blue-50 transition-colors">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="hidden xl:flex flex-col w-80 p-6 space-y-6 sticky top-0 h-screen overflow-y-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder={t("common.search")} className="pl-10 rounded-full bg-muted/50 border-none h-11" />
        </div>

        <Card className="rounded-2xl border-none bg-muted/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold">{t("social.trending")}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {[
              { category: t("social.trends.tech"), topic: "React Router v7", posts: "125K posts" },
              { category: t("social.trends.sports"), topic: "World Series", posts: "85K posts" },
              { category: t("social.trends.entertainment"), topic: "Huini Cinema", posts: "42K posts" },
              { category: t("social.trends.local"), topic: "#Taipei101", posts: "12K posts" },
            ].map((trend, i) => (
              <div key={i} className="px-4 py-3 hover:bg-muted transition-colors cursor-pointer">
                <p className="text-[10px] text-muted-foreground">{trend.category}</p>
                <p className="font-bold">{trend.topic}</p>
                <p className="text-[10px] text-muted-foreground">{trend.posts}</p>
              </div>
            ))}
          </CardContent>
          <CardFooter className="pt-2">
            <Button variant="link" className="text-rose-500 px-0 h-auto">{t("forum.learn_more")}</Button>
          </CardFooter>
        </Card>

        <Card className="rounded-2xl border-none bg-muted/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold">{t("social.who_to_follow")}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {[
              { name: "Frontend Master", handle: "@frontend_master", avatar: "FM" },
              { name: "Design Daily", handle: "@design_daily", avatar: "DD" },
            ].map((user, i) => (
              <div key={i} className="px-4 py-3 flex items-center justify-between hover:bg-muted transition-colors cursor-pointer text-foreground">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">{user.avatar}</div>
                  <div>
                    <p className="text-sm font-bold">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.handle}</p>
                  </div>
                </div>
                <Button size="sm" className="rounded-full bg-foreground text-background hover:bg-foreground/80">{t("social.follow")}</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </aside>
      <AiAssistant context="social" />
    </div>
  );
}
