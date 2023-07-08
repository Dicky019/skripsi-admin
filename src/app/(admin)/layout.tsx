
import { SiteHeader } from "~/components/nav/site-header";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className="container mx-auto text-center py-8">{children}</main>
    </>
  );
}
