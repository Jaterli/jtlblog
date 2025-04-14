/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly VITE_API_KEY: string;
    readonly VITE_PUBLIC_ACCESS_KEY: string;
    readonly VITE_BASE_URL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }