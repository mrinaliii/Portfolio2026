import { useEffect, useRef, useState } from 'react';
import styles from './LazyImage.module.css';

interface LazyImageProps {
  src: string;
  lqip: string;           // Base64 data URI — inline LQIP
  alt: string;
  aspectRatio: string;    // CSS aspect-ratio value, e.g. '3 / 4'
  eager?: boolean;        // true for hero portrait (above-fold, LCP)
  avif?: string;          // Optional AVIF source URL
  webp?: string;          // Optional WebP source URL
  className?: string;
}

/**
 * Blur-up lazy image.
 * 1. Renders the LQIP placeholder immediately — no network round-trip.
 * 2. Loads the full image in the background.
 * 3. Crossfades to full image on load.
 *
 * For eager images (hero portrait):
 * - loading="eager", fetchpriority="high"
 * - LQIP is bypassed once the full image loads (typically before entrance animation)
 *
 * DS Section 10a, TIP Milestone 1.
 */
export function LazyImage({
  src,
  lqip,
  alt,
  aspectRatio,
  eager = false,
  avif,
  webp,
  className,
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Handle already-cached images (img.complete fires before onLoad)
  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, []);

  return (
    <div
      className={[styles.wrapper, className].filter(Boolean).join(' ')}
      style={{ aspectRatio }}
    >
      {/* LQIP — always present, fades out once full image is ready */}
      <img
        className={[styles.lqip, loaded && styles.lqipLoaded].filter(Boolean).join(' ')}
        src={lqip}
        alt=""
        aria-hidden="true"
        draggable={false}
      />

      {/* Full resolution — fades in on load */}
      <picture>
        {avif && <source srcSet={avif} type="image/avif" />}
        {webp && <source srcSet={webp} type="image/webp" />}
        <img
          ref={imgRef}
          className={[styles.full, loaded && styles.fullLoaded].filter(Boolean).join(' ')}
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          /* @ts-expect-error — fetchpriority is valid but not yet in React types */
          fetchpriority={eager ? 'high' : 'auto'}
          decoding={eager ? 'sync' : 'async'}
          onLoad={() => setLoaded(true)}
          draggable={false}
        />
      </picture>
    </div>
  );
}
