import { useThemeContext } from '@/context/ThemeContext';
import type { Theme } from '@/types/theme';

/**
 * Convenience hook — access the current theme and toggle function
 * from anywhere in the component tree.
 *
 * @returns {{ theme: Theme, toggleTheme: () => void }}
 */
export function useTheme(): { theme: Theme; toggleTheme: () => void } {
  return useThemeContext();
}
