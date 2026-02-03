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
        "bg-background text-foreground border-b border-border flex justify-between items-center font-sans px-4 py-3", // Increased vertical padding
      )}
    >
      <div className="flex items-center space-x-8"> {/* Branding area */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-primary hover:text-primary-foreground transition-colors duration-200"
        >
          {t("navbar.site_title")}
        </Link>
      </div>

      <Navbar /> {/* The purely navigational part (categorized demos) */}

      <div className="flex items-center space-x-6"> {/* Increased spacing for About, Theme, Language */}
        <Link
          to="/cooperate"
          className="text-foreground hover:text-primary transition-colors duration-200" // Consistent hover with primary
        >
          我要合作
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={t("navbar.toggle_theme")}
        >
          {theme === "dark" ? (
            <Sun size={20} className="text-foreground" />
          ) : (
            <Moon size={20} className="text-foreground" />
          )}
        </Button>
        <Button
          variant="ghost"
          onClick={handleLanguageToggle}
          className="flex items-center"
          data-testid="language-toggle"
        >
          <Languages size={20} className="text-foreground" />
          <span className="ml-1 uppercase text-foreground">{language}</span>
        </Button>
      </div>
    </header>
  );
}
