import { Link } from 'react-router'; // Using react-router-dom based on previous error context
import { useThemeStore } from '../../stores/use-theme-store';
import { useLanguageStore } from '../../stores/use-language-store';
import { Sun, Moon, Languages, ChevronDown } from 'lucide-react'; // Placeholder icons from lucide-react
import { cn } from '../../lib/utils';

export function Navbar() {
  const { theme, toggleTheme } = useThemeStore();
  const { language, setLanguage } = useLanguageStore();

  const handleLanguageToggle = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  const demoCategories = [
    { name: 'SaaS Dashboard', path: '/demos/saas' },
    { name: 'CMS Editor', path: '/demos/cms' },
    { name: 'Landing Page', path: '/demos/landing' },
    { name: 'Resource Management', path: '/demos/resource' },
    { name: 'ERP System', path: '/demos/erp' },
    { name: 'Official Website', path: '/demos/official' },
    { name: 'Custom Solution', path: '/demos/custom' },
  ];

  return (
    <nav className={cn("bg-background text-foreground border-b border-border p-4 flex justify-between items-center font-sans")}>
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-xl font-bold text-primary hover:text-accent transition-colors duration-200">
          Huini Site
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-accent transition-colors duration-200">
            Home
          </Link>

          {/* Demos Dropdown */}
          <div className="relative group">
            <button className="flex items-center text-foreground hover:text-accent transition-colors duration-200 focus:outline-none">
              Demos <ChevronDown size={16} className="ml-1 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <ul className="py-1">
                {demoCategories.map((category) => (
                  <li key={category.path}>
                    <Link
                      to={category.path}
                      className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-accent-foreground"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link to="/about" className="text-foreground hover:text-accent transition-colors duration-200">
            About/Contact
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={toggleTheme} className="p-2 rounded-md hover:bg-muted transition-colors duration-200">
          {theme === 'dark' ? <Sun size={20} className="text-foreground" /> : <Moon size={20} className="text-foreground" />}
        </button>
        <button onClick={handleLanguageToggle} className="p-2 rounded-md hover:bg-muted transition-colors duration-200">
          <Languages size={20} className="text-foreground" />
          <span className="ml-1 uppercase text-foreground">{language}</span>
        </button>
        {/* TODO: Implement MobileMenu for small screens */}
      </div>
    </nav>
  );
}