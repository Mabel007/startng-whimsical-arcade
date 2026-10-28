import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { GameCard } from './components/GameCard'
import { GAMES } from './data/games'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'

/** Decorative motion stops well inside the five-second accessibility window. */
const AMBIENT_STOP_DELAY_MS = 4500

const MARQUEE_ITEMS = [
  'Insert coin',
  'Lagos Bike Rush',
  'Boju Boju',
  'Job Hunt',
  'Pick a cabinet',
  'Press start',
  'Free play',
] as const

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

function CoinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9" fill="#ffc44d" stroke="#0a0412" strokeWidth="2" />
      <path
        d="M12 6.8l1.45 2.95 3.25.47-2.35 2.29.55 3.24L12 14.22l-2.9 1.53.55-3.24-2.35-2.29 3.25-.47z"
        fill="#0a0412"
      />
    </svg>
  )
}

function MarqueeGroup({ duplicate = false }: { readonly duplicate?: boolean }) {
  return (
    <div className="marquee__group" data-duplicate={duplicate ? 'true' : undefined}>
      {MARQUEE_ITEMS.map((item) => (
        <span key={item} className="marquee__item">
          {item}
          <span className="marquee__star" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </div>
  )
}

export default function App() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [selectedId, setSelectedId] = useState(GAMES[0].id)
  const [announcement, setAnnouncement] = useState('')
  const [reaction, setReaction] = useState<{ readonly id: string; readonly nonce: number } | null>(null)
  const [lastMotionPreference, setLastMotionPreference] = useState(prefersReducedMotion)
  const [ambientStopped, setAmbientStopped] = useState(false)
  const radioRefs = useRef<Array<HTMLInputElement | null>>([])
  const reactionCount = useRef(0)

  const selectedGame = GAMES.find((game) => game.id === selectedId) ?? GAMES[0]
  const ambientPaused = prefersReducedMotion || ambientStopped

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setAmbientStopped(true)
    }, AMBIENT_STOP_DELAY_MS)

    return () => {
      window.clearTimeout(timer)
    }
  }, [])

  // Invalidate before commit on either preference change: never resurrect an old event.
  if (lastMotionPreference !== prefersReducedMotion) {
    setLastMotionPreference(prefersReducedMotion)
    setReaction(null)
  }

  const triggerReaction = useCallback(
    (gameId: string) => {
      if (prefersReducedMotion) {
        return
      }

      reactionCount.current += 1
      setReaction({ id: gameId, nonce: reactionCount.current })
    },
    [prefersReducedMotion],
  )

  const selectGame = useCallback(
    (gameId: string) => {
      const game = GAMES.find((candidate) => candidate.id === gameId)
      if (!game) {
        return
      }

      setSelectedId(gameId)
      setAnnouncement(`${game.title} by ${game.creator} selected. Press Start to play.`)
      triggerReaction(gameId)
    },
    [triggerReaction],
  )

  function handlePickerKeyDown(event: KeyboardEvent<HTMLFieldSetElement>) {
    if (!(event.target instanceof HTMLInputElement) || event.target.type !== 'radio') {
      return
    }

    const currentIndex = radioRefs.current.indexOf(event.target)
    if (currentIndex < 0) {
      return
    }

    let nextIndex: number

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (currentIndex + 1) % GAMES.length
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = (currentIndex - 1 + GAMES.length) % GAMES.length
        break
      case 'Home':
        nextIndex = 0
        break
      case 'End':
        nextIndex = GAMES.length - 1
        break
      default:
        return
    }

    event.preventDefault()
    const nextRadio = radioRefs.current[nextIndex]
    nextRadio?.focus()
    nextRadio?.click()
  }

  return (
    <div className="page" data-ambient={ambientPaused ? 'paused' : 'playing'}>
      <a className="skip-link" href="#games">
        Skip to the games
      </a>

      <div className="arcade-bg" aria-hidden="true">
        <span className="spark spark--1" />
        <span className="spark spark--2" />
        <span className="spark spark--3" />
        <span className="spark spark--4" />
        <span className="spark spark--5" />
      </div>

      <header className="site-header">
        <a className="brand" href="https://start.ng/" target="_blank" rel="noopener noreferrer">
          <span className="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
              <rect x="1.5" y="1.5" width="29" height="29" rx="8" fill="#0a0412" stroke="#c9ff4a" strokeWidth="2" />
              <path d="M11 8h10v3.5h-3v5h3V20H11v-3.5h3v-5h-3z" fill="#ff4fa3" />
              <circle cx="11.5" cy="24" r="2" fill="#55e7ff" />
              <circle cx="20.5" cy="24" r="2" fill="#ffc44d" />
            </svg>
          </span>
          <span className="brand__word">
            start<span>.ng</span>
          </span>
          <span className="brand__tag">Arcade</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>

        <nav className="site-nav" aria-label="Start.ng">
          <span className="hng-pill" aria-hidden="true">
            HNG15
          </span>
          <a className="top-link" href="https://start.ng/games" target="_blank" rel="noopener noreferrer">
            All games
            <ExternalArrow />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </nav>
      </header>

      <main id="main-content" data-motion={prefersReducedMotion ? 'reduced' : 'full'}>
        <section className="hero" aria-labelledby="hero-title">
          <p className="pixel-label reveal">Start.ng presents · HNG15</p>

          <h1 id="hero-title" className="hero__title reveal reveal--1">
            <span className="hero__title-top">Whimsical</span>
            <span className="arcade-word">Arcade</span>
          </h1>

          <p className="hero__lede reveal reveal--2">
            Three community games, one very playful cabinet. Pick a card, watch it light up, then
            press start. No downloads. No quarters. Just one more run.
          </p>

          <div className="hero__actions reveal reveal--3">
            <a className="btn-coin" href="#games">
              Choose a game
              <CoinIcon />
            </a>
            <a className="btn-ghost" href="https://start.ng/games" target="_blank" rel="noopener noreferrer">
              Browse all games
              <ExternalArrow />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>

          <ul className="hero__stats reveal reveal--4" aria-label="Arcade facts">
            <li>
              <span className="hero__stat-value">03</span>
              <span className="hero__stat-label">cabinets</span>
            </li>
            <li>
              <span className="hero__stat-value">0</span>
              <span className="hero__stat-label">downloads</span>
            </li>
            <li>
              <span className="hero__stat-value">100%</span>
              <span className="hero__stat-label">in your browser</span>
            </li>
          </ul>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            <MarqueeGroup />
            <MarqueeGroup duplicate />
          </div>
        </div>

        <section id="games" className="arcade-section" aria-labelledby="games-heading">
          <div className="cabinet reveal">
            <div className="cabinet__marquee" aria-hidden="true">
              <div className="cabinet__bulbs cabinet__bulbs--left">
                {Array.from({ length: 4 }, (_, index) => (
                  <span key={index} className="bulb" />
                ))}
              </div>
              <p className="cabinet__marquee-text">Choose your cabinet</p>
              <div className="cabinet__bulbs cabinet__bulbs--right">
                {Array.from({ length: 4 }, (_, index) => (
                  <span key={index} className="bulb" />
                ))}
              </div>
            </div>

            <div className="cabinet__screen">
              <div className="screen__topbar">
                <p className="screen__label">Cabinet select</p>
                <p className="screen__online">
                  <span className="status-dot" aria-hidden="true" />
                  3 / 3 ready
                </p>
              </div>

              <div className="screen__intro">
                <div>
                  <h2 id="games-heading">Pick a cabinet.</h2>
                  <p id="arcade-instructions" className="screen__instructions">
                    Click or tap a card to load it. Use the arrow keys to browse, then Tab to the
                    selected Press Start and hit Enter. Every game opens in a new tab.
                  </p>
                </div>
                <div className="player-badge" aria-hidden="true">
                  <span>Player</span>
                  <strong>1</strong>
                </div>
              </div>

              <fieldset className="game-picker" aria-describedby="arcade-instructions" onKeyDown={handlePickerKeyDown}>
                <legend className="sr-only">Choose a game</legend>
                <ul className="game-list" aria-label="Arcade games">
                  {GAMES.map((game, index) => (
                    <GameCard
                      key={game.id}
                      game={game}
                      index={index}
                      checked={game.id === selectedId}
                      inputRef={(node) => {
                        radioRefs.current[index] = node
                      }}
                      onSelect={selectGame}
                      onReplay={triggerReaction}
                      reactionNonce={reaction?.id === game.id ? reaction.nonce : 0}
                      motionEnabled={!prefersReducedMotion}
                    />
                  ))}
                </ul>
              </fieldset>

              <div className="screen__controls">
                <div className="joystick" aria-hidden="true">
                  <span className="joystick__stick" />
                  <span className="joystick__base" />
                </div>
                <div
                  className={`player-readout player-readout--${selectedGame.accent}`}
                  aria-hidden="true"
                >
                  <span className="player-readout__label">Now selected</span>
                  <strong>{selectedGame.title}</strong>
                  <span className="player-readout__creator">by {selectedGame.creator}</span>
                </div>
                <p className="screen__hint" aria-hidden="true">
                  <kbd>←</kbd>
                  <kbd>→</kbd>
                  <span>choose</span>
                  <span className="screen__hint-dot">·</span>
                  <kbd>Tab</kbd>
                  <span>start</span>
                </p>
                <div className="action-buttons" aria-hidden="true">
                  <span className="action-button action-button--pink" />
                  <span className="action-button action-button--cyan" />
                </div>
              </div>
            </div>

            <div className="cabinet__base">
              <p>No quarters. No downloads. Just three good games.</p>
              <p className="cabinet__badge">Free play</p>
            </div>
          </div>

          <p className="arcade-note">
            Every cabinet links straight to its live Start.ng game.{' '}
            <a href="https://start.ng/games" target="_blank" rel="noopener noreferrer">
              See all games
              <ExternalArrow />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </section>

        <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {announcement}
        </div>
      </main>

      <footer className="site-footer">
        <p>
          <span className="site-footer__brand">start.ng</span> Whimsical Arcade · built for HNG15
        </p>
        <p className="site-footer__links">
          <a href="https://start.ng/about" target="_blank" rel="noopener noreferrer">
            About start.ng
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a href="https://start.ng/docs" target="_blank" rel="noopener noreferrer">
            Publish a game
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      </footer>
    </div>
  )
}
