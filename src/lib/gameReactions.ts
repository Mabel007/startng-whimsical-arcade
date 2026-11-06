export const GAME_REACTION_MS = {
  'lagos-bike-rush': 900,
  'boju-boju': 1100,
  'job-hunt': 1250,
} as const

export type GameReactionId = keyof typeof GAME_REACTION_MS

export function isGameReaction(gameId: string): gameId is GameReactionId {
  return Object.hasOwn(GAME_REACTION_MS, gameId)
}
