import { useThemeStore } from "~/stores/use-theme-store";
import { useLanguageStore } from "~/stores/use-language-store";
import { Sun, Moon, Languages } from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router"; // Import Link for site title and home links
import Navbar from "~/layout/navbar"; // Import the navigation-focused Navbar

export default function Topbar() {
  const { theme, toggleTheme } = useThemeStore();
  const { language, setLanguage } = useLanguageStore();
  const { t } = useTranslation();

  const handleLanguageToggle = () => {
    setLanguage(language === "zh" ? "en" : "zh");
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-[100] w-full transition-all duration-300",
        "bg-background/60 backdrop-blur-xl border-b border-border/40 shadow-sm",
        "h-[var(--nav-height-mobile)] md:h-[var(--nav-height)]"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-90 transition-all duration-200 group"
            >
              <div className="relative h-10 w-auto md:h-12 overflow-hidden">
                <img 
                  src="/images/huini-logo.png" 
                  alt={t("navbar.site_title")} 
                  className="h-full w-auto object-contain transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
          </div>

          {/* Center Navigation - Hidden on Mobile */}
          <div className="hidden md:flex flex-1 justify-center px-8">
            <Navbar />
          </div>

          {/* Right Action Section */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <Link to="/cooperate">
              <Button
                variant="default"
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300 font-semibold px-6 rounded-full cursor-pointer"
              >
                {t("navbar.cooperate")}
              </Button>
            </Link>

            <div className="flex items-center bg-muted/30 rounded-full p-1 border border-border/20">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full w-9 h-9 hover:bg-background/80 transition-colors cursor-pointer"
                aria-label={t("navbar.toggle_theme")}
              >
                {theme === "dark" ? (
                  <Sun size={18} className="text-yellow-500 animate-in fade-in zoom-in duration-300" />
                ) : (
                  <Moon size={18} className="text-slate-700 animate-in fade-in zoom-in duration-300" />
                )}
              </Button>

              <div className="w-[1px] h-4 bg-border/40 mx-1" />

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLanguageToggle}
                className="rounded-full px-3 h-9 hover:bg-background/80 transition-colors cursor-pointer flex items-center gap-1.5"
                data-testid="language-toggle"
              >
                <Languages size={16} className="text-foreground/70" />
                <span className="uppercase text-[11px] font-bold tracking-wider">{language}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}