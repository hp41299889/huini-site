import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { 
  ArrowLeft, 
  CalendarDays, 
  User, 
  Search, 
  TrendingUp, 
  Bookmark, 
  Share2, 
  Heart, 
  MessageCircle,
  ChevronRight,
  Mail,
  Facebook,
  Twitter,
  Link2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "~/lib/utils";
import { AiAssistant } from "~/components/ai-assistant";
import { useTranslation } from "react-i18next";

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  imageUrl: string;
  likes: number;
}

export default function BlogDemo() {
  const { t } = useTranslation();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);

  const blogPostsData: BlogPost[] = [
    {
      id: "b1",
      title: t("blog.posts.b1.title"),
      summary: t("blog.posts.b1.summary"),
      content: t("blog.posts.b1.content"),
      author: t("common.author", "張三"),
      authorRole: t("blog.posts.b1.author_role"),
      date: "2026-02-01",
      readTime: `8 ${t("blog.reading_time")}`,
      category: t("blog.posts.b1.category"),
      tags: [t("blog.tags.frontend"), t("blog.tags.react"), t("blog.tags.web3")],
      imageUrl: "/images/blog-hero.jpg",
      likes: 128,
    },
    {
      id: "b2",
      title: t("blog.posts.b2.title"),
      summary: t("blog.posts.b2.summary"),
      content: "<p>Cloud computing...</p>",
      author: t("common.author", "李四"),
      authorRole: t("blog.posts.b2.author_role"),
      date: "2026-01-25",
      readTime: `12 ${t("blog.reading_time")}`,
      category: t("blog.posts.b2.category"),
      tags: [t("blog.tags.design_system"), t("blog.tags.product_mgmt")],
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
      likes: 85,
    },
    {
      id: "b3",
      title: t("blog.posts.b3.title"),
      summary: t("blog.posts.b3.summary"),
      content: "<p>Minimalism...</p>",
      author: t("common.author", "王五"),
      authorRole: t("blog.posts.b3.author_role"),
      date: "2026-01-20",
      readTime: `6 ${t("blog.reading_time")}`,
      category: t("blog.posts.b3.category"),
      tags: [t("blog.tags.design_system"), t("blog.tags.ui_ux")],
      imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800",
      likes: 210,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      setReadingProgress(progress);
    };
    if (selectedPost) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedPost]);

  if (selectedPost) {
    return (
      <div className="bg-background min-h-screen pb-20 relative">
        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 z-[60]">
          <div 
            className="h-full bg-primary transition-all duration-100" 
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-3xl">
          <Button
            variant="ghost"
            onClick={() => setSelectedPost(null)}
            className="mb-8 group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> {t("common.back")}
          </Button>

          <article className="space-y-8">
            <header className="space-y-4">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
                {selectedPost.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                {selectedPost.title}
              </h1>
              <div className="flex items-center justify-between border-y py-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center font-bold text-lg">
                    {selectedPost.author[0]}
                  </div>
                  <div>
                    <p className="font-bold text-lg">{selectedPost.author}</p>
                    <p className="text-sm text-muted-foreground">{selectedPost.authorRole}</p>
                  </div>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>{selectedPost.date}</p>
                  <p>{selectedPost.readTime}</p>
                </div>
              </div>
            </header>

            <img
              src={selectedPost.imageUrl}
              alt={selectedPost.title}
              className="w-full aspect-video object-cover rounded-3xl shadow-2xl"
            />

            <div className="prose prose-lg dark:prose-invert max-w-none pt-4 prose-headings:font-bold prose-blockquote:border-primary prose-blockquote:bg-muted/50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg">
              <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
            </div>

            <footer className="border-t pt-10 mt-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm" className="rounded-full gap-2">
                    <Heart className="h-4 w-4" /> {selectedPost.likes}
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full gap-2">
                    <MessageCircle className="h-4 w-4" /> 24
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="rounded-full"><Twitter className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="rounded-full"><Facebook className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="rounded-full"><Link2 className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="rounded-full"><Bookmark className="h-4 w-4" /></Button>
                </div>
              </div>
            </footer>
          </article>
        </div>
        <AiAssistant context="blog" />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen relative">
      <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-12">
        {/* Hero Section */}
        <section className="relative h-[500px] rounded-[2rem] overflow-hidden group cursor-pointer" onClick={() => setSelectedPost(blogPostsData[0])}>
          <img 
            src={blogPostsData[0].imageUrl} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            alt="Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full max-w-3xl space-y-4">
            <Badge className="bg-primary text-white border-none px-4 py-1">{t("blog.featured_article")}</Badge>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              {blogPostsData[0].title}
            </h2>
            <p className="text-gray-200 text-lg line-clamp-2">
              {blogPostsData[0].summary}
            </p>
            <div className="flex items-center gap-4 text-white/80 text-sm font-medium">
              <span>{blogPostsData[0].author}</span>
              <span>•</span>
              <span>{blogPostsData[0].date}</span>
              <span>•</span>
              <span>{blogPostsData[0].readTime}</span>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Feed */}
          <div className="lg:col-span-3 space-y-10">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">{t("blog.latest_articles")}</h3>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="text-primary font-bold">{t("common.all")}</Button>
                <Button variant="ghost" size="sm">{t("blog.most_popular")}</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPostsData.slice(1).map((post) => (
                <Card key={post.id} className="border-none shadow-none bg-transparent group cursor-pointer" onClick={() => setSelectedPost(post)}>
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-4 relative">
                    <img 
                      src={post.imageUrl} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      alt={post.title}
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-background/90 text-foreground backdrop-blur-sm border-none">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {post.summary}
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                      <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
                        {post.author[0]}
                      </div>
                      <span className="text-xs font-medium">{post.author}</span>
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Button variant="outline" className="w-full py-6 rounded-2xl border-2 font-bold text-lg">
              {t("common.loading")}
            </Button>
          </div>

          {/* Sidebar */}
          <aside className="space-y-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder={t("common.search")} className="pl-9 bg-muted/50 border-none h-11 rounded-xl" />
            </div>

            <section className="space-y-4">
              <h4 className="text-lg font-bold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" /> {t("blog.popular_tags")}
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  t("blog.tags.ai"),
                  t("blog.tags.react"),
                  t("blog.tags.typescript"),
                  t("blog.tags.design_system"),
                  t("blog.tags.ui_ux"),
                  t("blog.tags.product_mgmt"),
                  t("blog.tags.career"),
                  t("blog.tags.web3")
                ].map(tag => (
                  <Badge key={tag} variant="secondary" className="px-3 py-1 cursor-pointer hover:bg-primary hover:text-white transition-colors">
                    {tag}
                  </Badge>
                ))}
              </div>
            </section>

            <Card className="bg-muted/30 border-none p-6 rounded-3xl space-y-4">
              <Mail className="h-10 w-10 text-primary" />
              <h4 className="text-xl font-bold">{t("blog.newsletter_title")}</h4>
              <p className="text-sm text-muted-foreground">{t("blog.newsletter_desc")}</p>
              <Input placeholder={t("booking.form.email")} className="bg-background border-none h-11" />
              <Button className="w-full h-11 font-bold">{t("blog.subscribe")}</Button>
            </Card>

            <section className="space-y-4">
              <h4 className="text-lg font-bold">{t("blog.recommended_authors")}</h4>
              {[
                { name: t("common.author", "張三"), role: t("blog.roles.frontend"), avatar: "Z" },
                { name: t("common.author", "李四"), role: t("blog.roles.pm"), avatar: "L" },
                { name: t("common.author", "王五"), role: t("blog.roles.designer"), avatar: "W" },
              ].map((author, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                      {author.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{author.name}</p>
                      <p className="text-xs text-muted-foreground">{author.role}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 rounded-full">{t("social.follow")}</Button>
                </div>
              ))}
            </section>
          </aside>
        </div>
      </div>
      <AiAssistant context="blog" />
    </div>
  );
}