import { Link } from 'react-router';
import { cn } from '../../lib/utils';

export function Sidebar() {
  const demoCategories = [
    { name: 'SaaS (Dashboard)', path: '/demos/saas' },
    { name: 'CMS (Content Management)', path: '/demos/cms' },
    { name: 'Landing Page (E-commerce)', path: '/demos/landing' },
    { name: 'Resource Management', path: '/demos/resource' },
    { name: 'ERP (Enterprise Resource Planning)', path: '/demos/erp' },
    { name: 'Official Website', path: '/demos/official' },
    { name: 'Custom Solution', path: '/demos/custom' },
  ];

  return (
    <nav className="space-y-4 px-2 py-4">
      <h3 className="text-xl font-semibold text-primary mb-4 font-sans">Demos</h3>
      {/* <ul className="space-y-2">
        {demoCategories.map((category) => (
          <li key={category.path}>
            <Link
              to={category.path}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:text-accent-foreground hover:bg-muted font-sans"
              )}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul> */}
    </nav>
  );
}
