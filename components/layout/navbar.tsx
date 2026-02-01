import { Link } from "react-router";
import { useThemeStore } from "~/stores/use-theme-store";
import { useLanguageStore } from "~/stores/use-language-store";
import { Sun, Moon, Languages, ChevronDown } from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next"; // Import useTranslation

export function Navbar() {
  const { theme, toggleTheme } = useThemeStore();
  const { language, setLanguage } = useLanguageStore();
  const { t } = useTranslation(); // Initialize useTranslation

  const handleLanguageToggle = () => {
    // This will now also trigger i18n.changeLanguage via the zustand store
    setLanguage(language === "zh" ? "en" : "zh");
  };

  const demoCategories = [
    { name: t("demos_list.cms_title"), path: "cms" },
    {
      name: t("demos_list.ecommerce_onepage_title"),
      path: "ecommerce-onepage",
    },
    {
      name: t("demos_list.content_promotion_title"),
      path: "content-promotion",
    },
    { name: t("demos_list.erp_title"), path: "erp" },
    {
      name: t("demos_list.corporate_website_title"),
      path: "corporate-website",
    },
    {
      name: t("demos_list.ecommerce_platform_title"),
      path: "ecommerce-platform",
    },
    { name: t("demos_list.dashboard_title"), path: "dashboard" },
    {
      name: t("demos_list.social_media_feed_title"),
      path: "social-media-feed",
    },
    {
      name: t("demos_list.project_management_title"),
      path: "project-management",
    },
    { name: t("demos_list.booking_system_title"), path: "booking-system" },
    { name: t("demos_list.lms_title"), path: "lms" },
    { name: t("demos_list.blog_title"), path: "blog" },
    { name: t("demos_list.forum_title"), path: "forum" },
    { name: t("demos_list.portfolio_title"), path: "portfolio" },
    { name: t("demos_list.todo_list_title"), path: "todo-list" },
  ];

  return (
    <nav
      className={cn(
        "bg-background text-foreground border-b border-border p-4 flex justify-between items-center font-sans",
      )}
    >
      <div className="flex items-center space-x-6">
        <Link
          to="/"
          className="text-xl font-bold text-primary hover:text-accent transition-colors duration-200"
        >
          {t("navbar.site_title")} {/* Use translation */}
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-foreground hover:text-accent transition-colors duration-200"
          >
            {t("navbar.home")} {/* Use translation */}
          </Link>

          {/* Demos Dropdown with shadcn/ui */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center text-foreground hover:text-accent"
              >
                {t("navbar.demos")}{" "}
                <ChevronDown
                  size={16}
                  className="ml-1 transition-transform rotate-0 data-[state=open]:rotate-180"
                />{" "}
                {/* Use translation */}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              {demoCategories.map((category) => (
                <DropdownMenuItem key={category.path} asChild>
                  <Link to={`/showcases/${category.path}`}>
                    {" "}
                    {/* Updated path */}
                    {category.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            to="/about"
            className="text-foreground hover:text-accent transition-colors duration-200"
          >
            {t("navbar.about")} {/* Use translation */}
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={t("navbar.toggle_theme")}
        >
          {" "}
          {/* Use translation for aria-label */}
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
        >
          <Languages size={20} className="text-foreground" />
          <span className="ml-1 uppercase text-foreground">{language}</span>
        </Button>
        {/* TODO: Implement MobileMenu for small screens */}
      </div>
    </nav>
  );
}
