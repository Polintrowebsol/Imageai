import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const examples = [
  ["Furniture & Home","furniture-hero.webp"],
  ["Pet Products","pet-hero.webp"],
  ["Kitchen & Home","kitchen-hero.webp"],
  ["Other Ecommerce Products","other-hero.webp"],
];
export function PortfolioPreview() {
  return <section id="work" className="section-pad page-shell"><div className="border-t pt-5"><p className="eyebrow text-signal">01 — Portfolio</p><h2 className="display-title mt-5 text-[2.5rem] sm:text-6xl">Product References. Complete Image Sets.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">Explore reference-to-final examples across four product categories. Concept / Portfolio Recreation.</p></div><div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">{examples.map(([label,file])=><a href="/portfolio" key={label} className="group min-w-0 border bg-card p-2 sm:p-3"><div className="aspect-square overflow-hidden bg-background"><img src={`/images/stamp2/${file}`} alt={`${label} final product hero visual`} width={1254} height={1254} loading="lazy" className="size-full object-contain transition-transform duration-500 group-hover:scale-105"/></div><h3 className="mt-4 px-1 pb-2 text-sm font-semibold sm:text-base">{label}</h3></a>)}</div><Button className="mt-8" asChild><a href="/portfolio">View Our Work <ArrowRight size={15}/></a></Button></section>;
}
