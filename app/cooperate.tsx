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
  ShieldCheck,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AiAssistant } from "~/components/ai-assistant";
import { useTranslation } from "react-i18next";

export default function CooperatePage() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formsubmit.co/ajax/hp4129889@gmail.com", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();

      if (result.success === "true" || response.ok) {
        setSubmitted(true);
      } else {
        alert(t("cooperate.error_fail") + (result.message || t("cooperate.error_retry")));
      }
    } catch (error) {
      alert(t("cooperate.error_network"));
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: Settings, title: t("cooperate.features.f1.title"), desc: t("cooperate.features.f1.desc") },
    { icon: Sparkles, title: t("cooperate.features.f2.title"), desc: t("cooperate.features.f2.desc") },
    { icon: ShieldCheck, title: t("cooperate.features.f3.title"), desc: t("cooperate.features.f3.desc") },
    { icon: Zap, title: t("cooperate.features.f4.title"), desc: t("cooperate.features.f4.desc") }
  ];

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-12 md:py-20">
        <div className="container mx-auto px-6 text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-6xl font-black tracking-tight"
          >
            {t("cooperate.title")}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto"
          >
            {t("cooperate.hero_desc")}
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 mt-12 grid lg:grid-cols-2 gap-12">
        {/* Left Side: Info */}
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              {t("cooperate.why_title")}
            </h2>
            <div className="grid gap-6">
              {features.map((feature, i) => (
                <div key={i} className="flex gap-4 p-6 rounded-2xl bg-muted/30 border">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{t("cooperate.contact_title")}</h2>
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
            <CardHeader className="bg-muted/30 pb-6 md:pb-8">
              <CardTitle className="text-xl md:text-2xl">{t("cooperate.form_title")}</CardTitle>
              <CardDescription>{t("cooperate.form_desc")}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-8">
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
                      <h3 className="text-2xl font-bold">{t("cooperate.success_title")}</h3>
                      <p className="text-muted-foreground">{t("cooperate.success_desc")}</p>
                    </div>
                    <Button variant="outline" onClick={() => setSubmitted(false)}>{t("cooperate.refill")}</Button>
                  </motion.div>
                ) : (
                  <motion.form 
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* FormSubmit Configuration */}
                    <input type="hidden" name="_subject" value="惠尼官網：新合作諮詢需求" />
                    <input type="hidden" name="_template" value="table" />
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t("cooperate.fields.name")}</Label>
                        <Input id="name" name="name" placeholder={t("cooperate.fields.name_placeholder")} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t("cooperate.fields.phone")}</Label>
                        <Input id="phone" name="phone" placeholder={t("cooperate.fields.phone_placeholder")} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("cooperate.fields.email")}</Label>
                      <Input id="email" name="email" type="email" placeholder={t("cooperate.fields.email_placeholder")} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">{t("cooperate.fields.subject")}</Label>
                      <Input id="subject" name="subject" placeholder={t("cooperate.fields.subject_placeholder")} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">{t("cooperate.fields.message")}</Label>
                      <Textarea 
                        id="message" 
                        name="message"
                        placeholder={t("cooperate.fields.message_placeholder")} 
                        className="min-h-[150px]"
                        required 
                      />
                    </div>
                    <Button type="submit" className="w-full h-14 text-lg font-bold gap-2" disabled={loading}>
                      {loading ? t("cooperate.submitting") : (
                        <>
                          {t("cooperate.submit")} <Send className="h-5 w-5" />
                        </>
                      )}
                    </Button>
                    <p className="text-[10px] text-center text-muted-foreground">
                      {t("cooperate.terms_note")}
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
