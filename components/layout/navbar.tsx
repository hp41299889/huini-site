import { Link } from "react-router";
import { cn } from "~/lib/utils";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "~/components/ui/navigation-menu";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t } = useTranslation();

  const categorizedDemos = [
    {
      category: t("demos_categories.business_applications"),
      demos: [
        { name: t("demos_list.erp_title"), path: "erp" },
        { name: t("demos_list.dashboard_title"), path: "dashboard" },
        { name: t("demos_list.booking_system_title"), path: "booking-system" },
        {
          name: t("demos_list.project_management_title"),
          path: "project-management",
        },
        { name: t("demos_list.lms_title"), path: "lms" },
      ],
    },
    {
      category: t("demos_categories.content_marketing"),
      demos: [
        { name: t("demos_list.cms_title"), path: "cms" },
        {
          name: t("demos_list.content_promotion_title"),
          path: "content-promotion",
        },
        { name: t("demos_list.blog_title"), path: "blog" },
        {
          name: t("demos_list.social_media_feed_title"),
          path: "social-media-feed",
        },
        {
          name: t("demos_list.corporate_website_title"),
          path: "corporate-website",
        },
      ],
    },
    {
      category: t("demos_categories.ecommerce"),
      demos: [
        {
          name: t("demos_list.ecommerce_onepage_title"),
          path: "ecommerce-onepage",
        },
        {
          name: t("demos_list.ecommerce_platform_title"),
          path: "ecommerce-platform",
        },
      ],
    },
    {
      category: t("demos_categories.other"),
      demos: [
        { name: t("demos_list.forum_title"), path: "forum" },
        { name: t("demos_list.portfolio_title"), path: "portfolio" },
      ],
    },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {categorizedDemos.map((catGroup) => (
          <NavigationMenuItem key={catGroup.category}>
            <NavigationMenuTrigger>
              {catGroup.category}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                {catGroup.demos.map((demo) => (
                  <li key={demo.path}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={`/demos/${demo.path}`}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 hover:text-accent-foreground focus:bg-accent/10 focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">{demo.name}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {t(`demos_list.${demo.path}_description_short`, { defaultValue: '' })}
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
