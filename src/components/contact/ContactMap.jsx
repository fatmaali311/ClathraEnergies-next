import React from 'react'

export default function ContactMap({ embedUrl }) {
  if (!embedUrl) return null
  return (
    <div className="w-full h-64 md:h-96 rounded-md overflow-hidden">
      <iframe src={embedUrl} className="w-full h-full border-0" loading="lazy" />
    </div>
  )
}
