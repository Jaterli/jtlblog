// src/types/recaptcha.d.ts
declare namespace grecaptcha {
  function ready(callback: () => void): void;
  function execute(siteKey: string, options?: { action: string }): Promise<string>;
  function render(container: string | Element, parameters: {
    sitekey: string;
    callback?: (token: string) => void;
    'error-callback'?: () => void;
    'expired-callback'?: () => void;
  }): number;
}

declare interface Window {
  grecaptcha: typeof grecaptcha;
}