declare global {
  interface Window {
    addEventListener(
      type: 'devtoolschange',
      listener: (event: DevToolsEvent) => unknown,
      options?: boolean | AddEventListenerOptions
    ): void;
  }
}

export interface DevToolsEvent extends Event {
  detail: typeof devTools;
}

declare const devTools: {
  isOpen: boolean;
  orientation: 'vertical' | 'horizontal';
  isOnce: boolean;
  threshold: number;
  intervalTime: number;
  whiteHosts: string[];
  blackHosts: string[];
};

export default devtoolsCatch;
