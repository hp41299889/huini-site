import { useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Megaphone,
  ShoppingCart,
  MoreHorizontal,
  Menu,
  X,
  ChevronRight
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export default function DemosIndex() {
  const { t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const categorizedDemos = [
    {
      category: t("demos_categories.business_applications"),
      icon: <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-primary" />,
      demos: [
        { name: t("demos_list.erp_title"), path: "erp" },
        { name: t("demos_list.dashboard_title"), path: "dashboard" },
        { name: t("demos_list.booking_system_title"), path: "booking-system" },
        { name: t("demos_list.project_management_title"), path: "project-management" },
        { name: t("demos_list.lms_title"), path: "lms" },
      ],
    },
    {
      category: t("demos_categories.content_marketing"),
      icon: <Megaphone className="w-5 h-5 md:w-6 md:h-6 text-primary" />,
      demos: [
        { name: t("demos_list.cms_title"), path: "cms" },
        { name: t("demos_list.content_promotion_title"), path: "content-promotion" },
        { name: t("demos_list.blog_title"), path: "blog" },
        { name: t("demos_list.social_media_feed_title"), path: "social-media-feed" },
        { name: t("demos_list.corporate_website_title"), path: "corporate-website" },
      ],
    },
    {
      category: t("demos_categories.ecommerce"),
      icon: <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-primary" />,
      demos: [
        { name: t("demos_list.ecommerce_onepage_title"), path: "ecommerce-onepage" },
        { name: t("demos_list.ecommerce_platform_title"), path: "ecommerce-platform" },
      ],
    },
    {
      category: t("demos_categories.other"),
      icon: <MoreHorizontal className="w-5 h-5 md:w-6 md:h-6 text-primary" />,
      demos: [
        { name: t("demos_list.forum_title"), path: "forum" },
        { name: t("demos_list.portfolio_title"), path: "portfolio" },
      ],
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  const scrollToCategory = (id: string) => {
    setIsSidebarOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Use CSS variable value or fallback
      const mobileNavHeight = 64;
      const desktopNavHeight = 80;
      const isMobile = window.innerWidth < 768;
      const offset = isMobile ? mobileNavHeight + 50 : desktopNavHeight + 20;
      
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="py-12 md:py-24 text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4"
        >
          {t("demos_list.all_demos")}
        </motion.h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
          {t("demos_list.click_to_view")}
        </p>
      </header>

      {/* Mobile Category Trigger - Floating Button with Perfect Docking */}
      <div className="md:hidden sticky top-[var(--nav-height-mobile)] z-40 w-full px-4 py-3 bg-background/80 backdrop-blur-md border-b mt-[-1px]">
        <Button 
          variant="outline" 
          className="w-full justify-between rounded-full bg-muted/30"
          onClick={() => setIsSidebarOpen(true)}
        >
          <span className="flex items-center gap-2">
            <Menu size={16} />
            {t("common.category")}
          </span>
          <ChevronRight size={16} className="text-muted-foreground" />
        </Button>
      </div>

      {/* Mobile Sidebar (Drawer) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-background z-[120] md:hidden shadow-2xl p-6"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold">{t("common.category")}</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                  <X size={20} />
                </Button>
              </div>
              <nav className="space-y-2">
                {categorizedDemos.map((category, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToCategory(`category-${idx}`)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-muted text-left transition-colors font-semibold"
                  >
                    <div className="text-primary">{category.icon}</div>
                    <span>{category.category}</span>
                  </button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 pb-24 max-w-7xl">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-16 md:space-y-32"
        >
          {categorizedDemos.map((category, idx) => (
            <section 
              key={category.category} 
              id={`category-${idx}`} 
              className="scroll-mt-[160px] md:scroll-mt-[120px] space-y-8"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-primary/5 text-primary shadow-sm">
                  {category.icon}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                  {category.category}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.demos.map((demo) => (
                  <motion.div key={demo.path} variants={item}>
                    <Link to={`/demos/${demo.path}`}>
                      <Card className="h-full hover:shadow-xl transition-all duration-300 border-border/40 hover:border-primary/20 group overflow-hidden">
                        <CardHeader className="relative pb-4">
                          <div className="flex justify-between items-start">
                            <CardTitle className="group-hover:text-primary transition-colors text-xl font-bold">
                              {demo.name}
                            </CardTitle>
                            <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                          </div>
                          <CardDescription className="line-clamp-2 mt-2 font-medium">
                            {t(`demos_list.${demo.path}_description_short`, { defaultValue: '' })}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="aspect-video w-full bg-muted/30 rounded-xl flex items-center justify-center group-hover:bg-primary/5 transition-all duration-500 overflow-hidden border border-border/5">
                             <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">{demo.path}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
