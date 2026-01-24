import { type RouteConfig, route, index, layout } from "@react-router/dev/routes";

export default [
  layout("routes/_layout.tsx", [ // Root layout
    index("routes/home.tsx"), // Home page
    route("about", "routes/about.tsx"), // About/Contact page
    // layout("demos", "routes/demos/_layout.tsx", [ // Demos layout
    //   index("routes/demos/_index.tsx"), // Demo list page
    //   route(":category", "routes/demos/[category]/index.tsx"), // Dynamic demo page
    // ]),
    route("*", "routes/404.tsx"), // 404 Not Found page
  ]),
] satisfies RouteConfig;
