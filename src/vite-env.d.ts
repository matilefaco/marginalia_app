/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PRODUCT_STAGE?: "local-preview" | "closed-beta" | "public-beta" | "production";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
