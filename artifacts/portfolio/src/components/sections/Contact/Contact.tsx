import { useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Section } from '../../layout/Section/Section';
import { StampLabel } from '../../ui/StampLabel/StampLabel';
import { Hairline } from '../../layout/Hairline/Hairline';
import { Tooltip } from '../../ui/Tooltip/Tooltip';
import { copyToClipboard } from '../../../lib/clipboard';
import { analytics } from '../../../lib/analytics';
import styles from './Contact.module.css';

const EMAIL = 'mrinalicharhate@gmail.com';
const LINKEDIN_URL = 'https://linkedin.com/in/mrinali-charhate';
const GITHUB_URL = 'https://github.com/mrinali-charhate';

/**
 * Section 07 — Contact.
 * Centered layout (only section with centered alignment — marks the ending, IA Section 07).
 * Email copy-to-clipboard with Tooltip confirmation.
 * Ice Signal accent fires on the email address only.
 * CONTENT.md §CONTACT.
 */
export function Contact() {
  const [copied, setCopied] = useState(false);

  async function handleEmailClick(e: React.MouseEvent) {
    e.preventDefault();
    const success = await copyToClipboard(EMAIL);
    if (success) {
      analytics.emailCopy();
      setCopied(true);
      setTimeout(() => setCopied(false), 2100); // 150ms + 1800ms + 150ms buffer
    }
  }

  function handleSocialClick(platform: string) {
    analytics.socialClick(platform);
  }

  return (
    <>
      <Hairline />
      <Section id="contact" data-section="contact" aria-labelledby="contact-heading">
        <div className={styles.inner}>
          <StampLabel className={styles.stamp}>Contact</StampLabel>

          <h2 id="contact-heading" className={styles.heading}>
            Let's Build Something Meaningful
          </h2>

          <p className={styles.subtext}>
            I'm always interested in conversations about Artificial Intelligence, Cybersecurity,
            software engineering, research, and opportunities to build impactful technology.
          </p>

          {/* Email — primary action, ice-signal accent */}
          <Tooltip
            content={copied ? 'Copied ✓' : 'Click to copy'}
            placement="bottom"
          >
            <a
              href={`mailto:${EMAIL}`}
              className={styles.email}
              onClick={handleEmailClick}
              aria-label={`${EMAIL} — click to copy to clipboard`}
            >
              {EMAIL}
            </a>
          </Tooltip>

          {/* Social links — ghost buttons */}
          <div className={styles.socials}>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              onClick={() => handleSocialClick('linkedin')}
              aria-label="LinkedIn profile"
            >
              <Linkedin size={16} strokeWidth={1.5} aria-hidden="true" />
              LinkedIn
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              onClick={() => handleSocialClick('github')}
              aria-label="GitHub profile"
            >
              <Github size={16} strokeWidth={1.5} aria-hidden="true" />
              GitHub
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className={styles.socialLink}
              aria-label="Send email"
            >
              <Mail size={16} strokeWidth={1.5} aria-hidden="true" />
              Email
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
