import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { motion } from "framer-motion";
import { ArrowRightIcon, CheckCircle2Icon } from "lucide-react";
import { AiAssistant } from "~/components/ai-assistant";
import { useTranslation } from "react-i18next";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: "easeOut" },
  },
};

export default function ContentPromotionDemo() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Simulate API call
    setTimeout(() => {
      setFormSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <div className="bg-background text-foreground relative">
      {/* Hero Section */}
      <motion.section
        className="relative h-[60vh] md:h-[75vh] flex items-center justify-center text-center bg-gradient-to-r from-primary to-blue-600 text-white overflow-hidden p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src="/images/promotion-hero.jpg"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 max-w-3xl">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {t("promotion.hero_title")}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-8 drop-shadow-md"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {t("promotion.hero_desc")}
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Button
              size="lg"
              className="bg-background text-primary hover:bg-gray-100 shadow-lg transition-all"
            >
              {t("common.details")} <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-16 md:py-24 bg-card"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("promotion.features_title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            {t("promotion.features_desc")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={sectionVariants}>
              <h3 className="text-xl font-semibold mb-2">{t("promotion.features.f1.title")}</h3>
              <p className="text-muted-foreground">
                {t("promotion.features.f1.desc")}
              </p>
            </motion.div>
            <motion.div variants={sectionVariants}>
              <h3 className="text-xl font-semibold mb-2">{t("promotion.features.f2.title")}</h3>
              <p className="text-muted-foreground">
                {t("promotion.features.f2.desc")}
              </p>
            </motion.div>
            <motion.div variants={sectionVariants}>
              <h3 className="text-xl font-semibold mb-2">{t("promotion.features.f3.title")}</h3>
              <p className="text-muted-foreground">
                {t("promotion.features.f3.desc")}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* About Section with Image */}
      <motion.section
        className="py-16 md:py-24 bg-background"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div variants={imageVariants}>
            <img
              src="/images/promotion-about.jpg"
              alt="Team Collaboration"
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </motion.div>
          <motion.div variants={sectionVariants}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("navbar.about")}</h2>
            <p className="text-lg text-muted-foreground mb-4">
              {t("promotion.about_desc1")}
            </p>
            <p className="text-muted-foreground">
              {t("promotion.about_desc2")}
            </p>
            <Button className="mt-8">
              {t("promotion.meet_team")} <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section
        className="py-16 md:py-24 bg-card"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {t("about.contact_title")}
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            {t("promotion.contact_desc")}
          </p>
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6 bg-background p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-10"
              >
                <CheckCircle2Icon className="h-20 w-20 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-600">
                  {t("booking.success_title")}
                </h3>
                <p className="text-muted-foreground">
                  {t("promotion.success_msg")}
                </p>
                <Button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-6"
                >
                  {t("promotion.send_another")}
                </Button>
              </motion.div>
            ) : (
              <>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    {t("booking.form.name")}
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-background"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    {t("booking.form.email")}
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-background"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    {t("promotion.message_label")}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-background"
                  />
                </div>
                <Button type="submit" className="w-full">
                  {t("common.submit")}
                </Button>
              </>
            )}
          </motion.form>
        </div>
      </motion.section>
      
      <AiAssistant context="promotion" />
    </div>
  );
}
