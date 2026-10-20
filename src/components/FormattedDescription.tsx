import React from 'react';

interface FormattedDescriptionProps {
  text: string;
  className?: string;
  bulletColor?: string;
}

/**
 * Parses a description string into separate points if it contains bullets (•),
 * markdown list items (- or *), or distinct newline-separated points.
 */
export function parseDescriptionPoints(text: string): string[] | null {
  if (!text || typeof text !== 'string') return null;
  const trimmed = text.trim();
  if (!trimmed) return null;

  // Case 1: Bullet characters (•) present (e.g. "• Point 1 • Point 2" or on newlines)
  if (trimmed.includes('•')) {
    const rawParts = trimmed.split('•');
    const points = rawParts
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    if (points.length > 1) {
      return points;
    }
  }

  // Case 2: Newline-separated lines (e.g. "- Point 1\n- Point 2" or numbered "1. Point 1\n2. Point 2")
  const lines = trimmed
    .split(/\r?\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length > 1) {
    const cleaned = lines.map((line) =>
      line.replace(/^([•\-\*]|\d+[\.\)])\s*/, '').trim()
    );
    if (cleaned.some((c) => c.length > 0)) {
      return cleaned.filter(Boolean);
    }
  }

  return null;
}

export default function FormattedDescription({
  text,
  className = '',
  bulletColor = '#FFB020',
}: FormattedDescriptionProps) {
  const points = parseDescriptionPoints(text);

  if (points && points.length > 1) {
    return (
      <ul className={`space-y-2 pt-1 ${className}`}>
        {points.map((point, index) => (
          <li key={index} className="flex items-start gap-2.5">
            <span
              className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 shadow-sm"
              style={{ backgroundColor: bulletColor }}
              aria-hidden="true"
            />
            <span className="flex-1 leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p className={`whitespace-pre-line leading-relaxed ${className}`}>
      {text}
    </p>
  );
}
