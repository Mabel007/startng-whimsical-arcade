import { describe, expect, it } from 'vitest'
import { GAMES } from './games'

describe('game catalogue', () => {
  it('contains exactly the three approved games in order', () => {
    expect(GAMES.map((game) => game.title)).toEqual(['Lagos Bike Rush', 'Boju Boju', 'Job Hunt'])
  })

  it('uses the verified creator names', () => {
    expect(GAMES.map((game) => game.creator)).toEqual(['OBA', '99PlusOne', 'Raji'])
  })

  it('uses the verified, unique Start.ng game URLs', () => {
    const urls = GAMES.map((game) => game.url)

    expect(urls).toEqual([
      'https://lagos-bike-rush.start.ng/',
      'https://boju-boju.start.ng/',
      'https://job-hunt.start.ng/',
    ])
    expect(new Set(urls).size).toBe(GAMES.length)

    for (const url of urls) {
      expect(url).toMatch(/^https:\/\/[a-z0-9-]+\.start\.ng\/$/)
    }
  })

  it('includes the content each card needs', () => {
    for (const game of GAMES) {
      expect(game.title.trim()).not.toBe('')
      expect(game.creator.trim()).not.toBe('')
      expect(game.genre.trim()).not.toBe('')
      expect(game.blurb.trim()).not.toBe('')
      expect(game.tags.length).toBeGreaterThan(0)
    }
  })
})
