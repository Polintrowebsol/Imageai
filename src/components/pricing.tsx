import { planEmailUrl, planWhatsAppUrl, pricingPlans } from "@/components/pricing-data";

export function Pricing() {
  return <section id="pricing" className="section-pad bg-secondary"><div className="page-shell">
    <div className="border-t pt-5 text-center"><p className="eyebrow text-signal">Pricing / plans</p><h2 className="display-title mt-5 text-[2.5rem] sm:text-6xl">Choose Your Image Set</h2><p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-muted-foreground">Choose the plan that fits your products. Send the plan details to our team to discuss your project.</p></div>
    <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{pricingPlans.map((plan)=><article key={plan.name} className="flex min-w-0 flex-col border border-border bg-background p-6 sm:p-7">
      <p className="eyebrow text-signal">{plan.name}</p>
      <p className="mt-4 text-sm font-medium">{plan.tagline}</p>
      <h3 className="display-title mt-5 text-3xl">{plan.price}</h3>
      <div className="mt-7 space-y-3 border-t pt-5 text-sm leading-6">
        <p><strong>Products:</strong> {plan.products}</p><p><strong>Purpose:</strong> {plan.purpose}</p><p><strong>Images:</strong> {plan.images}</p>
        <p><strong>Image Types:</strong> {plan.imageTypes}</p><p><strong>Product Accuracy:</strong> {plan.accuracy}</p>
        <p><strong>Watermark:</strong> {plan.watermark}</p><p><strong>Revisions:</strong> {plan.revisions}</p>
        <p><strong>Delivery:</strong> {plan.delivery}</p><p><strong>Turnaround:</strong> {plan.turnaround}</p>
      </div>
      <div className="mt-auto grid grid-cols-2 gap-2 pt-7">
        <a href={planEmailUrl(plan)} target="_blank" rel="noopener noreferrer" aria-label={`Email about ${plan.name} plan`} className="flex min-h-11 items-center justify-center rounded-md bg-gray-200 px-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700">Email</a>
        <a href={planWhatsAppUrl(plan)} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp about ${plan.name} plan`} className="flex min-h-11 items-center justify-center rounded-md bg-green-800/85 px-2 text-sm font-semibold text-white transition-colors hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800">WhatsApp</a>
      </div>
    </article>)}</div>
  </div></section>;
}
