'use client';

import Head from 'next/head'
import Script from 'next/script'

/**
 * SEO Component (App Router Migration Note)
 * In Next.js App Router, it is recommended to use the Metadata API in your page or layout.
 * This component is kept as 'use client' for backward compatibility during migration,
 * but its Head usage may be inconsistent.
 */
export default function SEO({
  title,
  description,
  keywords = [],
  url,
  image,
  author,
  config = {},
  jsonLd = null,
}) {
  const siteName = config.name || 'ClathraEnergies'
  const fullTitle = title ? `${title} | ${siteName}` : siteName
  const joinedKeywords = Array.isArray(keywords) ? keywords.join(', ') : keywords
  const metaImage = image || config?.images?.main_logo || config?.main_logo || ''

  // Note: App Router ignores <Head> in client components.
  // We'll keep this temporarily, but pages should move to generateMetadata.

  return (
    <>
      {/* JSON-LD structured data */}
      {jsonLd && (
        <Script id="ld+json" type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </Script>
      )}
    </>
  )
}
