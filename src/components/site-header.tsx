import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openFreeAudit } from "@/components/audit-form";

const links = [
  ["Home", "/"], ["Services", "/services"], ["Portfolio", "/portfolio"],
  ["Pricing", "/pricing"], ["About", "/about"], ["Contact", "/contact"],
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 80 || window.location.pathname !== "/");
    update(); window.addEventListener("scroll", update); return () => window.removeEventListener("scroll", update);
  }, []);
  return <header className={`fixed left-1/2 top-3 z-50 w-[calc(100%-1.5rem)] max-w-[88rem] -translate-x-1/2 border border-transparent transition-all duration-500 ${scrolled?"nav-scrolled px-4 lg:w-[calc(100%-4rem)]":"px-1"} ${open?"nav-mobile-open bg-background px-4":""}`}>
    <div className="flex h-16 items-center justify-between gap-3"><a href="/" aria-label="Imagenmerce home" className="shrink-0"><img src="/imagenmerce-logo.png" alt="Imagenmerce" className="h-8 w-auto max-w-[8.5rem] object-contain sm:h-9 sm:max-w-none"/></a>
      <nav className="hidden items-center gap-6 xl:flex" aria-label="Main navigation">{links.map(([label,url])=><a key={url} href={url} className="text-[10px] font-semibold uppercase tracking-[.12em] text-muted-foreground transition-colors hover:text-foreground">{label}</a>)}</nav>
      <Button size="sm" className="hidden sm:inline-flex" onClick={()=>openFreeAudit("navigation")}>Get a Free Image Audit</Button>
      <div className="flex items-center gap-2 xl:hidden"><Button size="sm" onClick={()=>openFreeAudit("mobile_navigation")} className="px-3 text-[10px] sm:hidden">Free Audit</Button><Button variant="ghost" size="icon" aria-label={open?"Close navigation":"Open navigation"} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</Button></div>
    </div>
    {open&&<nav className="border-t py-4 xl:hidden" aria-label="Mobile navigation">{links.map(([label,url])=><a key={url} href={url} onClick={()=>setOpen(false)} className="block py-3 text-sm uppercase">{label}</a>)}</nav>}
  </header>;
}
