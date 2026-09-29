import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pricingPlans } from "@/components/pricing-data";

export function PricingPreview() {
  return <section id="pricing" className="section-pad bg-secondary"><div className="page-shell"><div className="border-t pt-5"><p className="eyebrow text-signal">Pricing plans</p><h2 className="display-title mt-5 text-[2.5rem] sm:text-6xl">Choose Your Image Set.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">Start with a watermarked trial or choose a complete image set for your listings and catalog.</p></div><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{pricingPlans.map((plan)=><div key={plan.name} className="border bg-background p-6"><h3 className="display-title text-3xl">{plan.name}</h3><p className="mt-5 text-sm">{plan.tagline}</p><p className="mt-2 text-sm">{plan.products}</p><p className="mt-3 text-sm font-semibold text-signal">{plan.price}</p></div>)}</div><Button className="mt-6" asChild><a href="/pricing">View Pricing <ArrowRight size={15}/></a></Button></div></section>;
}
