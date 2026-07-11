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
import { Research } from '../components/sections/Research/Research';
import { Contact } from '../components/sections/Contact/Contact';
import { Footer } from '../components/sections/Footer/Footer';

/**
 * Home page — single-page portfolio.
 * Section order per IA:
 *   Hero → [Hairline] → Signal → [Hairline auto] → Work → [Hairline] → Approach → [Hairline auto]
 *   → Stack → [Hairline] → Research → [Hairline] → Contact → Footer
 *
 * Hairlines inside Signal, Approach, Research, and Contact are managed by the
 * components themselves. The Hero→Signal Hairline is placed here.
 * IA Section 0.1: "Hairlines appear between Signal and Work, Work and Approach,
 * before and after Research."
 */
const SECTION_IDS = ['hero', 'signal', 'experience', 'work', 'research', 'stack', 'contact'];

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

        {/* Section 03 — Experience (includes Hairline at bottom) */}
        <Approach />

        {/* Section 04 — Projects */}
        <Work />
        <Hairline />

        {/* Section 05 — Research (includes Hairlines before and after) */}
        <Research />

        {/* Section 06 — Stack */}
        <Stack />

        {/* Section 07 — Contact (includes Hairline at top) */}
        <Contact />
      </main>

      {/* Footer — full-width recessed background */}
      <Footer />

      <BackToTop />
    </>
  );
}
