import { useEffect, useState, type FormEvent } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { submitFreeAudit } from "@/lib/free-audit.functions";
import { track } from "@/lib/analytics";

const OPEN_EVENT = "imagenmerce:open-free-audit";
export function openFreeAudit(source = "website") {
  track("free_audit_cta_click", source);
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: source }));
}
const options = ["Hero image", "Lifestyle imagery", "Product angles", "Feature/benefit graphics", "Dimensions", "Product consistency", "Complete image set", "Other"];
const inputClass = "mt-1 min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base outline-none focus-visible:ring-2 focus-visible:ring-signal";
const labelClass = "block min-w-0 text-sm font-medium";

export function AuditFormDialog() {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("website");
  const [status, setStatus] = useState<"form" | "sending" | "success" | "error">("form");
  const [selected, setSelected] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  useEffect(() => {
    const onOpen = (event: Event) => { setSource((event as CustomEvent<string>).detail || "website"); setStatus("form"); setOpen(true); track("free_audit_form_opened", (event as CustomEvent<string>).detail || "website"); };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);
  const chooseFile = (chosen: File | null) => {
    if (chosen && (!["image/jpeg", "image/png", "image/webp"].includes(chosen.type) || chosen.size > 5 * 1024 * 1024)) {
      setFile(null); setFileError("Choose a JPG, PNG or WebP image under 5 MB."); return;
    }
    setFile(chosen); setFileError("");
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selected.length === 0 || (!file && !(event.currentTarget.elements.namedItem("productUrl") as HTMLInputElement)?.value.trim())) { setStatus("error"); return; }
    if (fileError) return;
    setStatus("sending");
    try {
      const form = new FormData(event.currentTarget);
      let upload: { name: string; type: "image/jpeg" | "image/png" | "image/webp"; data: string } | null = null;
      if (file) {
        const data = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader(); reader.onload = () => resolve(String(reader.result).split(",")[1] || ""); reader.onerror = () => reject(new Error("File read failed")); reader.readAsDataURL(file);
        });
        upload = { name: file.name, type: file.type as "image/jpeg" | "image/png" | "image/webp", data };
      }
      await submitFreeAudit({ data: {
        firstName: String(form.get("firstName") || ""), lastName: String(form.get("lastName") || ""),
        businessName: String(form.get("businessName") || ""), businessWebsite: String(form.get("businessWebsite") || ""),
        productUrl: String(form.get("productUrl") || ""), email: String(form.get("email") || ""),
        platform: String(form.get("platform") || "") as "Amazon" | "Shopify" | "Other",
        numberOfProducts: String(form.get("numberOfProducts") || "") as "1" | "2–5" | "6–20" | "21–50" | "50+",
        improvements: selected as ("Hero image" | "Lifestyle imagery" | "Product angles" | "Feature/benefit graphics" | "Dimensions" | "Product consistency" | "Complete image set" | "Other")[],
        file: upload,
      } });
      track("free_audit_form_submitted", source);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };
  return <Dialog open={open} onOpenChange={setOpen}><DialogContent className="flex h-[min(94dvh,900px)] w-[calc(100%-1rem)] max-w-2xl flex-col gap-0 overflow-hidden p-0 sm:w-full">
    <DialogHeader className="shrink-0 border-b px-5 pb-4 pr-12 pt-6 text-left sm:px-8 sm:pr-12"><p className="eyebrow text-signal">Complimentary first step</p><DialogTitle className="display-title mt-2 text-3xl sm:text-4xl">Get a Free Product Image Audit</DialogTitle><DialogDescription className="mt-2 text-sm leading-6">Send us one product or listing. We'll review the current visual presentation and identify practical opportunities to improve the ecommerce image set.</DialogDescription></DialogHeader>
    {status === "success" ? <div className="flex min-h-64 flex-col justify-center p-6 text-center sm:p-10"><h3 className="display-title text-3xl">Thank you — your product audit request has been received.</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">We'll review the product reference/listing and get back to you with the next steps.</p><Button className="mx-auto mt-8" onClick={()=>setOpen(false)}>Close</Button></div> :
      <form onSubmit={submit} className="min-h-0 overflow-y-auto overscroll-contain px-5 py-5 sm:px-8" noValidate={false}>
        <div className="grid gap-4 sm:grid-cols-2"><label className={labelClass}>First Name *<input className={inputClass} name="firstName" autoComplete="given-name" required maxLength={100}/></label><label className={labelClass}>Last Name *<input className={inputClass} name="lastName" autoComplete="family-name" required maxLength={100}/></label>
          <label className={labelClass}>Business / Brand Name *<input className={inputClass} name="businessName" autoComplete="organization" required maxLength={160}/></label><label className={labelClass}>Business Website<input className={inputClass} name="businessWebsite" type="url" pattern="https?://.*" title="Use an https:// or http:// URL" placeholder="https://" inputMode="url"/></label>
          <label className={labelClass}>Product / Listing URL<input className={inputClass} name="productUrl" type="url" pattern="https?://.*" title="Use an https:// or http:// URL" placeholder="https://" inputMode="url"/></label><label className={labelClass}>Email *<input className={inputClass} name="email" type="email" autoComplete="email" required maxLength={255}/></label>
          <label className={labelClass}>Platform *<select className={inputClass} name="platform" defaultValue="" required><option value="" disabled>Select platform</option>{["Amazon","Shopify","Other"].map(x=><option key={x}>{x}</option>)}</select></label><label className={labelClass}>Number of Products *<select className={inputClass} name="numberOfProducts" defaultValue="" required><option value="" disabled>Select range</option>{["1","2–5","6–20","21–50","50+"].map(x=><option key={x}>{x}</option>)}</select></label></div>
        <fieldset className="mt-6"><legend className="text-sm font-medium">What would you like improved? *</legend><div className="mt-3 grid gap-2 sm:grid-cols-2">{options.map(x=><label key={x} className="flex min-h-11 items-center gap-3 rounded-md border px-3 py-2 text-sm"><input type="checkbox" checked={selected.includes(x)} onChange={()=>setSelected(v=>v.includes(x)?v.filter(y=>y!==x):[...v,x])} className="size-4 accent-[#009e7d]"/>{x}</label>)}</div></fieldset>
        <label className={`${labelClass} mt-6`}>Upload product/reference image (optional)<input className="mt-2 block min-h-11 w-full max-w-full rounded-md border p-2 text-sm file:mr-3 file:rounded file:border-0 file:bg-secondary file:px-3 file:py-2" type="file" accept="image/jpeg,image/png,image/webp" onChange={e=>chooseFile(e.target.files?.[0] || null)}/></label><p className="mt-2 text-xs text-muted-foreground">JPG, PNG or WebP, up to 5 MB. Provide either an image here or a product/listing URL above.</p>{fileError&&<p role="alert" className="mt-2 text-sm text-red-700">{fileError}</p>}
        {status === "error"&&<p role="alert" className="mt-5 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800">Please select at least one improvement and provide a product/listing URL or an image. Check your details, too. If everything looks right, try again in a moment.</p>}
        <Button type="submit" disabled={status === "sending" || !!fileError} className="mt-6 min-h-12 w-full">{status === "sending" ? "Sending request…" : "Request My Free Audit"}</Button>
        <p className="mt-4 text-center text-xs text-muted-foreground">By submitting, you can review how we handle your information in our <a href="/privacy" className="underline">Privacy Policy</a>.</p><p className="mt-3 text-center text-xs text-muted-foreground">Prefer email? <a className="underline" href="mailto:imagenmerce@gmail.com">Contact Imagenmerce</a></p>
      </form>}
  </DialogContent></Dialog>;
}
