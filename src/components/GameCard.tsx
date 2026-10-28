import type { PointerEvent as ReactPointerEvent } from 'react'
import type { Game } from '../data/games'
import { GameArtwork } from './GameArtwork'

interface GameCardProps {
  readonly game: Game
  readonly index: number
  readonly checked: boolean
  readonly inputRef: (node: HTMLInputElement | null) => void
  readonly onSelect: (gameId: string) => void
  readonly onReplay: (gameId: string) => void
  readonly burstNonce: number
  readonly motionEnabled: boolean
}

function ExternalArrow() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M6 14L14 6M7 6h7v7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Burst({ nonce }: { readonly nonce: number }) {
  return (
    <span className="game-card__burst" key={nonce} aria-hidden="true">
      <span className="burst__ring" />
      <span className="burst__word">GO!</span>
      {Array.from({ length: 10 }, (_, index) => (
        <span key={index} className="burst__spark" />
      ))}
    </span>
  )
}

export function GameCard({
  game,
  index,
  checked,
  inputRef,
  onSelect,
  onReplay,
  burstNonce,
  motionEnabled,
}: GameCardProps) {
  const inputId = `game-${game.id}`
  const cabinetNumber = String(index + 1).padStart(2, '0')

  function handlePointerMove(event: ReactPointerEvent<HTMLLIElement>) {
    if (!motionEnabled || event.pointerType !== 'mouse') {
      return
    }

    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    card.style.setProperty('--pointer-x', `${(x * 100).toFixed(1)}%`)
    card.style.setProperty('--pointer-y', `${(y * 100).toFixed(1)}%`)
    card.style.setProperty('--tilt-x', `${((0.5 - y) * 4).toFixed(2)}deg`)
    card.style.setProperty('--tilt-y', `${((x - 0.5) * 5).toFixed(2)}deg`)
  }

  function handlePointerLeave(event: ReactPointerEvent<HTMLLIElement>) {
    const card = event.currentTarget
    card.style.setProperty('--pointer-x', '50%')
    card.style.setProperty('--pointer-y', '50%')
    card.style.setProperty('--tilt-x', '0deg')
    card.style.setProperty('--tilt-y', '0deg')
  }

  function handleLabelClick() {
    // Re-selecting the active cabinet is a tiny excuse for another burst.
    if (checked) {
      onReplay(game.id)
    }
  }

  return (
    <li
      className={`game-card game-card--${game.accent}${checked ? ' is-selected' : ''}`}
      data-selected={checked ? 'true' : 'false'}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <input
        ref={inputRef}
        className="game-card__radio"
        type="radio"
        id={inputId}
        name="arcade-game"
        value={game.id}
        checked={checked}
        aria-label={`${game.title} by ${game.creator}`}
        onChange={() => onSelect(game.id)}
      />

      <label className="game-card__select" htmlFor={inputId} onClick={handleLabelClick}>
        <span className="game-card__art" aria-hidden="true">
          <GameArtwork art={game.art} />
          <span className="game-card__number">{cabinetNumber}</span>
          <span className="game-card__status">
            <span className="status-dot" />
            {checked ? 'Selected' : 'Ready'}
          </span>
        </span>

        <span className="game-card__body">
          <span className="game-card__genre">{game.genre}</span>
          <span className="game-card__title">{game.title}</span>
          <span className="game-card__creator">
            by <strong>{game.creator}</strong>
          </span>
          <span className="game-card__blurb">{game.blurb}</span>
          <span className="game-card__tags">
            {game.tags.map((tag) => (
              <span key={tag} className="game-card__tag">
                {tag}
              </span>
            ))}
          </span>
        </span>
      </label>

      <div className="game-card__deck">
        <a
          className="game-card__start"
          href={game.url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={checked ? 0 : -1}
          aria-label={`Press Start: ${game.title} by ${game.creator} (opens in a new tab)`}
        >
          <span>Press Start</span>
          <ExternalArrow />
        </a>
        <span className="game-card__meta" aria-hidden="true">
          {checked ? 'READY' : '1P'}
        </span>
      </div>

      {motionEnabled && burstNonce > 0 ? <Burst nonce={burstNonce} /> : null}
    </li>
  )
}
