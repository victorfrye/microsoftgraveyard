declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

declare global {
  interface Window {
    gtag: Gtag.Gtag;
  }
}

export {};
