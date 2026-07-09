import { useState } from 'react';
import styles from './SuggestionChip.module.css';

interface SuggestionChipProps {
  label: string;
  onSelect: (label: string) => void;
  disabled?: boolean;
}

/**
 * Suggestion chip — IA Section 06.
 * Ghost button with ○ prefix that fills on select (opacity pulse).
 * Clicking populates and submits the input automatically.
 */
export function SuggestionChip({ label, onSelect, disabled }: SuggestionChipProps) {
  const [isSelected, setIsSelected] = useState(false);

  function handleClick() {
    if (disabled) return;
    setIsSelected(true);
    onSelect(label);
    // Reset after brief moment
    setTimeout(() => setIsSelected(false), 600);
  }

  return (
    <button
      className={[styles.chip, isSelected && styles.selected].filter(Boolean).join(' ')}
      onClick={handleClick}
      disabled={disabled}
      aria-label={`Ask: ${label}`}
    >
      <span className={[styles.dot, isSelected && styles.dotFilled].filter(Boolean).join(' ')} aria-hidden="true">○</span>
      {label}
    </button>
  );
}
