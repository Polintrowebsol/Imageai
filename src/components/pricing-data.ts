export const pricingPlans = [
  {
    name: "Starter", tagline: "6 Images · Free Trial · Watermarked", price: "$0 / product",
    products: "Maximum 2–3 products", purpose: "Trial / simple listing", images: "6 ecommerce images per product",
    imageTypes: "Hero, angle, detail, lifestyle, feature/benefit, or dimensions — selected according to the product.",
    accuracy: "Reference-based production with product consistency checks.", watermark: "Imagenmerce watermark on all delivered trial images.",
    revisions: "Confirmed in quote", delivery: "Ecommerce-ready JPG / PNG / WebP, as agreed", turnaround: "Confirmed in quote",
  },
  {
    name: "Standard", tagline: "6 Images · Full Ecommerce Set", price: "$24 / product",
    products: "1–19 products", purpose: "Complete Amazon / Shopify / Ecommerce listing", images: "6 ecommerce images per product",
    imageTypes: "Hero, angle, detail, lifestyle, feature/benefit, and dimensions — selected according to the product.",
    accuracy: "Reference-based production with detailed product consistency and visual accuracy checks.", watermark: "No watermark",
    revisions: "Up to 2 revision rounds", delivery: "Ecommerce-ready JPG / PNG / WebP, as agreed", turnaround: "Confirmed in quote",
  },
  {
    name: "Pro", tagline: "7 Images · Advanced Ecommerce Set", price: "$32 / product",
    products: "1–19 products", purpose: "Premium listings / products that need stronger visual selling", images: "7 ecommerce images per product",
    imageTypes: "Hero, angle, detail, lifestyle, feature/benefit, dimensions, plus one additional lifestyle or product-focused image as needed.",
    accuracy: "Reference-based production with enhanced product accuracy, consistency, and final QA checks.", watermark: "No watermark",
    revisions: "Up to 2 revision rounds", delivery: "Ecommerce-ready JPG / PNG / WebP, as agreed", turnaround: "Confirmed in quote",
  },
  {
    name: "Catalog", tagline: "6 Images · High-Volume Production", price: "From $20 / product",
    products: "Minimum 20 products", purpose: "Catalogs, large inventories, Amazon / Shopify product launches, and ongoing product production", images: "6 ecommerce images per product",
    imageTypes: "Hero, angle, detail, lifestyle, feature/benefit, and dimensions — selected according to the product.",
    accuracy: "Reference-based production with consistent visual standards and product accuracy checks across the catalog.", watermark: "No watermark",
    revisions: "Confirmed in quote based on project scope", delivery: "Ecommerce-ready JPG / PNG / WebP, as agreed", turnaround: "Confirmed in quote based on catalog size",
  },
] as const;

export type PricingPlan = (typeof pricingPlans)[number];

export function planMessage(plan: PricingPlan) {
  return [
    "Hello Imagenmerce Team,",
    plan.name === "Starter"
      ? "I want Try your Starter Plan"
      : `I want to Start ${plan.name} Plan.`,
    "",
    `${plan.name.toUpperCase()} — ${plan.tagline}`, `Price: ${plan.price}`,
    `Products: ${plan.products}`, `Purpose: ${plan.purpose}`, `Images: ${plan.images}`,
    `Image Types: ${plan.imageTypes}`, `Product Accuracy: ${plan.accuracy}`,
    `Watermark: ${plan.watermark}`, `Revisions: ${plan.revisions}`,
    `Delivery: ${plan.delivery}`, `Turnaround: ${plan.turnaround}`, "",
    "Thanks!", "", "[Your Name]", "[Contact Number]", "[Location]",
  ].join("\n");
}

export function planEmailUrl(plan: PricingPlan) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent("imagenmerce@gmail.com")}&su=${encodeURIComponent("I am Interested in Your Service")}&body=${encodeURIComponent(planMessage(plan))}`;
}

export function planWhatsAppUrl(plan: PricingPlan) {
  return `https://wa.me/917011836415?text=${encodeURIComponent(`I am Interested in Your Service\n\n${planMessage(plan)}`)}`;
}
