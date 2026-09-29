import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { PortfolioPreview } from "@/components/portfolio-preview";
import { SiteHeader } from "@/components/site-header";
import { PricingPreview } from "@/components/pricing-preview";
import { openProjectForm } from "@/components/project-form";
import { AuditFormDialog, openFreeAudit } from "@/components/audit-form";
const reference = "/images/IMG-FRN-032.webp";
const hero = "/images/IMG-FRN-032_1.webp";
const angle = "/images/IMG-FRN-032_2.webp";
const detail = "/images/IMG-FRN-032_3.webp";
const lifestyleDark = "/images/IMG-FRN-032_4.webp";
const lifestyleLight = "/images/IMG-FRN-032_5.webp";
const dimensions = "/images/IMG-FRN-032_6.webp";

const images = [hero, angle, detail, lifestyleDark, lifestyleLight, dimensions];
const processSteps: [string, string, string][] = [
  ["Original photograph", "The source product photo — room lighting, wall, floor and all.", reference],
  ["Background cleanup", "The room is removed and replaced with a clean, even studio background.", hero],
  ["Product isolation", "The product is separated from its original setting for a clean presentation.", hero],
  ["Center & frame", "The product is centered on a square canvas with consistent breathing space.", hero],
  ["Controlled shadow", "A controlled shadow helps ground the product in the final composition.", hero],
  ["Professional final image", "The finished image is checked against the product reference and brief.", hero],
];

const clientQuestions = [
  ["If we can create these images with Pomelli, why should we use Imagenmerce?", "Pomelli can create product and lifestyle visuals, but it is primarily an AI marketing and creative-content tool. Imagenmerce is focused on e-commerce product image production: every image is directed around the actual product, the required image type and the business brief, then reviewed through a controlled production and QA process."],
  ["Can't I just give my product to an AI and tell it what I want?", "You can—and the result may look very good. But AI interprets the reference and prompt; it does not automatically guarantee that every product detail is preserved. Proportions, structure, components, materials, colours and textures can change unintentionally."],
  ["But if the AI image looks good, what's the problem?", "A good-looking image and a correct e-commerce image are not always the same thing. The image must represent the actual product a customer will receive. Misrepresented details can create confusion, returns and loss of trust."],
  ["Why can't I just keep generating until AI gives me the correct result?", "You can, but that becomes a production process: generate, inspect, identify errors, modify instructions, regenerate, compare and refine. This gets more demanding when 6–7 images per product must remain consistent."],
  ["Does Imagenmerce depend on AI?", "Imagenmerce uses AI through controlled tools and prompt-engineered instructions as part of a managed workflow. The result is reviewed, refined and quality-checked—not blindly accepted."],
  ["Why is manual work still necessary if AI is so advanced?", "AI generation and product accuracy are different things. Manual refinement checks specific structures, components, stitching, handles, leg designs and other visible details against the original reference."],
  ["Can ChatGPT Images or Adobe Firefly do the same thing?", "They can generate and edit product or lifestyle images. The same principle applies: the user still needs to inspect, select, correct and control the output. Imagenmerce provides that managed production workflow for you."],
  ["What about Photoroom? It is already made for e-commerce.", "Photoroom is useful software for sellers who want to create and edit their own images. Photoroom is the tool a seller operates; Imagenmerce is the service that manages production, refinement and quality control for the finished image set."],
  ["So what am I actually paying Imagenmerce for?", "You are paying for the complete production process: understanding the product, planning image types, maintaining consistency, checking details, refining imperfect outputs, reworking issues, reviewing the full set and delivering usable e-commerce images."],
  ["Why can't I just use AI and save the money?", "You can if you need only a few simple images and are comfortable managing the process. The real self-service cost includes time spent prompting, testing, comparing, correcting, regenerating and quality-checking—especially as your catalog grows."],
  ["Is AI unreliable for e-commerce?", "AI is extremely useful, but it should not be treated as an automatic source of truth for a physical product. It generates an interpretation; product accuracy, consistency, manual refinement and QA remain important for commercial use."],
];


