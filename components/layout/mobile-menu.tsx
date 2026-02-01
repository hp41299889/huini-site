import { Link } from "react-router";
import { useThemeStore } from "~/stores/use-theme-store";
import { useLanguageStore } from "~/stores/use-language-store";
import {
  Sun,
  Moon,
  Languages,
  HomeIcon,
  LayoutDashboard,
  InfoIcon,
} from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";

export function MobileMenu() {
  const { theme, toggleTheme } = useThemeStore();
  const { language, setLanguage } = useLanguageStore();

  const handleLanguageToggle = () => {
    setLanguage(language === "zh" ? "en" : "zh");
  };

  return (
    <div
      className={cn(
        "md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-3 shadow-lg z-50",
      )}
    >
      <nav className="flex justify-around items-center text-xs font-sans">
        <Link
          to="/"
          className="flex flex-col items-center text-foreground hover:text-accent transition-colors duration-200"
        >
          <HomeIcon size={20} />
          <span>首頁</span>
        </Link>
        <Link
          to="/demos"
          className="flex flex-col items-center text-foreground hover:text-accent transition-colors duration-200"
        >
          <LayoutDashboard size={20} />
          <span>演示</span>
        </Link>
        <Link
          to="/about"
          className="flex flex-col items-center text-foreground hover:text-accent transition-colors duration-200"
        >
          <InfoIcon size={20} />
          <span>關於</span>
        </Link>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="flex flex-col items-center h-auto p-1"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun size={20} className="text-foreground" />
          ) : (
            <Moon size={20} className="text-foreground" />
          )}
          <span>主題</span>
        </Button>

        {/* Language Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLanguageToggle}
          className="flex flex-col items-center h-auto p-1"
        >
          <Languages size={20} className="text-foreground" />
          <span className="ml-0 uppercase text-foreground">
            {language === "zh" ? "中文" : "英文"}
          </span>
        </Button>
      </nav>
    </div>
  );
}
