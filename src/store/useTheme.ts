import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
};

export const useTheme = create<Store>()(
  persist(
    (set) => ({
      isDark: true,
      setIsDark: (isDark) => set({ isDark }),
    }),
    {
      name: "TDJOBS/theme",
    }
  )
);
