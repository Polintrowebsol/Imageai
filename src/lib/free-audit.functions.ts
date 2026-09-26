import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const httpUrl = z.string().trim().url().refine((value) => /^https?:\/\//i.test(value), "Enter an HTTP or HTTPS URL");
const improvements = ["Hero image", "Lifestyle imagery", "Product angles", "Feature/benefit graphics", "Dimensions", "Product consistency", "Complete image set", "Other"] as const;
const schema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  businessName: z.string().trim().min(1).max(160),
  businessWebsite: z.union([httpUrl, z.literal("")]),
  productUrl: z.union([httpUrl, z.literal("")]),
  email: z.string().trim().email().max(255),
  platform: z.enum(["Amazon", "Shopify", "Other"]),
  numberOfProducts: z.enum(["1", "2–5", "6–20", "21–50", "50+"]),
  improvements: z.array(z.enum(improvements)).min(1).max(improvements.length),
  file: z.object({ name: z.string().max(180), type: z.enum(["image/jpeg", "image/png", "image/webp"]), data: z.string().max(7_000_000) }).nullable(),
}).refine((data) => !!data.productUrl || !!data.file, { message: "Provide a listing URL or a product image" });

export const submitFreeAudit = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const id = crypto.randomUUID();
    let referencePath: string | null = null;
    if (data.file) {
      const bytes = Buffer.from(data.file.data, "base64");
      const valid = data.file.type === "image/png" ? bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))
        : data.file.type === "image/jpeg" ? bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255
        : bytes.subarray(0, 4).toString() === "RIFF" && bytes.subarray(8, 12).toString() === "WEBP";
      if (!valid || bytes.length === 0 || bytes.length > 5 * 1024 * 1024) throw new Error("Invalid upload");
      const extension = data.file.type === "image/jpeg" ? "jpg" : data.file.type === "image/png" ? "png" : "webp";
      referencePath = `${id}/reference.${extension}`;
      const { error: uploadError } = await supabaseAdmin.storage.from("free-audit-references").upload(referencePath, bytes, { contentType: data.file.type, upsert: false });
      if (uploadError) { console.error("audit_upload_failed", uploadError); throw new Error("Could not save audit request"); }
    }
    const { error } = await supabaseAdmin.from("free_audit_requests").insert({
      id, first_name: data.firstName, last_name: data.lastName, business_name: data.businessName,
      business_website: data.businessWebsite || null, product_url: data.productUrl || null, email: data.email,
      platform: data.platform, number_of_products: data.numberOfProducts, improvements: data.improvements,
      reference_path: referencePath,
    });
    if (error) {
      console.error("audit_insert_failed", error);
      if (referencePath) await supabaseAdmin.storage.from("free-audit-references").remove([referencePath]);
      throw new Error("Could not save audit request");
    }
    return { ok: true as const };
  });
