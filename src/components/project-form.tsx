import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { track } from "@/lib/analytics";

export const OPEN_EVENT = "imagenmerce:open-project-form";
export const JOTFORM_URL = "https://form.jotform.com/262645167772062";

export function openProjectForm() {
  track("studio_project_cta_click", "website");
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function ProjectFormDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="grid h-[92dvh] w-[calc(100%-1rem)] max-w-4xl grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-lg bg-background p-0 sm:h-[90vh]">
        <DialogHeader className="border-b px-5 pb-4 pt-5 sm:px-7">
          <p className="eyebrow text-signal">Imagenmerce enquiry</p>
          <DialogTitle className="display-title text-3xl sm:text-4xl">Tell Us About Your Product</DialogTitle>
          <DialogDescription>Complete the form below to request an audit or discuss a project. <a href={JOTFORM_URL} target="_blank" rel="noopener noreferrer" className="underline">Open the form in a new tab</a>.</DialogDescription>
        </DialogHeader>
        <iframe
          title="Imagenmerce enquiry form"
          src={JOTFORM_URL}
          className="h-full min-h-0 w-full border-0"
          allow="camera; microphone; geolocation"
        />
      </DialogContent>
    </Dialog>
  );
}
