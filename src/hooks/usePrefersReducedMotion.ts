import { useSyncExternalStore } from 'react'

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(onStoreChange: () => void): () => void {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return () => undefined
  }

  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY)
  mediaQuery.addEventListener('change', onStoreChange)

  return () => {
    mediaQuery.removeEventListener('change', onStoreChange)
  }
}

function getSnapshot(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }

  return window.matchMedia(REDUCED_MOTION_QUERY).matches
}

function getServerSnapshot(): boolean {
  return false
}

/**
 * Tracks the user's reduced-motion preference and re-renders live if it changes.
 * CSS also guards animations, so the page stays calm even before JavaScript runs.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
