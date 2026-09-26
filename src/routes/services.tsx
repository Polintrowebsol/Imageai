import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { InnerFooter } from "@/components/inner-footer";
import { AuditFormDialog, openFreeAudit } from "@/components/audit-form";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/services")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://imagenmerce.vercel.app/services" }],
    meta: [
      { title: "Ecommerce Product Image Services | Imagenmerce" },
      { name: "description", content: "Reference-led product image sets for Amazon, Shopify and DTC brands, with studio-directed production and product accuracy review." },
      { property: "og:title", content: "Ecommerce Product Image Services | Imagenmerce" },
      { property: "og:description", content: "A controlled visual production workflow from product reference to ecommerce image set." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://imagenmerce.vercel.app/services" },
      { property: "og:image", content: "https://imagenmerce.vercel.app/images/stamp2/furniture-lifestyle.webp" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});
function Services() {
  const images = [
    ["Hero", "A clean primary product presentation."],
    ["Angle", "A view that explains product depth and structure."],
    ["Detail", "A closer view of materials or construction."],
    ["Lifestyle", "The product shown in a relevant setting."],
    ["Feature / Benefit", "A frame explaining a selected feature or use."],
    ["Dimensions", "A dimension graphic where needed, based on verified measurements."],
  ];
  return <main className="overflow-clip"><SiteHeader/><AuditFormDialog/><section className="page-shell pb-16 pt-28"><p className="eyebrow text-signal">What we do</p><h1 className="display-title mt-5 max-w-5xl text-4xl sm:text-6xl">Ecommerce Product Image Sets.</h1><p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground">Imagenmerce creates coordinated visuals for Amazon sellers, Shopify and DTC brands, furniture and home businesses, and catalog teams. Clients supply product references and requirements; our studio directs AI-assisted production and quality review.</p><div className="mt-8 flex flex-wrap gap-3"><Button onClick={()=>openFreeAudit("services")}>Get a Free Product Image Audit</Button><Button variant="outline" asChild><a href="/portfolio">View Our Work</a></Button></div></section>
    <section className="section-pad bg-secondary"><div className="page-shell"><h2 className="display-title text-3xl sm:text-5xl">A Typical Product Image Set</h2><p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">The mix and number of images depend on your product and marketplace. These are possible deliverables, not a fixed six-image requirement.</p><div className="mt-9 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">{images.map(([name,copy],i)=><article className="bg-background p-6" key={name}><span className="eyebrow text-signal">0{i+1}</span><h3 className="display-title mt-7 text-3xl">{name}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{copy}</p></article>)}</div></div></section>
    <section className="section-pad page-shell"><div className="grid gap-10 lg:grid-cols-2"><div><h2 className="display-title text-3xl sm:text-5xl">What You Provide</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">Product reference image(s), name and details, features or benefits to communicate, dimensions when needed, and brand guidelines when available. Professional studio photography is not required to begin an enquiry.</p></div><div><h2 className="display-title text-3xl sm:text-5xl">How We Check the Set</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">Our Pixel Lock™ product accuracy method compares final views with the supplied reference for visible shape, proportions, structure, materials, color, hardware, markings and construction details. Quality assurance also reviews consistency and agreed deliverables.</p></div></div><div className="mt-10 flex flex-wrap gap-3"><Button variant="outline" asChild><a href="/about">Learn About the Process</a></Button><Button variant="outline" asChild><a href="/pricing">Explore Starting Options</a></Button></div></section><InnerFooter/></main>;
}
