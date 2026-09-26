import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { InnerFooter } from "@/components/inner-footer";
import { AuditFormDialog } from "@/components/audit-form";
import { Pricing } from "@/components/pricing";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://imagenmerce.vercel.app/pricing" }],
    meta: [
      { title: "Pricing & Trial | Imagenmerce" },
      { name: "description", content: "Explore trial, starter, growth and volume starting scopes for ecommerce product image sets. Final prices are confirmed in a project quotation." },
      { property: "og:title", content: "Pricing & Trial | Imagenmerce" },
      { property: "og:description", content: "Start with one product or plan a larger catalog image set." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://imagenmerce.vercel.app/pricing" },
      { property: "og:image", content: "https://imagenmerce.vercel.app/images/stamp2/furniture-lifestyle.webp" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricingPage,
});
function PricingPage() {
  return <main className="overflow-clip"><SiteHeader/><AuditFormDialog/><div className="page-shell pt-28"><p className="eyebrow text-signal">Pricing & trial</p><h1 className="display-title mt-5 max-w-5xl text-4xl sm:text-6xl">Choose a Starting Product Image Scope.</h1><p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">Start with one product or plan a coordinated image system across your catalog. Prices shown below remain placeholders until Imagenmerce confirms them in writing.</p></div><Pricing/><InnerFooter/></main>;
}
