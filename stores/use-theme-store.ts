import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light', // Default theme
      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          document.documentElement.classList.remove(state.theme);
          document.documentElement.classList.add(newTheme);
          return { theme: newTheme };
        });
      },
      setTheme: (theme: Theme) => {
        set((state) => {
          document.documentElement.classList.remove(state.theme);
          document.documentElement.classList.add(theme);
          return { theme };
        });
      },
    }),
    {
      name: 'huini-site-theme', // name of the item in local storage
      onRehydrateStorage: (state) => {
        // After rehydration, apply the theme to the document element
        if (state && state.theme) {
          document.documentElement.classList.add(state.theme);
        } else if (typeof window !== 'undefined') {
          // Check for system preference if no theme is stored
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          state.theme = systemTheme;
          document.documentElement.classList.add(systemTheme);
        }
      },
    }
  )
);
