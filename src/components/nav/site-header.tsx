import { siteConfig } from "~/config/site";
// import { buttonVariants } from "~/components/ui/button"
// import { Icons } from "~/components/icons"
import { MainNav } from "./main-nav";
import { ThemeToggle } from "~/components/theme/theme-toggle";
import { UserNav } from "./user-nav";

// import { AvatarDropdownMenu } from "./avatar-dropdown-menu"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-4 ">
            <ThemeToggle />
            <UserNav />
          </nav>
        </div>
      </div>
    </header>
  );
}
