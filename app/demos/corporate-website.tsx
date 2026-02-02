import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  Lightbulb,
  Briefcase,
  Users,
  MessageSquare,
  ArrowRightIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { AiAssistant } from "~/components/ai-assistant";
import { useTranslation } from "react-i18next";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const teamMemberVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function CorporateWebsiteDemo() {
  const { t } = useTranslation();
  
  const services = [
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: "創新解決方案",
      description: "提供領先業界的技術與獨到見解，為您的業務注入活力。",
    },
    {
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      title: "專業專案管理",
      description: "從規劃到執行，確保專案順利高效，達到預期目標。",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "客製化服務",
      description: "依據您的獨特需求，量身打造最合適的數位策略。",
    },
  ];

  const teamMembers = [
    {
      name: "陳偉倫",
      title: "執行長",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-e695d7ea6d1?auto=format&fit=crop&q=80&w=200",
    },
    {
      name: "林佳琪",
      title: "技術總監",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
    },
    {
      name: "黃俊傑",
      title: "市場行銷經理",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    },
  ];

  const news = [
    {
      id: 1,
      title: "公司榮獲年度最佳創新獎",
      date: "2026-01-29",
      summary: "我們的最新專案獲得了業界的高度肯定。",
    },
    {
      id: 2,
      title: "拓展海外市場，成立歐洲分公司",
      date: "2026-01-25",
      summary: "全球化戰略邁出重要一步。",
    },
    {
      id: 3,
      title: "發布年度技術白皮書",
      date: "2026-01-20",
      summary: "深入探討未來科技發展趨勢。",
    },
  ];

  return (
    <div className="bg-background text-foreground relative">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 md:py-32 text-center overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in">
            領先業界的數位解決方案提供商
          </h1>
          <p className="text-lg md:text-xl mb-8 animate-fade-in-up">
            助您在數位時代中脫穎而出，實現業務增長
          </p>
          <Button
            size="lg"
            className="bg-background text-blue-600 hover:bg-gray-100 animate-fade-in-up delay-200"
          >
            了解我們的服務
          </Button>
        </div>
      </section>

      {/* About Us Section */}
      <motion.section
        className="py-16 md:py-24"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("navbar.about")}</h2>
          <p className="text-lg text-muted-foreground mb-8">
            我們致力於為全球客戶提供創新的數位解決方案。憑藉多年的行業經驗和對技術的熱情，
            我們幫助企業應對挑戰，抓住機遇，實現可持續發展。
          </p>
          <Button variant="outline">{t("common.details")}</Button>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        className="py-16 md:py-24 bg-card"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">我們的服務</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-lg shadow-md bg-background hover:shadow-lg transition-shadow duration-300 border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        className="py-16 md:py-24"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">我們的團隊</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-lg bg-card shadow-md flex flex-col items-center border"
                variants={teamMemberVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.1 }}
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-primary"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-muted-foreground">{member.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* News/Blog Section */}
      <motion.section
        className="py-16 md:py-24 bg-card"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            最新消息
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <motion.div
                key={item.id}
                className="bg-background p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {item.date}
                </p>
                <p className="text-muted-foreground">{item.summary}</p>
                <Button variant="link" className="mt-4 p-0">
                  {t("blog.read_more")} <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            準備好改變您的業務了嗎？
          </h2>
          <Button size="lg" className="bg-background text-primary hover:bg-gray-100">
            {t("about.contact_title")} <MessageSquare className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
      
      <AiAssistant context="corporate" />
    </div>
  );
}