
import { atom } from 'nanostores'

type ThemeState = {
  theme: 'light' | 'dark' | 'system';
  systemTheme: 'light' | 'dark';
}

export const themeStore = atom<ThemeState>({
  theme: 'system',
  systemTheme: 'light'
})
