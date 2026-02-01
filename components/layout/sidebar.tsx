import { Link, useLocation } from "react-router";
import { cn } from "~/lib/utils";

export default function Sidebar() {
  const location = useLocation();
  const demoCategories = [
    { name: "Blog", path: "/demos/blog" },
    { name: "Booking System", path: "/demos/booking-system" },
    { name: "CMS", path: "/demos/cms" },
    { name: "Content Promotion", path: "/demos/content-promotion" },
    { name: "Corporate Website", path: "/demos/corporate-website" },
    { name: "Dashboard", path: "/demos/dashboard" },
    { name: "E-commerce One-Page", path: "/demos/ecommerce-onepage" },
    { name: "E-commerce Platform", path: "/demos/ecommerce-platform" },
    { name: "ERP", path: "/demos/erp" },
    { name: "Forum", path: "/demos/forum" },
    { name: "LMS", path: "/demos/lms" },
    { name: "Portfolio", path: "/demos/portfolio" },
    { name: "Project Management", path: "/demos/project-management" },
    { name: "Social Media Feed", path: "/demos/social-media-feed" },
    { name: "Todo List", path: "/demos/todo-list" },
  ];

  return (
    <nav className="space-y-4 px-2 py-4">
      <h3 className="text-xl font-semibold text-primary mb-4 font-sans">
        Demos
      </h3>
      <ul className="space-y-2">
        {demoCategories.map((category) => (
          <li key={category.path}>
            <Link
              to={category.path}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:text-accent-foreground hover:bg-muted font-sans",
                location.pathname === category.path && "bg-muted",
              )}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
