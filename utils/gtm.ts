// utils/gtm.ts
declare var dataLayer: any[];

type GtagFunction = (...args: any[]) => void;

declare global {
  interface Window {
    dataLayer: any[];
    gtag: GtagFunction;
  }
}

export function initializeGTM() {
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', 'G-F8VK8PWK9Q');
}
