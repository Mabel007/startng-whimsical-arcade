import { act, fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { COMMUNITY_GAMES, FAQS, NAV_LINKS } from './data/site'
import { installMatchMedia } from './test/matchMedia'
import { intersectionObserverMock } from './test/intersectionObserver'

function getCommunityCards() {
  return [...document.querySelectorAll<HTMLElement>('.community-grid .game-tile')]
}

function getCommunityLinks() {
  return getCommunityCards().map((card) => within(card).getAllByRole('link')[0])
}

describe('start.ng homepage', () => {
  it('keeps the verified hero, sections and wording', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: /good vibes\. good games\./i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'lagos-legends-street-quest.start.ng' }),
    ).toHaveAttribute('href', 'https://lagos-legends-street-quest.start.ng/')

    for (const heading of [
      /5 games\. 24 hours\. one winner\./i,
      /pick a category/i,
      /new this week/i,
      /games from the community/i,
      /explore games from independent creators/i,
      /got a game\? put it on start\.ng/i,
      /about start\.ng/i,
    ]) {
      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument()
    }

    expect(screen.getByRole('link', { name: /see all 188 games/i })).toHaveAttribute(
      'href',
      'https://start.ng/games',
    )
  })

  it('renders the verified categories, community games and creator picks', () => {
    render(<App />)

    expect(document.querySelectorAll('.category-grid .category')).toHaveLength(8)
    expect(document.querySelectorAll('.new-grid .mini-card')).toHaveLength(5)
    expect(document.querySelectorAll('.creator-grid .mini-card')).toHaveLength(4)

    const cards = getCommunityCards()
    expect(cards).toHaveLength(8)
    expect(getCommunityLinks().map((link) => link.getAttribute('href'))).toEqual(
      COMMUNITY_GAMES.map((game) => game.href),
    )

    for (const [index, game] of COMMUNITY_GAMES.entries()) {
      expect(cards[index]).toHaveTextContent(game.title)
      expect(cards[index]).toHaveTextContent(`by ${game.creator}`)
      expect(cards[index]).toHaveTextContent(game.displayUrl)
    }
  })

  it('keeps every peek face decorative and out of the accessible name', () => {
    render(<App />)

    // 5 cards have the generic peek face; 3 have game-specific reactions
    const faces = document.querySelectorAll('.peek-face')
    expect(faces).toHaveLength(5)

    for (const face of faces) {
      expect(face).toHaveAttribute('aria-hidden', 'true')
    }

    // Game reactions are also decorative
    const reactions = document.querySelectorAll('.game-reaction')
    expect(reactions).toHaveLength(3)
    for (const reaction of reactions) {
      expect(reaction).toHaveAttribute('aria-hidden', 'true')
    }

    expect(screen.getByRole('link', { name: 'The Hangout' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Play The Hangout' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'View Job Hunt' })).toBeInTheDocument()
  })

  it('links the header and footer to the verified destinations', () => {
    render(<App />)

    const primary = screen.getByRole('navigation', { name: 'Primary' })
    expect(within(primary).getAllByRole('link').map((link) => link.getAttribute('href'))).toEqual(
      NAV_LINKS.map((link) => link.href),
    )

    const play = screen.getByRole('navigation', { name: 'Play footer' })
    expect(within(play).getByRole('link', { name: 'Leaderboard' })).toHaveAttribute(
      'href',
      'https://start.ng/leaderboard',
    )

    const make = screen.getByRole('navigation', { name: 'Make games footer' })
    expect(within(make).getByRole('link', { name: 'Docs for your AI (.md)' })).toHaveAttribute(
      'href',
      'https://start.ng/docs.md',
    )
  })

  it('renders the six questions as native disclosure widgets', () => {
    render(<App />)

    const items = document.querySelectorAll('details.faq__item')
    expect(items).toHaveLength(FAQS.length)

    for (const [index, item] of [...items].entries()) {
      expect(item).not.toHaveAttribute('open')
      expect(item.querySelector('summary')).toHaveTextContent(FAQS[index].question)
    }
  })

  it('offers the skip link as the first tab stop', async () => {
    const user = userEvent.setup()
    render(<App />)

    const skipLink = screen.getByRole('link', { name: /skip to the games/i })
    expect(skipLink).toHaveAttribute('href', '#games')

    await user.tab()
    expect(skipLink).toHaveFocus()
  })
})

describe('community card peek', () => {
  it('peeks while a mouse points at a card and settles when it leaves', async () => {
    const user = userEvent.setup()
    render(<App />)

    const [card] = getCommunityCards()
    const [link] = getCommunityLinks()
    expect(card).toHaveAttribute('data-peeking', 'false')

    await user.hover(link)
    expect(card).toHaveAttribute('data-peeking', 'true')
    expect(card).toHaveClass('is-peeking')

    await user.unhover(link)
    expect(card).toHaveAttribute('data-peeking', 'false')
    expect(card).not.toHaveClass('is-peeking')
  })

  it('peeks for keyboard focus and stays put while focus moves inside the card', async () => {
    const user = userEvent.setup()
    render(<App />)

    const [card] = getCommunityCards()
    const links = within(card).getAllByRole('link')

    act(() => links[0].focus())
    expect(card).toHaveAttribute('data-peeking', 'true')

    for (const link of links.slice(1)) {
      await user.tab()
      expect(link).toHaveFocus()
      expect(card).toHaveAttribute('data-peeking', 'true')
    }

    await user.tab()
    expect(card).not.toContainElement(document.activeElement as HTMLElement)
    expect(card).toHaveAttribute('data-peeking', 'false')
  })

  it('shows the same reaction briefly for a touch tap', () => {
    vi.useFakeTimers()

    try {
      render(<App />)

      const [card] = getCommunityCards()
      fireEvent.pointerDown(card, { pointerType: 'touch' })
      expect(card).toHaveAttribute('data-peeking', 'true')

      act(() => {
        vi.advanceTimersByTime(899)
      })
      expect(card).toHaveAttribute('data-peeking', 'true')

      act(() => {
        vi.advanceTimersByTime(1)
      })
      expect(card).toHaveAttribute('data-peeking', 'false')
    } finally {
      vi.useRealTimers()
    }
  })

  it('does not react to touch when reduced motion is requested', async () => {
    installMatchMedia(true)
    const user = userEvent.setup()
    render(<App />)

    const [card] = getCommunityCards()
    const [link] = getCommunityLinks()

    await user.hover(link)
    expect(card).toHaveAttribute('data-peeking', 'false')

    act(() => link.focus())
    expect(card).toHaveAttribute('data-peeking', 'false')

    fireEvent.pointerDown(card, { pointerType: 'touch' })
    expect(card).toHaveAttribute('data-peeking', 'false')
  })

  it('settles immediately when reduced motion turns on at runtime', async () => {
    const media = installMatchMedia(false)
    const user = userEvent.setup()
    render(<App />)

    const [card] = getCommunityCards()
    await user.hover(getCommunityLinks()[0])
    expect(card).toHaveAttribute('data-peeking', 'true')

    act(() => {
      media.setMatches(true)
    })

    expect(card).toHaveAttribute('data-peeking', 'false')
    expect(card).not.toHaveClass('is-peeking')
  })
})

describe('playful wave and assisted reveal', () => {
  beforeEach(() => {
    installMatchMedia(false)
    intersectionObserverMock.reset()
    intersectionObserverMock.install()
  })

  afterEach(() => {
    intersectionObserverMock.reset()
  })

  function peekingCards() {
    return getCommunityCards().filter((card) => card.dataset.peeking === 'true')
  }

  function advance(ms: number) {
    act(() => {
      vi.advanceTimersByTime(ms)
    })
  }

  /** fireEvent keeps Play-now clicks synchronous under vitest fake timers. */
  function observeClickPlayNow() {
    fireEvent.click(screen.getByRole('link', { name: 'Play now' }))
  }

  it('keeps Play now a real in-page anchor that does not wave off-screen', async () => {
    render(<App />)

    const playNow = screen.getByRole('link', { name: 'Play now' })
    expect(playNow).toHaveAttribute('href', '#games')

    // A real (user-level) click must still navigate to the section.
    const user = userEvent.setup()
    await user.click(playNow)
    expect(window.location.hash).toBe('#games')

    // No visibility signal yet: the wave must not have started.
    expect(peekingCards()).toHaveLength(0)
  })

  it('does not fire the featured greeting while the card is off-screen', () => {
    vi.useFakeTimers()
    try {
      render(<App />)

      const [featuredCard] = getCommunityCards()
      expect(featuredCard).toHaveClass('game-tile--featured')
      expect(featuredCard).toHaveAttribute('data-peeking', 'false')

      // Wall-clock time alone never triggers the reveal.
      advance(5000)
      expect(featuredCard).toHaveAttribute('data-peeking', 'false')

      // A callback that reports "not intersecting" must stay a no-op.
      act(() => {
        intersectionObserverMock.trigger(featuredCard, false)
      })
      expect(featuredCard).toHaveAttribute('data-peeking', 'false')
    } finally {
      vi.useRealTimers()
    }
  })

  it('fires the greeting exactly once when the featured card becomes visible', () => {
    vi.useFakeTimers()
    try {
      render(<App />)

      const [featuredCard] = getCommunityCards()
      act(() => {
        intersectionObserverMock.trigger(featuredCard, true)
      })
      expect(featuredCard).toHaveAttribute('data-peeking', 'true')
      expect(featuredCard).toHaveClass('is-peeking')

      advance(1599)
      expect(featuredCard).toHaveAttribute('data-peeking', 'true')
      advance(1)
      expect(featuredCard).toHaveAttribute('data-peeking', 'false')

      // One-time greeting, not a loop.
      advance(5000)
      expect(featuredCard).toHaveAttribute('data-peeking', 'false')

      // Visibility remains observed for cancellation, but never repeats a greeting.
      act(() => {
        intersectionObserverMock.trigger(featuredCard, true)
      })
      expect(featuredCard).toHaveAttribute('data-peeking', 'false')
    } finally {
      vi.useRealTimers()
    }
  })

  it('cancels a pending greeting when the visitor interacts with the card', () => {
    vi.useFakeTimers()
    try {
      render(<App />)

      const [featuredCard] = getCommunityCards()

      // A touch tap before any reveal interacts first and cancels it.
      fireEvent.pointerDown(featuredCard, { pointerType: 'touch' })
      expect(featuredCard).toHaveAttribute('data-peeking', 'true')

      advance(900)
      expect(featuredCard).toHaveAttribute('data-peeking', 'false')

      // Visibility callbacks cannot revive a greeting cancelled by direct input.
      act(() => {
        intersectionObserverMock.trigger(featuredCard, true)
      })
      expect(featuredCard).toHaveAttribute('data-peeking', 'false')
    } finally {
      vi.useRealTimers()
    }
  })

  it('waits for the community section to become visible, then waves in stagger', () => {
    vi.useFakeTimers()
    try {
      render(<App />)

      const section = document.getElementById('games')
      expect(section).not.toBeNull()

      observeClickPlayNow()
      advance(2000)
      expect(peekingCards()).toHaveLength(0)

      // Trigger visibility for the section
      act(() => {
        intersectionObserverMock.trigger(section!, true)
      })

      // Now trigger visibility for each card (the wave waits for each card)
      const cards = getCommunityCards()
      for (const card of cards) {
        act(() => {
          intersectionObserverMock.trigger(card, true)
        })
      }

      // Card 0 starts at visibility; each card follows 110ms later.
      advance(0)
      expect(peekingCards()).toHaveLength(1)
      advance(109)
      expect(peekingCards()).toHaveLength(1)
      advance(1)
      expect(peekingCards()).toHaveLength(2)
      advance(660)
      expect(peekingCards()).toHaveLength(8)

      advance(1600)
      expect(peekingCards()).toHaveLength(0)
    } finally {
      vi.useRealTimers()
    }
  })

  it('has at least three cards actively peeking when the section is visible', () => {
    vi.useFakeTimers()
    try {
      render(<App />)

      observeClickPlayNow()
      act(() => {
        intersectionObserverMock.trigger(document.getElementById('games')!, true)
      })

      // Trigger visibility for the first few cards
      const cards = getCommunityCards()
      for (const card of cards.slice(0, 4)) {
        act(() => {
          intersectionObserverMock.trigger(card, true)
        })
      }

      advance(330)

      expect(peekingCards().length).toBeGreaterThanOrEqual(3)
    } finally {
      vi.useRealTimers()
    }
  })

  it('replays the wave on repeated Play now and ignores stale visibility callbacks', () => {
    vi.useFakeTimers()
    try {
      render(<App />)

      const section = document.getElementById('games')!

      observeClickPlayNow()
      act(() => {
        intersectionObserverMock.trigger(section, true)
      })

      // Trigger visibility for all cards
      const cards = getCommunityCards()
      for (const card of cards) {
        act(() => {
          intersectionObserverMock.trigger(card, true)
        })
      }

      advance(50)
      expect(peekingCards().length).toBeGreaterThan(0)

      // Second activation mid-wave restarts the wave cleanly.
      observeClickPlayNow()

      // Need to re-trigger card observers for the new wave
      for (const card of cards) {
        act(() => {
          intersectionObserverMock.trigger(card, true)
        })
      }

      advance(760)
      expect(peekingCards().length).toBeGreaterThanOrEqual(3)

      advance(2000)
      expect(peekingCards()).toHaveLength(0)

      // A stale "still visible" callback has no pending wave to start.
      act(() => {
        intersectionObserverMock.trigger(section, true)
      })
      advance(2000)
      expect(peekingCards()).toHaveLength(0)
    } finally {
      vi.useRealTimers()
    }
  }, 15_000)

  it('stills everything for reduced motion and offers the static hint instead', () => {
    installMatchMedia(true)
    vi.useFakeTimers()
    try {
      render(<App />)

      expect(screen.getByTestId('peek-hint')).toBeInTheDocument()

      observeClickPlayNow()
      act(() => {
        intersectionObserverMock.trigger(document.getElementById('games')!, true)
      })
      advance(3000)
      expect(peekingCards()).toHaveLength(0)

      const [featuredCard] = getCommunityCards()
      // Visibility tracking continues, but cannot start a reduced-motion greeting.
      act(() => {
        intersectionObserverMock.trigger(featuredCard, true)
      })
      expect(featuredCard).toHaveAttribute('data-peeking', 'false')
    } finally {
      vi.useRealTimers()
    }
  })

  it('never queues a reduced-motion Play now for preference restoration', () => {
    const media = installMatchMedia(true)
    vi.useFakeTimers()
    try {
      render(<App />)
      observeClickPlayNow()
      act(() => {
        intersectionObserverMock.trigger(document.getElementById('games')!, true)
        for (const card of getCommunityCards()) intersectionObserverMock.trigger(card, true)
        media.setMatches(false)
      })
      advance(3000)
      expect(peekingCards()).toHaveLength(0)
    } finally {
      vi.useRealTimers()
    }
  })

  it('falls back to an untimed wave after Play now without IntersectionObserver', () => {
    intersectionObserverMock.reset()
    vi.useFakeTimers()
    try {
      render(<App />)

      observeClickPlayNow()
      advance(0)
      expect(peekingCards()).toHaveLength(1)

      advance(770)
      expect(peekingCards()).toHaveLength(8)

      advance(1600)
      expect(peekingCards()).toHaveLength(0)
    } finally {
      vi.useRealTimers()
      intersectionObserverMock.reset()
    }
  })

  it('disconnects every observer on unmount', () => {
    vi.useFakeTimers()
    try {
      const { unmount } = render(<App />)

      // One visibility observer per card plus the section visibility gate.
      expect(intersectionObserverMock.instances).toHaveLength(9)

      unmount()
      expect(intersectionObserverMock.disconnectCalls).toBe(9)
      expect(vi.getTimerCount()).toBe(0)

      // No observer may still fire after unmount.
      expect(() => {
        intersectionObserverMock.trigger(document.getElementById('games')!, true)
      }).toThrow(/No IntersectionObserver instance is observing/)
    } finally {
      vi.useRealTimers()
    }
  })
})
