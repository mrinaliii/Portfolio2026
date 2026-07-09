import { Helmet } from 'react-helmet-async';
import { BackToTop } from '../components/ui/BackToTop/BackToTop';
import { Nav } from '../components/navigation/Nav/Nav';
import { ScrollDepthIndicator } from '../components/navigation/ScrollDepthIndicator/ScrollDepthIndicator';
import { Hero } from '../components/sections/Hero/Hero';
import { Hairline } from '../components/layout/Hairline/Hairline';
import { Signal } from '../components/sections/Signal/Signal';
import { Work } from '../components/sections/Work/Work';
import { Approach } from '../components/sections/Approach/Approach';
import { Stack } from '../components/sections/Stack/Stack';
import { KnowledgeCore } from '../components/sections/KnowledgeCore/KnowledgeCore';
import { Contact } from '../components/sections/Contact/Contact';
import { Footer } from '../components/sections/Footer/Footer';

/**
 * Home page — single-page portfolio.
 * Section order per IA:
 *   Hero → [Hairline] → Signal → [Hairline auto] → Work → [Hairline] → Approach → [Hairline auto]
 *   → Stack → [KC Hairline] → Knowledge Core → [KC Hairline] → Contact → Footer
 *
 * Hairlines inside Signal, Approach, KnowledgeCore, and Contact are managed by the
 * components themselves. The Hero→Signal Hairline is placed here.
 * IA Section 0.1: "Hairlines appear between Signal and Work, Work and Approach,
 * before and after Knowledge Core."
 */
const SECTION_IDS = ['hero', 'signal', 'work', 'approach', 'stack', 'knowledge-core', 'contact'];

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Mrinali Charhate — AI · Security · Systems</title>
        <meta
          name="description"
          content="Computer Science student specializing in Information Security, exploring the intersection of Artificial Intelligence, Machine Learning, and Cybersecurity."
        />
        <meta property="og:title" content="Mrinali Charhate — AI · Security · Systems" />
        <meta
          property="og:description"
          content="Portfolio of Mrinali Charhate — building intelligent systems at the intersection of AI and security."
        />
        <meta name="theme-color" content="#070911" />
      </Helmet>

      <Nav />
      <ScrollDepthIndicator sectionIds={SECTION_IDS} />

      <main id="main-content">
        {/* Section 01 — Hero */}
        <Hero />
        <Hairline />

        {/* Section 02 — Signal (includes Hairline at bottom) */}
        <Signal />

        {/* Section 03 — Work */}
        <Work />
        <Hairline />

        {/* Section 04 — Approach (includes Hairline at bottom) */}
        <Approach />

        {/* Section 05 — Stack */}
        <Stack />

        {/* Section 06 — Knowledge Core (includes Hairlines before and after) */}
        <KnowledgeCore />

        {/* Section 07 — Contact (includes Hairline at top) */}
        <Contact />
      </main>

      {/* Footer — full-width recessed background */}
      <Footer />

      <BackToTop />
    </>
  );
}
