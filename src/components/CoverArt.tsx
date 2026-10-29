import type { CoverTheme } from '../data/site'

interface CoverArtProps {
  readonly theme: CoverTheme
  readonly mark: string
  readonly image?: string
  readonly size?: 'card' | 'wide' | 'mini'
}

/**
 * Covers link to the creators' public artwork. The gradient and monogram are
 * the fallback the live page also uses when a game has no cover image.
 */
export function CoverArt({ theme, mark, image, size = 'card' }: CoverArtProps) {
  return (
    <span className={`cover cover--${theme} cover--${size}`} aria-hidden="true">
      {image ? (
        <img className="cover__img" src={image} alt="" loading="lazy" decoding="async" />
      ) : (
        <span className="cover__mark">{mark}</span>
      )}
    </span>
  )
}
