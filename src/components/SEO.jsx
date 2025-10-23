import Head from 'next/head'
import Script from 'next/script'

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
  const faviconHref = config?.images?.main_logo || config?.main_logo || '/favicon.ico'

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description || config?.metaDescription || siteName} />
        <meta name="keywords" content={joinedKeywords} />
        <meta name="author" content={author || siteName} />

        {/* Open Graph */}
        <meta property="og:site_name" content={siteName} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description || config?.metaDescription || siteName} />
  {url && <meta property="og:url" content={url} />}
  {metaImage && <meta property="og:image" content={metaImage} />}
        <meta property="og:type" content="website" />

        {/* Twitter */}
  <meta name="twitter:card" content={metaImage ? 'summary_large_image' : 'summary'} />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description || config?.metaDescription || siteName} />
  {metaImage && <meta name="twitter:image" content={metaImage} />}

        <link rel="canonical" href={url || '/'} />
        {/* prefer API-provided logo as favicon when available */}
        <link rel="icon" href={faviconHref} />
      </Head>

      {/* JSON-LD structured data */}
      {jsonLd && (
        <Script id="ld+json" type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </Script>
      )}
    </>
  )
}
