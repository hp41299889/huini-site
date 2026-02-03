import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { 
  Mail, 
  Phone, 
  CheckCircle2, 
  Sparkles, 
  Settings, 
  Send,
  ArrowRight,
  ShieldCheck,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AiAssistant } from "~/components/ai-assistant";

export default function CooperatePage() {  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // 這裡模擬寄信邏輯。在實際生產環境中，可以串接 EmailJS, Formspree 或後端 API。
    // 使用 mailto 也可以作為一個快速的備選方案，但為了更好的 UX，我們這裡模擬成功狀態。
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-6 text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tight"
          >
            我要合作
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl opacity-90 max-w-2xl mx-auto"
          >
            惠尼致力於打造高品質的客製化系統，並深度整合強大的 AI 技術，為您的企業賦能。
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-6 mt-12 grid lg:grid-cols-2 gap-12">
        {/* Left Side: Info */}
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              為什麼選擇惠尼？
            </h2>
            <div className="grid gap-6">
              {[
                { icon: Settings, title: "極致客製化", desc: "根據您的業務需求，從零打造最符合工作流程的系統解決方案。" },
                { icon: Sparkles, title: "強大 AI 整合", desc: "導入最新大語言模型與自動化技術，讓系統具備思考與智慧化處理能力。" },
                { icon: ShieldCheck, title: "穩定與安全", desc: "惠尼採用的架構經過嚴謹測試，確保數據安全與系統在高併發下的穩定性。" },
                { icon: Zap, title: "快速交付", desc: "敏捷開發流程，縮短從構想到上線的時間，搶佔市場先機。" }
              ].map((feature, i) => (
                <div key={i} className="flex gap-4 p-6 rounded-2xl bg-muted/30 border">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">聯絡惠尼</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-lg">
                <Phone className="h-5 w-5 text-primary" />
                <span className="font-medium">0987522399</span>
              </div>
              <div className="flex items-center gap-3 text-lg">
                <Mail className="h-5 w-5 text-primary" />
                <span className="font-medium">hp4129889@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div id="contact-form">
          <Card className="shadow-2xl border-2">
            <CardHeader className="bg-muted/30 pb-8">
              <CardTitle className="text-2xl">諮詢報價</CardTitle>
              <CardDescription>填寫下表，惠尼將於 24 小時內與您聯繫。</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 space-y-6"
                  >
                    <div className="h-20 w-20 rounded-full bg-green-100 text-green-600 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold">訊息已成功送出</h3>
                      <p className="text-muted-foreground">感謝您的諮詢，惠尼將儘速回覆您。</p>
                    </div>
                    <Button variant="outline" onClick={() => setSubmitted(false)}>再次填寫</Button>
                  </motion.div>
                ) : (
                  <motion.form 
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">您的姓名 / 單位</Label>
                        <Input id="name" placeholder="王小明" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">聯絡電話</Label>
                        <Input id="phone" placeholder="0912345678" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">電子郵件</Label>
                      <Input id="email" type="email" placeholder="example@gmail.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">合作類型</Label>
                      <Input id="subject" placeholder="例如：AI 客服系統、企業 ERP 客製化..." required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">需求詳述</Label>
                      <Textarea 
                        id="message" 
                        placeholder="請簡述您的需求，幫助惠尼為您提供更精確的報價與建議。" 
                        className="min-h-[150px]"
                        required 
                      />
                    </div>
                    <Button type="submit" className="w-full h-14 text-lg font-bold gap-2" disabled={loading}>
                      {loading ? "送出中..." : (
                        <>
                          提交諮詢 <Send className="h-5 w-5" />
                        </>
                      )}
                    </Button>
                    <p className="text-[10px] text-center text-muted-foreground">
                      提交即表示您同意惠尼處理您的個人資料以進行後續聯絡。
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <AiAssistant context="cooperate" />
    </div>
  );
}