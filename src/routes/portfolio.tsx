import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { InnerFooter } from "@/components/inner-footer";
import { ClientWork } from "@/components/client-work";
import { PortfolioExtras } from "@/components/portfolio-extras";
import { AuditFormDialog } from "@/components/audit-form";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://imagenmerce.vercel.app/portfolio" }],
    meta: [
      { title: "Portfolio | Imagenmerce Product Image Sets" },
      { name: "description", content: "Explore product reference to final ecommerce image set examples across furniture, pet, kitchen and other products." },
      { property: "og:title", content: "Portfolio | Imagenmerce" },
      { property: "og:description", content: "Reference-led ecommerce product image set examples. Concept and portfolio recreation work." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://imagenmerce.vercel.app/portfolio" },
      { property: "og:image", content: "https://imagenmerce.vercel.app/images/stamp2/furniture-lifestyle.webp" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});
function Portfolio() {
  return <main className="overflow-clip"><SiteHeader/><AuditFormDialog/><div className="page-shell pt-28"><p className="eyebrow text-signal">Concept / Portfolio Recreation</p><h1 className="display-title mt-5 max-w-5xl text-4xl sm:text-6xl">From One Product Reference to a Complete Image Set.</h1><p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">Select a category to compare the original product reference with the final hero and supporting ecommerce views. The displayed brands are not presented as Imagenmerce clients.</p></div><ClientWork/><PortfolioExtras/><InnerFooter/></main>;
}
