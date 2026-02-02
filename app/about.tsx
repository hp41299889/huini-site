import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Mail, Github, Linkedin, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-black tracking-tight">{t("about.title", "關於惠尼")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("about.subtitle", "致力於打造最極致的數位體驗，為企業與個人提供創新的技術解決方案。")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-none shadow-lg bg-primary/5">
            <CardHeader>
              <CardTitle>{t("about.vision_title", "我們的願景")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {t("about.vision_desc", "在快速發展的數位時代，惠尼致力於成為技術與美學的橋樑。我們相信優秀的產品不僅要功能強大，更應該具備極致的用戶體驗與視覺美感。")}
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-secondary/10">
            <CardHeader>
              <CardTitle>{t("about.mission_title", "我們的使命")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {t("about.mission_desc", "透過持續的技術創新與對品質的堅持，協助客戶在數位轉型的道路上領先一步。我們提供從策略規劃、UI/UX 設計到全端開發的一站式服務。")}
              </p>
            </CardContent>
          </Card>
        </div>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center">{t("about.contact_title", "聯絡我們")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Mail, label: "Email", val: "contact@huini.site" },
              { icon: Phone, label: "Phone", val: "+886 2 2345 6789" },
              { icon: MapPin, label: "Location", val: "台北市信義區" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-6 rounded-2xl bg-muted/50 border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase">{item.label}</p>
                  <p className="font-bold">{item.val}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center pt-8 border-t">
          <p className="text-muted-foreground mb-6">{t("about.social_desc", "在社群媒體上關注我們，獲取最新技術分享。")}</p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="icon" className="rounded-full h-12 w-12 border-2">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full h-12 w-12 border-2">
              <Linkedin className="h-5 w-5" />
            </Button>
          </div>
        </section>
      </motion.div>
    </div>
  );
}

// Minimal button stub if UI component doesn't export correctly or similar
import { Button } from "~/components/ui/button";
