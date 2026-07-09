import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { useInView } from '../../../hooks/useInView';
import { Tag } from '../../ui/Tag/Tag';
import styles from './PrecisionReveal.module.css';

interface SkillGroup {
  label: string;
  skills: string[];
}

interface PrecisionRevealProps {
  groups: SkillGroup[];
}

const INTERVAL_MS = 35;      // DS Section 10b: 35ms between token appearances
const START_DELAY_MS = 300;  // DS Section 10b: 300ms after section enters

/**
 * Precision Reveal — Secondary Signature Interaction (DS Section 10b).
 * Skills tokens appear one-by-one at 35ms intervals after the section enters viewport.
 * In reduced-motion mode, all tokens appear simultaneously with opacity fade.
 * Once revealed, tokens never re-animate on re-scroll.
 */
export function PrecisionReveal({ groups }: PrecisionRevealProps) {
  const reducedMotion = useReducedMotion();
  const [revealedCount, setRevealedCount] = useState(0);
  const hasStartedRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const allTokens = groups.flatMap((g) => g.skills);
  const totalTokens = allTokens.length;

  // useInView — one-shot, triggers once when section enters
  const [sectionRef, inView] = useInView<HTMLDivElement>();

  useEffect(() => {
    if (!inView || hasStartedRef.current) return;
    hasStartedRef.current = true;

    if (reducedMotion) {
      // All tokens appear instantly (reduced-motion rule)
      setRevealedCount(totalTokens);
      return;
    }

    // 300ms delay before sequence starts
    const startTimeout = setTimeout(() => {
      let count = 0;
      intervalRef.current = setInterval(() => {
        count += 1;
        setRevealedCount(count);
        if (count >= totalTokens) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
        }
      }, INTERVAL_MS);
    }, START_DELAY_MS);

    return () => clearTimeout(startTimeout);
  }, [inView, reducedMotion, totalTokens]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Build a flat list with group membership for rendering
  let tokenIndex = 0;

  return (
    <div ref={sectionRef} className={styles.groups}>
      {groups.map((group) => (
        <div key={group.label} className={styles.group}>
          <span className={styles.groupLabel}>{group.label}</span>
          <div className={[
            styles.tokens,
            reducedMotion ? styles.tokensReduced : '',
          ].filter(Boolean).join(' ')}>
            {group.skills.map((skill) => {
              const idx = tokenIndex++;
              const isVisible = idx < revealedCount;
              return (
                <Tag
                  key={skill}
                  className={[
                    styles.token,
                    isVisible ? styles.tokenVisible : styles.tokenHidden,
                    reducedMotion ? styles.tokenReduced : '',
                  ].filter(Boolean).join(' ')}
                >
                  {skill}
                </Tag>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
