export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Petcare",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav:  [
    
    {
      title: "Pemesanan",
      href: "/",
    },
    {
      title: "Jadwal Layanan",
      href: "/jadwal-layanan",
    },
    {
      title: "Users",
      href: "/users",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
};