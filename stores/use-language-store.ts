import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18n from '~/lib/i18n'; // Import i18n instance

type Language = 'zh' | 'en';

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'zh', // Default language
      setLanguage: (language: Language) => {
        set({ language });
        i18n.changeLanguage(language); // Change i18n language
      },
    }),
    {
      name: 'huini-site-language', // name of the item in local storage
    }
  )
);
