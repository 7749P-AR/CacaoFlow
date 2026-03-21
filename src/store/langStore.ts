import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Lang = "en" | "es";

interface LangStore {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export const useLangStore = create<LangStore>()(
  persist(
    (set) => ({
      lang: "en",
      setLang: (lang) => set({ lang }),
    }),
    { name: "cacao-flow-lang" }
  )
);
