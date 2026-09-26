import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openFreeAudit } from "@/components/audit-form";
import { track } from "@/lib/analytics";

const trialHref = `mailto:imagenmerce@gmail.com?subject=${encodeURIComponent("Imagenmerce — One Product Trial Enquiry")}&body=${encodeURIComponent("Hello Imagenmerce,\n\nI'd like to discuss a one-product trial with three images.\n\nProduct / listing link: \nProduct category: \nPreferred image types: \nExisting references available: \n\nPlease confirm the scope, price, revision terms and timeline.\n\nThank you,\n[Name]")}`;

const packages = [
  { name: "Trial", products: "1 product", images: "3 images", price: "$XX", note: "Choose three views suited to your product and listing.", highlighted: true },
  { name: "Starter", products: "1 product", images: "Up to 6 images", price: "$XX", note: "A tailored image set for one product.", highlighted: false },
  { name: "Growth", products: "5 products", images: "Up to 30 images", price: "$XXX", note: "Coordinated visuals across a small catalog.", highlighted: false },
  { name: "Volume", products: "20+ products", images: "Custom image sets", price: "Custom pricing", note: "A scoped production plan for larger catalogs.", highlighted: false },
];

export function Pricing() {
  return <section id="pricing" className="section-pad bg-secondary"><div className="page-shell">
    <div className="border-t pt-5 text-center"><p className="eyebrow text-signal">Pricing / project scope</p><h2 className="display-title mt-5 text-[2.5rem] sm:text-6xl">Simple Starting Options</h2><p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-muted-foreground">Choose a starting scope. We confirm the right image types, revisions and schedule in your project quotation.</p></div>
    <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{packages.map((pack)=><article key={pack.name} className={`flex min-w-0 flex-col border bg-background p-6 sm:p-7 ${pack.highlighted?"border-signal ring-1 ring-signal":"border-border"}`}>
      <div className="flex items-center justify-between gap-2"><p className="eyebrow text-signal">{pack.name}</p>{pack.highlighted&&<span className="text-xs font-semibold text-signal">Start here</span>}</div>
      <h3 className="display-title mt-6 text-4xl">{pack.price}</h3><p className="mt-1 text-xs text-muted-foreground">{pack.name==="Volume"?"Scoped quotation":"Starting from · price placeholder"}</p>
      <div className="mt-7 space-y-3 border-t pt-5 text-sm"><p><strong>Products:</strong> {pack.products}</p><p><strong>Images:</strong> {pack.images}</p><p><strong>Types:</strong> Selected from hero, angle, detail, lifestyle, feature/benefit and dimensions as needed</p><p className="leading-6 text-muted-foreground">{pack.note}</p><p><strong>Revisions:</strong> Confirmed in quote</p><p><strong>Delivery:</strong> Ecommerce-ready JPG/PNG, as agreed</p><p><strong>Turnaround:</strong> Confirmed in quote</p></div>
      <div className="mt-auto pt-8">{pack.highlighted?<Button asChild className="w-full"><a href={trialHref} onClick={()=>track("studio_project_cta_click", "trial")}>Start a Trial <ArrowRight size={15}/></a></Button>:<Button variant="outline" className="w-full" onClick={()=>openFreeAudit(`pricing_${pack.name.toLowerCase()}`)}>Get a Free Product Image Audit</Button>}</div>
    </article>)}</div>
    <p className="mx-auto mt-7 max-w-3xl text-center text-sm leading-7 text-muted-foreground">Final pricing depends on product complexity, image requirements, volume and marketplace needs. The displayed $XX/$XXX amounts are placeholders until Imagenmerce confirms its prices.</p>
    <div className="mt-14 grid items-center gap-6 border-t pt-8 lg:grid-cols-[1fr_auto]"><div><p className="eyebrow text-signal">Start with one product</p><h3 className="display-title mt-3 text-3xl sm:text-4xl">Test the workflow before committing to a larger catalog.</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">A trial covers one product and three agreed images. The exact views, revision scope and delivery date are confirmed before work begins.</p></div><div className="flex flex-wrap gap-3 lg:flex-col"><Button asChild><a href={trialHref} onClick={()=>track("studio_project_cta_click", "trial")}>Start a Trial</a></Button><Button variant="outline" onClick={()=>openFreeAudit("trial_secondary")}>Get a Free Product Image Audit</Button></div></div>
    <div className="mt-14 border-t pt-8"><h3 className="display-title text-3xl">A Typical Image Set</h3><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Possible views include Hero, Angle, Detail, Lifestyle, Feature/Benefit and Dimensions. The mix is customized to the product and marketplace; every product does not automatically need all six.</p><p className="mt-4 text-sm leading-7 text-muted-foreground">Final files can be delivered as high-resolution, ecommerce-ready JPG or PNG assets where applicable. Exact formats are agreed in the brief.</p></div>
  </div></section>;
}
