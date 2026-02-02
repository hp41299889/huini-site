import React, { useState, useRef } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { 
  ShoppingCart, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  Truck, 
  Zap, 
  Smartphone,
  Heart,
  ChevronDown,
  CreditCard,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "~/lib/utils";
import { AiAssistant } from "~/components/ai-assistant";
import { useTranslation } from "react-i18next";

export default function EcommerceOnePageDemo() {
  const { t } = useTranslation();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const buySectionRef = useRef<HTMLDivElement>(null);

  const scrollToBuy = () => {
    buySectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const product = {
    name: "Huini Watch Pro",
    price: 3999,
    originalPrice: 5999,
    description: "重新定義您的智慧生活。Huini Watch Pro 結合頂尖工藝與前瞻科技，為您帶來前所未有的健康監測與極致效率。",
    specs: ["心率監測", "睡眠追蹤", "IP68 防水", "14 天續航", "1.5 吋 AMOLED 螢幕"],
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800",
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-xl text-sky-600">
            <Zap className="h-6 w-6 fill-current" />
            <span>HUINI SHOP</span>
          </div>
          <Button size="sm" onClick={scrollToBuy} className="rounded-full bg-orange-500 hover:bg-orange-600 font-bold">
            {t("ecommerce.buy_now")}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-100 border-none px-4 py-1 rounded-full text-sm font-bold">
              2026 全新上市
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
              您的健康 <br /> 值得更 <span className="text-sky-600">智慧</span> 的呵護
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              {product.description}
            </p>
            <div className="flex items-center gap-6 pt-4">
              <Button size="lg" onClick={scrollToBuy} className="rounded-full h-14 px-8 text-lg font-black bg-orange-500 hover:bg-orange-600 shadow-xl shadow-orange-200">
                {t("ecommerce.buy_now")} NT$ {product.price}
              </Button>
              <div className="flex flex-col">
                <div className="flex text-amber-500">
                  {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <span className="text-sm font-medium text-muted-foreground">5,000+ 用戶五星好評</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-sky-500/10 rounded-full blur-3xl" />
            <img 
              src={product.imageUrl} 
              className="relative w-full aspect-square object-cover rounded-[3rem] shadow-2xl" 
              alt="Product"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-black">極致功能，一應俱全</h2>
            <p className="text-muted-foreground">我們考慮到每一個使用細節，只為給您最完美的體驗。</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: "精準監測", desc: "搭載醫療級感應器，隨時掌握您的心率與血氧動態。" },
              { icon: Zap, title: "極速續航", desc: "一次充電即可使用 14 天，告別每日充電的煩惱。" },
              { icon: ShieldCheck, title: "強悍耐用", desc: "IP68 防水防塵標準，無論游泳或登山都能勝任。" },
            ].map((f, i) => (
              <Card key={i} className="border-none shadow-none bg-background p-4 rounded-3xl hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600 mb-2">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-bold">{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Buy Section */}
      <section ref={buySectionRef} className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 bg-background rounded-[3rem] shadow-2xl overflow-hidden border">
            <div className="bg-muted/30 p-12 flex flex-col justify-center">
              <h2 className="text-4xl font-black mb-6">準備好加入智慧生活了嗎？</h2>
              <div className="space-y-4 mb-8">
                {product.specs.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 font-medium">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-5xl font-black text-primary">NT$ {product.price}</span>
                <span className="text-xl text-muted-foreground line-through">NT$ {product.originalPrice}</span>
                <Badge className="bg-red-500">限時 66 折</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" /> {t("ecommerce.free_shipping")}
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> {t("ecommerce.warranty")}
                </div>
              </div>
            </div>

            <div className="p-12 relative">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-6"
                  >
                    <div className="h-20 w-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{t("booking.success_title")}</h3>
                      <p className="text-muted-foreground">感謝您的支持，我們將盡快為您出貨。</p>
                    </div>
                    <Button variant="outline" onClick={() => setIsSuccess(false)}>{t("common.back")}</Button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    onSubmit={handleCheckout}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold">{t("ecommerce.checkout_info")}</h3>
                      <CreditCard className="text-muted-foreground h-6 w-6" />
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>{t("ecommerce.first_name")}</Label>
                          <Input placeholder="王" required className="bg-background" />
                        </div>
                        <div className="space-y-2">
                          <Label>{t("ecommerce.last_name")}</Label>
                          <Input placeholder="小明" required className="bg-background" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>{t("ecommerce.address")}</Label>
                        <Input placeholder="請輸入詳細地址" required className="bg-background" />
                      </div>
                      <div className="space-y-2">
                        <Label>{t("ecommerce.payment_method")}</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <Button type="button" variant="outline" className="border-sky-500 bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300">{t("ecommerce.cash_on_delivery")}</Button>
                          <Button type="button" variant="outline" className="bg-background">{t("ecommerce.credit_card")}</Button>
                        </div>
                      </div>
                    </div>
                    <Button type="submit" className="w-full h-14 text-lg font-bold bg-sky-600 hover:bg-sky-700">
                      {t("ecommerce.complete_order")} NT$ {product.price}
                    </Button>
                    <p className="text-[10px] text-center text-muted-foreground">
                      點擊完成訂購即表示您同意我們的服務條款與隱私政策。
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t bg-background">
        <div className="container mx-auto px-4 text-center space-y-6">
          <div className="flex items-center justify-center gap-2 font-black text-2xl text-sky-600">
            <Zap className="h-8 w-8 fill-current" />
            <span>HUINI SHOP</span>
          </div>
          <p className="text-muted-foreground max-w-md mx-auto">
            我們致力於提供最優質的科技產品與服務，讓每個人都能享受智慧生活帶來的便利。
          </p>
          <div className="flex justify-center gap-8 text-sm font-bold text-slate-500">
            <a href="#" className="hover:text-sky-600">聯絡我們</a>
            <a href="#" className="hover:text-sky-600">運送政策</a>
            <a href="#" className="hover:text-sky-600">隱私條款</a>
          </div>
          <p className="text-xs text-slate-400">© 2026 Huini Technologies Inc. All rights reserved.</p>
        </div>
      </footer>
      
      <AiAssistant context="ecommerce" />
    </div>
  );
}
