import { Link } from 'react-router-dom';
import { useThemeStore } from '../../stores/use-theme-store';
import { useLanguageStore } from '../../stores/use-language-store';
import { Sun, Moon, Languages, HomeIcon, LayoutDashboard, InfoIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

export function MobileMenu() {
  const { theme, toggleTheme } = useThemeStore();
  const { language, setLanguage } = useLanguageStore();

  const handleLanguageToggle = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <div className={cn("md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-3 shadow-lg z-50")}>
      <nav className="flex justify-around items-center text-xs font-sans">
        <Link to="/" className="flex flex-col items-center text-foreground hover:text-accent transition-colors duration-200">
          <HomeIcon size={20} />
          <span>Home</span>
        </Link>
        <Link to="/demos" className="flex flex-col items-center text-foreground hover:text-accent transition-colors duration-200">
          <LayoutDashboard size={20} />
          <span>Demos</span>
        </Link>
        <Link to="/about" className="flex flex-col items-center text-foreground hover:text-accent transition-colors duration-200">
          <InfoIcon size={20} />
          <span>About</span>
        </Link>

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="flex flex-col items-center p-1 rounded-md hover:bg-muted transition-colors duration-200">
          {theme === 'dark' ? <Sun size={20} className="text-foreground" /> : <Moon size={20} className="text-foreground" />}
          <span>Theme</span>
        </button>

        {/* Language Toggle */}
        <button onClick={handleLanguageToggle} className="flex flex-col items-center p-1 rounded-md hover:bg-muted transition-colors duration-200">
          <Languages size={20} className="text-foreground" />
          <span className="ml-0 uppercase text-foreground">{language}</span>
        </button>
      </nav>
    </div>
  );
}
