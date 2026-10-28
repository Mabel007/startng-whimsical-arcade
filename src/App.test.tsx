import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import App from './App'
import { GAMES } from './data/games'
import { installMatchMedia } from './test/matchMedia'

function getGameList() {
  return screen.getByRole('list', { name: 'Arcade games' })
}

function getStartLinks() {
  return within(getGameList()).getAllByRole('link')
}

function getRadio(gameIndex: number) {
  const game = GAMES[gameIndex]
  return screen.getByRole('radio', { name: `${game.title} by ${game.creator}` })
}

function trackClicksWithoutNavigating() {
  const clickedUrls: string[] = []

  function captureClick(event: MouseEvent) {
    const target = event.target
    if (!(target instanceof Element)) {
      return
    }

    const anchor = target.closest('a')
    if (anchor) {
      event.preventDefault()
      clickedUrls.push(anchor.href)
    }
  }

  document.addEventListener('click', captureClick, { capture: true })

  return {
    clickedUrls,
    stop: () => document.removeEventListener('click', captureClick, { capture: true }),
  }
}

describe('Whimsical Arcade', () => {
  it('renders exactly three selectable cabinets with the verified games', () => {
    render(<App />)

    const radios = screen.getAllByRole('radio')
    expect(radios).toHaveLength(3)

    for (const [index, game] of GAMES.entries()) {
      const radio = getRadio(index)
      expect(radio).toHaveAttribute('value', game.id)
      expect(radio.closest('li')).toHaveTextContent(game.title)
      expect(radio.closest('li')).toHaveTextContent(`by ${game.creator}`)
    }

    expect(getRadio(0)).toBeChecked()
    expect(getRadio(1)).not.toBeChecked()
    expect(getRadio(2)).not.toBeChecked()
  })

  it('links every Press Start control to the correct game and opens it securely', () => {
    render(<App />)

    const links = getStartLinks()
    expect(links).toHaveLength(3)
    expect(links.map((link) => link.getAttribute('href'))).toEqual(GAMES.map((game) => game.url))

    for (const link of links) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link.getAttribute('rel')).toContain('noopener')
      expect(link.getAttribute('rel')).toContain('noreferrer')
      expect(link).toHaveAccessibleName(/^Press Start: .+ by .+ \(opens in a new tab\)$/i)
    }
  })

  it('selects a game with a pointer click and updates the highlighted cabinet', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(document.querySelector('.game-card__burst')).toBeNull()

    const bojuRadio = getRadio(1)
    await user.click(bojuRadio)

    expect(bojuRadio).toBeChecked()
    expect(getRadio(0)).not.toBeChecked()
    expect(bojuRadio.closest('li')).toHaveAttribute('data-selected', 'true')
    expect(getRadio(0).closest('li')).toHaveAttribute('data-selected', 'false')
    expect(screen.getByRole('status')).toHaveTextContent(
      'Boju Boju by 99PlusOne selected. Press Start to play.',
    )
    expect(document.querySelectorAll('.game-card__burst')).toHaveLength(1)
  })

  it('supports touch-style selection by tapping the card content', async () => {
    const user = userEvent.setup()
    render(<App />)

    const jobCard = getRadio(2).closest('li')
    expect(jobCard).not.toBeNull()
    await user.click(within(jobCard as HTMLElement).getByText('Job Hunt'))

    expect(getRadio(2)).toBeChecked()
    expect(jobCard).toHaveAttribute('data-selected', 'true')
    expect(screen.getByRole('status')).toHaveTextContent('Job Hunt by Raji selected')
  })

  it('replays the celebration when the selected cabinet is tapped again', async () => {
    const user = userEvent.setup()
    render(<App />)

    const card = getRadio(0).closest('li')
    expect(card).not.toBeNull()
    const title = within(card as HTMLElement).getByText('Lagos Bike Rush')

    await user.click(title)
    const firstBurst = card?.querySelector('.game-card__burst')
    expect(firstBurst).not.toBeNull()

    await user.click(title)
    const secondBurst = card?.querySelector('.game-card__burst')

    expect(secondBurst).not.toBeNull()
    expect(secondBurst).not.toBe(firstBurst)
  })

  it('uses wrapping arrow navigation plus Home and End, and keeps the selected Press Start tabbable', async () => {
    const user = userEvent.setup()
    render(<App />)

    const radios = [getRadio(0), getRadio(1), getRadio(2)]
    const links = getStartLinks()

    radios[0].focus()
    await user.keyboard('{ArrowRight}')
    expect(radios[1]).toHaveFocus()
    expect(radios[1]).toBeChecked()
    expect(links[1]).toHaveAttribute('tabindex', '0')
    expect(links[0]).toHaveAttribute('tabindex', '-1')

    await user.keyboard('{ArrowDown}')
    expect(radios[2]).toHaveFocus()
    expect(radios[2]).toBeChecked()

    await user.keyboard('{ArrowRight}')
    expect(radios[0]).toHaveFocus()
    expect(radios[0]).toBeChecked()

    await user.keyboard('{ArrowLeft}')
    expect(radios[2]).toHaveFocus()

    await user.keyboard('{Home}')
    expect(radios[0]).toHaveFocus()
    expect(radios[0]).toBeChecked()

    await user.keyboard('{End}')
    expect(radios[2]).toHaveFocus()
    expect(radios[2]).toBeChecked()

    await user.tab()
    expect(links[2]).toHaveFocus()
  })

  it('launches the selected game from the keyboard with Enter', async () => {
    const user = userEvent.setup()
    const clicks = trackClicksWithoutNavigating()
    render(<App />)

    try {
      getRadio(0).focus()
      await user.keyboard('{ArrowRight}{ArrowRight}')
      await user.tab()
      expect(getStartLinks()[2]).toHaveFocus()

      await user.keyboard('{Enter}')
      expect(clicks.clickedUrls).toEqual([GAMES[2].url])
    } finally {
      clicks.stop()
    }
  })

  it('activates every Press Start link with the correct URL', async () => {
    const user = userEvent.setup()
    const clicks = trackClicksWithoutNavigating()
    render(<App />)

    try {
      for (const link of getStartLinks()) {
        await user.click(link)
      }

      expect(clicks.clickedUrls).toEqual(GAMES.map((game) => game.url))
    } finally {
      clicks.stop()
    }
  })

  it('groups the radios in a named fieldset with shared instructions', () => {
    render(<App />)

    const group = screen.getByRole('group', { name: 'Choose a game' })
    expect(group).toHaveAccessibleDescription(/Click or tap a card to load it/i)
    expect(within(group).getAllByRole('radio')).toHaveLength(3)
  })

  it('offers a skip link as the first tab stop', async () => {
    const user = userEvent.setup()
    render(<App />)

    const skipLink = screen.getByRole('link', { name: /skip to the games/i })
    expect(skipLink).toHaveAttribute('href', '#games')

    await user.tab()
    expect(skipLink).toHaveFocus()
  })

  it('stops ambient marquee and blinking motion within five seconds', () => {
    vi.useFakeTimers()

    try {
      render(<App />)

      const page = document.querySelector('.page')
      expect(page).toHaveAttribute('data-ambient', 'playing')

      act(() => {
        vi.advanceTimersByTime(5000)
      })

      expect(page).toHaveAttribute('data-ambient', 'paused')
    } finally {
      vi.useRealTimers()
    }
  })

  it('skips the selection burst when reduced motion is requested', async () => {
    installMatchMedia(true)
    const user = userEvent.setup()
    render(<App />)

    expect(screen.getByRole('main')).toHaveAttribute('data-motion', 'reduced')
    expect(document.querySelector('.page')).toHaveAttribute('data-ambient', 'paused')

    await user.click(getRadio(2))
    expect(getRadio(2)).toBeChecked()
    expect(document.querySelector('.game-card__burst')).toBeNull()
    expect(screen.getByRole('status')).toHaveTextContent('Job Hunt by Raji selected')
  })

  it('reacts when reduced motion is enabled after a burst has played', async () => {
    const media = installMatchMedia(false)
    const user = userEvent.setup()
    render(<App />)

    await user.click(getRadio(1))
    expect(document.querySelector('.game-card__burst')).not.toBeNull()

    act(() => {
      media.setMatches(true)
    })

    expect(screen.getByRole('main')).toHaveAttribute('data-motion', 'reduced')
    expect(document.querySelector('.game-card__burst')).toBeNull()
  })

  it('falls back to full motion when matchMedia is unavailable', () => {
    const originalMatchMedia = window.matchMedia

    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      writable: true,
      value: undefined,
    })

    try {
      render(<App />)
      expect(screen.getByRole('main')).toHaveAttribute('data-motion', 'full')
    } finally {
      Object.defineProperty(window, 'matchMedia', {
        configurable: true,
        writable: true,
        value: originalMatchMedia,
      })
    }
  })
})
