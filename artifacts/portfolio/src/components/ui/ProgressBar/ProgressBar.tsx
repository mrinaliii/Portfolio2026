import { useEffect, useState } from 'react';
import { useProgressContext } from '../../../context/ProgressContext';
import styles from './ProgressBar.module.css';

/**
 * Top-of-viewport progress bar — NProgress style.
 * Connected to ProgressContext: start() shows the indeterminate shimmer,
 * finish() triggers the completion flash then fades out.
 *
 * Used for: route transitions.
 * DS Section 20.
 */
export function ProgressBar() {
  const { isActive } = useProgressContext();
  const [mounted, setMounted] = useState(false);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    if (isActive) {
      setMounted(true);
      setCompleting(false);
    } else if (mounted) {
      // Let the "completing" animation run before unmounting
      setCompleting(true);
      const timer = setTimeout(() => {
        setMounted(false);
        setCompleting(false);
      }, 400); // short completion flash
      return () => clearTimeout(timer);
    }
  }, [isActive]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!mounted) return null;

  return (
    <div
      className={[styles.bar, completing && styles.completing].filter(Boolean).join(' ')}
      role="progressbar"
      aria-label="Loading"
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}
