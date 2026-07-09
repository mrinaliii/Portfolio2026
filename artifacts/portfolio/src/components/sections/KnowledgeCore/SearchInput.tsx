import { KeyboardEvent, useRef, useState } from 'react';
import { CornerDownLeft, Search } from 'lucide-react';
import styles from './SearchInput.module.css';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

const MAX_LENGTH = 500;

/**
 * Knowledge Core search input — Spotlight style.
 * Search icon pinned left. Ghost ↵ label appears on focus.
 * Search icon rotates during loading state.
 * Ice-signal border on focus.
 * Submit via Enter key. DS Section 8, IA Section 06.
 */
export function SearchInput({ value, onChange, onSubmit, isLoading, disabled }: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && value.trim() && !isLoading) {
      onSubmit(value.trim());
    }
  }

  function handleSubmitClick() {
    if (value.trim() && !isLoading) {
      onSubmit(value.trim());
      inputRef.current?.focus();
    }
  }

  return (
    <div
      className={[
        styles.wrapper,
        isFocused && styles.focused,
        isLoading && styles.loading,
        disabled && styles.disabled,
      ].filter(Boolean).join(' ')}
    >
      {/* Search icon — rotates during loading */}
      <Search
        className={[styles.icon, isLoading && styles.iconSpinning].filter(Boolean).join(' ')}
        size={18}
        strokeWidth={1.5}
        aria-hidden="true"
      />

      <input
        ref={inputRef}
        type="text"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Ask about my projects, experience, skills…"
        maxLength={MAX_LENGTH}
        aria-label="Ask about my projects and experience"
        aria-describedby="kc-input-hint"
        disabled={disabled || isLoading}
        autoComplete="off"
        spellCheck={false}
      />

      {/* Ghost ↵ label — appears on focus, acts as submit */}
      {isFocused && !isLoading && (
        <button
          className={styles.enterHint}
          onClick={handleSubmitClick}
          tabIndex={-1}
          aria-label="Submit query"
        >
          <CornerDownLeft size={14} strokeWidth={1.5} aria-hidden="true" />
        </button>
      )}

      {/* Screen-reader hint */}
      <span id="kc-input-hint" className="visually-hidden">
        Press Enter to submit your question
      </span>
    </div>
  );
}
