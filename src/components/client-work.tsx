import { useState } from "react";
import { ArrowRight } from "lucide-react";

type Product = {
  sku: string;
  title: string;
  original: string;
  generated: { suffix: string; label: string; url: string }[];
};

export const products: Product[] = [
  {
    sku: "IMG-FRN-014",
    title: "Client product",
    original: "/images/IMG-FRN-014.webp",
    generated: [
      { suffix: "_1", label: "01 — Studio Hero Shot (Perfect for Amazon & Shopify front views)", url: "/images/IMG-FRN-014_1.webp" },
      { suffix: "_2", label: "02 — 3D Angled View (Reconstructed spatial perspective)", url: "/images/IMG-FRN-014_2.webp" },
      { suffix: "_3", label: "03 — Macro Detail (High-zoom material texture & edge craftsmanship)", url: "/images/IMG-FRN-014_3.webp" },
      { suffix: "_4", label: "04 — Contextual Lifestyle 01 (Premium ambient environment)", url: "/images/IMG-FRN-014_4.webp" },
      { suffix: "_5", label: "05 — Contextual Lifestyle 02 (Alternative buyer persona setting)", url: "/images/IMG-FRN-014_5.webp" },
      { suffix: "_6", label: "06 — Technical Dimensions (Human-verified vector line-art blueprint)", url: "/images/IMG-FRN-014_6.webp" },
    ],
  },
];

export function ClientWork() {
  const [productIndex, setProductIndex] = useState(0);
  const product = products[productIndex]!;
  const [selected, setSelected] = useState(0);
  const active = product.generated[selected]!;

  return (
    <section id="work" className="section-pad page-shell">
      <div className="reveal mb-7 border-t pt-4 text-center sm:mb-12 sm:pt-5">
        <div className="eyebrow text-muted-foreground">01 — Client work</div>
        <div className="mx-auto mt-4 min-w-0 sm:mt-5">
          <h2 className="display-title max-w-6xl break-words text-[2rem] sm:text-6xl lg:max-w-none lg:text-[clamp(3rem,5vw,4.5rem)]">
            <span className="lg:whitespace-nowrap">One Client Image.</span><br />
            <span className="lg:whitespace-nowrap">Six Ready-to-Sell Product Images.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:mt-7 sm:text-base sm:leading-8">
            One client reference becomes a coordinated listing set through brief-led processing, careful refinement and quality review. The views are organized under a sample portfolio SKU for clear handoff.
          </p>
        </div>
      </div>

      {products.length > 1 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {products.map((item, index) => (
            <button
              key={item.sku}
              onClick={() => {
                setProductIndex(index);
                setSelected(0);
              }}
              className={`rounded-md border px-4 py-2 text-xs font-semibold uppercase tracking-[.12em] transition-colors ${
                index === productIndex ? "border-foreground bg-primary text-primary-foreground" : "hover:border-foreground"
              }`}
            >
              {item.sku}
            </button>
          ))}
        </div>
      )}

      <div className="mx-auto grid w-full max-w-5xl grid-cols-2 items-start gap-1 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:gap-6">
        <figure className="min-w-0 rounded-lg border bg-card p-1 sm:p-4">
          <span className="eyebrow inline-block max-w-full rounded-md bg-secondary px-2 py-2 text-[.55rem] text-muted-foreground sm:px-3 sm:text-[.65rem]">
            Provided by client
          </span>
          <div className="mt-2 aspect-square overflow-hidden rounded-md bg-background sm:mt-4">
            <img
              src={product.original}
              alt={`${product.sku} original client-provided product photo`}
              loading="lazy"
              width={1000}
              height={1000}
              className="size-full object-contain"
            />
          </div>
          <figcaption className="mt-3 flex items-baseline justify-end sm:mt-4">
            <span className="text-[10px] text-muted-foreground sm:text-xs">Original reference</span>
          </figcaption>
        </figure>

        <div className="hidden h-full items-center justify-center sm:flex">
          <span className="flex size-9 items-center justify-center rounded-full bg-signal text-primary-foreground sm:size-12">
            <ArrowRight size={16} />
          </span>
        </div>

        <figure className="min-w-0 rounded-lg border bg-card p-1 sm:p-4">
          <span className="eyebrow inline-block max-w-full rounded-md bg-signal/12 px-2 py-2 text-[.55rem] text-signal sm:px-3 sm:text-[.65rem]">Created by Imagenmerce</span>
          <div className="mt-2 aspect-square overflow-hidden rounded-md bg-background sm:mt-4">
            <img
              src={active.url}
              alt={`${product.sku}${active.suffix} — ${active.label}`}
              loading="lazy"
              width={1000}
              height={1000}
              className="size-full object-contain"
            />
          </div>
          <figcaption className="mt-3 flex min-w-0 items-baseline justify-end sm:mt-4">
            <span className="truncate text-[10px] text-muted-foreground sm:text-xs">{active.label}</span>
          </figcaption>
        </figure>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 md:grid-cols-6">
        {product.generated.map((image, index) => (
          <button
            key={image.suffix}
            onClick={() => setSelected(index)}
            aria-label={`View ${product.sku}${image.suffix} — ${image.label}`}
            className={`group relative rounded-md border-2 bg-card p-1.5 text-left transition-colors sm:p-2 ${
              index === selected ? "border-signal" : "border-transparent hover:border-input"
            }`}
          >
            <div className="aspect-square overflow-hidden rounded-sm bg-background">
              <img src={image.url} alt="" loading="lazy" width={300} height={300} className="size-full object-contain" />
            </div>
            <span className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-signal text-primary-foreground shadow-lg transition-transform group-hover:scale-110" aria-hidden="true"><ArrowRight size={13} /></span>
            <span className="mt-2 block overflow-hidden text-ellipsis text-[10px] font-semibold uppercase tracking-[.06em] sm:tracking-[.1em]">{image.label}</span>
          </button>
        ))}
      </div>

      <p className="mt-6 max-w-2xl text-xs leading-6 text-muted-foreground">
        {product.title} — {product.sku}. Our studio checks silhouette, colour, wood tone and hardware against the supplied reference throughout refinement. The final set is reviewed against the agreed brief.
      </p>
    </section>
  );
}
