import { vi } from 'vitest'

type ChangeListener = (event: MediaQueryListEvent) => void

export interface MatchMediaController {
  readonly mediaQueryList: MediaQueryList
  setMatches: (matches: boolean) => void
}

/**
 * jsdom does not implement matchMedia, so tests install a controllable stub.
 * It mirrors the listener API used by usePrefersReducedMotion.
 */
export function installMatchMedia(initialMatches = false): MatchMediaController {
  const listeners = new Set<ChangeListener>()

  const mediaQueryList = {
    matches: initialMatches,
    media: '(prefers-reduced-motion: reduce)',
    onchange: null,
    addEventListener: vi.fn((type: string, listener: ChangeListener) => {
      if (type === 'change') {
        listeners.add(listener)
      }
    }),
    removeEventListener: vi.fn((type: string, listener: ChangeListener) => {
      if (type === 'change') {
        listeners.delete(listener)
      }
    }),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  } as unknown as MediaQueryList

  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: vi.fn((query: string) => {
      Object.defineProperty(mediaQueryList, 'media', {
        configurable: true,
        value: query,
      })
      return mediaQueryList
    }),
  })

  return {
    mediaQueryList,
    setMatches(matches: boolean) {
      Object.defineProperty(mediaQueryList, 'matches', {
        configurable: true,
        value: matches,
      })
      listeners.forEach((listener) => listener({ matches } as MediaQueryListEvent))
    },
  }
}
