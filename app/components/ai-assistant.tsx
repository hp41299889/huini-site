import React, { useState } from "react";
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
  | "corporate";

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

const contextConfig: Record<AiContext, ContextConfig> = {
  erp: { 
    title: "AI 企業顧問", 
    color: "#2563eb", 
    gradient: "from-[#2563eb] to-[#4f46e5]",
    suggestion: "分析本季度的營收增長點...",
    tools: [
      { label: "生成月報", icon: FileText, action: "generate_report" },
      { label: "預測營收", icon: LineChart, action: "forecast" },
      { label: "庫存優化", icon: PieChart, action: "inventory" }
    ]
  },
  booking: { 
    title: "AI 預約助手", 
    color: "#f97316", 
    gradient: "from-[#f97316] to-[#ef4444]",
    suggestion: "幫我查看下週一的空檔時段...",
    tools: [
      { label: "推薦時段", icon: Lightbulb, action: "suggest_slot" },
      { label: "自動排程", icon: Zap, action: "auto_schedule" }
    ]
  },
  project: { 
    title: "AI 任務分析師", 
    color: "#9333ea", 
    gradient: "from-[#9333ea] to-[#c026d3]",
    suggestion: "這項任務是否有潛在的延遲風險？",
    tools: [
      { label: "總結進度", icon: FileText, action: "summarize" },
      { label: "估計工時", icon: LineChart, action: "estimate" },
      { label: "風險預警", icon: AlertTriangle, action: "risk" }
    ]
  },
  lms: { 
    title: "AI 導師", 
    color: "#0d9488", 
    gradient: "from-[#0d9488] to-[#059669]",
    suggestion: "總結這堂課的重點並提供練習題...",
    tools: [
      { label: "製作測驗", icon: CheckCircle2, action: "quiz" },
      { label: "疑難排解", icon: HelpCircle, action: "solve" },
      { label: "個人化建議", icon: Wand2, action: "path" }
    ]
  },
  cms: { 
    title: "AI 內容生成器", 
    color: "#db2777", 
    gradient: "from-[#db2777] to-[#e11d48]",
    suggestion: "幫我為這篇文章寫一個吸引人的摘要...",
    tools: [
      { label: "SEO 優化", icon: Search, action: "seo" },
      { label: "文章續寫", icon: Wand2, action: "continue" },
      { label: "語法修正", icon: CheckCircle2, action: "fix" }
    ]
  },
  blog: { 
    title: "AI 寫作助手", 
    color: "#475569", 
    gradient: "from-[#334155] to-[#0f172a]",
    suggestion: "幫我擴充這段關於技術趨勢的內容...",
    tools: [
      { label: "標題建議", icon: Lightbulb, action: "titles" },
      { label: "摘要提取", icon: FileText, action: "summary" },
      { label: "翻譯", icon: Languages, action: "translate" }
    ]
  },
  social: { 
    title: "AI 社群經理", 
    color: "#e11d48", 
    gradient: "from-[#e11d48] to-[#be123c]",
    suggestion: "幫我寫一段具備病毒式傳播潛力的文案...",
    tools: [
      { label: "熱度分析", icon: LineChart, action: "stats" },
      { label: "生成回覆", icon: Send, action: "reply" },
      { label: "情緒監測", icon: BrainCircuit, action: "sentiment" }
    ]
  },
  ecommerce: { 
    title: "AI 購物清單建議", 
    color: "#0ea5e9", 
    gradient: "from-[#0ea5e9] to-[#2563eb]",
    suggestion: "根據我的喜好推薦搭配的配件...",
    tools: [
      { label: "比價助手", icon: Search, action: "price" },
      { label: "穿搭推薦", icon: Wand2, action: "outfit" },
      { label: "庫存通知", icon: Zap, action: "alert" }
    ]
  },
  forum: { 
    title: "AI 討論引導員", 
    color: "#16a34a", 
    gradient: "from-[#16a34a] to-[#0d9488]",
    suggestion: "幫我總結這個討論串的核心爭議點...",
    tools: [
      { label: "討論總結", icon: FileText, action: "recap" },
      { label: "違規偵測", icon: AlertTriangle, action: "mod" }
    ]
  },
  portfolio: { 
    title: "AI 簡歷優化師", 
    color: "#4f46e5", 
    gradient: "from-[#4f46e5] to-[#7c3aed]",
    suggestion: "如何描述我的 React 經驗更具競爭力？",
    tools: [
      { label: "代碼審查", icon: Code2, action: "review" },
      { label: "技能路徑", icon: LineChart, action: "roadmap" }
    ]
  },
  dashboard: { 
    title: "AI 數據分析師", 
    color: "#6366f1", 
    gradient: "from-[#6366f1] to-[#4338ca]",
    suggestion: "解釋這個趨勢圖背後的數據意義...",
    tools: [
      { label: "異常偵測", icon: AlertTriangle, action: "anomaly" },
      { label: "趨勢洞察", icon: Lightbulb, action: "insight" },
      { label: "導出報告", icon: FileText, action: "export" }
    ]
  },
  promotion: {
    title: "AI 營銷專家",
    color: "#d97706",
    gradient: "from-[#d97706] to-[#ea580c]",
    suggestion: "如何優化這個頁面的轉化率？",
    tools: [
      { label: "文案建議", icon: Edit3, action: "copy" },
      { label: "A/B 測試", icon: Zap, action: "ab_test" }
    ]
  },
  corporate: {
    title: "AI 品牌顧問",
    color: "#1d4ed8",
    gradient: "from-[#1d4ed8] to-[#0891b2]",
    suggestion: "提供關於品牌數位化轉型的策略...",
    tools: [
      { label: "競爭分析", icon: Search, action: "competitor" },
      { label: "願景優化", icon: Lightbulb, action: "vision" }
    ]
  }
};

interface AiAssistantProps {
  context: AiContext;
  className?: string;
  variant?: "floating" | "inline";
}

export function AiAssistant({ context, className, variant = "floating" }: AiAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { t } = useTranslation();
  
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
      className={cn("fixed bottom-6 right-6 flex flex-col items-end", className)} 
      style={{ zIndex: 99999 }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-80 shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden rounded-[2.5rem] border-4 border-white dark:border-slate-800 bg-white dark:bg-slate-900 backdrop-blur-xl"
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
            "h-18 w-18 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.2)] transition-all duration-500 p-0 overflow-hidden relative z-10 border-[6px] border-white dark:border-slate-900",
            isOpen ? "bg-slate-900" : "bg-gradient-to-br " + config.gradient
          )}
          style={{ width: '72px', height: '72px' }}
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
