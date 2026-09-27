import { OPEN_EVENT, ProjectFormDialog } from "@/components/project-form";
import { track } from "@/lib/analytics";

export function openFreeAudit(source = "website") {
  track("free_audit_cta_click", source);
  track("free_audit_form_opened", source);
  window.dispatchEvent(new Event(OPEN_EVENT));
}

// Both enquiry routes use the same existing Jotform.
export const AuditFormDialog = ProjectFormDialog;
