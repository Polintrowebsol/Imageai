import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { InnerFooter } from "@/components/inner-footer";
import { AuditFormDialog, openFreeAudit } from "@/components/audit-form";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://imagenmerce.vercel.app/about" }],
    meta: [
      { title: "About Imagenmerce | Ecommerce Visual Production Studio" },
      { name: "description", content: "Imagenmerce is an India-based studio producing reference-led ecommerce imagery for international brands." },
      { property: "og:title", content: "About Imagenmerce" },
      { property: "og:description", content: "An India-based ecommerce visual production studio serving brands internationally." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://imagenmerce.vercel.app/about" },
      { property: "og:image", content: "https://imagenmerce.vercel.app/images/stamp2/furniture-lifestyle.webp" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});
function About() {
  const stages = [
    ["01","Share Product References","Start with the product images and details you already have."],
    ["02","Share Requirements","Define the product, intended marketplace and visual priorities."],
    ["03","Visual Production","Create the agreed image types through directed AI-assisted production."],
    ["04","Accuracy & QA","Check visible product identity and consistency against the source reference."],
    ["05","Final Delivery","Hand off the agreed ecommerce-ready images and formats."],
    ["06","Scale Across Your Catalog","Plan consistent image systems for additional products when needed."],
  ];
  return <main className="overflow-clip"><SiteHeader/><AuditFormDialog/><section className="page-shell pb-16 pt-28 sm:pb-24"><p className="eyebrow text-signal">About the studio</p><h1 className="display-title mt-5 max-w-5xl text-4xl sm:text-6xl">E-commerce Visual Conversion Studio.</h1><p className="mt-7 max-w-3xl text-base leading-8 text-muted-foreground">Imagenmerce is an India-based ecommerce visual production studio serving ecommerce brands internationally. We turn product references into coordinated image sets through a controlled production and quality assurance workflow.</p><p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">Our work is a studio service, combining AI-assisted production with product-specific direction and review. The goal is finished ecommerce imagery that remains recognizable to the supplied product reference.</p></section>
    <section className="section-pad bg-secondary"><div className="page-shell"><h2 className="display-title text-3xl sm:text-5xl">Reference → Production → Accuracy → QA → Delivery</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">The image set is tailored to the product and marketplace. Typical views can include hero, angle, detail, lifestyle, feature/benefit and dimensions where required.</p><div className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">{stages.map(([number,title,copy])=><article key={number} className="bg-background p-6"><p className="eyebrow text-signal">{number}</p><h3 className="display-title mt-7 text-3xl">{title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{copy}</p></article>)}</div></div></section>
    <section className="section-pad page-shell"><h2 className="display-title text-3xl sm:text-5xl">Pixel Lock™ / Product Accuracy QA Method</h2><p className="mt-6 max-w-3xl text-sm leading-7 text-muted-foreground">Every final view is checked against the supplied product reference to maintain visible product identity and consistency across the image set. We focus on shape, proportions, structure, materials, color, hardware, logos and visible construction details.</p><div className="mt-8 flex flex-wrap gap-3"><Button onClick={()=>openFreeAudit("about")}>Get a Free Product Image Audit</Button><Button variant="outline" asChild><a href="/portfolio">See Our Work</a></Button></div></section><InnerFooter/></main>;
}
