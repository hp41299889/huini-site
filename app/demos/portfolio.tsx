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
import { Badge } from "~/components/ui/badge";
import {
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Code2,
  Cpu,
  Globe,
  Layout,
  Terminal,
  ChevronRight,
  Send,
  Download
} from "lucide-react";
import { Separator } from "~/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "~/lib/utils";
import { AiAssistant } from "~/components/ai-assistant";
import { useTranslation } from "react-i18next";

export default function PortfolioDemo() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("All");

  const projects = [
    {
      id: "p1",
      title: t("portfolio.projects.p1.title", "AI 協作開發平台"),
      category: "Fullstack",
      description: t("portfolio.projects.p1.desc", "整合多種 LLM 模型，提供實時代碼審查與自動化單元測試生成。大幅提升開發團隊的生產力。"),
      tags: ["Next.js", "Python", "OpenAI", "Tailwind"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "p2",
      title: t("portfolio.projects.p2.title", "跨鏈去中心化交易所"),
      category: "Blockchain",
      description: t("portfolio.projects.p2.desc", "基於零知識證明技術，實現低延遲、高安全性的跨鏈資產交換。支持多種主流公鏈。"),
      tags: ["Solidity", "TypeScript", "Ethers.js", "Rust"],
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "p3",
      title: t("portfolio.projects.p3.title", "沉浸式數據視覺化系統"),
      category: "Frontend",
      description: t("portfolio.projects.p3.desc", "為大型企業設計的即時監控儀表板。使用 WebGL 技術呈現複雜的全球物流拓撲結構。"),
      tags: ["React", "Three.js", "D3.js", "WebSockets"],
      image: "https://images.unsplash.com/photo-1551288049-bbdac8a28a1e?auto=format&fit=crop&q=80&w=800",
    },
  ];

  const experience = [
    { year: "2024 - Present", company: "Huini Tech", role: "Lead Fullstack Developer", desc: t("portfolio.exp.huini", "主導核心產品的架構設計與開發。") },
    { year: "2021 - 2023", company: "Cyber Soft", role: "Senior Frontend Engineer", desc: t("portfolio.exp.cyber", "優化大型電商平台的性能，提升 40% 的加載速度。") },
    { year: "2019 - 2021", company: "StartUp Inc", role: "Web Developer", desc: t("portfolio.exp.startup", "從零開始構建多個 MVP 並成功上線。") },
  ];

  const filteredProjects = projects.filter(p => filter === "All" || p.category === filter);

  return (
    <div className="bg-muted/30 min-h-screen relative text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background border-b py-24 lg:py-32">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-100 dark:border-blue-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              {t("portfolio.accepting_projects")}
            </div>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-none text-foreground">
              你好，我是 <br />
              <span className="text-blue-600">張大明</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              全端開發者與 UI/UX 愛好者。專注於使用 <span className="font-bold text-foreground">React</span>、<span className="font-bold text-foreground">Node.js</span> 與 <span className="font-bold text-foreground">TypeScript</span> 打造極致的數位體驗。
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="rounded-full bg-foreground text-background px-8 h-14 font-bold text-lg gap-2 border">
                開始合作 <ChevronRight className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                {[
                  { icon: Github, label: "GitHub" },
                  { icon: Linkedin, label: "LinkedIn" },
                  { icon: Mail, label: "Email" }
                ].map((social, i) => (
                  <Button key={i} variant="outline" size="icon" className="h-14 w-14 rounded-full border-2 hover:bg-muted transition-colors bg-background text-foreground">
                    <social.icon className="h-6 w-6" />
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
              <Avatar className="h-64 w-64 lg:h-80 lg:w-80 border-8 border-background shadow-2xl">
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-e695d7ea6d1?auto=format&fit=crop&q=80&w=400" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background border-b">
        <div className="container mx-auto px-6 flex flex-wrap justify-around gap-8 text-center">
          {[
            { label: "專案完成", val: "50+" },
            { label: "滿意客戶", val: "30+" },
            { label: "代碼貢獻", val: "10K+" },
            { label: "技術經驗", val: "6年" },
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <p className="text-3xl lg:text-5xl font-black text-foreground">{stat.val}</p>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Work Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-foreground">{t("portfolio.featured_work")}</h2>
              <p className="text-muted-foreground max-w-md font-medium text-lg">
                這是我最近參與的一些具備挑戰性的專案，展示了我的技術能力與設計品味。
              </p>
            </div>
            <div className="flex gap-2 p-1 bg-muted rounded-full">
              {["All", "Fullstack", "Blockchain", "Frontend"].map(cat => (
                <Button 
                  key={cat}
                  size="sm"
                  variant={filter === cat ? "default" : "ghost"}
                  onClick={() => setFilter(cat)}
                  className={cn("rounded-full px-6 font-bold", filter === cat ? "bg-background text-foreground shadow-sm" : "text-muted-foreground")}
                >
                  {cat === "All" ? t("common.all") : cat}
                </Button>
              ))}
            </div>
          </div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Card className="group h-full flex flex-col border-none shadow-none bg-background rounded-[2rem] overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img 
                        src={project.image} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        alt={project.title}
                      />
                      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button className="rounded-full bg-background text-foreground font-bold hover:bg-muted border">
                          {t("portfolio.view_project_details")}
                        </Button>
                      </div>
                    </div>
                    <CardHeader className="p-8 text-foreground">
                      <div className="flex items-center gap-2 mb-3">
                        {project.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="secondary" className="bg-muted text-muted-foreground font-bold text-[10px]">{tag}</Badge>
                        ))}
                      </div>
                      <CardTitle className="text-2xl font-black group-hover:text-blue-600 transition-colors">{project.title}</CardTitle>
                      <CardDescription className="text-base text-muted-foreground font-medium leading-relaxed pt-2">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="px-8 pb-8 mt-auto">
                      <Button variant="link" className="p-0 font-bold text-foreground group/link">
                        預覽連結 <ExternalLink className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Experience & Skills */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <h2 className="text-4xl font-black text-foreground">{t("portfolio.experience")}</h2>
            <div className="space-y-8 text-foreground">
              {experience.map((exp, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full border-4 border-muted bg-background flex items-center justify-center z-10 group-hover:border-blue-100 transition-colors">
                      <div className="h-3 w-3 rounded-full bg-slate-300 group-hover:bg-blue-500 transition-colors" />
                    </div>
                    <div className="w-0.5 flex-1 bg-muted" />
                  </div>
                  <div className="pb-8 space-y-2">
                    <span className="text-sm font-bold text-blue-600">{exp.year}</span>
                    <h4 className="text-xl font-black">{exp.company}</h4>
                    <p className="text-muted-foreground font-bold">{exp.role}</p>
                    <p className="text-muted-foreground font-medium opacity-70">{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="rounded-full px-8 h-12 font-bold border-2 bg-background text-foreground">
              <Download className="mr-2 h-4 w-4" /> {t("portfolio.download_resume")}
            </Button>
          </div>

          <div className="space-y-12">
            <h2 className="text-4xl font-black text-foreground">{t("portfolio.skills")}</h2>
            <div className="grid gap-8">
              {[
                { label: "前端開發", icon: Layout, skills: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"] },
                { label: "後端開發", icon: Terminal, skills: ["Node.js", "Python", "Go", "PostgreSQL", "Redis"] },
                { label: "架構設計", icon: Cpu, skills: ["Microservices", "System Design", "Docker", "AWS", "CI/CD"] },
              ].map((group, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <group.icon className="h-4 w-4" />
                    </div>
                    <h4 className="font-bold text-lg text-foreground">{group.label}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map(s => (
                      <Badge key={s} className="bg-background border-2 text-muted-foreground font-bold px-4 py-1 hover:border-blue-200 transition-colors">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-5xl bg-blue-600 rounded-[3rem] p-12 lg:p-20 text-center text-white space-y-8 relative overflow-hidden shadow-2xl shadow-blue-200">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <h2 className="text-4xl lg:text-6xl font-black leading-tight relative">
            {t("portfolio.cta_title")}
          </h2>
          <p className="text-xl text-blue-100 max-w-xl mx-auto relative font-medium">
            {t("portfolio.cta_desc")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative">
            <Button size="lg" className="rounded-full bg-background text-blue-600 hover:bg-blue-50 h-14 px-10 font-black text-lg gap-2 border-none">
              <Send className="h-5 w-5" /> {t("portfolio.contact_now")}
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-2 border-white/50 bg-white/10 hover:bg-white/20 h-14 px-10 font-black text-lg text-white">
              {t("portfolio.book_meeting")}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-background">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-black text-xl text-foreground">
            <Globe className="h-6 w-6 text-blue-600" />
            <span>JD.DEV</span>
          </div>
          <p className="text-muted-foreground text-sm font-medium">© 2026 Designed & Built by John Doe.</p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-blue-600 transition-colors"><Github className="h-5 w-5" /></a>
            <a href="#" className="text-muted-foreground hover:text-blue-600 transition-colors"><Linkedin className="h-5 w-5" /></a>
            <a href="#" className="text-muted-foreground hover:text-blue-600 transition-colors"><Mail className="h-5 w-5" /></a>
          </div>
        </div>
      </footer>
      <AiAssistant context="portfolio" />
    </div>
  );
}