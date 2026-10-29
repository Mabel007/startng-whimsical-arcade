import { act, fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import App from './App'
import { COMMUNITY_GAMES, FAQS, NAV_LINKS } from './data/site'
import { installMatchMedia } from './test/matchMedia'

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

    const faces = document.querySelectorAll('.peek-face')
    expect(faces).toHaveLength(COMMUNITY_GAMES.length)

    for (const face of faces) {
      expect(face).toHaveAttribute('aria-hidden', 'true')
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
