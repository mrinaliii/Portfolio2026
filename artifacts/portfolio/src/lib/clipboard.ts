/**
 * clipboard.ts — async copy-to-clipboard with graceful degradation.
 * Rule: no component calls navigator.clipboard directly; all copy operations go through here.
 */

/**
 * Copy `text` to the clipboard.
 * - Uses the modern Clipboard API when available (HTTPS or localhost).
 * - Falls back to `document.execCommand('copy')` for older browsers.
 * @returns true on success, false on failure.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // Modern Clipboard API (requires HTTPS or localhost)
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to legacy method
    }
  }

  // Legacy fallback — execCommand (deprecated but widely supported)
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.cssText = 'position:absolute;left:-9999px;top:-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  } catch {
    return false;
  }
}
