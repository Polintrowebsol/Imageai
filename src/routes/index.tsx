import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ClientWork } from "@/components/client-work";
import { ProjectFormDialog, openProjectForm } from "@/components/project-form";
const standardOriginal = "/images/IMG-FRN-033.webp";
const standardFront = "/images/IMG-FRN-033_1.webp";
const standardInconsistent = "/images/IMG-FRN-033_2.webp";

const catalogImages = [
  "/images/IMG-FRN-021.webp",
  "/images/IMG-FRN-021_1.webp",
  "/images/IMG-FRN-021_2.webp",
  "/images/IMG-FRN-021_3.webp",
  "/images/IMG-FRN-021_4.webp",
  "/images/IMG-FRN-021_5.webp",
  "/images/IMG-FRN-021_6.webp",
];
const catalogNames = ["Client reference", "Hero", "Angle", "Detail", "Lifestyle 01", "Lifestyle 02", "Dimensions"];

const reference = "/images/IMG-FRN-032.webp";
const hero = "/images/IMG-FRN-032_1.webp";
const angle = "/images/IMG-FRN-032_2.webp";
const detail = "/images/IMG-FRN-032_3.webp";
const lifestyleDark = "/images/IMG-FRN-032_4.webp";
const lifestyleLight = "/images/IMG-FRN-032_5.webp";
const dimensions = "/images/IMG-FRN-032_6.webp";

const images = [hero, angle, detail, lifestyleDark, lifestyleLight, dimensions];
const imageNames = ["Hero", "Angle", "Detail", "Lifestyle 01", "Lifestyle 02", "Dimensions"];
const oneToSixImages = [
  "/images/IMG-LGT-012_1.webp",
  "/images/IMG-LGT-012_2.webp",
  "/images/IMG-LGT-012_3.webp",
  "/images/IMG-LGT-012_4.webp",
  "/images/IMG-LGT-012_5.webp",
  "/images/IMG-LGT-012_6.webp",
];
const processSteps: [string, string, string][] = [
  ["Original photograph", "The photo exactly as the client supplied it — room lighting, wall, floor and all.", reference],
  ["Background cleanup", "The room is removed and replaced with a clean, even studio background.", hero],
  ["Product isolation", "The sideboard is cut out precisely, edge by edge, with nothing else left behind.", hero],
  ["Center & frame", "The product is centered on a square canvas with consistent breathing space.", hero],
  ["Controlled shadow", "A soft, believable contact shadow grounds the product on the surface.", hero],
  ["Professional final image", "The finished image is checked against the product reference and brief.", hero],
];

const catalogEmailHref = `mailto:imagenmerce@gmail.com?subject=${encodeURIComponent("Enquiry for Product Image Set")}&body=${encodeURIComponent(`Hello Imagenmerce,

My name is [Name], and I am the Owner/Manager of [Business Name]. We run an e-commerce business and regularly need high-quality product images for our catalog.

I would like to discuss creating a professional image set for our products, including our requirements, expected image volume, timeline, and pricing. Please let me know a convenient time to connect and what product references or information you need from us to get started.

I look forward to your response.

