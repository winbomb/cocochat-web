import localforage from "localforage";

// BeforeInstallPromptEvent interface
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}
export declare global {
  import { PrecacheEntry } from "workbox-precaching/src/_types";
  import localforage from "localforage";
  interface Document {
    webkitHidden: boolean;
  }
  interface Window {
    MSG_SOUND: boolean;
    AUTO_RELOAD: boolean;
    AFTER_MID: number;
    USERS_VERSION: number;
    __WB_MANIFEST: Array<PrecacheEntry | string>;
    skipWaiting: () => void;
    CACHE: { [key: string]: typeof localforage | undefined };
  }
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
  interface Element {
    scrollIntoViewIfNeeded?: any;
  }
}
