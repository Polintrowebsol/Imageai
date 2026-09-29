import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

type Slide = { label: string; file: string };
type Product = { name: string; slides: Slide[] };
const products: Product[] = [
  { name: "Cream", slides: [
    { label: "Reference", file: "Cream_Reference.png" }, { label: "Hero", file: "Cream_hero_01.png" },
    { label: "Angle", file: "Cream_angle_02.png" }, { label: "Detail", file: "Cream_detail_03.png" },
    { label: "Studio", file: "Cream_shoot_04.png" }, { label: "Information", file: "Cream_informational_05.png" },
    { label: "Lifestyle", file: "Cream_lifestyle_06.png" },
  ] },
  { name: "Handbag", slides: [
    { label: "Reference", file: "Handbag_Reference.png" }, { label: "Hero", file: "Handbag_hero_01.png" },
    { label: "Angle", file: "Handbag_angle_02.png" }, { label: "Detail", file: "Handbag_detail_03.png" },
    { label: "Studio", file: "Handbag_shoot_04.png" }, { label: "Information", file: "Handbag_informational_05.png" },
    { label: "Lifestyle", file: "Handbag_lifestyle_06.png" },
  ] },
  { name: "Men's Coat", slides: [
    { label: "Reference", file: "men coat_reference.png" }, { label: "Hero", file: "men coat_hero.png" },
    { label: "Angle", file: "men coat_angle.png" }, { label: "Detail", file: "men coat_detail.png" },
    { label: "Backside", file: "men coat_backside.png" }, { label: "Lifestyle 01", file: "men coat_lifestyle_01.png" },
    { label: "Lifestyle 02", file: "men coat_lifestyle_02.png" },
  ] },
];
const source = (file: string) => `/images/fashion/${encodeURIComponent(file)}`;

function ProductSlider({ product }: { product: Product }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setIndex(current => (current + 1) % product.slides.length), 4000);
    return () => window.clearInterval(timer);
  }, [playing, product.slides.length]);
  const move = (step: number) => setIndex(current => (current + step + product.slides.length) % product.slides.length);
  const slide = product.slides[index]!;
  return <article className="min-w-0 overflow-hidden rounded-xl border bg-card shadow-sm">
    <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-5"><div><p className="eyebrow text-signal">Fashion / Image series</p><h3 className="display-title mt-1 text-2xl sm:text-3xl">{product.name}</h3></div><span className="shrink-0 text-xs tabular-nums text-muted-foreground">{String(index + 1).padStart(2, "0")} / {String(product.slides.length).padStart(2, "0")}</span></div>
    <div className="relative mx-auto aspect-[4/5] w-full max-h-[540px] overflow-hidden bg-[#f5f2ed] sm:aspect-square" aria-live="off">
      <img key={slide.file} src={source(slide.file)} alt={`${product.name} — ${slide.label} view`} className="size-full object-contain p-3 sm:p-5" loading="lazy" decoding="async" />
      <span className="absolute bottom-3 left-3 rounded bg-background/95 px-3 py-1.5 text-xs font-semibold shadow-sm">{slide.label}</span>
      <button type="button" onClick={() => move(-1)} aria-label={`Previous ${product.name} image`} className="absolute left-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/95 shadow-sm hover:bg-background"><ChevronLeft size={19}/></button>
      <button type="button" onClick={() => move(1)} aria-label={`Next ${product.name} image`} className="absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/95 shadow-sm hover:bg-background"><ChevronRight size={19}/></button>
    </div>
    <div className="flex items-center gap-2 px-3 py-3 sm:px-5"><div className="flex min-w-0 flex-1 gap-1.5" role="group" aria-label={`${product.name} image views`}>{product.slides.map((view, i) => <button key={view.file} type="button" aria-label={`${product.name}: ${view.label}`} aria-current={index === i ? "true" : undefined} title={view.label} onClick={() => setIndex(i)} className={`h-2 flex-1 rounded-full transition-colors ${index === i ? "bg-signal" : "bg-foreground/20 hover:bg-foreground/50"}`} />)}</div><button type="button" onClick={() => setPlaying(value => !value)} aria-label={`${playing ? "Pause" : "Play"} ${product.name} slideshow`} className="flex size-9 shrink-0 items-center justify-center rounded-full border hover:bg-secondary">{playing ? <Pause size={15}/> : <Play size={15}/>}</button></div>
  </article>;
}

export function FashionPortfolio() {
  return <section className="page-shell section-pad" aria-labelledby="fashion-heading"><div className="border-t pt-5"><p className="eyebrow text-signal">Fashion portfolio</p><h2 id="fashion-heading" className="display-title mt-4 text-3xl sm:text-5xl">Every Product, Every Angle.</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">Explore each product from its original reference through hero, detail and lifestyle views. Each series advances automatically; use the controls to browse at your own pace.</p></div><div className="mt-9 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{products.map(product => <ProductSlider key={product.name} product={product}/>)}</div></section>;
}
