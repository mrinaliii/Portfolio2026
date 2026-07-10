import { Section } from '../../layout/Section/Section';
import { Container } from '../../layout/Container/Container';
import { StampLabel } from '../../ui/StampLabel/StampLabel';
import { Hairline } from '../../layout/Hairline/Hairline';
import styles from './Research.module.css';

interface ResearchItem {
  label: string;
  heading: string;
  meta?: string;
  body: string;
}

const RESEARCH_ITEMS: ResearchItem[] = [
  {
    label: 'ACCEPTED PATENT',
    heading:
      'Real-Time Multimodal Adaptive Hindi-English Communication System with Affective Intelligence',
    body: 'An AI-powered multimodal communication system that combines emotion recognition, adaptive machine translation, speech synthesis, and privacy-preserving intelligence to enable context-aware, emotionally expressive Hindi–English conversations in real time.',
  },
  {
    label: 'RESEARCH PAPER',
    heading:
      'Audio Deepfake Detection via Multi-Domain Feature Fusion with Explainability and Uncertainty Quantification',
    meta: 'Submitted to International Journal of Machine Learning and Cybernetics (Springer) · Under Review',
    body: 'A deep learning framework for audio deepfake detection that combines multi-domain feature fusion, explainable AI, and uncertainty quantification to deliver reliable, interpretable, and confidence-aware forensic analysis.',
  },
  {
    label: 'RESEARCH PAPER — IN PROGRESS',
    heading: 'Research in Wearable AI & Human Activity Recognition',
    body: 'Developing a novel AI framework for energy-efficient wearable systems that leverages adaptive sensing, predictive activity recognition, and intelligent resource optimization. Details will be made public upon submission.',
  },
];

/**
 * Section 06 — Research.
 * Replaces the former "Ask My AI" (Knowledge Core) section.
 * 3-up card grid on desktop, 1-up on mobile. Hairline separators before/after.
 */
export function Research() {
  return (
    <>
      <Hairline />
      <Section id="research" data-section="research" aria-labelledby="research-heading">
        <Container>
          <StampLabel className={styles.stamp}>Research</StampLabel>

          <h2 id="research-heading" className={styles.heading}>
            Patents &amp; Publications
          </h2>

          <div className={styles.grid}>
            {RESEARCH_ITEMS.map((item, i) => (
              <article
                key={item.heading}
                className={styles.card}
                style={{ '--stagger-delay': `${i * 80}ms` } as React.CSSProperties}
              >
                <StampLabel className={styles.itemLabel}>{item.label}</StampLabel>
                <h3 className={styles.itemHeading}>{item.heading}</h3>
                {item.meta && <p className={styles.itemMeta}>{item.meta}</p>}
                <p className={styles.itemBody}>{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <Hairline />
    </>
  );
}
