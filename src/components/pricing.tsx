const packages = [
  { name: "Starter", products: "Minimum 5 products", images: "3 images per product", note: "A consistent starting image set across five products." },
  { name: "Catalog", products: "20 products", images: "3 or 6 images per product", note: "Choose the image count that fits your catalog." },
  { name: "Custom", products: "50+ products", images: "Custom image sets", note: "A production scope tailored to your catalog." },
];

export function Pricing() {
  return <section id="pricing" className="section-pad bg-secondary"><div className="page-shell">
    <div className="border-t pt-5 text-center"><p className="eyebrow text-signal">Pricing / project scope</p><h2 className="display-title mt-5 text-[2.5rem] sm:text-6xl">Simple Starting Options</h2><p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-muted-foreground">These scopes show how we can plan your catalog. We confirm the image types, price, revisions and schedule in a written quotation.</p></div>
    <div className="mt-10 grid gap-4 lg:grid-cols-3">{packages.map((pack, index)=><article key={pack.name} className={`flex min-w-0 flex-col border bg-background p-6 sm:p-7 ${index===0?"border-signal ring-1 ring-signal":"border-border"}`}>
      <p className="eyebrow text-signal">{pack.name}</p>
      <h3 className="display-title mt-6 text-3xl">Price on request</h3><p className="mt-1 text-xs text-muted-foreground">Quoted according to requirements</p>
      <div className="mt-7 space-y-3 border-t pt-5 text-sm"><p><strong>Products:</strong> {pack.products}</p><p><strong>Images:</strong> {pack.images}</p><p><strong>Types:</strong> Hero, angle, detail, lifestyle, feature/benefit or dimensions as needed</p><p className="leading-6 text-muted-foreground">{pack.note}</p><p><strong>Revisions:</strong> Confirmed in quote</p><p><strong>Delivery:</strong> Ecommerce-ready JPG/PNG/WebP as agreed</p><p><strong>Turnaround:</strong> Confirmed in quote</p></div>
    </article>)}</div>
    <p className="mx-auto mt-7 max-w-3xl text-center text-sm leading-7 text-muted-foreground">Final pricing depends on product complexity, image requirements, volume and marketplace needs.</p>
    <div className="mt-14 border-t pt-8"><h3 className="display-title text-3xl">A Typical Image Set</h3><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Possible views include Hero, Angle, Detail, Lifestyle, Feature/Benefit and Dimensions. The mix is customized to the product and marketplace; every product does not automatically need all six.</p><p className="mt-4 text-sm leading-7 text-muted-foreground">Delivery: Ecommerce-ready JPG/PNG/WebP as agreed.</p></div>
  </div></section>;
}