Kind regards,
[Name]
[Business Name]
[Phone Number]`)}`;

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Imagenmerce — E-commerce Visual Conversion Studio" },
    { name: "description", content: "Reference-led processing, studio refinement and strict QA for marketplace-ready product visuals." },
    { property: "og:title", content: "Imagenmerce — E-commerce Visual Conversion Studio" },
    { property: "og:description", content: "AI-powered. Studio-refined. Quality-controlled e-commerce visuals." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
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

function Navigation() {
  const [scrolled, setScrolled] = useState(false); const [open, setOpen] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 80); onScroll(); addEventListener("scroll", onScroll); return () => removeEventListener("scroll", onScroll); }, []);
  const links = [["Work","work"],["Image System","system"],["Process","process"],["Contact","contact"]];
  return <header className={`fixed left-1/2 top-3 z-50 w-[calc(100%-1.5rem)] max-w-[88rem] -translate-x-1/2 border border-transparent transition-all duration-500 ${scrolled ? "nav-scrolled px-4 lg:w-[calc(100%-4rem)]" : "px-1"} ${open ? "nav-mobile-open px-4" : ""}`}>
    <div className="flex h-16 items-center justify-between"><a href="#top" aria-label="Imagenmerce home" className="shrink-0"><img src="/imagenmerce-logo.png" alt="Imagenmerce" className="h-8 w-auto sm:h-9" /></a>
      <nav className="hidden items-center gap-6 xl:flex">{links.map(([label,id])=><a key={id} href={`#${id}`} className="text-[10px] font-semibold uppercase tracking-[.12em] text-muted-foreground transition-colors hover:text-foreground">{label}</a>)}</nav>
      <Button size="sm" className="hidden sm:inline-flex" onClick={openProjectForm}>Start a Project</Button>
      <Button variant="ghost" size="icon" className="sm:hidden" aria-label="Toggle navigation" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</Button>
    </div>
    {open && <nav className="border-t py-4 sm:hidden">{links.map(([label,id])=><a key={id} href={`#${id}`} onClick={()=>setOpen(false)} className="block py-3 text-sm uppercase">{label}</a>)}</nav>}
  </header>;
}