export const Route = createFileRoute("/")({
  head: () => ({ links: [{ rel: "canonical", href: "https://imagenmerce.vercel.app/" }], meta: [
    { title: "Imagenmerce | Ecommerce Product Image Production Studio" },
    { name: "description", content: "Professional ecommerce product imagery for Amazon, Shopify and DTC brands — created from product references through a controlled production and QA workflow." },
    { property: "og:title", content: "Imagenmerce | Ecommerce Product Image Production Studio" },
    { property: "og:description", content: "Professional ecommerce product imagery created through a controlled production and QA workflow." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "https://imagenmerce.vercel.app/images/stamp2/furniture-lifestyle.webp" },
    { name: "twitter:image", content: "https://imagenmerce.vercel.app/images/stamp2/furniture-lifestyle.webp" },
    { property: "og:url", content: "https://imagenmerce.vercel.app/" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Imagenmerce | Ecommerce Product Image Production Studio" },
    { name: "twitter:description", content: "Professional ecommerce product imagery for Amazon, Shopify and DTC brands." },
  ]}),
  component: Index,
});

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting)), { threshold: .12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function Compare({ left = reference, right = hero, leftLabel = "Original reference", rightLabel = "Refined product visual", className = "" }: { left?: string; right?: string; leftLabel?: string; rightLabel?: string; className?: string }) {
  const [position, setPosition] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const update = (event: ReactPointerEvent<HTMLDivElement>) => {
    const box = ref.current?.getBoundingClientRect();
    if (box) setPosition(Math.max(3, Math.min(97, ((event.clientX - box.left) / box.width) * 100)));
  };
  return <div ref={ref} className={`relative isolate overflow-hidden bg-muted touch-none select-none ${className}`} onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); update(e); }} onPointerMove={(e) => { if (e.currentTarget.hasPointerCapture(e.pointerId)) update(e); }} role="slider" aria-label="Compare original and refined product image" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(position)} tabIndex={0} onKeyDown={(e) => { if (e.key === "ArrowLeft") setPosition((v) => Math.max(3, v - 3)); if (e.key === "ArrowRight") setPosition((v) => Math.min(97, v + 3)); }}>
    <img src={right} alt={rightLabel} className="absolute inset-0 size-full object-contain" width={1536} height={1536} />
    <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100-position}% 0 0)` }}><img src={left} alt={leftLabel} className="absolute inset-0 size-full object-contain" width={1536} height={1536} /></div>
    <div className="absolute inset-y-0 w-px bg-primary-foreground shadow-xl" style={{ left: `${position}%` }}><div className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary-foreground/50 bg-primary text-primary-foreground"><ChevronLeft size={16}/><ChevronRight size={16}/></div></div>
    <span className="absolute left-4 top-4 bg-primary px-3 py-2 text-[9px] font-bold uppercase tracking-[.16em] text-primary-foreground">{leftLabel}</span>
    <span className="absolute right-4 top-4 bg-primary-foreground px-3 py-2 text-[9px] font-bold uppercase tracking-[.16em] text-primary">{rightLabel}</span>
  </div>;
}

function SectionHead({ number, label, title, copy }: { number: string; label: string; title: ReactNode; copy?: string }) {
  return <div className="reveal mb-8 min-w-0 border-t pt-4 text-center sm:mb-12 sm:pt-5"><div className="eyebrow text-muted-foreground">{number} — {label}</div><div className="mx-auto mt-4 min-w-0 sm:mt-5"><h2 className="display-title mx-auto max-w-6xl break-words text-[2rem] sm:text-6xl lg:text-6xl">{title}</h2>{copy&&<p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:mt-7 sm:text-base sm:leading-8">{copy}</p>}</div></div>;
}

function ReferenceDrop() {
  return <button type="button" onClick={()=>openFreeAudit("reference_section")} className="flex min-h-80 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed bg-card p-6 text-center transition-colors hover:border-signal hover:bg-signal/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
    <span className="display-title text-4xl">Drop your reference image</span>
    <span className="mt-4 text-base text-muted-foreground">Send one product or listing for a free image audit.</span>
    <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.12em] text-signal">Get a Free Product Image Audit <ArrowRight size={15}/></span>
  </button>;
}

function Index() {
  useReveal();
  const [processStep,setProcessStep]=useState(0);
  const checks=["Square composition","Balanced product scale","Controlled neutral background","Consistent baseline","Consistent camera language","Natural ground shadow","Product-only hero presentation","Detail image included","Dimension visual where required","Consistent treatment across the set"];
  return <main id="top" className="overflow-clip"><SiteHeader/><AuditFormDialog/>
    <section className="page-shell flex flex-col justify-center pb-8 pt-20 sm:min-h-[86vh] sm:pb-10 sm:pt-32"><div className="grid min-w-0 items-center gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,46rem)]"><div className="order-2 min-w-0 py-2 sm:order-1 sm:py-8"><p className="eyebrow text-signal">Amazon • Shopify • DTC</p><p className="display-title mt-4 inline-block bg-signal px-2 py-1 text-sm text-white sm:mt-6 sm:text-xl">E-commerce Visual Conversion Studio</p><h1 className="display-title mt-6 break-words text-[2.2rem] sm:text-5xl lg:text-[3.25rem]">Turn One Product Reference Into a Complete Ecommerce Image Set.</h1><p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:mt-7 sm:text-base sm:leading-8">Professional product visuals for Amazon, Shopify and DTC brands — created from your existing product references through a controlled production and QA workflow.</p><p className="mt-4 text-xs font-semibold uppercase tracking-wide text-signal">AI-assisted. Studio-refined. Quality-controlled.</p><p className="mt-5 text-xs leading-6 text-muted-foreground">Hero • Angle • Detail • Lifestyle • Features • Dimensions</p><div className="mt-7 flex flex-wrap gap-3"><Button onClick={()=>openFreeAudit("hero")}>Get a Free Product Image Audit <ArrowRight size={15}/></Button><Button variant="outline" asChild><a href="/portfolio">View Our Work <ArrowRight size={15}/></a></Button></div></div><Compare className="order-1 aspect-square w-full max-w-[46rem] min-h-0 justify-self-center sm:order-2 lg:justify-self-end"/></div></section>

    <section className="section-pad bg-secondary"><div className="page-shell grid gap-10 lg:grid-cols-[.9fr_1.1fr]"><div><p className="eyebrow text-signal">From reference to finished set</p><h2 className="display-title mt-4 text-[2.65rem] leading-tight sm:text-6xl">One Product.<br/>A Complete Visual System.</h2><p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground">Send the product references you already have. We turn them into ecommerce-ready visuals through controlled production and quality review. Professional studio photography is not required to get started.</p></div><div className="border-t pt-5"><p className="eyebrow text-signal">What you provide</p>{["Product reference image(s)","Product name and details","Required features or benefits","Dimensions, when needed","Brand guidelines, when available"].map((item,i)=><div key={item} className="flex gap-5 border-b py-4 text-sm sm:text-base"><span className="text-signal">0{i+1}</span>{item}</div>)}</div></div></section>

    <section className="section-pad page-shell"><SectionHead number="Intro" label="Deliverables" title="What You Receive" copy="Typical image set — customized according to product and marketplace requirements."/><div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">{[
      ["Hero Image","Clean primary product presentation for ecommerce marketplaces."],
      ["Angled View","Shows product depth, structure and design."],
      ["Detail Image","Highlights material, construction, finish or important details."],
      ["Lifestyle Image","Shows the product naturally in use or in its intended environment."],
      ["Feature / Benefit Image","Communicates important product features or customer benefits."],
      ["Dimension Image","Professional dimension visualization when required."],
    ].map(([title,copy],i)=><article key={title} className="min-w-0 bg-background p-6 sm:p-8"><span className="eyebrow text-signal">0{i+1} — Image type</span><h3 className="display-title mt-8 text-3xl">{title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{copy}</p></article>)}</div></section>

    <PortfolioPreview/>

    <section id="process" className="section-pad bg-primary text-primary-foreground"><div className="page-shell"><SectionHead number="02" label="Reference to ready-to-use / Concept / Portfolio Recreation" title="More Than AI-Generated Images. A Studio Workflow Built Around Product Accuracy." copy="Every project follows a defined brief, product-specific processing, precision-focused refinement and a final quality audit. AI assists production; our studio directs and checks the finished work."/>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,38rem)_minmax(0,1fr)] lg:justify-center"><div className="relative aspect-square w-full max-w-[38rem] justify-self-center overflow-hidden bg-card lg:justify-self-start"><img src={processSteps[processStep]![2]} alt={`IMG-FRN-032 sideboard — ${processSteps[processStep]![0]}`} width={1536} height={1536} className={`size-full transition-all duration-700 ${processStep===0?"object-cover":"object-contain p-[6%]"}`}/>
        {processStep===2&&<div className="pointer-events-none absolute inset-[16%] rounded-sm border-2 border-dashed border-accent"/>}
        {processStep===3&&<><div className="pointer-events-none absolute inset-x-[10%] top-1/2 border-t border-accent/70"/><div className="pointer-events-none absolute inset-y-[10%] left-1/2 border-l border-accent/70"/></>}
        {processStep===4&&<div className="pointer-events-none absolute inset-x-[18%] bottom-[14%] h-6 rounded-[50%] bg-foreground/25 blur-md"/>}
        <span className="absolute left-4 top-4 bg-primary px-3 py-2 text-[9px] font-bold uppercase tracking-[.16em] text-primary-foreground">{processStep===0?"IMG-FRN-032 — reference photo":`IMG-FRN-032_1 — step 0${processStep+1}`}</span>
        <p className="absolute inset-x-0 bottom-0 bg-primary/90 px-4 py-3 text-xs leading-6 text-primary-foreground">{processSteps[processStep]![1]}</p></div><div className="flex flex-col justify-center">{processSteps.map((step,i)=><button key={step[0]} onMouseEnter={()=>setProcessStep(i)} onClick={()=>setProcessStep(i)} className={`flex items-center gap-4 border-t py-5 text-left transition-all ${processStep===i?"text-accent":"text-primary-foreground/35"}`}><span className="text-xs">0{i+1}</span><span className="text-xl">{step[0]}</span></button>)}</div></div>

      <div className="mt-10 text-center"><Button variant="inverse" onClick={()=>openFreeAudit("workflow")}>Get a Free Product Image Audit</Button></div>
    </div></section>

    <section className="section-pad page-shell" aria-labelledby="studio-pillars"><div className="border-t pt-5"><p className="eyebrow text-signal">The studio workflow</p><h2 id="studio-pillars" className="display-title mt-5 max-w-5xl text-[2.5rem] leading-tight sm:text-6xl">AI-assisted. Studio-refined. Quality-controlled.</h2><p className="mt-6 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">Your investment covers a controlled studio workflow, from a product-specific brief to an approved set of e-commerce visuals. The process is tailored to the reference and the requirements of each category.</p></div><div className="mt-12 grid gap-px bg-border md:grid-cols-3">{[
      ["01", "Dynamic Engine Processing", "Intelligent, product-specific image processing", "We plan the image types and guide AI-assisted production around your references, category and intended use. Each visual begins with the project brief."],
      ["02", "Craftsmanship & Pixel Lock", "Precision-focused product fidelity", "We refine framing, materials and product details against the source reference. Pixel Lock describes our careful checks, with particular attention to furniture and electronics."],
      ["03", "Strict QA Audit", "Every deliverable reviewed against the brief", "We inspect product consistency, visible defects, composition, requested views and delivery specifications before the set is approved for handoff."],
    ].map(([number,title,subtitle,copy])=><article key={number} className="bg-background p-6 sm:p-8"><span className="eyebrow text-signal">{number} / Studio stage</span><h3 className="display-title mt-10 text-3xl sm:text-4xl">{title}</h3><p className="mt-5 font-semibold">{subtitle}</p><p className="mt-3 text-sm leading-7 text-muted-foreground">{copy}</p></article>)}</div></section>

    <section className="page-shell pb-16"><p className="eyebrow text-signal">Controlled production path</p><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{["Reference Accuracy","Visual Production","Product Consistency","Quality Assurance","Final Ecommerce Delivery"].map((step,i)=><div key={step} className="flex items-center gap-3 border-l-2 border-signal pl-4 text-sm font-semibold"><span className="text-signal">0{i+1}</span>{step}</div>)}</div></section>


    <section className="section-pad bg-secondary"><div className="page-shell"><SectionHead number="07" label="Product accuracy" title="Product Accuracy Test" copy="The product should remain the product. Our QA focuses on visible product characteristics, using the supplied reference as the source of truth."/><div className="grid items-start gap-10 lg:grid-cols-[minmax(0,38rem)_minmax(0,1fr)] lg:justify-center"><div className="grid grid-cols-2 gap-3"><figure className="min-w-0 border bg-card p-2"><div className="aspect-square"><img src="/images/stamp2/furniture-reference.webp" alt="Convertible sofa source reference" loading="lazy" width={502} height={373} className="size-full object-contain"/></div><figcaption className="eyebrow mt-2">Sofa / reference</figcaption></figure><figure className="min-w-0 border bg-card p-2"><div className="aspect-square"><img src="/images/stamp2/furniture-detail.webp" alt="Convertible sofa final detail showing frame and upholstery" loading="lazy" width={1254} height={1254} className="size-full object-contain"/></div><figcaption className="eyebrow mt-2">Shape · Structure · Materials</figcaption></figure><figure className="min-w-0 border bg-card p-2"><div className="aspect-square"><img src="/images/stamp2/kitchen-reference.webp" alt="Kitchen hob source reference" loading="lazy" width={577} height={770} className="size-full object-contain"/></div><figcaption className="eyebrow mt-2">Hob / reference</figcaption></figure><figure className="min-w-0 border bg-card p-2"><div className="aspect-square"><img src="/images/stamp2/kitchen-detail.webp" alt="Kitchen hob final detail showing burners and controls" loading="lazy" width={1254} height={1254} className="size-full object-contain"/></div><figcaption className="eyebrow mt-2">Hardware · Color · Markings</figcaption></figure></div><div className="flex min-w-0 flex-col justify-between"><div><p className="eyebrow mb-4 text-signal">Pixel Lock™ / Product Accuracy QA Method</p><p className="mb-5 text-sm leading-7 text-muted-foreground">Every final view is checked against the supplied product reference to maintain visual product identity and consistency across the image set.</p><p className="eyebrow mb-4 text-muted-foreground">Visible characteristics we check</p>{["Shape","Proportions","Structure","Materials","Color","Hardware","Logos & markings","Visible construction details"].map(x=><div key={x} className="flex items-center gap-3 border-t py-4 text-sm"><Check size={15} className="shrink-0 text-signal"/>{x}</div>)}</div><div className="mt-8 border-l-2 border-signal pl-5"><p className="display-title break-words text-3xl">The reference image is the source of truth.</p><p className="mt-4 text-xs leading-6 text-muted-foreground">Shown with concept / portfolio recreation examples. Visual callouts show areas of review, not measured QA scores or certified specifications.</p><Button className="mt-6" onClick={()=>openFreeAudit("product_accuracy")}>Get a Free Product Image Audit</Button></div></div></div></div></section>

    <section className="section-pad page-shell"><SectionHead number="08" label="What we fix" title="From Ordinary Photo to Product-Ready Presentation."/><div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">{[["Busy background","Clean background"],["Poor framing","Balanced framing"],["Off-center product","Correct positioning"],["Inconsistent scale","Standardized scale"],["Harsh lighting","Controlled presentation"],["Missing views","Complete image set"],["Disconnected catalog","Unified visual system"]].map((x,i)=><div key={x[0]} className="min-w-0 bg-background p-4 sm:p-6"><span className="eyebrow text-muted-foreground">0{i+1}</span><p className="mt-5 text-xs text-muted-foreground line-through sm:mt-12 sm:text-sm">{x[0]}</p><p className="mt-2 flex items-start gap-2 break-words text-base sm:text-xl"><ArrowRight size={16} className="mt-1 shrink-0 text-signal"/>{x[1]}</p></div>)}</div></section>

    <section className="section-pad bg-secondary"><div className="page-shell"><SectionHead number="09" label="Image quality checklist" title="Strict QA Audit Before Handoff." copy="We review each deliverable against the brief for product consistency, visual defects, composition, requested image types and delivery requirements before approval."/><div className="grid gap-10 lg:grid-cols-2"><div>{checks.map((x,i)=><div key={x} className="reveal flex items-center gap-4 border-t py-4"><span className="flex size-6 items-center justify-center border border-signal text-signal"><Check size={14}/></span><span>{x}</span></div>)}</div><div className="fine-grid grid grid-cols-2 content-center gap-px border bg-border p-px">{["JPG / PNG\nagreed formats","1:1\ncomposition","sRGB\ncolor profile","Web-optimized\nformats","Daylight-style\nwhite balance","Optimized\nfile weight"].map(x=><div key={x} className="whitespace-pre-line bg-card p-6 text-lg">{x}</div>)}</div></div></div></section>


    <PricingPreview/>

    <section className="section-pad page-shell"><SectionHead number="11" label="Business value" title="A Studio Process Behind Every Visual." copy="You are investing in a rigorous digital studio workflow: reference-led processing, product-specific refinement and quality control. Scope and pricing reflect the care each product and image set requires."/><div className="grid gap-12 lg:grid-cols-2"><div><p className="eyebrow text-muted-foreground">Traditional workflow</p>{["Product preparation","Shipping","Studio","Photographer","Multiple setups","Additional environments","Reshoots","Post-production"].map((x,i)=><div key={x} className="border-t py-4 text-lg"><span className="mr-4 text-xs text-muted-foreground">0{i+1}</span>{x}</div>)}</div><div><p className="eyebrow text-signal">Imagenmerce workflow</p>{["Study the brief and references","Plan views by product category","Direct AI-assisted processing","Refine shape, materials and details","Audit consistency and defects","Approve the complete set","Deliver organized assets"].map((x,i)=><div key={x} className="border-t py-4 text-lg"><span className="mr-4 text-xs text-signal">0{i+1}</span>{x}</div>)}</div></div><div className="mt-10 text-center"><Button onClick={()=>openFreeAudit("business_value")}>Get a Free Product Image Audit</Button></div><p className="display-title mt-20 break-words text-center text-[2.65rem] sm:text-6xl lg:text-[2.8rem]">One product <ArrowRight className="inline"/> multiple visual assets.</p></section>

    <section className="section-pad bg-primary text-primary-foreground"><div className="page-shell"><SectionHead number="13" label="How it works" title="A Clear Production Process."/><div className="grid gap-px bg-primary-foreground/20 sm:grid-cols-2 lg:grid-cols-3">{[
      ["01","Share Product References","Send the images you already have."],
      ["02","Share Requirements","Tell us about the product, audience and needed views."],
      ["03","Visual Production","We direct the agreed ecommerce image set."],
      ["04","Accuracy & QA","We check visible product details and visual consistency."],
      ["05","Final Delivery","Receive the agreed final assets and formats."],
      ["06","Scale Across Your Catalog","Discuss a repeatable approach for additional products."],
    ].map(([number,title,copy])=><div key={number} className="min-w-0 bg-primary p-6"><span className="eyebrow text-accent">{number}</span><h3 className="display-title mt-10 break-words text-3xl">{title}</h3><p className="mt-4 text-sm leading-6 text-primary-foreground/70">{copy}</p></div>)}</div></div></section>

    <section className="section-pad page-shell"><SectionHead number="14" label="What we need" title="Start With What You Already Have."/><div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]"><ReferenceDrop/><div>{["Product dimensions, if required","Correct product color","Important material information","Details that must not change","Desired image count","Required environments","Existing visual guidelines"].map(x=><div key={x} className="flex gap-3 border-t py-4 text-sm"><Check size={15} className="text-signal"/>{x}</div>)}<p className="mt-6 text-sm text-muted-foreground">Better references help us preserve more product detail.</p></div></div></section>

    <section className="section-pad bg-secondary"><div className="page-shell"><SectionHead number="16" label="Who we serve" title="Built for Ecommerce Brands"/><div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">{[
      ["Amazon Sellers","Create marketplace-ready product visuals for new and existing listings."],
      ["Shopify & DTC Brands","Build consistent product imagery for online stores and campaigns."],
      ["Furniture & Home Brands","Show products through hero, detail, lifestyle and dimension visuals."],
      ["Manufacturers & Catalog Teams","Create consistent imagery across larger product catalogs."],
    ].map(([title,copy],i)=><article key={title} className="min-w-0 bg-background p-6"><span className="eyebrow text-signal">0{i+1}</span><h3 className="display-title mt-10 break-words text-3xl">{title}</h3><p className="mt-5 text-sm leading-7 text-muted-foreground">{copy}</p></article>)}</div><p className="mt-8 max-w-3xl text-sm leading-7 text-muted-foreground">Built for brands that need more than a one-off AI image — consistent product visuals that can scale across catalogs. We also work with retailers, wholesalers and agencies.</p></div></section>

    <section className="section-pad page-shell"><SectionHead number="17" label="Studio strengths" title="Why Brands Work With Imagenmerce" copy="A reference-led studio process designed for consistent ecommerce product visuals."/><div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">{[
      ["Reference-driven production","Product references guide the visual brief and final views."],
      ["Product-focused visual accuracy","Visible characteristics are checked against the source."],
      ["Consistent image systems","Views are planned as a coordinated product set."],
      ["Controlled QA workflow","Outputs are reviewed for product and presentation consistency."],
      ["Scalable catalog production","Repeatable direction helps plan multi-product scopes."],
      ["Ecommerce-focused output","Image types are selected for the store and marketplace brief."],
    ].map(([title,copy],i)=><article key={title} className="bg-background p-6 sm:p-8"><span className="eyebrow text-signal">0{i+1}</span><h3 className="display-title mt-7 text-3xl">{title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{copy}</p></article>)}</div><p className="mt-8 text-sm text-muted-foreground">Client product references and project information are handled as part of the project workflow.</p><div className="mt-6 flex flex-wrap gap-3"><Button variant="outline" asChild><a href="/portfolio">See our work</a></Button><Button variant="outline" asChild><a href="#pricing">Test the workflow with one product</a></Button></div></section>

    <section id="client-qa" className="section-pad bg-secondary"><div className="page-shell"><SectionHead number="18" label="Client Q&A" title="AI Can Generate an Image. We Take Responsibility for the Finished Set." copy="The distinction is not whether AI can make an image—it is who manages product accuracy, refinement and quality control."/><div className="mx-auto max-w-5xl border-l-4 border-signal bg-background p-5 sm:p-7"><p className="eyebrow text-signal">Our production commitment</p><p className="display-title mt-3 text-2xl leading-tight sm:text-4xl">If an error or inconsistency is found, the image is not delivered as-is.</p><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">It returns to the required production stage for refinement or re-generation, then is checked again against the product reference and brief.</p><div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary"><span className="rounded-full bg-signal px-3 py-2 text-primary-foreground">Reference</span><span>→</span><span>Product analysis</span><span>→</span><span>Prompt-engineered generation</span><span>→</span><span>Manual refinement</span><span>→</span><span>Accuracy check</span><span>→</span><span>QA</span></div></div><div className="mx-auto mt-6 grid max-w-5xl gap-px bg-border md:grid-cols-2">{clientQuestions.map(([q,a],i)=><details key={q} className="group bg-background p-5 sm:p-6"><summary className="cursor-pointer list-none pr-6 text-base font-semibold leading-6 sm:text-lg">{String(i+1).padStart(2,"0")}. {q}<span className="float-right -mr-6 text-xl text-signal transition-transform group-open:rotate-45">+</span></summary><p className="mt-4 text-sm leading-7 text-muted-foreground">{a}</p></details>)}</div><p className="mx-auto mt-6 max-w-4xl text-center text-sm leading-7 text-muted-foreground">In simple terms: <strong className="font-semibold text-foreground">AI can generate an image. Imagenmerce produces, refines, reworks when necessary and quality-checks the required e-commerce image set.</strong></p></div></section>

    <section className="section-pad page-shell"><SectionHead number="19" label="FAQ" title="Clear Scope. Clear Delivery." copy="Practical details to discuss before a product or catalog project."/><div className="grid gap-px bg-border md:grid-cols-2">{[
      ["Do I need to send the physical product?","Not for the standard reference-led workflow. If additional source material is needed for your product, we confirm that before production."],
      ["Can you work from existing product images?","Yes. Existing product references are the starting point. Clear views and accurate product information help us preserve visible details."],
      ["Do you create Amazon images?","Yes. We plan product visuals for Amazon listings around the brief and applicable marketplace requirements. Listing acceptance is not guaranteed."],
      ["Do you create Shopify product imagery?","Yes. We create coordinated product imagery for Shopify stores and other ecommerce uses."],
      ["Can you create lifestyle scenes?","Yes, when they suit the product and scope. We agree on the intended environment in the brief."],
      ["Can you create dimension graphics?","Yes, when required. Please supply verified dimensions; specifications must be checked before commercial use."],
      ["Can you handle multiple products?","Yes. Growth and volume scopes cover several products with a consistent visual approach. We quote each catalog scope individually."],
      ["What is the minimum starting scope?","The starting scope is a minimum of five products with three images per product. Price and terms are confirmed in the quotation."],
      ["How does the revision process work?","The number of revisions and review stages are confirmed in the project quotation before production starts."],
      ["How long does a project take?","Turnaround depends on product complexity, image count and review scope. We confirm the schedule with your brief."],
    ].map(([q,a])=><details key={q} className="group bg-background p-6"><summary className="cursor-pointer list-none text-lg font-semibold">{q}<span className="float-right text-signal group-open:rotate-45">+</span></summary><p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">{a}</p></details>)}</div></section>

    <footer id="contact" className="relative min-h-screen overflow-hidden bg-primary text-primary-foreground"><div className="absolute inset-0 grid grid-cols-3 opacity-25 md:grid-cols-6">{images.map(x=><img key={x} src={x} alt="" loading="lazy" width={512} height={768} className="size-full object-cover"/>)}</div><div className="absolute inset-0 bg-primary/80"/><div className="page-shell relative flex min-h-screen flex-col justify-between gap-10 py-8"><div className="flex flex-wrap items-center justify-between gap-4"><img src="/imagenmerce-logo.png" alt="Imagenmerce" className="h-8 w-auto brightness-0 invert"/><span className="eyebrow">E-commerce Visual Conversion Studio</span></div><div className="max-w-6xl"><p className="eyebrow text-accent">Amazon • Shopify • DTC</p><h2 className="display-title mt-6 break-words text-[3.25rem] sm:text-8xl lg:text-[6.35rem]">Your Product Is Already There. Let's Present It Better.</h2><p className="mt-7 max-w-2xl text-sm leading-7 text-primary-foreground/75">Imagenmerce is an India-based ecommerce visual production studio serving ecommerce brands internationally.</p><p className="mt-3 max-w-lg text-sm leading-7 text-primary-foreground/75">Send your reference. Our studio will plan, refine and quality-check your visual set against the brief.</p><div className="mt-8 flex flex-wrap gap-3"><Button variant="inverse" onClick={()=>openFreeAudit("final_cta")}>Get a Free Product Image Audit</Button><Button variant="outline" onClick={openProjectForm} className="border-primary-foreground/35 text-primary-foreground hover:border-primary-foreground hover:bg-primary-foreground/10">Start a Studio Project</Button></div></div><div className="grid gap-6 border-t border-primary-foreground/20 pt-6 text-sm sm:grid-cols-2"><div><p className="font-semibold">Imagenmerce</p><p className="mt-2 text-primary-foreground/70">E-commerce Visual Conversion Studio</p><p className="mt-1 text-primary-foreground/70">Amazon • Shopify • DTC</p></div><div className="flex flex-col gap-2 sm:items-end"><a className="underline underline-offset-4" href="mailto:imagenmerce@gmail.com">imagenmerce@gmail.com</a><a href="tel:+917011836415">+91 70118 36415</a><address className="not-italic leading-6 sm:text-right">48, Pocket 4, Sector 20, Rohini<br/>New Delhi 110083, India</address><a href="/privacy" className="hover:underline">Privacy Policy</a><a href="/terms" className="hover:underline">Terms of Service</a></div></div><div className="flex flex-wrap items-center justify-between gap-4 border-t border-primary-foreground/20 pt-5 text-[10px] uppercase text-primary-foreground/55"><span>© 2026 Imagenmerce · India</span><nav className="flex flex-wrap gap-4" aria-label="Footer navigation"><a href="/services">Services</a><a href="/portfolio">Portfolio</a><a href="/pricing">Pricing</a><a href="/about">About</a><a href="/contact">Contact</a><a href="#top">Back to top ↑</a></nav></div></div></footer>
  </main>;
}
