import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://imagenmerce.vercel.app/terms" }],
    meta: [
      { title: "Terms of Service | Imagenmerce" },
      { name: "description", content: "How Imagenmerce scopes ecommerce visual production projects." },
      { property: "og:title", content: "Terms of Service | Imagenmerce" },
      { property: "og:description", content: "How Imagenmerce scopes ecommerce visual production projects." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://imagenmerce.vercel.app/terms" },
      { property: "og:image", content: "https://imagenmerce.vercel.app/images/stamp2/furniture-lifestyle.webp" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Terms,
});

function Terms() {
  return <main className="min-h-screen bg-background text-foreground"><div className="page-shell max-w-4xl py-10 sm:py-16"><Link to="/" className="text-sm font-semibold text-signal">← Imagenmerce</Link><p className="eyebrow mt-12 text-signal">Project information</p><h1 className="display-title mt-4 text-4xl sm:text-6xl">Terms of Service</h1><p className="mt-4 text-sm text-muted-foreground">Last updated September 27, 2026</p><p className="mt-8 text-sm leading-7">Imagenmerce is an India-based ecommerce visual production studio. These terms explain how we approach enquiries. Your written project quotation or agreement confirms the commercial terms for a particular job; please review it before accepting a project.</p>
    <div className="mt-10 space-y-9 text-sm leading-7">
      <section><h2 className="text-xl font-semibold">Project scope</h2><p className="mt-2">The product count, image types, intended use, deliverables, file formats and any marketplace requirements are agreed in the written brief or quotation. Portfolio examples show possible image types, not a fixed set for every product. An enquiry or free audit request does not by itself start paid production.</p></section>
      <section><h2 className="text-xl font-semibold">Pricing and payment</h2><p className="mt-2">The $XX/$XXX amounts on this website are placeholders, not payable prices. We do not collect payments through this website. Your written quotation confirms the final price, payment arrangements and any applicable taxes before paid work begins.</p></section>
      <section><h2 className="text-xl font-semibold">Revisions and delivery</h2><p className="mt-2">The written project scope specifies review stages, included revisions, any additional-work charges, estimated turnaround and final delivery format. Timelines depend on receiving the references, specifications, feedback and payments required by that scope. We do not promise marketplace acceptance or a sales outcome.</p></section>
      <section><h2 className="text-xl font-semibold">Client-provided materials</h2><p className="mt-2">Please provide product references, accurate specifications and brand assets that you are permitted to share for the project. Dimension graphics and claims about a product need verification against your actual product before commercial use. Tell us which visible product characteristics and markings must remain unchanged.</p></section>
      <section><h2 className="text-xl font-semibold">Final work and usage rights</h2><p className="mt-2">Your written project agreement should state when and how rights or a license to use approved final files are granted, and how any client-provided assets or third-party materials are treated. This website does not itself transfer ownership of creative work or third-party rights.</p></section>
      <section><h2 className="text-xl font-semibold">Cancellation and refunds</h2><p className="mt-2">Cancellation timing, work already completed and any refund terms must be agreed in the written project quotation or agreement before payment. No blanket cancellation or refund promise is made on this page.</p></section>
      <section><h2 className="text-xl font-semibold">Questions</h2><p className="mt-2">Contact <a className="underline" href="mailto:imagenmerce@gmail.com">imagenmerce@gmail.com</a> to discuss a project term before confirming an order.</p></section>
    </div><div className="mt-12 border-t pt-5 text-sm"><Link to="/privacy" className="underline">Privacy Policy</Link></div></div></main>;
}
