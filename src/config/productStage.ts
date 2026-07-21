export type ProductStage =
  | "local-preview"
  | "closed-beta"
  | "public-beta"
  | "production";

export const PRODUCT_STAGE: ProductStage =
  ((import.meta as any).env?.VITE_PRODUCT_STAGE as ProductStage) === "closed-beta"
    ? "closed-beta"
    : ((import.meta as any).env?.VITE_PRODUCT_STAGE as ProductStage) === "public-beta"
      ? "public-beta"
      : ((import.meta as any).env?.VITE_PRODUCT_STAGE as ProductStage) === "production"
        ? "production"
        : "local-preview";
