import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const OPEN_EVENT = "imagenmerce:open-project-form";
const JOTFORM_URL = "https://form.jotform.com/262645167772062";

export function openProjectForm() {
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
          <p className="eyebrow text-signal">Project application</p>
          <DialogTitle className="display-title text-3xl sm:text-4xl">Start a Project</DialogTitle>
          <DialogDescription>Tell us about your product-image requirements and we’ll follow up with the next steps.</DialogDescription>
        </DialogHeader>
        <iframe
          title="Start an Imagenmerce project"
          src={JOTFORM_URL}
          className="h-full min-h-0 w-full border-0"
          allow="camera; microphone; geolocation"
        />
      </DialogContent>
    </Dialog>
  );
}
