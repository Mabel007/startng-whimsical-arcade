import type { CSSProperties, FocusEvent as ReactFocusEvent, PointerEvent as ReactPointerEvent } from 'react'
import type { CommunityGame } from '../data/site'
import { useCardReaction } from '../hooks/useCardReaction'
import { isGameReaction } from '../lib/gameReactions'
import { CoverArt } from './CoverArt'
import { GameReaction } from './GameReaction'

export function CommunityGameCard({ game, index = 0, waveNonce = 0, revealOnce = false }: {
  readonly game: CommunityGame
  readonly index?: number
  readonly waveNonce?: number
  readonly revealOnce?: boolean
}) {
  const { cardRef, active: peeking, revision, duration, hold, preview, leave } =
    useCardReaction(game.id, index, waveNonce, revealOnce)
  const hasGameReaction = isGameReaction(game.id)
  const showGameReaction = hasGameReaction && peeking
  const showGenericPeek = !hasGameReaction

  function handlePointerEnter(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType !== 'touch') hold()
  }
  function handlePointerLeave(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType !== 'touch') leave()
  }
  function handlePointerDown(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType === 'touch') preview()
  }
  function handleFocus(event: ReactFocusEvent<HTMLElement>) {
    if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) return
    hold()
  }
  function handleBlur(event: ReactFocusEvent<HTMLElement>) {
    if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) return
    leave()
  }

  return (
    <article
      ref={cardRef}
      className={`game-tile${game.featured ? ' game-tile--featured' : ''}${peeking ? ' is-peeking' : ''}${hasGameReaction ? ' game-tile--reaction' : ''}`}
      style={{ '--reaction-duration': `${duration}ms` } as CSSProperties}
      data-revision={revision}
      data-peeking={peeking ? 'true' : 'false'}
      data-reaction={showGameReaction ? game.id : undefined}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <a className="game-tile__link" href={game.href}>
        <span className="game-tile__cover">
          <CoverArt theme={game.theme} mark={game.mark} image={game.image} />

          {showGenericPeek && (
            <span key={revision} className="peek-face" aria-hidden="true">
              <span className="peek-face__eye" />
              <span className="peek-face__eye" />
              <span className="peek-face__smile" />
            </span>
          )}

          {hasGameReaction && (
            <span className="game-reaction" aria-hidden="true">
              <GameReaction key={revision} gameId={game.id} reacting={peeking} />
            </span>
          )}
        </span>
        <span className="game-tile__info">
          <span className="game-tile__title">{game.title}</span>
          <span className="game-tile__url">{game.displayUrl}</span>
          <span className="game-tile__creator">by {game.creator}</span>
        </span>
      </a>

      <span className="game-tile__meta">
        <a
          className="game-tile__fav"
          href="https://start.ng/?signin"
          aria-label={`Sign in to add ${game.title} to favorites`}
          title="Sign in to save favorites"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.7 5 6.1 5c2.1 0 3.6 1.2 4.4 2.5h3C14.3 6.2 15.8 5 17.9 5c3.4 0 5.2 3.4 3.7 6.8C19.5 16.4 12 21 12 21z" />
          </svg>
        </a>
        <a className="game-tile__cta" href={game.href} aria-label={`${game.cta} ${game.title}`}>
          {game.cta}
        </a>
      </span>

      {hasGameReaction && (
        <button
          type="button"
          className="game-tile__preview"
          aria-label={`Preview ${game.title} reaction`}
          onClick={(e) => {
            e.stopPropagation()
            preview()
          }}
          onPointerDown={(e) => {
            e.stopPropagation()
          }}
        >
          <svg viewBox="0 0 20 20" aria-hidden="true" width="14" height="14">
            <path
              d="M10 3C5 3 1.7 7 1 10c.7 3 4 7 9 7s8.3-4 9-7c-.7-3-4-7-9-7z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="10" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span>Preview</span>
        </button>
      )}
    </article>
  )
}
