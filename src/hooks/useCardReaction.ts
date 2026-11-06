import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { GAME_REACTION_MS, isGameReaction } from '../lib/gameReactions'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

const SETTLE_MS = 160

/** One owned finish timer and one owned wave delay. Latest input wins. */
export function useCardReaction(gameId: string, index: number, waveNonce: number, revealOnce: boolean) {
  const reduced = usePrefersReducedMotion()
  const reducedRef = useRef(reduced)
  useLayoutEffect(() => { reducedRef.current = reduced }, [reduced])
  const cardRef = useRef<HTMLElement | null>(null)
  const mounted = useRef(false)
  const visible = useRef(false)
  const finishTimer = useRef<number | null>(null)
  const waveTimer = useRef<number | null>(null)
  const generation = useRef(0)
  const pendingWave = useRef<number | null>(null)
  const lastWave = useRef(0)
  const greeted = useRef(false)
  const [reaction, setReaction] = useState({ active: false, revision: 0 })
  const hasScene = isGameReaction(gameId)
  const duration = hasScene ? GAME_REACTION_MS[gameId] : 900

  const clearOwned = useCallback(() => {
    generation.current += 1
    if (finishTimer.current !== null) window.clearTimeout(finishTimer.current)
    if (waveTimer.current !== null) window.clearTimeout(waveTimer.current)
    finishTimer.current = null
    waveTimer.current = null
    pendingWave.current = null
  }, [])

  const cancel = useCallback(() => {
    clearOwned()
    if (mounted.current) setReaction((current) => ({ ...current, active: false }))
  }, [clearOwned])

  const start = useCallback((holdMs?: number) => {
    clearOwned()
    if (!mounted.current || reducedRef.current) return
    const token = generation.current
    setReaction((current) => ({ active: true, revision: current.revision + 1 }))
    if (holdMs !== undefined) {
      finishTimer.current = window.setTimeout(() => {
        finishTimer.current = null
        if (mounted.current && token === generation.current && !reducedRef.current) {
          setReaction((current) => ({ ...current, active: false }))
        }
      }, holdMs)
    }
  }, [clearOwned])

  const scheduleWave = useCallback(() => {
    if (!visible.current || pendingWave.current === null || reducedRef.current) return
    if (waveTimer.current !== null) window.clearTimeout(waveTimer.current)
    const token = generation.current
    const request = pendingWave.current
    waveTimer.current = window.setTimeout(() => {
      waveTimer.current = null
      if (mounted.current && visible.current && !reducedRef.current &&
          token === generation.current && pendingWave.current === request) {
        start(hasScene ? duration + SETTLE_MS : 1000)
      }
    }, index * 110)
  }, [duration, hasScene, index, start])

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
      clearOwned()
    }
  }, [clearOwned])

  useEffect(() => {
    cancel()
    greeted.current = reducedRef.current
  }, [gameId, cancel])

  useEffect(() => {
    if (reduced) {
      greeted.current = true
      cancel()
    }
  }, [reduced, cancel])

  useEffect(() => {
    const node = cardRef.current
    if (!node) return
    if (typeof window.IntersectionObserver === 'undefined') {
      visible.current = true
      return
    }
    let observing = true
    const observer = new IntersectionObserver((entries) => {
      const entry = entries.find((item) => item.target === node)
      if (!entry || !observing || !mounted.current) return
      const wasVisible = visible.current
      visible.current = entry.isIntersecting && entry.intersectionRatio >= 0.2
      if (!visible.current) {
        if (wasVisible) cancel()
        return
      }
      if (pendingWave.current !== null) {
        greeted.current = true
        scheduleWave()
      } else if (revealOnce && !greeted.current && !reducedRef.current) {
        greeted.current = true
        start(1600)
      }
    }, { threshold: [0, 0.2, 0.35] })
    observer.observe(node)
    return () => {
      observing = false
      observer.disconnect()
      clearOwned()
    }
  }, [cancel, clearOwned, revealOnce, scheduleWave, start])

  useEffect(() => {
    if (waveNonce === 0 || lastWave.current === waveNonce) return
    // Consume requests even while reduced. Preference restoration is never input.
    lastWave.current = waveNonce
    cancel()
    if (reduced) return
    pendingWave.current = waveNonce
    scheduleWave()
  }, [waveNonce, reduced, cancel, scheduleWave])

  const hold = useCallback(() => {
    greeted.current = true
    start(hasScene ? duration + SETTLE_MS : undefined)
  }, [duration, hasScene, start])

  const preview = useCallback(() => {
    greeted.current = true
    start(hasScene ? duration + SETTLE_MS : 900)
  }, [duration, hasScene, start])

  const leave = useCallback(() => {
    // A finite story finishes even if the pointer leaves; viewport exit cancels it.
    if (!hasScene) cancel()
  }, [hasScene, cancel])

  return { cardRef, active: reaction.active && !reduced, revision: reaction.revision,
    duration, hold, preview, leave }
}
