import { create } from "zustand";

type Store = {
  isCopied: boolean;
  setIsCopied: (isCopied: boolean) => void;
};

export const useClipboardStatus = create<Store>()((set) => ({
  isCopied: false,
  setIsCopied: (isCopied) => set({ isCopied }),
}));
