import "./globals.css";
import { TailwindIndicator } from "~/components/tailwind-indicator";
import { fontSans } from "~/lib/font";
import { ThemeProvider } from "~/components/theme/theme-provider";
import { cn } from "~/lib/utils";
import { Metadata } from "next";
import { siteConfig } from "~/config/site";
import NextAuthProvider from "~/components/next-auth-provider";
import { Toaster as ShadcnToaster } from "~/components/ui/toaster";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon?v=4"],
    shortcut: ["/apple-touch-icon"],
  },
  manifest: "/site.webmanifest",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextAuthProvider>{children}</NextAuthProvider>
          <TailwindIndicator />
          <ShadcnToaster />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