function SectionHead({ number, label, title, copy }: { number: string; label: string; title: ReactNode; copy?: string }) {
  return <div className="reveal mb-8 min-w-0 border-t pt-4 text-center sm:mb-12 sm:pt-5"><div className="eyebrow text-muted-foreground">{number} — {label}</div><div className="mx-auto mt-4 min-w-0 sm:mt-5"><h2 className="display-title mx-auto max-w-6xl break-words text-[2rem] sm:text-6xl lg:text-6xl">{title}</h2>{copy&&<p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:mt-7 sm:text-base sm:leading-8">{copy}</p>}</div></div>;
}

function Standards() {
  const [camera, setCamera] = useState(1);
  const cameraImages = [
    "/images/IMG-HME-018_1.webp",
    "/images/IMG-HME-018_2.webp",
    "/images/IMG-HME-018_3.webp",
    "/images/IMG-HME-018_4.webp",
  ];
  const cameraNames = ["Front", "Three-quarter", "Detail", "In context"];
  return <section id="system" className="section-pad page-shell">
    <SectionHead number="03" label="Our standard" title={<><span className="lg:whitespace-nowrap">Consistency Is What</span><br/><span className="lg:whitespace-nowrap">Makes a Catalog Feel Designed.</span></>} copy="Product accuracy comes first. We use the client reference as the source of truth, then apply controlled framing, camera language and presentation rules so every image feels like part of one deliberate catalog system."/>
    <div className="grid items-start gap-6 lg:grid-cols-[32rem_minmax(0,1fr)] lg:justify-center">
      <div className="fine-grid relative aspect-square w-full max-w-lg justify-self-center overflow-hidden border bg-card p-[12%] lg:justify-self-start"><div className="absolute inset-x-[15%] top-1/2 border-t border-signal/70"/><div className="absolute inset-y-[12%] left-1/2 border-l border-signal/70"/><img src={standardFront} alt="Product centered within square composition guides" loading="lazy" width={1254} height={1254} className="size-full object-contain"/><span className="eyebrow absolute left-4 top-4">1:1 canvas / product requirement wise product scale</span><span className="eyebrow absolute bottom-4 right-4 text-signal">10–15% breathing space</span></div>
      <div className="grid grid-cols-3 gap-3 self-end">{[[standardOriginal,"Too tight","p-0 scale-125"],[standardInconsistent,"Inconsistent","p-[22%]"],[standardFront,"Balanced","p-[10%]"]].map(([src,label,fit],i)=><figure key={label} className={i===2?"border border-signal p-2":"border p-2 opacity-55"}><div className="aspect-square overflow-hidden bg-card"><img src={src} alt={`${label} framing example`} loading="lazy" width={1254} height={1254} className={`size-full object-contain ${fit}`}/></div><figcaption className="eyebrow mt-3">{label}</figcaption></figure>)}<p className="col-span-3 mt-3 text-2xl">Same scale. Same breathing room. One visual rhythm.</p></div>
    </div>
    <div className="mt-24 grid items-start gap-8 border-t pt-8 lg:grid-cols-[minmax(0,1fr)_44rem]"><div className="min-w-0"><p className="eyebrow text-muted-foreground">Camera standard</p><h3 className="display-title mt-4 break-words text-[2.65rem] sm:text-5xl lg:text-4xl">Angles should explain the product.</h3><div className="mt-8 flex flex-wrap gap-2">{["Front","30–35°","Detail","In context"].map((name,i)=><Button key={name} size="sm" variant={camera===i?"primary":"outline"} onClick={()=>setCamera(i)}>{name}</Button>)}</div></div><div className="relative aspect-square w-full max-w-2xl justify-self-center overflow-hidden bg-card lg:max-w-[44rem] lg:justify-self-end"><img src={cameraImages[camera]} alt={`IMG-HME-018 ${cameraNames[camera]} product view`} loading="lazy" width={1254} height={1254} className="size-full object-cover transition-all duration-500"/><span className="absolute bottom-3 left-3 bg-primary px-3 py-2 text-[9px] uppercase text-primary-foreground sm:bottom-4 sm:left-4 sm:text-[10px]">{camera===1?"Preferred when depth matters":"Controlled camera view"}</span></div></div>
  </section>;
}

function Explosion() {
  return <section className="section-pad overflow-hidden bg-secondary"><div className="page-shell text-center"><p className="eyebrow">05 — One to six</p><h2 className="display-title mx-auto mt-5 max-w-4xl break-words text-[2.65rem] sm:text-6xl lg:max-w-none lg:text-[clamp(4rem,7vw,6rem)]"><span className="lg:whitespace-nowrap">One Reference.</span><br/><span className="lg:whitespace-nowrap">Six Ways to Understand the Product.</span></h2><p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground">Build a complete product story instead of relying on a single photograph.</p>
    <div className="reveal mt-16 grid grid-cols-2 gap-2 md:grid-cols-6">{oneToSixImages.map((src,i)=><figure key={src} className={`${i%2?"md:translate-y-10":""}`}><div className="aspect-square overflow-hidden bg-card"><img src={src} alt={imageNames[i]} loading="lazy" width={1254} height={1254} className="size-full object-contain transition-transform duration-700 hover:scale-105"/></div><figcaption className="eyebrow mt-3 text-left">0{i+1} {imageNames[i]}</figcaption></figure>)}</div></div></section>;
}

function CatalogCompare() {
  const [selected, setSelected] = useState(0);
  return <section className="section-pad page-shell"><SectionHead number="06" label="Catalog rhythm" title="One Client Image. A Complete Product Story." copy="Start with the reference supplied by the client, then explore each carefully built view. Every frame is planned, checked and refined to keep the product recognizable and the full set consistent."/><div className="border-y py-6 md:py-10"><div className="grid items-start gap-8 lg:grid-cols-[minmax(0,32rem)_minmax(0,22rem)] lg:justify-center"><figure><div className="relative aspect-square overflow-hidden rounded-md border bg-card"><img src={catalogImages[selected]} alt={`IMG-FRN-021 — ${catalogNames[selected]}`} width={1000} height={1000} className="size-full object-contain"/><span className={`absolute left-4 top-4 px-3 py-2 text-[9px] font-bold uppercase tracking-[.16em] ${selected===0?"bg-secondary text-secondary-foreground":"bg-signal text-primary-foreground"}`}>{selected===0?"Provided by client":"Finished by Imagenmerce"}</span></div><figcaption className="mt-4 flex items-center justify-between gap-4 border-b pb-4"><span className="font-semibold">{selected===0?"IMG-FRN-021":`IMG-FRN-021_${selected}`}</span><span className="text-xs text-muted-foreground">{catalogNames[selected]}</span></figcaption><div className="mt-6 border-l-2 border-signal pl-5"><p className="display-title text-3xl">Reference → directed image series</p><p className="mt-3 text-xs leading-6 text-muted-foreground">Each view passes through directed processing, product refinement and final quality review.</p></div></figure><div><p className="eyebrow text-muted-foreground">Click to explore the series</p><div className="mt-5 grid grid-cols-3 gap-3 lg:grid-cols-2">{catalogImages.map((src,i)=><button key={src} type="button" onClick={()=>setSelected(i)} aria-label={`View ${catalogNames[i]}`} aria-pressed={selected===i} className={`group border p-2 text-left transition-colors ${selected===i?"border-signal bg-signal/5":"border-border hover:border-foreground"}`}><div className="aspect-square overflow-hidden bg-card"><img src={src} alt="" loading={i===0?"eager":"lazy"} width={240} height={240} className="size-full object-contain"/></div><span className="mt-2 block text-[9px] font-semibold uppercase tracking-[.1em] text-muted-foreground">{i===0?"Original":`View 0${i}`}</span></button>)}</div></div></div></div></section>;
}

function ProductPage() {
  const [selected,setSelected]=useState(0);
  const listingImages = [
    "/images/IMG-PET-024_1.png",
    "/images/IMG-PET-024_2.png",
    "/images/IMG-PET-024_3.png",
    "/images/IMG-PET-024_4.png",
    "/images/IMG-PET-024_5.png",
  ];
  const listingImageNames = ["Front pack", "Angle pack", "Feeding lifestyle", "Nutrition highlights", "Ingredients"];
  return <section className="section-pad bg-primary text-primary-foreground"><div className="page-shell"><SectionHead number="10" label="Listing experience" title="See the Difference Where It Matters."/>
    <div className="grid gap-8 bg-background p-4 text-foreground md:p-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,.65fr)] lg:gap-6"><div><div className="aspect-square overflow-hidden bg-card lg:mx-auto lg:h-[clamp(25rem,54vh,35rem)] lg:w-full lg:aspect-auto"><img src={listingImages[selected]} alt={`Natsbi Steamed Lamb cat food — ${listingImageNames[selected]} view`} loading="lazy" width={512} height={768} className="size-full object-contain"/></div><div className="mt-3 grid grid-cols-5 gap-2 lg:mx-auto lg:max-w-[44rem]">{listingImages.map((src,i)=><button key={src} onClick={()=>setSelected(i)} aria-label={`View ${listingImageNames[i]}`} className={`aspect-square overflow-hidden border-2 lg:max-h-24 ${selected===i?"border-signal":"border-transparent"}`}><img src={src} alt="" width={100} height={100} className="size-full object-contain"/></button>)}</div></div>
      <div className="flex flex-col justify-between py-2"><div><p className="eyebrow text-muted-foreground">Portfolio example / SKU IMG-PET-024</p><h3 className="display-title mt-4 text-4xl xl:text-5xl">IMG-PET-024</h3><p className="mt-2 text-sm text-muted-foreground">Natsbi Steamed / 43% Lamb / Complete food for cats</p><div className="mt-6 border-t py-4 text-sm leading-6">A gently steam-cooked, grain-free complete food for cats with 43% lamb, 80% moisture and taurine. Made with broth, carrot, parsnip and dried tomato, with chicory inulin, yeast products and seaweed. 80 g pouch.</div></div><Button onClick={openProjectForm}>Plan a similar project <ArrowRight size={15}/></Button></div></div>
  </div></section>;
}

function ReferenceDrop() {
  return <button type="button" onClick={openProjectForm} className="flex min-h-80 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed bg-card p-6 text-center transition-colors hover:border-signal hover:bg-signal/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
    <span className="display-title text-4xl">Drop your reference image</span>
    <span className="mt-4 text-base text-muted-foreground">Open the secure project form to add your email and upload your product image.</span>
    <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.12em] text-signal">Open upload form <ArrowRight size={15}/></span>
  </button>;
}

