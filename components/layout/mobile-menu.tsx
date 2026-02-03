import { Link } from "react-router";
import { useThemeStore } from "~/stores/use-theme-store";
import { useLanguageStore } from "~/stores/use-language-store";
import {
  Sun,
  Moon,
  Languages,
  HomeIcon,
  LayoutDashboard,
  HandshakeIcon,
} from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { useTranslation } from "react-i18next";

export function MobileMenu() {
  const { theme, toggleTheme } = useThemeStore();
  const { language, setLanguage } = useLanguageStore();
  const { t } = useTranslation();

  const handleLanguageToggle = () => {
    setLanguage(language === "zh" ? "en" : "zh");
  };

  return (
    <div
      className={cn(
        "md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border p-2 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-[100]",
      )}
    >
      <nav className="flex justify-around items-center text-[10px] font-medium">
        <Link
          to="/"
          className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors duration-200 py-1 px-2"
        >
          <HomeIcon size={20} />
          <span>{t("navbar.home")}</span>
        </Link>
        <Link
          to="/demos"
          className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors duration-200 py-1 px-2"
        >
          <LayoutDashboard size={20} />
          <span>{t("navbar.demos")}</span>
        </Link>
        <Link
          to="/cooperate"
          className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors duration-200 py-1 px-2"
        >
          <HandshakeIcon size={20} />
          <span>{t("navbar.cooperate")}</span>
        </Link>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="flex flex-col items-center h-auto p-1 gap-1 text-muted-foreground hover:bg-transparent"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
          <span>{t("navbar.theme")}</span>
        </Button>

        {/* Language Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLanguageToggle}
          className="flex flex-col items-center h-auto p-1 gap-1 text-muted-foreground hover:bg-transparent"
          data-testid="mobile-language-toggle"
        >
          <Languages size={20} />
          <span className="uppercase">
            {language}
          </span>
        </Button>
      </nav>
    </div>
  );
}