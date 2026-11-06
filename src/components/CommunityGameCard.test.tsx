import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CommunityGameCard } from './CommunityGameCard'
import { COMMUNITY_GAMES } from '../data/site'
import { GAME_REACTION_MS } from '../lib/gameReactions'
import { intersectionObserverMock } from '../test/intersectionObserver'
import { installMatchMedia } from '../test/matchMedia'

const job = COMMUNITY_GAMES.find((game) => game.id === 'job-hunt')!
const bike = COMMUNITY_GAMES.find((game) => game.id === 'lagos-bike-rush')!
const advance = (ms: number) => act(() => { vi.advanceTimersByTime(ms) })
const visible = (card: Element, value: boolean) => act(() => {
  intersectionObserverMock.trigger(card, value)
})

describe('finite game reaction lifecycle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    intersectionObserverMock.reset()
    intersectionObserverMock.install()
  })
  afterEach(() => {
    cleanup()
    expect(vi.getTimerCount()).toBe(0)
    vi.useRealTimers()
    intersectionObserverMock.reset()
  })

  it('restarts on rapid pointer re-entry and lets the final story finish', () => {
    const { container } = render(<CommunityGameCard game={bike} />)
    const card = container.querySelector('article')!
    fireEvent.pointerEnter(card, { pointerType: 'mouse' })
    const first = card.querySelector('svg.game-reaction__svg')
    fireEvent.pointerLeave(card, { pointerType: 'mouse' })
    advance(35)
    fireEvent.pointerEnter(card, { pointerType: 'mouse' })
    expect(card).toHaveAttribute('data-peeking', 'true')
    expect(card.querySelector('svg.game-reaction__svg')).not.toBe(first)
    advance(GAME_REACTION_MS['lagos-bike-rush'])
    expect(card).toHaveAttribute('data-peeking', 'true')
    advance(500)
    expect(card).toHaveAttribute('data-peeking', 'false')
  })

  it('replays Preview after hover completion and replaces rapid requests', () => {
    const { container } = render(<CommunityGameCard game={job} />)
    const card = container.querySelector('article')!
    const preview = screen.getByRole('button', { name: 'Preview Job Hunt reaction' })
    fireEvent.pointerEnter(card, { pointerType: 'mouse' })
    advance(2000)
    expect(card).toHaveAttribute('data-peeking', 'false')
    const oldScene = card.querySelector('svg.game-reaction__svg')
    for (let i = 0; i < 10; i += 1) {
      fireEvent.click(preview)
      advance(25)
    }
    expect(card.querySelector('svg.game-reaction__svg')).not.toBe(oldScene)
    expect(vi.getTimerCount()).toBe(1)
    advance(1000)
    expect(card).toHaveAttribute('data-peeking', 'true')
    advance(1000)
    expect(card).toHaveAttribute('data-peeking', 'false')
  })

  it('keeps the CV visible through its complete animation duration', () => {
    const { container } = render(<CommunityGameCard game={job} />)
    const card = container.querySelector('article')!
    fireEvent.click(screen.getByRole('button', { name: /Preview/ }))
    advance(GAME_REACTION_MS['job-hunt'])
    expect(card).toHaveAttribute('data-peeking', 'true')
    advance(500)
    expect(card).toHaveAttribute('data-peeking', 'false')
  })

  it('cancels superseded wave delays and cancels work on viewport exit', () => {
    const { container, rerender } = render(<CommunityGameCard game={job} index={4} waveNonce={1} />)
    const card = container.querySelector('article')!
    visible(card, true)
    advance(200)
    rerender(<CommunityGameCard game={job} index={4} waveNonce={2} />)
    advance(241)
    expect(card).toHaveAttribute('data-peeking', 'false')
    advance(199)
    expect(card).toHaveAttribute('data-peeking', 'true')
    visible(card, false)
    expect(card).toHaveAttribute('data-peeking', 'false')
    expect(vi.getTimerCount()).toBe(0)
    visible(card, true)
    advance(2500)
    expect(card).toHaveAttribute('data-peeking', 'false')
  })

  it.each(['pending', 'running'])('clears every owned timer and observer when unmounted %s', (phase) => {
    const { container, unmount } = render(<CommunityGameCard game={job} index={4} waveNonce={1} />)
    visible(container.querySelector('article')!, true)
    if (phase === 'running') advance(440)
    expect(vi.getTimerCount()).toBe(1)
    unmount()
    expect(vi.getTimerCount()).toBe(0)
    expect(intersectionObserverMock.instances.every((item) => item.disconnected)).toBe(true)
    advance(5000)
  })

  it('invalidates pending and active work across motion preference changes', () => {
    const media = installMatchMedia(false)
    const { container, rerender } = render(<CommunityGameCard game={job} />)
    const card = container.querySelector('article')!
    visible(card, true)
    fireEvent.click(screen.getByRole('button', { name: /Preview/ }))
    act(() => media.setMatches(true))
    expect(card).toHaveAttribute('data-peeking', 'false')
    expect(vi.getTimerCount()).toBe(0)
    rerender(<CommunityGameCard game={job} waveNonce={3} />)
    act(() => media.setMatches(false))
    advance(3000)
    expect(card).toHaveAttribute('data-peeking', 'false')
  })

  it('cancels old scenario callbacks when the game changes', () => {
    const { container, rerender } = render(<CommunityGameCard game={job} />)
    fireEvent.click(screen.getByRole('button', { name: /Preview/ }))
    advance(100)
    rerender(<CommunityGameCard game={bike} />)
    expect(container.querySelector('article')).toHaveAttribute('data-peeking', 'false')
    expect(vi.getTimerCount()).toBe(0)
    advance(5000)
    expect(container.querySelector('article')).toHaveAttribute('data-peeking', 'false')
  })

  it('ignores an already-queued callback from a replaced observer', () => {
    const featured = COMMUNITY_GAMES[0]
    const { container, rerender } = render(<CommunityGameCard game={featured} revealOnce />)
    const oldObserver = intersectionObserverMock.instances[0]
    const card = container.querySelector('article')!
    rerender(<CommunityGameCard game={job} />)
    act(() => oldObserver.callback([{ target: card, isIntersecting: true,
      intersectionRatio: 1, time: 0, rootBounds: null,
      boundingClientRect: card.getBoundingClientRect(),
      intersectionRect: card.getBoundingClientRect() }], {} as IntersectionObserver))
    expect(card).toHaveAttribute('data-peeking', 'false')
    expect(vi.getTimerCount()).toBe(0)
  })
})
