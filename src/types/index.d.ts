export {};

declare global {
  interface Window {
    isTouchDevice: () => boolean;
  }
}
