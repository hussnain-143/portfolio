import React from 'react';

interface JsonLdProps {
  data: Record<string, any>;
}

/**
 * Server component rendering structured JSON-LD data for search engines.
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
