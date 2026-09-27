import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { InnerFooter } from "@/components/inner-footer";
import { AuditFormDialog, openFreeAudit } from "@/components/audit-form";
import { openProjectForm } from "@/components/project-form";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://imagenmerce.vercel.app/contact" }],
    meta: [
      { title: "Contact Imagenmerce | Product Image Projects" },
      { name: "description", content: "Contact Imagenmerce in New Delhi about an ecommerce product image set or request a free product image audit." },
      { property: "og:title", content: "Contact Imagenmerce" },
      { property: "og:description", content: "Start a product image audit or discuss a studio project with Imagenmerce." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://imagenmerce.vercel.app/contact" },
      { property: "og:image", content: "https://imagenmerce.vercel.app/images/stamp2/furniture-lifestyle.webp" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});
function Contact() {
  return <main className="overflow-clip"><SiteHeader/><AuditFormDialog/><section className="page-shell min-h-[70vh] pb-20 pt-28"><p className="eyebrow text-signal">Contact Imagenmerce</p><h1 className="display-title mt-5 max-w-5xl text-4xl sm:text-6xl">Let's Plan Your Product Image Set.</h1><p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground">Send one product or listing for a free visual audit, or share your requirements for a studio project.</p><div className="mt-12 grid gap-8 lg:grid-cols-2"><div className="border-t pt-6"><h2 className="display-title text-3xl">Start a conversation</h2><div className="mt-7 flex flex-wrap gap-3"><Button onClick={()=>openFreeAudit("contact")}>Get a Free Product Image Audit</Button><Button variant="outline" onClick={openProjectForm}>Start a Studio Project</Button></div><p className="mt-6 text-sm leading-7 text-muted-foreground">We review the product references and project requirements you send, then follow up about the next steps.</p></div><div className="border-t pt-6"><h2 className="display-title text-3xl">Contact details</h2><dl className="mt-7 space-y-5 text-sm"><div><dt className="eyebrow text-muted-foreground">Email</dt><dd className="mt-2"><a className="underline" href="mailto:imagenmerce@gmail.com">imagenmerce@gmail.com</a></dd></div><div><dt className="eyebrow text-muted-foreground">Phone</dt><dd className="mt-2"><a className="underline" href="tel:+917011836415">+91 70118 36415</a></dd></div><div><dt className="eyebrow text-muted-foreground">Address</dt><dd className="mt-2">48, Pocket 4, Sector 20, Rohini<br/>New Delhi 110083, India</dd></div></dl></div></div></section><InnerFooter/></main>;
}