function Index() {
  useReveal();
  const [processStep,setProcessStep]=useState(0);
  const checks=["Square composition","Balanced product scale","Controlled neutral background","Consistent baseline","Consistent camera language","Natural ground shadow","Product-only hero presentation","Detail image included","Dimension visual where required","Consistent treatment across the set"];
  return <main id="top" className="overflow-clip"><Navigation/><ProjectFormDialog/>
    <section className="page-shell flex flex-col justify-center pb-8 pt-20 sm:min-h-[86vh] sm:pb-10 sm:pt-32"><div className="grid min-w-0 items-center gap-5 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,46rem)]"><div className="order-2 min-w-0 max-w-[38rem] py-2 sm:order-1 sm:py-8 lg:justify-self-start"><p className="eyebrow text-signal">Product imaging studio / Art-directed systems</p><h1 className="display-title mt-4 max-w-[38rem] break-words text-[2.5rem] leading-[1.08] sm:mt-6 sm:text-[2.5rem] lg:text-[2.5rem]">E-commerce Visual Conversion Studio</h1><h2 className="display-title mt-6 break-words text-[2.2rem] sm:text-5xl lg:text-[3.25rem]">More Than AI-Generated Images. A Studio Workflow Built Around Product Accuracy.</h2><p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:mt-7 sm:text-base sm:leading-8">AI-powered. Studio-refined. Quality-controlled. We turn product references into marketplace-ready visuals through brief-led processing, careful refinement and a strict quality audit. For eligible, pre-scoped projects, production can be completed in as little as 48 hours.</p><div className="mt-8 flex flex-wrap gap-3"><Button onClick={openProjectForm}>Start a Studio Project <ArrowRight size={15}/></Button><Button variant="outline" asChild><a href={catalogEmailHref}>Discuss A Catalog <ArrowRight size={15}/></a></Button></div></div><Compare className="order-1 aspect-square w-full max-w-[46rem] min-h-0 justify-self-center sm:order-2 lg:justify-self-end"/></div></section>

    <ClientWork/>

    <section id="process" className="section-pad bg-primary text-primary-foreground"><div className="page-shell"><SectionHead number="02" label="Reference to ready-to-use" title="From Product Reference to Approved Visuals." copy="Every project follows a defined brief, product-specific processing, precision-focused refinement and a final quality audit. AI assists production; our studio directs and checks the finished work."/>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,38rem)_minmax(0,1fr)] lg:justify-center"><div className="relative aspect-square w-full max-w-[38rem] justify-self-center overflow-hidden bg-card lg:justify-self-start"><img src={processSteps[processStep]![2]} alt={`IMG-FRN-032 sideboard — ${processSteps[processStep]![0]}`} width={1536} height={1536} className={`size-full transition-all duration-700 ${processStep===0?"object-cover":"object-contain p-[6%]"}`}/>
        {processStep===2&&<div className="pointer-events-none absolute inset-[16%] rounded-sm border-2 border-dashed border-accent"/>}
        {processStep===3&&<><div className="pointer-events-none absolute inset-x-[10%] top-1/2 border-t border-accent/70"/><div className="pointer-events-none absolute inset-y-[10%] left-1/2 border-l border-accent/70"/></>}
        {processStep===4&&<div className="pointer-events-none absolute inset-x-[18%] bottom-[14%] h-6 rounded-[50%] bg-foreground/25 blur-md"/>}
        <span className="absolute left-4 top-4 bg-primary px-3 py-2 text-[9px] font-bold uppercase tracking-[.16em] text-primary-foreground">{processStep===0?"IMG-FRN-032 — client photo":`IMG-FRN-032_1 — step 0${processStep+1}`}</span>
        <p className="absolute inset-x-0 bottom-0 bg-primary/90 px-4 py-3 text-xs leading-6 text-primary-foreground">{processSteps[processStep]![1]}</p></div><div className="flex flex-col justify-center">{processSteps.map((step,i)=><button key={step[0]} onMouseEnter={()=>setProcessStep(i)} onClick={()=>setProcessStep(i)} className={`flex items-center gap-4 border-t py-5 text-left transition-all ${processStep===i?"text-accent":"text-primary-foreground/35"}`}><span className="text-xs">0{i+1}</span><span className="text-xl">{step[0]}</span></button>)}</div></div>

    </div></section>

    <section className="section-pad page-shell" aria-labelledby="studio-pillars"><div className="border-t pt-5"><p className="eyebrow text-signal">The studio workflow</p><h2 id="studio-pillars" className="display-title mt-5 max-w-5xl text-[2.5rem] leading-tight sm:text-6xl">AI-powered. Studio-refined. Quality-controlled.</h2><p className="mt-6 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">Your investment covers a rigorous digital studio workflow, from a product-specific brief to an approved set of e-commerce visuals. The process is tailored to the reference and the requirements of each category.</p></div><div className="mt-12 grid gap-px bg-border md:grid-cols-3">{[
      ["01", "Dynamic Engine Processing", "Intelligent, product-specific image processing", "We plan the image types and guide AI-assisted production around your references, category and intended use. Each visual begins with the project brief."],
      ["02", "Craftsmanship & Pixel Lock", "Precision-focused product fidelity", "We refine framing, materials and product details against the source reference. Pixel Lock describes our careful checks, with particular attention to furniture and electronics."],
      ["03", "Strict QA Audit", "Every deliverable reviewed against the brief", "We inspect product consistency, visible defects, composition, requested views and delivery specifications before the set is approved for handoff."],
    ].map(([number,title,subtitle,copy])=><article key={number} className="bg-background p-6 sm:p-8"><span className="eyebrow text-signal">{number} / Studio stage</span><h3 className="display-title mt-10 text-3xl sm:text-4xl">{title}</h3><p className="mt-5 font-semibold">{subtitle}</p><p className="mt-3 text-sm leading-7 text-muted-foreground">{copy}</p></article>)}</div></section>

    <Standards/><Explosion/><CatalogCompare/>

    <section className="section-pad bg-secondary"><div className="page-shell"><SectionHead number="07" label="Product accuracy" title="Craftsmanship & Product Fidelity" copy="Our Pixel Lock approach prioritizes the reference product’s shape, proportions, materials, colors and defining details. Controlled refinement and visual checks help preserve its identity across every view, especially for furniture and electronics."/><div className="grid items-start gap-10 lg:grid-cols-[minmax(0,38rem)_minmax(0,1fr)] lg:justify-center"><Compare left="/images/product-accuracy-before.webp" right="/images/product-accuracy-after.png" leftLabel="Before" rightLabel="After" className="aspect-square w-full max-w-[38rem] justify-self-center"/><div className="flex min-w-0 flex-col justify-between"><div><p className="eyebrow mb-4 text-muted-foreground">What we check</p>{["Silhouette & proportions","Visible materials","Construction details","Recognizable textures","Product color","Logos & important markings","Cross-image consistency","Manual material isolation where required"].map(x=><div key={x} className="flex items-center gap-3 border-t py-4 text-sm"><Check size={15} className="shrink-0 text-signal"/>{x}</div>)}</div><div className="mt-8 border-l-2 border-signal pl-5"><p className="display-title break-words text-3xl">The reference image is the source of truth.</p><p className="mt-4 text-xs leading-6 text-muted-foreground">Backgrounds and camera presentation can change. Product markings, construction cues and identifiable details are checked against the original reference throughout the workflow.</p></div></div></div></div></section>

    <section className="section-pad page-shell"><SectionHead number="08" label="What we fix" title="From Ordinary Photo to Product-Ready Presentation."/><div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">{[["Busy background","Clean background"],["Poor framing","Balanced framing"],["Off-center product","Correct positioning"],["Inconsistent scale","Standardized scale"],["Harsh lighting","Controlled presentation"],["Missing views","Complete image set"],["Disconnected catalog","Unified visual system"]].map((x,i)=><div key={x[0]} className="min-w-0 bg-background p-4 sm:p-6"><span className="eyebrow text-muted-foreground">0{i+1}</span><p className="mt-5 text-xs text-muted-foreground line-through sm:mt-12 sm:text-sm">{x[0]}</p><p className="mt-2 flex items-start gap-2 break-words text-base sm:text-xl"><ArrowRight size={16} className="mt-1 shrink-0 text-signal"/>{x[1]}</p></div>)}</div></section>

    <section className="section-pad bg-secondary"><div className="page-shell"><SectionHead number="09" label="Image quality checklist" title="Strict QA Audit Before Handoff." copy="We review each deliverable against the brief for product consistency, visual defects, composition, requested image types and delivery requirements before approval."/><div className="grid gap-10 lg:grid-cols-2"><div>{checks.map((x,i)=><div key={x} className="reveal flex items-center gap-4 border-t py-4"><span className="flex size-6 items-center justify-center border border-signal text-signal"><Check size={14}/></span><span>{x}</span></div>)}</div><div className="fine-grid grid grid-cols-2 content-center gap-px border bg-border p-px">{["1600 × 1600\nreference output","1:1\ncomposition","sRGB\ncolor profile","Web-optimized\nformats","Daylight-style\nwhite balance","Optimized\nfile weight"].map(x=><div key={x} className="whitespace-pre-line bg-card p-6 text-lg">{x}</div>)}</div></div></div></section>

    <ProductPage/>

    <section className="section-pad page-shell"><SectionHead number="11" label="Business value" title="A Studio Process Behind Every Visual." copy="You are investing in a rigorous digital studio workflow: reference-led processing, hands-on refinement and quality control. Scope and pricing reflect the care each product and image set requires."/><div className="grid gap-12 lg:grid-cols-2"><div><p className="eyebrow text-muted-foreground">Traditional workflow</p>{["Product preparation","Shipping","Studio","Photographer","Multiple setups","Additional environments","Reshoots","Post-production"].map((x,i)=><div key={x} className="border-t py-4 text-lg"><span className="mr-4 text-xs text-muted-foreground">0{i+1}</span>{x}</div>)}</div><div><p className="eyebrow text-signal">Imagenmerce workflow</p>{["Study the brief and references","Plan views by product category","Direct AI-assisted processing","Refine shape, materials and details","Audit consistency and defects","Approve the complete set","Deliver organized assets"].map((x,i)=><div key={x} className="border-t py-4 text-lg"><span className="mr-4 text-xs text-signal">0{i+1}</span>{x}</div>)}</div></div><p className="display-title mt-20 break-words text-center text-[2.65rem] sm:text-6xl lg:text-[2.8rem]">One product <ArrowRight className="inline"/> multiple visual assets.</p></section>

    <section className="section-pad bg-primary text-primary-foreground"><div className="page-shell"><SectionHead number="13" label="How it works" title="Five Clear Studio Steps."/><div className="grid gap-px bg-primary-foreground/20 md:grid-cols-5">{[["01","Brief","Review references and requirements"],["02","Process","Direct product-specific image creation"],["03","Refine","Check details and finish each frame"],["04","Audit","Verify consistency, defects and deliverables"],["05","Deliver","Hand off the approved visual set"]].map(x=><div key={x[0]} className="bg-primary p-6"><span className="eyebrow text-accent">{x[0]}</span><h3 className="display-title mt-16 text-4xl">{x[1]}</h3><p className="mt-4 text-xs leading-5 text-primary-foreground/55">{x[2]}</p></div>)}</div></div></section>

    <section className="section-pad page-shell"><SectionHead number="14" label="What we need" title="Start With What You Already Have."/><div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]"><ReferenceDrop/><div>{["Product dimensions, if required","Correct product color","Important material information","Details that must not change","Desired image count","Required environments","Existing visual guidelines"].map(x=><div key={x} className="flex gap-3 border-t py-4 text-sm"><Check size={15} className="text-signal"/>{x}</div>)}<p className="mt-6 text-sm text-muted-foreground">Better references help us preserve more product detail.</p></div></div></section>

    <section className="section-pad bg-secondary"><div className="page-shell"><p className="eyebrow">16 — Who it is for</p><div className="audience-scroll mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5" tabIndex={0} aria-label="Who Imagenmerce is for">{["E-Commerce Teams","Furniture & Home Businesses","Manufacturers","Wholesalers","Retailers","Direct-to-Consumer Businesses","Product Catalog Teams","Creative Teams"].map((x,i)=><div key={x} className="flex h-64 w-[82vw] max-w-72 shrink-0 snap-start flex-col justify-between border bg-background p-6"><span className="text-xs text-muted-foreground">0{i+1}</span><h3 className="display-title break-words text-4xl">{x}</h3></div>)}</div></div></section>

    <section className="section-pad page-shell"><SectionHead number="18" label="FAQ" title="Clear Scope. Clear Delivery." copy="The practical details clients usually want to confirm before starting a product or catalog project."/><div className="grid gap-px bg-border md:grid-cols-2">{[
      ["Do I need to ship the physical product?","No. Physical shipping is not required for the standard Imagenmerce workflow. We work from the product reference images, dimensions and product information you provide. If a project needs additional source material, we confirm that before production begins."],
      ["How does the 50/50 payment method work?","Projects are split into two stages: 50% to begin the agreed production scope and 50% after the agreed review stage, before final high-resolution delivery. The exact scope, deliverables and payment terms are confirmed in the project quotation."],
      ["Can one photo really become a six-image listing set?","Yes, when the supplied reference clearly shows the product details needed for reconstruction and art direction. A typical set can include a studio hero, angled view, macro detail, two lifestyle scenes and a technical dimensions visual."],
      ["How fast can a project be delivered?","Eligible, pre-scoped projects can be completed in as little as 48 hours. Larger catalogs, complex products and revision-heavy scopes are scheduled according to SKU count and production requirements."],
      ["How do you keep the product accurate?","The client reference remains the source of truth. We check silhouette, proportions, materials, color, construction details, logos and other important markings across the image set, with manual finishing where required."],
      ["Can you handle bulk catalogs?","Yes. The workflow is built around repeatable image standards, SKU-based organization and batch review, making it suitable for small collections as well as high-volume catalog programs."]
    ].map(([q,a])=><details key={q} className="group bg-background p-6"><summary className="cursor-pointer list-none text-lg font-semibold">{q}<span className="float-right text-signal group-open:rotate-45">+</span></summary><p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">{a}</p></details>)}</div></section>

    <footer id="contact" className="relative min-h-screen overflow-hidden bg-primary text-primary-foreground"><div className="absolute inset-0 grid grid-cols-3 opacity-25 md:grid-cols-6">{images.map(x=><img key={x} src={x} alt="" loading="lazy" width={512} height={768} className="size-full object-cover"/>)}</div><div className="absolute inset-0 bg-primary/75"/><div className="page-shell relative flex min-h-screen flex-col justify-between py-8"><div className="flex items-center justify-between gap-4"><img src="/imagenmerce-logo.png" alt="Imagenmerce" className="h-8 w-auto brightness-0 invert"/><span className="eyebrow text-right">Product imaging studio</span></div><div className="max-w-6xl"><p className="eyebrow text-accent">One reference. A complete visual system.</p><h2 className="display-title mt-6 break-words text-[3.25rem] sm:text-8xl lg:text-[6.35rem]">Your Product Is Already There. Let's Present It Better.</h2><p className="mt-7 max-w-lg text-sm leading-7 text-primary-foreground/65">Send your reference. Our studio will plan, refine and quality-check your visual set against the brief.</p><div className="mt-8 flex flex-wrap gap-3"><Button variant="inverse" onClick={openProjectForm}>Start a Project</Button><Button variant="outline" asChild className="border-primary-foreground/35 text-primary-foreground hover:border-primary-foreground hover:bg-primary-foreground/10"><a href={catalogEmailHref}>Discuss a Catalog</a></Button></div></div><div className="flex justify-between border-t border-primary-foreground/20 pt-5 text-[10px] uppercase text-primary-foreground/45"><span>© 2026 Imagenmerce</span><a href="#top">Back to top ↑</a></div></div></footer>
  </main>;
}
