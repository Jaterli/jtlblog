/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly VITE_PUBLIC_ACCESS_KEY: string;
    readonly VITE_RECAPTCHA_SITE_KEY: string;
    readonly VITE_RECAPTCHA_SECRET_KEY: string;   
    readonly VITE_PUBLIC_SITE_URL: string;

  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
