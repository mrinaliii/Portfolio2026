import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../../hooks/useTheme';
import { analytics } from '../../../lib/analytics';
import styles from './ThemeToggle.module.css';

/**
 * Icon-only toggle: Moon (dark) ↔ Sun (light).
 * 40×40px touch target. Icons crossfade with 15° rotation.
 * Fires analytics.themeChange on every toggle.
 * DS Section 14.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  function handleClick() {
    const next = theme === 'dark' ? 'light' : 'dark';
    toggleTheme();
    analytics.themeChange(next);
  }

  return (
    <button
      className={styles.button}
      onClick={handleClick}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      aria-pressed={theme === 'light'}
    >
      <span className={styles.iconWrap} aria-hidden="true">
        {theme === 'dark' ? (
          <Moon
            key="moon"
            size={18}
            strokeWidth={1.5}
            className={styles.icon}
          />
        ) : (
          <Sun
            key="sun"
            size={18}
            strokeWidth={1.5}
            className={styles.icon}
          />
        )}
      </span>
    </button>
  );
}
