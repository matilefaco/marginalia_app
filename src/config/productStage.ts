export type ProductStage =
  | "local-preview"
  | "closed-beta"
  | "public-beta"
  | "production";

export const PRODUCT_STAGE: ProductStage =
  import.meta.env.VITE_PRODUCT_STAGE === "closed-beta"
    ? "closed-beta"
    : import.meta.env.VITE_PRODUCT_STAGE === "public-beta"
      ? "public-beta"
      : import.meta.env.VITE_PRODUCT_STAGE === "production"
        ? "production"
        : "local-preview";
