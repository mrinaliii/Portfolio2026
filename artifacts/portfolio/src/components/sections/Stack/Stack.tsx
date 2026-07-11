import { Section } from '../../layout/Section/Section';
import { Container } from '../../layout/Container/Container';
import { StampLabel } from '../../ui/StampLabel/StampLabel';
import { PrecisionReveal } from './PrecisionReveal';
import styles from './Stack.module.css';

const SKILL_GROUPS = [
  {
    label: '01 / PROGRAMMING',
    skills: [
      'Python',
      'C++',
      'SQL',
    ],
  },
  {
    label: '02 / ARTIFICIAL INTELLIGENCE',
    skills: [
      'Machine Learning',
      'NLP',
      'RAG',
      'LangChain',
      'Prompt Engineering',
      'TensorFlow',
      'PyTorch',
    ],
  },
  {
    label: '03 / CYBERSECURITY',
    skills: [
      'Splunk',
      'Wazuh',
      'MITRE ATT&CK',
      'Vulnerability Assessment',
      'Network Security',
      'Web Application Security',
    ],
  },
  {
    label: '04 / TOOLS',
    skills: [
      'Git',
      'GitHub',
    ],
  },
];

/**
 * Section 05 — Stack.
 * Technical capabilities with the Precision Reveal interaction.
 * 4-up group grid on desktop, 2-up on tablet, 1-up on mobile.
 * Current Focus line in ice-signal.
 * IA Section 05, CONTENT.md §STACK.
 */
export function Stack() {
  return (
    <Section id="stack" data-section="stack" aria-labelledby="stack-heading">
      <Container>
        <StampLabel className={styles.stamp}>Stack</StampLabel>

        <h2 id="stack-heading" className={styles.heading}>
          Technologies I Enjoy Working With
        </h2>

        <PrecisionReveal groups={SKILL_GROUPS} />

        {/* Current Focus — ice-signal fires here (the one accent in this section) */}
        <p className={styles.currentFocus}>
          Currently deepening:{' '}
          <span className={styles.focusTopic}>
            AI security systems, vector databases, and adversarial machine learning
          </span>
        </p>
      </Container>
    </Section>
  );
}
