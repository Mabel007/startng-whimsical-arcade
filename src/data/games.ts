export type GameAccent = 'rush' | 'boju' | 'job'

export type GameArt = 'rush' | 'boju' | 'job'

export interface Game {
  readonly id: string
  readonly title: string
  readonly creator: string
  readonly url: string
  readonly genre: string
  readonly blurb: string
  readonly tags: readonly string[]
  readonly accent: GameAccent
  readonly art: GameArt
}

/**
 * The approved three-game line-up for this demonstration.
 * Titles, creators and URLs were checked against start.ng's game pages
 * on 28 October 2026. Keep this list at exactly three.
 */
export const GAMES: readonly Game[] = [
  {
    id: 'lagos-bike-rush',
    title: 'Lagos Bike Rush',
    creator: 'OBA',
    url: 'https://lagos-bike-rush.start.ng/',
    genre: 'Endless rider',
    blurb:
      'Thread a bike through Lagos traffic. Every clean dodge speeds the road up — one hit ends the ride.',
    tags: ['Lagos', '3D', 'One more run'],
    accent: 'rush',
    art: 'rush',
  },
  {
    id: 'boju-boju',
    title: 'Boju Boju',
    creator: '99PlusOne',
    url: 'https://boju-boju.start.ng/',
    genre: 'Hide & seek',
    blurb:
      'Paint your clothes to match the compound, market or classroom, then keep still while the egungun masquerade searches.',
    tags: ['Camo', 'Naija', 'Stay still'],
    accent: 'boju',
    art: 'boju',
  },
  {
    id: 'job-hunt',
    title: 'Job Hunt',
    creator: 'Raji',
    url: 'https://job-hunt.start.ng/',
    genre: '3D career arcade',
    blurb:
      'Sink your CV through company hoops, land the job, then shoot deliverables to earn coins and climb.',
    tags: ['Hoops', 'Careers', 'Coins'],
    accent: 'job',
    art: 'job',
  },
] as const
