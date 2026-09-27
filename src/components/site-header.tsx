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
  const [pathname, setPathname] = useState("");
  useEffect(() => {
    const update = () => { setScrolled(window.scrollY > 80 || window.location.pathname !== "/"); setPathname(window.location.pathname); };
    update(); window.addEventListener("scroll", update); return () => window.removeEventListener("scroll", update);
  }, []);
  return <header className={`fixed left-1/2 top-3 z-50 w-[calc(100%-1.5rem)] max-w-[88rem] -translate-x-1/2 border border-transparent transition-all duration-500 ${scrolled?"nav-scrolled px-4 lg:w-[calc(100%-4rem)]":"px-1"} ${open?"nav-mobile-open bg-background px-4":""}`}>
    <div className="flex h-16 items-center justify-between gap-3"><a href="/" aria-label="Imagenmerce home" className="shrink-0"><img src="/imagenmerce-logo.png" alt="Imagenmerce" className="h-8 w-auto max-w-[8.5rem] object-contain sm:h-9 sm:max-w-none"/></a>
      <nav className="hidden items-center gap-6 xl:flex" aria-label="Main navigation">{links.map(([label,url])=><a key={url} href={url} aria-current={pathname===url?"page":undefined} className={`text-[10px] font-semibold uppercase tracking-[.12em] transition-colors hover:text-foreground ${pathname===url?"border-b border-signal pb-1 text-signal":"text-muted-foreground"}`}>{label}</a>)}</nav>
      <Button size="sm" className="hidden xl:inline-flex" onClick={()=>openFreeAudit("navigation")}>Get a Free Image Audit</Button>
      <div className="flex items-center gap-2 xl:hidden"><Button variant="ghost" size="icon" aria-label={open?"Close navigation":"Open navigation"} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</Button></div>
    </div>
    {open&&<nav className="border-t py-4 xl:hidden" aria-label="Mobile navigation">{links.map(([label,url])=><a key={url} href={url} onClick={()=>setOpen(false)} aria-current={pathname===url?"page":undefined} className={`block border-l-2 px-3 py-3 text-sm uppercase ${pathname===url?"border-signal bg-secondary font-semibold text-signal":"border-transparent"}`}>{label}</a>)}<Button className="mt-3 min-h-11 w-full" onClick={()=>{setOpen(false);openFreeAudit("mobile_navigation");}}>Get a Free Product Image Audit</Button></nav>}
  </header>;
}
