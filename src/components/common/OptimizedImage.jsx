/**
 * Renders an optimized image with proper loading strategies and accessibility attributes.
 */
import Image from 'next/image'
import { getImageUrl } from '../../utils/imageUtils'

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 75,
  ...props
}) {
  // If src is a relative path, use getImageUrl to resolve it
  const imageSrc = src?.startsWith('http') ? src : getImageUrl(src)
  
  return (
    <div className={`relative`}>
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        // Next Image handles eager loading when `priority` is true — forward it.
        priority={priority}
        // Provide safe defaults so CSS changes to only one dimension don't break aspect ratio.
        style={{ width: 'auto', height: 'auto', ...(props.style || {}) }}
        className={className}
        {...props}
      />
    </div>
  )
}