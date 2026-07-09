import { useState } from 'react';
import { StampLabel } from '../../ui/StampLabel/StampLabel';
import { Hairline } from '../../layout/Hairline/Hairline';
import { SearchInput } from './SearchInput';
import { SuggestionChip } from './SuggestionChip';
import { ResponseBlock } from './ResponseBlock';
import { AmbientGlow } from './AmbientGlow';
import { useKnowledgeCore } from '../../../hooks/useKnowledgeCore';
import { useProgressContext } from '../../../context/ProgressContext';
import styles from './KnowledgeCore.module.css';

const INITIAL_CHIPS = [
  'Tell me about Sentinel AI.',
  'Explain the Solar Energy RAG system.',
  'Why AI and Cybersecurity?',
  'What technologies do you enjoy working with?',
];

/**
 * Section 06 — Knowledge Core (public name: "Ask My AI").
 * Full search UI with mock backend. Milestone 9 swaps in the real API.
 * Background uses --color-abyss to signal depth shift.
 * Hairline separator before and after (DS Section 06 rhythm).
 * IA Section 06, CONTENT.md §KNOWLEDGE CORE, TIP Milestone 5.
 */
export function KnowledgeCore() {
  const [query, setQuery] = useState('');
  const { state, submit } = useKnowledgeCore();
  const { start: progressStart, finish: progressFinish } = useProgressContext();

  const isLoading = state.status === 'loading';
  const isStreaming = state.status === 'streaming';
  const isActive = isLoading || isStreaming;

  async function handleSubmit(q: string) {
    setQuery(q);
    progressStart();
    await submit(q);
    progressFinish();
  }

  function handleChipSelect(chip: string) {
    setQuery(chip);
    handleSubmit(chip);
  }

  return (
    <>
      <Hairline />
      <section
        id="knowledge-core"
        data-section="knowledge-core"
        className={styles.section}
        aria-labelledby="kc-heading"
        role="region"
        aria-label="Knowledge Core — Ask about my work"
      >
        {/* Ambient glow during loading — one pulse, not looping */}
        <AmbientGlow isActive={isLoading} />

        <div className={styles.inner}>
          {/* Header */}
          <StampLabel className={styles.stamp}>Knowledge Core</StampLabel>
          <h2 id="kc-heading" className={styles.heading}>Ask My AI</h2>
          <p className={styles.subtext}>
            Curious about how I built a project? Instead of reading every case study, ask my AI
            assistant. It can explain my projects, engineering decisions, architecture choices,
            technologies, internship experience, and current learning goals.
          </p>

          {/* Search input */}
          <SearchInput
            value={query}
            onChange={setQuery}
            onSubmit={handleSubmit}
            isLoading={isActive}
          />

          {/* Initial suggestion chips — shown before first response */}
          {state.status === 'idle' && (
            <div className={styles.chips}>
              {INITIAL_CHIPS.map((chip) => (
                <SuggestionChip
                  key={chip}
                  label={chip}
                  onSelect={handleChipSelect}
                />
              ))}
            </div>
          )}

          {/* Response block */}
          {state.status !== 'idle' && (
            <ResponseBlock
              status={state.status}
              displayedText={state.displayedText}
              response={state.response}
              onFollowUp={handleSubmit}
            />
          )}

          {/* Disclaimer */}
          {(state.status === 'done' || state.status === 'error') && (
            <p className={styles.disclaimer} aria-live="polite">
              Answers are AI-generated from a curated knowledge base. May not reflect the most
              recent updates.
            </p>
          )}
        </div>
      </section>
      <Hairline />
    </>
  );
}
