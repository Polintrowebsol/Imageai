import { useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openProjectForm } from "@/components/project-form";

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
const catalogNames = ["Product reference", "Hero", "Angle", "Detail", "Lifestyle 01", "Lifestyle 02", "Dimensions"];

const imageNames = ["Hero", "Angle", "Detail", "Lifestyle 01", "Lifestyle 02", "Dimensions"];
const oneToSixImages = [
  "/images/IMG-LGT-012_1.webp",
  "/images/IMG-LGT-012_2.webp",
  "/images/IMG-LGT-012_3.webp",
  "/images/IMG-LGT-012_4.webp",
  "/images/IMG-LGT-012_5.webp",
  "/images/IMG-LGT-012_6.webp",
];
function SectionHead({ number, label, title, copy }: { number: string; label: string; title: ReactNode; copy?: string }) {
  return <div className="mb-8 min-w-0 border-t pt-4 text-center sm:mb-12 sm:pt-5"><div className="eyebrow text-muted-foreground">{number} — {label}</div><div className="mx-auto mt-4 min-w-0 sm:mt-5"><h2 className="display-title mx-auto max-w-6xl break-words text-[2rem] sm:text-6xl lg:text-6xl">{title}</h2>{copy&&<p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:mt-7 sm:text-base sm:leading-8">{copy}</p>}</div></div>;
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
    <SectionHead number="03" label="Our standard" title={<><span className="lg:whitespace-nowrap">Consistency Is What</span><br/><span className="lg:whitespace-nowrap">Makes a Catalog Feel Designed.</span></>} copy="Product accuracy comes first. We use the product reference as the source of truth, then apply controlled framing, camera language and presentation rules so every image feels like part of one deliberate catalog system."/>
    <div className="grid items-start gap-6 lg:grid-cols-[32rem_minmax(0,1fr)] lg:justify-center">
      <div className="fine-grid relative aspect-square w-full max-w-lg justify-self-center overflow-hidden border bg-card p-[12%] lg:justify-self-start"><div className="absolute inset-x-[15%] top-1/2 border-t border-signal/70"/><div className="absolute inset-y-[12%] left-1/2 border-l border-signal/70"/><img src={standardFront} alt="Product centered within square composition guides" loading="lazy" width={1254} height={1254} className="size-full object-contain"/><span className="eyebrow absolute left-4 top-4">1:1 canvas / product requirement wise product scale</span><span className="eyebrow absolute bottom-4 right-4 text-signal">10–15% breathing space</span></div>
      <div className="grid grid-cols-3 gap-3 self-end">{[[standardOriginal,"Too tight","p-0 scale-125"],[standardInconsistent,"Inconsistent","p-[22%]"],[standardFront,"Balanced","p-[10%]"]].map(([src,label,fit],i)=><figure key={label} className={i===2?"border border-signal p-2":"border p-2 opacity-55"}><div className="aspect-square overflow-hidden bg-card"><img src={src} alt={`${label} framing example`} loading="lazy" width={1254} height={1254} className={`size-full object-contain ${fit}`}/></div><figcaption className="eyebrow mt-3">{label}</figcaption></figure>)}<p className="col-span-3 mt-3 text-2xl">Same scale. Same breathing room. One visual rhythm.</p></div>
    </div>
    <div className="mt-24 grid items-start gap-8 border-t pt-8 lg:grid-cols-[minmax(0,1fr)_44rem]"><div className="min-w-0"><p className="eyebrow text-muted-foreground">Camera standard</p><h3 className="display-title mt-4 break-words text-[2.65rem] sm:text-5xl lg:text-4xl">Angles should explain the product.</h3><div className="mt-8 flex flex-wrap gap-2">{["Front","30–35°","Detail","In context"].map((name,i)=><Button key={name} size="sm" variant={camera===i?"primary":"outline"} onClick={()=>setCamera(i)}>{name}</Button>)}</div></div><div className="relative aspect-square w-full max-w-2xl justify-self-center overflow-hidden bg-card lg:max-w-[44rem] lg:justify-self-end"><img src={cameraImages[camera]} alt={`IMG-HME-018 ${cameraNames[camera]} product view`} loading="lazy" width={1254} height={1254} className="size-full object-cover transition-all duration-500"/><span className="absolute bottom-3 left-3 bg-primary px-3 py-2 text-[9px] uppercase text-primary-foreground sm:bottom-4 sm:left-4 sm:text-[10px]">{camera===1?"Preferred when depth matters":"Controlled camera view"}</span></div></div>
  </section>;
}

function Explosion() {
  return <section className="section-pad overflow-hidden bg-secondary"><div className="page-shell text-center"><p className="eyebrow">05 — One to six / Concept / Portfolio Recreation</p><h2 className="display-title mx-auto mt-5 max-w-4xl break-words text-[2.65rem] sm:text-6xl lg:max-w-none lg:text-[clamp(4rem,7vw,6rem)]"><span className="lg:whitespace-nowrap">One Reference.</span><br/><span className="lg:whitespace-nowrap">A Complete Image Story.</span></h2><p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground">A typical image set is customized to each product and marketplace.</p>
    <div className="mt-16 grid grid-cols-2 gap-2 md:grid-cols-6">{oneToSixImages.map((src,i)=><figure key={src} className={`${i%2?"md:translate-y-10":""}`}><div className="aspect-square overflow-hidden bg-card"><img src={src} alt={imageNames[i]} loading="lazy" width={1254} height={1254} className="size-full object-contain transition-transform duration-700 hover:scale-105"/></div><figcaption className="eyebrow mt-3 text-left">0{i+1} {imageNames[i]}</figcaption></figure>)}</div></div></section>;
}

function CatalogCompare() {
  const [selected, setSelected] = useState(0);
  return <section className="section-pad page-shell"><SectionHead number="06" label="Catalog rhythm / Concept / Portfolio Recreation" title="One Product Reference. A Complete Product Story." copy="Start with the source product reference, then explore each carefully built view. Every frame is planned, checked and refined to keep the product recognizable and the full set consistent."/><div className="border-y py-6 md:py-10"><div className="grid items-start gap-8 lg:grid-cols-[minmax(0,32rem)_minmax(0,22rem)] lg:justify-center"><figure><div className="relative aspect-square overflow-hidden rounded-md border bg-card"><img src={catalogImages[selected]} alt={`IMG-FRN-021 — ${catalogNames[selected]}`} width={1000} height={1000} className="size-full object-contain"/><span className={`absolute left-4 top-4 px-3 py-2 text-[9px] font-bold uppercase tracking-[.16em] ${selected===0?"bg-secondary text-secondary-foreground":"bg-signal text-primary-foreground"}`}>{selected===0?"Original reference":"Finished by Imagenmerce"}</span></div><figcaption className="mt-4 flex items-center justify-between gap-4 border-b pb-4"><span className="font-semibold">{selected===0?"IMG-FRN-021":`IMG-FRN-021_${selected}`}</span><span className="text-xs text-muted-foreground">{catalogNames[selected]}</span></figcaption><div className="mt-6 border-l-2 border-signal pl-5"><p className="display-title text-3xl">Reference → directed image series</p><p className="mt-3 text-xs leading-6 text-muted-foreground">Each view passes through directed processing, product refinement and final quality review.</p></div></figure><div><p className="eyebrow text-muted-foreground">Click to explore the series</p><div className="mt-5 grid grid-cols-3 gap-3 lg:grid-cols-2">{catalogImages.map((src,i)=><button key={src} type="button" onClick={()=>setSelected(i)} aria-label={`View ${catalogNames[i]}`} aria-pressed={selected===i} className={`group border p-2 text-left transition-colors ${selected===i?"border-signal bg-signal/5":"border-border hover:border-foreground"}`}><div className="aspect-square overflow-hidden bg-card"><img src={src} alt="" loading={i===0?"eager":"lazy"} width={240} height={240} className="size-full object-contain"/></div><span className="mt-2 block text-[9px] font-semibold uppercase tracking-[.1em] text-muted-foreground">{i===0?"Original":`View 0${i}`}</span></button>)}</div></div></div></div></section>;
}

function ProductPage() {
  const [selected,setSelected]=useState(0);
  const listingImages = [
    "/images/IMG-PET-024_1.webp",
    "/images/IMG-PET-024_2.webp",
    "/images/IMG-PET-024_3.webp",
    "/images/IMG-PET-024_4.webp",
    "/images/IMG-PET-024_5.webp",
  ];
  const listingImageNames = ["Front pack", "Angle pack", "Feeding lifestyle", "Nutrition highlights", "Ingredients"];
  return <section className="section-pad bg-primary text-primary-foreground"><div className="page-shell"><SectionHead number="10" label="Listing experience" title="See the Image Set in a Listing Context."/>
    <div className="grid gap-8 bg-background p-4 text-foreground md:p-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,.65fr)] lg:gap-6"><div><div className="aspect-square overflow-hidden bg-card lg:mx-auto lg:h-[clamp(25rem,54vh,35rem)] lg:w-full lg:aspect-auto"><img src={listingImages[selected]} alt={`Natsbi Steamed Lamb cat food — ${listingImageNames[selected]} view`} loading="lazy" width={512} height={768} className="size-full object-contain"/></div><div className="mt-3 grid grid-cols-5 gap-2 lg:mx-auto lg:max-w-[44rem]">{listingImages.map((src,i)=><button key={src} onClick={()=>setSelected(i)} aria-label={`View ${listingImageNames[i]}`} className={`aspect-square overflow-hidden border-2 lg:max-h-24 ${selected===i?"border-signal":"border-transparent"}`}><img src={src} alt="" width={100} height={100} className="size-full object-contain"/></button>)}</div></div>
      <div className="flex flex-col justify-between py-2"><div><p className="eyebrow text-muted-foreground">Concept / Portfolio Recreation · IMG-PET-024</p><h3 className="display-title mt-4 text-4xl xl:text-5xl">IMG-PET-024</h3><p className="mt-2 text-sm text-muted-foreground">Pet product listing concept</p><div className="mt-6 border-t py-4 text-sm leading-6">A portfolio presentation of a multi-image product listing. Product copy and specifications require confirmation by the brand before commercial use.</div></div><Button onClick={openProjectForm}>Plan a similar project <ArrowRight size={15}/></Button></div></div>
  </div></section>;
}

export function PortfolioExtras() {
  return <><Standards/><Explosion/><CatalogCompare/><ProductPage/></>;
}
