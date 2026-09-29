import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { InnerFooter } from "@/components/inner-footer";
import { AuditFormDialog } from "@/components/audit-form";
import { Pricing } from "@/components/pricing";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://imagenmerce.vercel.app/pricing" }],
    meta: [
      { title: "Pricing | Imagenmerce" },
      { name: "description", content: "Compare Starter, Standard, Pro, and Catalog ecommerce image plans, from a free trial to high-volume production." },
      { property: "og:title", content: "Pricing | Imagenmerce" },
      { property: "og:description", content: "Compare Starter, Standard, Pro, and Catalog ecommerce image plans." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://imagenmerce.vercel.app/pricing" },
      { property: "og:image", content: "https://imagenmerce.vercel.app/images/stamp2/furniture-lifestyle.webp" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricingPage,
});
function PricingPage() {
  return <main className="overflow-clip"><SiteHeader/><AuditFormDialog/><div className="page-shell pt-28"><p className="eyebrow text-signal">Pricing</p><h1 className="display-title mt-5 max-w-5xl text-4xl sm:text-6xl">Choose the Right Product Image Plan.</h1><p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">Explore four options for ecommerce images, from a free trial to high-volume catalog production.</p></div><Pricing/><InnerFooter/></main>;
}
