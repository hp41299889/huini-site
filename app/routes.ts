import {
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  layout("layout.tsx", [
    // Root layout
    index("home/home.tsx"), // Home page
    route("about", "about.tsx"), // About page
    ...prefix("demos", [
      layout("./demos/layout.tsx", [
        route("cms", "./demos/cms.tsx"),
        route("ecommerce-onepage", "./demos/ecommerce-onepage.tsx"),
        route("content-promotion", "./demos/content-promotion.tsx"),
        route("erp", "./demos/erp.tsx"),
        route("corporate-website", "./demos/corporate-website.tsx"),
        route("ecommerce-platform", "./demos/ecommerce-platform.tsx"),
        route("dashboard", "./demos/dashboard.tsx"),
        route("social-media-feed", "./demos/social-media-feed.tsx"),
        route("project-management", "./demos/project-management.tsx"),
        route("booking-system", "./demos/booking-system.tsx"),
        route("lms", "./demos/lms.tsx"),
        route("blog", "./demos/blog.tsx"),
        route("forum", "./demos/forum.tsx"),
        route("portfolio", "./demos/portfolio.tsx"),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
