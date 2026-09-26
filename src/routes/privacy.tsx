import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://imagenmerce.vercel.app/privacy" }],
    meta: [
      { title: "Privacy Policy | Imagenmerce" },
      { name: "description", content: "How Imagenmerce handles contact details, product references and project enquiries." },
      { property: "og:title", content: "Privacy Policy | Imagenmerce" },
      { property: "og:description", content: "How Imagenmerce handles contact details, product references and project enquiries." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://imagenmerce.vercel.app/privacy" },
      { property: "og:image", content: "https://imagenmerce.vercel.app/images/stamp2/furniture-lifestyle.webp" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return <main className="min-h-screen bg-background text-foreground"><div className="page-shell max-w-4xl py-10 sm:py-16"><Link to="/" className="text-sm font-semibold text-signal">← Imagenmerce</Link><p className="eyebrow mt-12 text-signal">Company information</p><h1 className="display-title mt-4 text-4xl sm:text-6xl">Privacy Policy</h1><p className="mt-4 text-sm text-muted-foreground">Last updated September 27, 2026</p>
    <div className="mt-10 space-y-9 text-sm leading-7">
      <section><h2 className="text-xl font-semibold">Who we are</h2><p className="mt-2">Imagenmerce is an India-based ecommerce visual production studio serving ecommerce brands internationally. Contact us at <a className="underline" href="mailto:imagenmerce@gmail.com">imagenmerce@gmail.com</a> about this notice or a request involving your information.</p></section>
      <section><h2 className="text-xl font-semibold">Information you provide</h2><p className="mt-2">When you request a free audit, you may provide your name, brand, email, website or listing URL, platform, product count, areas to improve and an optional product image. A studio project enquiry may include additional contact details, a brief, product references and project requirements. Email enquiries include the information you choose to send.</p></section>
      <section><h2 className="text-xl font-semibold">How it is used</h2><p className="mt-2">We use enquiry details to review your request, assess the product or listing, communicate about next steps and, if a project is agreed, plan and deliver the work. Client product references and project information are handled as part of that workflow. Please avoid sending sensitive personal information in product images or free-text fields.</p></section>
      <section><h2 className="text-xl font-semibold">Where information goes</h2><p className="mt-2">Free audit submissions are sent through the website's server to a Supabase database; optional reference images are stored in a private Supabase Storage bucket. The separate studio project form is embedded from Jotform and processes information submitted there. Email correspondence is handled by our email provider. Website hosting and these service providers may process technical information needed to operate their services. Access to the audit database and private upload bucket is configured for server-side use; no public reading policy is included in this site's migration.</p></section>
      <section><h2 className="text-xl font-semibold">Retention and requests</h2><p className="mt-2">We have not published a fixed retention period for enquiries or uploaded references. If you want to ask what information we hold, correct an enquiry, or request deletion, email us at <a className="underline" href="mailto:imagenmerce@gmail.com">imagenmerce@gmail.com</a>. We will review the request in light of the project record and applicable obligations.</p></section>
      <section><h2 className="text-xl font-semibold">Updates</h2><p className="mt-2">If our enquiry process or this notice changes, we will update this page and its date.</p></section>
    </div><div className="mt-12 border-t pt-5 text-sm"><Link to="/terms" className="underline">Terms of Service</Link></div></div></main>;
}
