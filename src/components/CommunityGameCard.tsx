import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent as ReactFocusEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import type { CommunityGame } from '../data/site'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { CoverArt } from './CoverArt'

/** Touch shows the same reaction briefly; mouse and keyboard hold it while active. */
const TOUCH_PEEK_MS = 900

export function CommunityGameCard({ game }: { readonly game: CommunityGame }) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [peek, setPeek] = useState({ active: false, reduced: prefersReducedMotion })
  const timer = useRef<number | null>(null)

  let peeking = peek.active && !prefersReducedMotion
  if (peek.reduced !== prefersReducedMotion) {
    peeking = false
    setPeek({ active: false, reduced: prefersReducedMotion })
  }

  const clearTimer = useCallback(() => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current)
      timer.current = null
    }
  }, [])

  useEffect(() => clearTimer, [clearTimer])

  useEffect(() => {
    if (prefersReducedMotion) {
      clearTimer()
    }
  }, [clearTimer, prefersReducedMotion])

  const holdPeek = useCallback(() => {
    if (prefersReducedMotion) {
      return
    }

    clearTimer()
    setPeek({ active: true, reduced: prefersReducedMotion })
  }, [clearTimer, prefersReducedMotion])

  const endPeek = useCallback(() => {
    clearTimer()
    setPeek((current) => ({ ...current, active: false }))
  }, [clearTimer])

  const tapPeek = useCallback(() => {
    if (prefersReducedMotion) {
      return
    }

    clearTimer()
    setPeek({ active: true, reduced: prefersReducedMotion })
    timer.current = window.setTimeout(() => {
      setPeek((current) => ({ ...current, active: false }))
      timer.current = null
    }, TOUCH_PEEK_MS)
  }, [clearTimer, prefersReducedMotion])

  function handlePointerEnter(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType !== 'touch') {
      holdPeek()
    }
  }

  function handlePointerLeave(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType !== 'touch') {
      endPeek()
    }
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType === 'touch') {
      tapPeek()
    }
  }

  function handleFocus() {
    holdPeek()
  }

  function handleBlur(event: ReactFocusEvent<HTMLElement>) {
    const nextTarget = event.relatedTarget
    if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) {
      return
    }

    endPeek()
  }

  return (
    <article
      className={`game-tile${game.featured ? ' game-tile--featured' : ''}${peeking ? ' is-peeking' : ''}`}
      data-peeking={peeking ? 'true' : 'false'}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <a className="game-tile__link" href={game.href}>
        <span className="game-tile__cover">
          <CoverArt theme={game.theme} mark={game.mark} image={game.image} />
          <span className="peek-face" aria-hidden="true">
            <span className="peek-face__eye" />
            <span className="peek-face__eye" />
            <span className="peek-face__smile" />
          </span>
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
    </article>
  )
}
