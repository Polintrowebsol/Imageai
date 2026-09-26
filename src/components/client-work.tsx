import { useState, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openProjectForm } from "@/components/project-form";
import { openFreeAudit } from "@/components/audit-form";
import { track } from "@/lib/analytics";


type View = { label: string; image: string };
type Case = { category: string; name: string; reference: string; views: View[] };
const image = (name: string) => `/images/stamp2/${name}.webp`;
const cases: Case[] = [
  { category: "Furniture & Home", name: "Convertible sofa", reference: image("furniture-reference"), views: [
    { label: "Hero", image: image("furniture-hero") }, { label: "Angle", image: image("furniture-angle") }, { label: "Detail", image: image("furniture-detail") }, { label: "Lifestyle", image: image("furniture-lifestyle") }, { label: "Dimensions", image: image("furniture-dimension") },
  ] },
  { category: "Pet Products", name: "Canned pet food", reference: image("pet-reference"), views: [
    { label: "Hero", image: image("pet-hero") }, { label: "Angle", image: image("pet-angle") }, { label: "Detail", image: image("pet-detail") }, { label: "Lifestyle", image: image("pet-lifestyle") }, { label: "Feature / Benefit", image: image("pet-benefit") },
  ] },
  { category: "Kitchen & Home", name: "Four-burner hob", reference: image("kitchen-reference"), views: [
    { label: "Hero", image: image("kitchen-hero") }, { label: "Angle", image: image("kitchen-angle") }, { label: "Detail", image: image("kitchen-detail") }, { label: "Lifestyle", image: image("kitchen-lifestyle") }, { label: "Dimensions", image: image("kitchen-dimension") },
  ] },
  { category: "Other Ecommerce Products", name: "Metal storage accessory", reference: image("other-reference"), views: [
    { label: "Hero", image: image("other-hero") }, { label: "Angle", image: image("other-angle") }, { label: "Detail", image: image("other-detail") }, { label: "Lifestyle", image: image("other-lifestyle") }, { label: "Dimensions", image: image("other-dimension") },
  ] },
];

function BeforeAfter({ item }: { item: Case }) {
  const [position, setPosition] = useState(50);
  const update = (event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setPosition(Math.max(2, Math.min(98, ((event.clientX - bounds.left) / bounds.width) * 100)));
  };
  return <div className="relative aspect-square w-full touch-none select-none overflow-hidden rounded-md border bg-card" role="slider" aria-label={`Before and after comparison for ${item.name}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(position)} tabIndex={0} onKeyDown={(e) => { if (e.key === "ArrowLeft") setPosition(v => Math.max(2, v - 5)); if (e.key === "ArrowRight") setPosition(v => Math.min(98, v + 5)); }} onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); update(e); }} onPointerMove={(e) => { if (e.currentTarget.hasPointerCapture(e.pointerId)) update(e); }}>
    <img src={item.views[0]!.image} alt={`${item.name} final ecommerce hero image`} className="absolute inset-0 size-full object-contain" width={1254} height={1254} loading="lazy" decoding="async" />
    <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100-position}% 0 0)` }}><img src={item.reference} alt={`${item.name} original product reference`} className="absolute inset-0 size-full object-contain" width={1254} height={1254} loading="lazy" decoding="async" /></div>
    <div className="absolute inset-y-0 w-px bg-foreground" style={{ left: `${position}%` }}><span className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"><ChevronLeft size={16}/><ChevronRight size={16}/></span></div>
    <span className="absolute left-2 top-2 bg-primary px-2 py-1 text-[10px] font-semibold uppercase text-primary-foreground sm:left-4 sm:top-4">Before / reference</span><span className="absolute right-2 top-2 bg-signal px-2 py-1 text-[10px] font-semibold uppercase text-primary-foreground sm:right-4 sm:top-4">After / hero</span>
  </div>;
}

export function ClientWork() {
  const [caseIndex, setCaseIndex] = useState(0);
  const item = cases[caseIndex]!;
  return <section id="work" className="section-pad page-shell">
    <div className="border-t pt-5 text-center"><p className="eyebrow text-signal">01 — Portfolio / concept work</p><h2 className="display-title mx-auto mt-5 max-w-5xl text-[2.5rem] leading-tight sm:text-6xl">From Product Reference to Complete Ecommerce Image Set.</h2><p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-muted-foreground">Explore four product categories. Each example pairs its original reference with a directed hero image and the available supporting views.</p></div>
    <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4" role="group" aria-label="Portfolio categories">{cases.map((entry,i)=><button key={entry.category} type="button" aria-pressed={caseIndex===i} onClick={()=>{ setCaseIndex(i); track("portfolio_interaction", entry.category); }} className={`min-h-14 border px-3 py-3 text-left text-xs font-semibold transition-colors sm:text-sm ${i===caseIndex?"border-signal bg-signal/10":"hover:border-foreground"}`}>{entry.category}</button>)}</div>
    <div className="mt-10 flex flex-wrap items-end justify-between gap-4 border-t pt-5"><div><p className="eyebrow text-signal">Concept / Portfolio Recreation</p><h3 className="display-title mt-3 text-3xl sm:text-5xl">{item.name}</h3></div><p className="max-w-sm text-sm leading-6 text-muted-foreground">Original product reference → Imagenmerce visual production → final ecommerce image set</p></div>
    <div className="mt-7 grid items-start gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)]"><figure><BeforeAfter item={item}/><figcaption className="mt-3 text-xs leading-6 text-muted-foreground">Drag or use arrow keys to compare the supplied reference with the final hero view.</figcaption></figure><div className="grid grid-cols-2 gap-3"><figure className="col-span-2 rounded-md border bg-card p-3"><div className="aspect-[4/3] overflow-hidden bg-background"><img src={item.reference} alt={`${item.name} original reference`} className="size-full object-contain" width={1254} height={1254} loading="lazy" decoding="async" /></div><figcaption className="eyebrow mt-3">01 / Original product reference</figcaption></figure><div className="col-span-2 border-l-2 border-signal pl-4 text-sm leading-6"><strong>Visual production</strong><p className="text-muted-foreground">Reference-led direction, product consistency checks and final quality review.</p></div></div></div>
    <div className="mt-10 border-t pt-5"><p className="eyebrow text-signal">Final ecommerce image set / available views</p><div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">{item.views.map((view,i)=><figure key={view.label} className="min-w-0 rounded-md border bg-card p-2 sm:p-3"><div className="aspect-square overflow-hidden bg-background"><img src={view.image} alt={`${item.name} ${view.label.toLowerCase()} visual`} loading="lazy" decoding="async" width={1254} height={1254} className="size-full object-contain" /></div><figcaption className="mt-3 text-xs font-semibold">0{i+1} / {view.label}</figcaption></figure>)}</div><p className="mt-5 text-xs leading-6 text-muted-foreground">Image types vary by product. Dimension graphics are portfolio examples; product specifications should be verified against the actual item before commercial use.</p></div>
    <div className="mt-16 border-t pt-8 text-center"><h3 className="display-title text-3xl sm:text-5xl">Want to see what your product could look like?</h3><div className="mt-7 flex flex-wrap justify-center gap-3"><Button onClick={()=>openFreeAudit("portfolio")}>Get a Free Product Image Audit <ArrowRight size={15}/></Button><Button variant="outline" onClick={openProjectForm}>Start a Studio Project</Button></div></div>
  </section>;
}
