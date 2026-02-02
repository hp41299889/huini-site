import { cn } from "~/lib/utils";
import { ArrowRight } from "lucide-react"; 
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className={cn("min-h-screen flex flex-col items-center bg-background text-foreground relative overflow-hidden")}>
      {/* Background elements for visual interest and glassmorphism effect */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* Content Sections */}
      <main className="flex flex-col items-center justify-center flex-1 z-10 p-4 w-full max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-24 mt-16 px-4 relative isolate">
          <h1 className="text-6xl md:text-8xl font-heading font-bold text-primary mb-6 leading-tight animate-fade-in-up drop-shadow-md">
            {t("home.hero_title", "以智慧構建")}
          </h1>
          <p className="text-xl md:text-2xl font-sans text-foreground max-w-3xl mx-auto opacity-0 animate-fade-in delay-200 drop-shadow-sm">
            {t("home.hero_desc", "展示尖端 UI/UX、動畫和 AI 整合，打造現代化網路應用。")}
          </p>
          <a href="/demos" className="mt-10 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent hover:bg-accent/90 transition-colors duration-300 animate-fade-in delay-700 opacity-0 transform translate-y-2">
            {t("home.explore_demos", "探索所有演示")} <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </section>

        {/* Personal Introduction - Card with Glassmorphism */}
        <section className="max-w-4xl mx-auto text-center mb-24 px-4 relative z-10">
          <div className="bg-card/30 backdrop-blur-md border border-border/50 rounded-2xl p-8 shadow-xl animate-fade-in delay-1000">
            <h2 className="text-4xl font-heading font-semibold text-primary mb-6 drop-shadow-sm">{t("navbar.about")}</h2>
            <p className="text-lg md:text-xl font-sans text-foreground leading-relaxed drop-shadow-sm">
              {t("home.about_me_text", "作為一名全端開發者，我專注於打造優雅且高效能的網路解決方案。我的熱情在於透過流暢的動畫和智慧的 AI 驅動功能，創造直觀的使用者體驗。")}
            </p>
          </div>
        </section>

        {/* Demo Quick Access - Cards with Glassmorphism */}
        <section className="text-center w-full max-w-6xl mx-auto px-4 mb-24 relative z-10">
          <h2 className="text-4xl font-heading font-semibold text-primary mb-12 drop-shadow-sm animate-fade-in delay-1200">{t("home.quick_access_title", "探索我的演示")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card/30 backdrop-blur-md border border-border/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in delay-1300">
              <h3 className="text-2xl font-heading font-bold text-primary mb-3 drop-shadow-sm">{t("demos_list.dashboard_title")}</h3>
              <p className="text-base font-sans text-foreground mb-4 drop-shadow-sm">{t("home.demo_saas_desc", "結合 AI 洞察的數據分析與互動圖表。")}</p>
              <a href="/demos/dashboard" className="text-accent hover:underline font-sans font-medium inline-flex items-center group">
                {t("common.view")}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            <div className="bg-card/30 backdrop-blur-md border border-border/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in delay-1400">
              <h3 className="text-2xl font-sans font-bold text-primary mb-3 drop-shadow-sm">{t("demos_list.cms_title")}</h3>
              <p className="text-base font-sans text-foreground mb-4 drop-shadow-sm">{t("home.demo_cms_desc", "支援 AI 草稿的所見即所得內容管理。")}</p>
              <a href="/demos/cms" className="text-accent hover:underline font-sans font-medium inline-flex items-center group">
                {t("common.view")}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            <div className="bg-card/30 backdrop-blur-md border border-border/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in delay-1500">
              <h3 className="text-2xl font-sans font-bold text-primary mb-3 drop-shadow-sm">{t("demos_list.ecommerce_onepage_title")}</h3>
              <p className="text-base font-sans text-foreground mb-4 drop-shadow-sm">{t("home.demo_land_desc", "具備個性化推薦的高轉換電商頁面。")}</p>
              <a href="/demos/ecommerce-onepage" className="text-accent hover:underline font-sans font-medium inline-flex items-center group">
                {t("common.view")}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
          <a href="/demos" className="text-accent hover:underline text-xl font-sans font-medium mt-16 inline-block opacity-0 animate-fade-in delay-1700">{t("home.explore_demos")} &rarr;</a>
        </section>
      </main>
    </div>
  );
}