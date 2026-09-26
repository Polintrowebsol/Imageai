export type ImagenmerceEvent = "free_audit_cta_click" | "free_audit_form_opened" | "free_audit_form_submitted" | "studio_project_cta_click" | "portfolio_interaction";

// A stable, PII-free event surface for an existing or future analytics integration.
export function track(event: ImagenmerceEvent, source: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("imagenmerce:analytics", { detail: { event, source } }));
}
