import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'zh' | 'en';

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'zh', // Default language
      setLanguage: (language: Language) => set({ language }),
    }),
    {
      name: 'huini-site-language', // name of the item in local storage
    }
  )
);
