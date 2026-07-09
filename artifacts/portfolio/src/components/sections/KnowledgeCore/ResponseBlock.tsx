import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { KnowledgeCoreResponse } from '../../../lib/knowledge-core-api';
import type { KCStatus } from '../../../hooks/useKnowledgeCore';
import { Skeleton } from '../../ui/Skeleton/Skeleton';
import { SuggestionChip } from './SuggestionChip';
import styles from './ResponseBlock.module.css';

interface ResponseBlockProps {
  status: KCStatus;
  displayedText: string;
  response: KnowledgeCoreResponse | null;
  onFollowUp: (query: string) => void;
}

/**
 * ResponseBlock — renders the AI answer with streaming text and post-completion reveals.
 * Loading: skeleton shimmer.
 * Streaming: character-by-character text render.
 * Done: citations → related projects → follow-up chips (200ms stagger each).
 * Error: error message.
 * DS Section 8, IA Section 06.
 */
export function ResponseBlock({ status, displayedText, response, onFollowUp }: ResponseBlockProps) {
  const isDone = status === 'done';

  if (status === 'idle') return null;

  return (
    <div className={styles.block} role="region" aria-label="AI response" aria-live="polite" aria-busy={status === 'loading' || status === 'streaming'}>
      {status === 'loading' && (
        <div className={styles.loading} aria-busy="true">
          <Skeleton height="1em" width="90%" />
          <Skeleton height="1em" width="80%" />
          <Skeleton height="1em" width="95%" />
          <Skeleton height="1em" width="70%" />
        </div>
      )}

      {(status === 'streaming' || status === 'done') && (
        <>
          {/* Answer text */}
          <p className={styles.answer}>
            {displayedText}
            {status === 'streaming' && <span className={styles.cursor} aria-hidden="true">▋</span>}
          </p>

          {/* Citations — appear after streaming completes */}
          {isDone && response && response.citations.length > 0 && (
            <div className={styles.citations} aria-label="Sources">
              <span className={styles.citationLabel}>From: </span>
              {response.citations.map((citation, i) => (
                <span key={i}>
                  {citation.slug ? (
                    <Link
                      to={`/work/${citation.slug}`}
                      className={styles.citationLink}
                    >
                      {citation.label}
                    </Link>
                  ) : (
                    <span className={styles.citationText}>{citation.label}</span>
                  )}
                  {i < response.citations.length - 1 && (
                    <span className={styles.citationSeparator}> · </span>
                  )}
                </span>
              ))}
            </div>
          )}

          {/* Related project links */}
          {isDone && response && response.relatedProjects.length > 0 && (
            <div className={styles.relatedProjects}>
              {response.relatedProjects.map((project) => (
                <Link
                  key={project.slug}
                  to={`/work/${project.slug}`}
                  className={styles.relatedLink}
                >
                  <ArrowRight size={13} strokeWidth={1.5} aria-hidden="true" />
                  View {project.title}
                </Link>
              ))}
            </div>
          )}

          {/* Follow-up chips */}
          {isDone && response && response.followUps.length > 0 && (
            <div className={styles.followUps}>
              {response.followUps.map((followUp) => (
                <SuggestionChip
                  key={followUp}
                  label={followUp}
                  onSelect={onFollowUp}
                />
              ))}
            </div>
          )}
        </>
      )}

      {status === 'error' && (
        <p className={styles.error} role="alert">
          {response?.error || 'Something went wrong. Please try again.'}
        </p>
      )}
    </div>
  );
}
