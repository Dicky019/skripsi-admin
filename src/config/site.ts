export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Admin",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Home",
      href: "/",
      
    },
    {
      title: "Driver",
      href: "/driver",
    },
    {
      title: "Rute",
      href: "/rute",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
};
