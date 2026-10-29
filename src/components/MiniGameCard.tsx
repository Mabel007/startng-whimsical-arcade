import type { GameEntry } from '../data/site'
import { CoverArt } from './CoverArt'
import { ArrowUpRightIcon } from './Icons'

interface MiniGameCardProps {
  readonly game: GameEntry
  readonly showMeta?: boolean
}

export function MiniGameCard({ game, showMeta = false }: MiniGameCardProps) {
  return (
    <article className={`mini-card${showMeta ? ' mini-card--meta' : ''}`}>
      <a className="mini-card__link" href={game.href}>
        <CoverArt theme={game.theme} mark={game.mark} image={game.image} size="wide" />
        <span className="mini-card__info">
          <span className="mini-card__title">{game.title}</span>
          {showMeta ? <span className="mini-card__url">{game.displayUrl}</span> : null}
          <span className="mini-card__creator">by {game.creator}</span>
        </span>
      </a>
      {showMeta ? (
        <a className="mini-card__view" href={game.href} aria-label={`View ${game.title}`}>
          View
          <ArrowUpRightIcon />
        </a>
      ) : null}
    </article>
  )
}
