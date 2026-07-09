import { useCallback, useRef, useState } from 'react';
import { queryKnowledgeCore, type KnowledgeCoreResponse } from '../lib/knowledge-core-api';
import { analytics } from '../lib/analytics';

export type KCStatus = 'idle' | 'loading' | 'streaming' | 'done' | 'error';

export interface KCState {
  status: KCStatus;
  displayedText: string;    // The currently-rendered portion of the answer
  fullAnswer: string;       // The complete answer (set on response, used by streaming)
  response: KnowledgeCoreResponse | null;
  error: string | null;
}

const INITIAL_STATE: KCState = {
  status: 'idle',
  displayedText: '',
  fullAnswer: '',
  response: null,
  error: null,
};

/**
 * Knowledge Core state machine:
 *   idle → loading → streaming → done
 *   loading → error (on API failure)
 *   done → loading (new query resets)
 *
 * Character-by-character streaming is client-side simulation at 18ms per character.
 * Analytics: fires `knowledgeCoreQuery` on every submit.
 *
 * TIP Milestone 5, DS Section 8.
 */
export function useKnowledgeCore() {
  const [state, setState] = useState<KCState>(INITIAL_STATE);
  const streamIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const charIndexRef = useRef<number>(0);

  /** Cancel any in-flight stream */
  const cancelStream = useCallback(() => {
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
      streamIntervalRef.current = null;
    }
  }, []);

  const submit = useCallback(
    async (query: string) => {
      const q = query.trim();
      if (!q) return;

      // Cancel any previous stream
      cancelStream();
      charIndexRef.current = 0;

      // Reset to loading state
      setState({
        status: 'loading',
        displayedText: '',
        fullAnswer: '',
        response: null,
        error: null,
      });

      analytics.knowledgeCoreQuery();

      try {
        const response = await queryKnowledgeCore(q);

        // Transition to streaming state
        setState({
          status: 'streaming',
          displayedText: '',
          fullAnswer: response.answer,
          response,
          error: null,
        });

        // Start character-by-character render
        streamIntervalRef.current = setInterval(() => {
          charIndexRef.current += 1;
          const idx = charIndexRef.current;
          const fullAnswer = response.answer;

          if (idx >= fullAnswer.length) {
            // Streaming complete
            cancelStream();
            setState((prev) => ({
              ...prev,
              status: 'done',
              displayedText: fullAnswer,
            }));
          } else {
            setState((prev) => ({
              ...prev,
              displayedText: fullAnswer.slice(0, idx),
            }));
          }
        }, 18); // DS: 18ms per character
      } catch (err) {
        setState({
          status: 'error',
          displayedText: '',
          fullAnswer: '',
          response: null,
          error: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
        });
      }
    },
    [cancelStream],
  );

  const reset = useCallback(() => {
    cancelStream();
    charIndexRef.current = 0;
    setState(INITIAL_STATE);
  }, [cancelStream]);

  return { state, submit, reset };
}
