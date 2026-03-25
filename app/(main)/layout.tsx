import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingCTA } from "@/components/floating-cta";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 w-full flex flex-col space-y-0">
        {children}
      </main>
      <SiteFooter />
      <FloatingCTA />
    </>
  );
}
