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
      title: t("corporate.services.s1.title"),
      description: t("corporate.services.s1.desc"),
    },
    {
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      title: t("corporate.services.s2.title"),
      description: t("corporate.services.s2.desc"),
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: t("corporate.services.s3.title"),
      description: t("corporate.services.s3.desc"),
    },
  ];

  const teamMembers = [
    {
      name: t("common.author", "陳偉倫"),
      title: t("corporate.roles.ceo"),
      avatar: "/images/team-1.jpg",
    },
    {
      name: t("common.author", "林佳琪"),
      title: t("corporate.roles.cto"),
      avatar: "/images/team-2.jpg",
    },
    {
      name: t("common.author", "黃俊傑"),
      title: t("corporate.roles.mkt"),
      avatar: "/images/team-3.jpg",
    },
  ];

  const news = [
    {
      id: 1,
      title: t("corporate.news.n1.title"),
      date: "2026-01-29",
      summary: t("corporate.news.n1.summary"),
    },
    {
      id: 2,
      title: t("corporate.news.n2.title"),
      date: "2026-01-25",
      summary: t("corporate.news.n2.summary"),
    },
    {
      id: 3,
      title: t("corporate.news.n3.title"),
      date: "2026-01-20",
      summary: t("corporate.news.n3.summary"),
    },
  ];

  return (
    <div className="bg-background text-foreground relative">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 md:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/corporate-hero.jpg" className="w-full h-full object-cover opacity-20" alt="Corporate Office" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in">
            {t("corporate.hero_title")}
          </h1>
          <p className="text-lg md:text-xl mb-8 animate-fade-in-up">
            {t("corporate.hero_desc")}
          </p>
          <Button
            size="lg"
            className="bg-background text-blue-600 hover:bg-gray-100 animate-fade-in-up delay-200"
          >
            {t("corporate.learn_services")}
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
            {t("promotion.about_desc1")}
            <br/>
            {t("promotion.about_desc2")}
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
          <h2 className="text-3xl md:text-4xl font-bold mb-12">{t("corporate.services_title")}</h2>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-12">{t("corporate.team_title")}</h2>
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
            {t("corporate.news_title")}
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
            {t("corporate.cta_title")}
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
