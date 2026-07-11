#!/usr/bin/env bash
# =============================================================================
# scripts/check-tokens.sh
# Token audit — verifies no component CSS Module introduces raw design values.
#
# Run: bash scripts/check-tokens.sh
# Exit 0 = clean, Exit 1 = violations found.
#
# Checks:
#   1. Raw hex colors    (#rrggbb, #rgb, #rrggbbaa) in component .module.css
#   2. Raw rgba/rgb()    in component .module.css
#   3. Raw z-index       (numeric literals) in component .module.css
#   4. Named colors      (red, blue, white, black, etc.) in component .module.css
#
# Exempt files:
#   src/styles/tokens.css   — the token source of truth
#   src/styles/global.css   — permitted to use tokens directly in reset rules
#   src/styles/typography.css
#   src/styles/animations.css
# =============================================================================

set -euo pipefail

COMPONENT_CSS=$(find src/components src/pages -name "*.module.css" 2>/dev/null || true)
EXIT_CODE=0

if [ -z "$COMPONENT_CSS" ]; then
  echo "✓ No component CSS modules found yet."
  exit 0
fi

echo "Auditing component CSS modules for raw design values..."
echo ""

# ─── Check 1: Raw hex colors ───────────────────────────────────────────────
HEX_VIOLATIONS=$(echo "$COMPONENT_CSS" | xargs grep -nE "(:|,|^)\s*#[0-9a-fA-F]{3,8}\b" 2>/dev/null | \
  grep -v "^\s*[/*]" || true)

if [ -n "$HEX_VIOLATIONS" ]; then
  echo "✗ RAW HEX COLORS — Use a CSS custom property from tokens.css:"
  echo "$HEX_VIOLATIONS"
  echo ""
  EXIT_CODE=1
fi

# ─── Check 2: Raw rgba/rgb() calls ─────────────────────────────────────────
RGBA_VIOLATIONS=$(echo "$COMPONENT_CSS" | xargs grep -nE "rgba?\s*\(" 2>/dev/null | \
  grep -v "var(--" | grep -v "^\s*[/*]" || true)

if [ -n "$RGBA_VIOLATIONS" ]; then
  echo "✗ RAW rgba/rgb() — Use a CSS custom property from tokens.css:"
  echo "$RGBA_VIOLATIONS"
  echo ""
  EXIT_CODE=1
fi

# ─── Check 3: Raw z-index numbers ──────────────────────────────────────────
ZINDEX_VIOLATIONS=$(echo "$COMPONENT_CSS" | xargs grep -nE "z-index\s*:\s*[0-9]+" 2>/dev/null | \
  grep -v "var(--z-" | grep -v "^\s*[/*]" || true)

if [ -n "$ZINDEX_VIOLATIONS" ]; then
  echo "✗ RAW Z-INDEX — Use var(--z-*) from tokens.css:"
  echo "$ZINDEX_VIOLATIONS"
  echo ""
  EXIT_CODE=1
fi

# ─── Check 4: Named CSS colors ─────────────────────────────────────────────
NAMED_COLOR_VIOLATIONS=$(echo "$COMPONENT_CSS" | \
  xargs grep -nEi "(:\s*)(red|green|blue|white|black|gray|grey|yellow|orange|purple|pink|brown|transparent(?! ))\s*[;,]" \
  2>/dev/null | grep -v "transparent" | grep -v "^\s*[/*]" || true)

if [ -n "$NAMED_COLOR_VIOLATIONS" ]; then
  echo "✗ NAMED COLORS — Use a CSS custom property from tokens.css:"
  echo "$NAMED_COLOR_VIOLATIONS"
  echo ""
  EXIT_CODE=1
fi

# ─── Summary ───────────────────────────────────────────────────────────────
if [ "$EXIT_CODE" -eq 0 ]; then
  FILE_COUNT=$(echo "$COMPONENT_CSS" | wc -l | tr -d ' ')
  echo "✓ $FILE_COUNT component CSS module(s) checked — no raw design values found."
  echo "  All colors, z-indices, and colors are sourced from tokens.css."
else
  echo "────────────────────────────────────────────────────────────────"
  echo "  Add the required value to src/styles/tokens.css and reference"
  echo "  it as var(--token-name). Never define values locally."
  echo "────────────────────────────────────────────────────────────────"
  exit 1
fi
