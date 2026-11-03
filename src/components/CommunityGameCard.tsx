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

/** The hero "wave" staggers a brief peek across every community card. */
const WAVE_STAGGER_MS = 110
const WAVE_HOLD_MS = 1000

/** Featured cards greet visitors the moment their card scrolls into view. */
const ASSISTED_REVEAL_HOLD_MS = 1600

export function CommunityGameCard({
  game,
  index = 0,
  waveNonce = 0,
  revealOnce = false,
}: {
  readonly game: CommunityGame
  readonly index?: number
  /** Bump to play a one-off staggered peek across all cards. 0 = never played. */
  readonly waveNonce?: number
  /** Greet one assisted peek when the featured card first enters the viewport. */
  readonly revealOnce?: boolean
}) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [peek, setPeek] = useState({ active: false, reduced: prefersReducedMotion })
  const timer = useRef<number | null>(null)
  const cardRef = useRef<HTMLElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  // The greeting fires once per page lifecycle, and any direct interaction
  // with the card cancels it before it has had the chance to start.
  const revealDoneRef = useRef(false)
  const revealCancelledRef = useRef(false)

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

  const cancelReveal = useCallback(() => {
    revealCancelledRef.current = true
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
    }
  }, [])

  // One-time greeting when the featured card enters the viewport — not on a
  // page-load timer, so it is visible when it plays. Cancelled the moment
  // visitors interact themselves; skipped entirely for reduced motion.
  useEffect(() => {
    if (!revealOnce || prefersReducedMotion || revealDoneRef.current) {
      return
    }

    const node = cardRef.current
    if (!node) {
      return
    }

    // Browsers without IntersectionObserver never get the unsolicited peek;
    // visitors can still reveal the face themselves by interacting.
    if (typeof window === 'undefined' || typeof window.IntersectionObserver === 'undefined') {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) {
          return
        }
        // Fire once, then stop watching entirely.
        observer.disconnect()
        observerRef.current = null

        if (revealDoneRef.current || revealCancelledRef.current) {
          return
        }
        revealDoneRef.current = true

        clearTimer()
        setPeek({ active: true, reduced: prefersReducedMotion })
        timer.current = window.setTimeout(() => {
          setPeek((current) => ({ ...current, active: false }))
          timer.current = null
        }, ASSISTED_REVEAL_HOLD_MS)
      },
      { threshold: 0.35 },
    )

    observerRef.current = observer
    observer.observe(node)

    return () => {
      observer.disconnect()
      observerRef.current = null
    }
  }, [revealOnce, prefersReducedMotion, clearTimer])

  const holdPeek = useCallback(() => {
    if (prefersReducedMotion) {
      return
    }

    cancelReveal()
    clearTimer()
    setPeek({ active: true, reduced: prefersReducedMotion })
  }, [cancelReveal, clearTimer, prefersReducedMotion])

  const endPeek = useCallback(() => {
    clearTimer()
    setPeek((current) => ({ ...current, active: false }))
  }, [clearTimer])

  const tapPeek = useCallback(() => {
    if (prefersReducedMotion) {
      return
    }

    cancelReveal()
    clearTimer()
    setPeek({ active: true, reduced: prefersReducedMotion })
    timer.current = window.setTimeout(() => {
      setPeek((current) => ({ ...current, active: false }))
      timer.current = null
    }, TOUCH_PEEK_MS)
  }, [cancelReveal, clearTimer, prefersReducedMotion])

  function handlePointerEnter(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType !== 'touch') {
      holdPeek()
    }
  }

  // Wave: a short, staggered peek across every community card.
  useEffect(() => {
    if (waveNonce === 0 || prefersReducedMotion) {
      return
    }

    const show = window.setTimeout(() => {
      clearTimer()
      setPeek({ active: true, reduced: prefersReducedMotion })
      timer.current = window.setTimeout(() => {
        setPeek((current) => ({ ...current, active: false }))
        timer.current = null
      }, WAVE_HOLD_MS)
    }, index * WAVE_STAGGER_MS)

    return () => window.clearTimeout(show)
  }, [waveNonce, index, prefersReducedMotion, clearTimer])

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
      ref={cardRef}
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
