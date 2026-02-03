import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Send, 
  X, 
  Bot, 
  ChevronRight,
  MessageCircle,
  BrainCircuit,
  Zap,
  LineChart,
  Edit3,
  ShoppingCart,
  GraduationCap,
  Calendar,
  Wand2,
  PieChart,
  Search,
  Languages,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileText,
  HelpCircle,
  Code2
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useTranslation } from "react-i18next";
import { cn } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";

export type AiContext = 
  | "erp" 
  | "booking" 
  | "project" 
  | "lms" 
  | "cms" 
  | "blog" 
  | "social" 
  | "ecommerce" 
  | "forum" 
  | "portfolio"
  | "dashboard"
  | "promotion"
  | "corporate"
  | "cooperate";

interface AiTool {
  label: string;
  icon: any;
  action: string;
}

interface ContextConfig {
  title: string;
  color: string;
  gradient: string;
  suggestion: string;
  tools: AiTool[];
}

// Consistent Frontal AI Icon (Bot head is very recognizable and frontal)
const GLOBAL_AI_ICON = Bot;

interface AiAssistantProps {
  context: AiContext;
  className?: string;
  variant?: "floating" | "inline";
}

export function AiAssistant({ context, className, variant = "floating" }: AiAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { t } = useTranslation();
  
  const contextConfig: Record<AiContext, ContextConfig> = useMemo(() => ({
    erp: { 
      title: t("ai.advisor", "AI Advisor"), 
      color: "#2563eb", 
      gradient: "from-[#2563eb] to-[#4f46e5]",
      suggestion: t("ai.suggest_erp", "Analyze revenue growth for this quarter..."),
      tools: [
        { label: t("ai.tools.report", "Report"), icon: FileText, action: "generate_report" },
        { label: t("ai.tools.forecast", "Forecast"), icon: LineChart, action: "forecast" },
        { label: t("ai.tools.inventory", "Inventory"), icon: PieChart, action: "inventory" }
      ]
    },
    booking: { 
      title: t("ai.assistant", "AI Assistant"), 
      color: "#f97316", 
      gradient: "from-[#f97316] to-[#ef4444]",
      suggestion: t("ai.suggest_booking", "Check free slots for next Monday..."),
      tools: [
        { label: t("ai.tools.suggest_slot", "Suggest Slot"), icon: Lightbulb, action: "suggest_slot" },
        { label: t("ai.tools.auto_schedule", "Auto Schedule"), icon: Zap, action: "auto_schedule" }
      ]
    },
    project: { 
      title: t("ai.analyze", "AI Analyst"), 
      color: "#9333ea", 
      gradient: "from-[#9333ea] to-[#c026d3]",
      suggestion: t("ai.suggest_project", "Any potential risks for this task?"),
      tools: [
        { label: t("ai.tools.summarize", "Summarize"), icon: FileText, action: "summarize" },
        { label: t("ai.tools.estimate", "Estimate"), icon: LineChart, action: "estimate" },
        { label: t("ai.tools.risk", "Risk Alert"), icon: AlertTriangle, action: "risk" }
      ]
    },
    lms: { 
      title: t("ai.tutor", "AI Tutor"), 
      color: "#0d9488", 
      gradient: "from-[#0d9488] to-[#059669]",
      suggestion: t("ai.suggest_lms", "Summarize key points and give me quiz..."),
      tools: [
        { label: t("ai.tools.quiz", "Quiz"), icon: CheckCircle2, action: "quiz" },
        { label: t("ai.tools.solve", "Q&A"), icon: HelpCircle, action: "solve" },
        { label: t("ai.tools.path", "Path"), icon: Wand2, action: "path" }
      ]
    },
    cms: { 
      title: t("ai.generate", "AI Generator"), 
      color: "#db2777", 
      gradient: "from-[#db2777] to-[#e11d48]",
      suggestion: t("ai.suggest_cms", "Write a catchy abstract for this article..."),
      tools: [
        { label: t("ai.tools.seo", "SEO"), icon: Search, action: "seo" },
        { label: t("ai.tools.continue", "Continue"), icon: Wand2, action: "continue" },
        { label: t("ai.tools.fix", "Fix Grammar"), icon: CheckCircle2, action: "fix" }
      ]
    },
    blog: { 
      title: t("ai.helper", "AI Helper"), 
      color: "#475569", 
      gradient: "from-[#334155] to-[#0f172a]",
      suggestion: t("ai.suggest_blog", "Expand on this tech trend..."),
      tools: [
        { label: t("ai.tools.titles", "Titles"), icon: Lightbulb, action: "titles" },
        { label: t("ai.tools.summary", "Summary"), icon: FileText, action: "summary" },
        { label: t("ai.tools.translate", "Translate"), icon: Languages, action: "translate" }
      ]
    },
    social: { 
      title: t("ai.manager", "AI Manager"), 
      color: "#e11d48", 
      gradient: "from-[#e11d48] to-[#be123c]",
      suggestion: t("ai.suggest_social", "Write a viral potential copy..."),
      tools: [
        { label: t("ai.tools.stats", "Stats"), icon: LineChart, action: "stats" },
        { label: t("ai.tools.reply", "Reply"), icon: Send, action: "reply" },
        { label: t("ai.tools.sentiment", "Sentiment"), icon: BrainCircuit, action: "sentiment" }
      ]
    },
    ecommerce: { 
      title: t("ai.advisor", "AI Advisor"), 
      color: "#0ea5e9", 
      gradient: "from-[#0ea5e9] to-[#2563eb]",
      suggestion: t("ai.suggest_ecommerce", "Recommend accessories based on my likes..."),
      tools: [
        { label: t("ai.tools.price", "Price Check"), icon: Search, action: "price" },
        { label: t("ai.tools.outfit", "Outfit"), icon: Wand2, action: "outfit" },
        { label: t("ai.tools.alert", "Alert"), icon: Zap, action: "alert" }
      ]
    },
    forum: { 
      title: t("ai.mod", "AI Moderator"), 
      color: "#16a34a", 
      gradient: "from-[#16a34a] to-[#0d9488]",
      suggestion: t("ai.suggest_forum", "Summarize core arguments of this thread..."),
      tools: [
        { label: t("ai.tools.recap", "Recap"), icon: FileText, action: "recap" },
        { label: t("ai.tools.mod", "Detect"), icon: AlertTriangle, action: "mod" }
      ]
    },
    portfolio: { 
      title: t("ai.coach", "AI Coach"), 
      color: "#4f46e5", 
      gradient: "from-[#4f46e5] to-[#7c3aed]",
      suggestion: t("ai.suggest_portfolio", "How to describe my React experience better?"),
      tools: [
        { label: t("ai.tools.review", "Review"), icon: Code2, action: "review" },
        { label: t("ai.tools.roadmap", "Roadmap"), icon: LineChart, action: "roadmap" }
      ]
    },
    dashboard: { 
      title: t("ai.analyst", "AI Analyst"), 
      color: "#6366f1", 
      gradient: "from-[#6366f1] to-[#4338ca]",
      suggestion: t("ai.suggest_dashboard", "Explain the meaning behind this trend..."),
      tools: [
        { label: t("ai.tools.anomaly", "Anomaly"), icon: AlertTriangle, action: "anomaly" },
        { label: t("ai.tools.insight", "Insight"), icon: Lightbulb, action: "insight" },
        { label: t("ai.tools.export", "Export"), icon: FileText, action: "export" }
      ]
    },
    promotion: {
      title: t("ai.expert", "AI Expert"),
      color: "#d97706",
      gradient: "from-[#d97706] to-[#ea580c]",
      suggestion: t("ai.suggest_promotion", "How to optimize conversion rate?"),
      tools: [
        { label: t("ai.tools.copy", "Copy"), icon: Edit3, action: "copy" },
        { label: t("ai.tools.ab_test", "A/B Test"), icon: Zap, action: "ab_test" }
      ]
    },
    corporate: {
      title: t("ai.consultant", "AI Consultant"),
      color: "#1d4ed8",
      gradient: "from-[#1d4ed8] to-[#0891b2]",
      suggestion: t("ai.suggest_corporate", "Strategies for digital transformation..."),
      tools: [
        { label: t("ai.tools.competitor", "Competitor"), icon: Search, action: "competitor" },
        { label: t("ai.tools.vision", "Vision"), icon: Lightbulb, action: "vision" }
      ]
    },
    cooperate: {
      title: t("ai.consultant", "AI Consultant"),
      color: "#1d4ed8",
      gradient: "from-[#1d4ed8] to-[#0891b2]",
      suggestion: t("ai.suggest_corporate", "Strategies for digital transformation..."),
      tools: [
        { label: t("ai.tools.competitor", "Competitor"), icon: Search, action: "competitor" },
        { label: t("ai.tools.vision", "Vision"), icon: Lightbulb, action: "vision" }
      ]
    }
  }), [t]);

  const config = contextConfig[context];

  const handleToggle = () => setIsOpen(!isOpen);

  if (variant === "inline") {
    return (
      <Card className={cn("overflow-hidden border-2 border-primary/20 bg-card/50 backdrop-blur-sm relative shadow-2xl z-10", className)}>
        <div className={cn("absolute top-0 left-0 w-full h-1 bg-gradient-to-r", config.gradient)} />
        <CardHeader className="flex flex-row items-center gap-3 py-4">
          <motion.div 
            animate={{ 
              scale: [1, 1.15, 1],
              rotate: [0, 5, -5, 0]
            }} 
            transition={{ repeat: Infinity, duration: 4 }}
            className="p-2.5 rounded-xl bg-background shadow-lg border border-primary/20"
            style={{ color: config.color }}
          >
            <GLOBAL_AI_ICON className="h-6 w-6" />
          </motion.div>
          <div>
            <CardTitle className="text-sm font-black flex items-center gap-2">
              {config.title}
              <Badge variant="secondary" className="text-[8px] h-4 bg-primary text-white border-none animate-pulse">AI POWERED</Badge>
            </CardTitle>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold opacity-70">Intelligent Business Core</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pb-4">
          <div className="grid grid-cols-2 gap-2">
            {config.tools.map((tool, i) => (
              <Button key={i} variant="outline" size="sm" className="h-9 text-[10px] gap-2 font-black hover:bg-primary hover:text-white transition-all border-2 border-dashed border-primary/30">
                <tool.icon className="h-3.5 w-3.5" /> {tool.label}
              </Button>
            ))}
          </div>
          <div className="bg-muted/30 rounded-xl p-3 text-xs text-muted-foreground border border-primary/10 italic relative overflow-hidden group">
            <div className={cn("absolute inset-y-0 left-0 w-1 bg-gradient-to-b", config.gradient)} />
            "{config.suggestion}"
          </div>
          <div className="flex gap-2">
            <Input 
              placeholder={t("ai.placeholder")} 
              className="h-10 text-xs bg-background shadow-inner rounded-xl border-2 border-muted"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button size="icon" className={cn("h-10 w-10 shrink-0 shadow-lg rounded-xl bg-gradient-to-br", config.gradient)}>
              <Send className="h-4 w-4 text-white" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div 
      className={cn("fixed bottom-20 md:bottom-6 right-4 md:right-6 flex flex-col items-end", className)} 
      style={{ zIndex: 9999 }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[calc(100vw-2rem)] md:w-80 shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden rounded-[2.5rem] border-4 border-white dark:border-slate-800 bg-white dark:bg-slate-900 backdrop-blur-xl"
          >
            <div className={cn("p-6 flex items-center justify-between text-white relative overflow-hidden bg-gradient-to-br", config.gradient)}>
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ repeat: Infinity, duration: 5 }}
                className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full blur-3xl" 
              />
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md border border-white/30 shadow-inner">
                  <GLOBAL_AI_ICON className="h-6 w-6" />
                </div>
                <div>
                  <span className="font-black text-lg tracking-tight block leading-tight">{config.title}</span>
                  <Badge className="bg-black/20 hover:bg-black/20 border-none text-[8px] h-4 px-1.5">{t("ai.powered_by")}</Badge>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20 relative z-10 rounded-full" onClick={handleToggle}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                  <Zap className="h-3 w-3 text-primary animate-pulse" /> {t("ai.tools_box")}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {config.tools.map((tool, i) => (
                    <Button 
                      key={i} 
                      variant="secondary" 
                      size="sm" 
                      className="h-10 rounded-2xl text-[10px] font-black gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white transition-all border-none shadow-sm"
                    >
                      <tool.icon className="h-3.5 w-3.5" /> {tool.label}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator className="opacity-50" />

              <div className="space-y-2">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{t("ai.quick_ask")}</p>
                <button 
                  className="w-full text-left p-4 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800/50 hover:bg-primary/10 text-[11px] transition-all border-2 border-dashed border-primary/20 italic text-primary font-bold group"
                  onClick={() => setQuery(config.suggestion)}
                >
                  <span className="opacity-60 group-hover:opacity-100 transition-opacity">"{config.suggestion}"</span>
                </button>
              </div>

              <div className="relative group">
                <div className={cn("absolute -inset-1 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 animate-tilt bg-gradient-to-r", config.gradient)} />
                <div className="relative flex gap-2">
                  <Input 
                    placeholder={t("ai.placeholder")} 
                    className="h-14 rounded-[1.5rem] text-sm border-none shadow-2xl bg-white dark:bg-slate-800 px-5 text-slate-900 dark:text-white"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <Button size="icon" className={cn("h-14 w-14 rounded-[1.5rem] shrink-0 shadow-xl bg-gradient-to-br transition-transform hover:scale-105 active:scale-95 text-white", config.gradient)}>
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative group"
      >
        {/* Glow Effect */}
        <div className={cn("absolute -inset-2 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition duration-500 animate-pulse bg-gradient-to-br", config.gradient)} />
        
        {/* Border Glow */}
        <div className={cn("absolute -inset-0.5 rounded-full opacity-100 group-hover:opacity-100 transition duration-500 bg-gradient-to-br", config.gradient)} />

        <Button
          size="lg"
          className={cn(
            "h-14 w-14 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.2)] transition-all duration-500 p-0 overflow-hidden relative z-10 border-[4px] border-white dark:border-slate-900",
            isOpen ? "bg-slate-900" : "bg-gradient-to-br " + config.gradient
          )}
          style={{ width: '56px', height: '56px' }}
          onClick={handleToggle}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="h-8 w-8 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="ai"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="relative flex items-center justify-center"
              >
                <GLOBAL_AI_ICON className="h-6 w-6 text-white" />
                
                {/* Internal dynamic rings */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0, 0.3]
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -inset-4 bg-white rounded-full -z-10"
                />
                <motion.div 
                  animate={{ 
                    scale: [1, 1.8, 1],
                    opacity: [0.2, 0, 0.2]
                  }}
                  transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
                  className="absolute -inset-6 bg-white rounded-full -z-10"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>
    </div>
  );
}