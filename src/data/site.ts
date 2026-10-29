export type CoverTheme =
  | 'moss'
  | 'mint'
  | 'sunset'
  | 'coral'
  | 'violet'
  | 'gold'
  | 'teal'
  | 'indigo'
  | 'forest'
  | 'night'
  | 'rose'

export interface NavLink {
  readonly label: string
  readonly href: string
}

export interface Category {
  readonly id: string
  readonly label: string
  readonly count: string
  readonly href: string
  readonly theme: CoverTheme
  readonly image: string
}

export interface GameEntry {
  readonly id: string
  readonly title: string
  readonly creator: string
  readonly displayUrl: string
  readonly href: string
  readonly theme: CoverTheme
  readonly mark: string
  readonly image?: string
}

export interface CommunityGame extends GameEntry {
  readonly cta: 'Play' | 'View'
  readonly featured?: boolean
}

export type CreatorPick = GameEntry

export interface TournamentGame {
  readonly id: string
  readonly title: string
  readonly href: string
  readonly theme: CoverTheme
  readonly mark: string
  readonly image: string
}

export interface CreatorBandTile {
  readonly id: string
  readonly label: string
  readonly href: string
  readonly image: string
  readonly badge?: string
}

export interface Faq {
  readonly question: string
  readonly answer: string
}

/**
 * Verified against https://start.ng/ on 28 October 2026.
 * Keep wording, creators and destinations aligned with the live page.
 * Artwork is linked from Start.ng's public hosts rather than copied locally.
 */
export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Games', href: 'https://start.ng/games' },
  { label: 'Tournament', href: 'https://start.ng/tournament' },
  { label: 'Creators', href: 'https://start.ng/creators' },
  { label: 'Docs', href: 'https://start.ng/docs' },
]

export const HERO_LINK = {
  label: 'lagos-legends-street-quest.start.ng',
  href: 'https://lagos-legends-street-quest.start.ng/',
} as const

export const TOURNAMENT = {
  href: 'https://start.ng/tournament',
  challengeHref: 'https://start.ng/games/rooftop-rush',
} as const

export const TOURNAMENT_GAMES: readonly TournamentGame[] = [
  {
    id: 'coin-quest',
    title: 'Coin Quest',
    href: 'https://start.ng/games/coin-quest',
    theme: 'indigo',
    mark: 'CQ',
    image: 'https://coin-quest.start.ng/cover.png?v=1792338406',
  },
  {
    id: 'orb-rush-mando',
    title: 'Orb Rush Mando',
    href: 'https://start.ng/games/orb-rush-mando',
    theme: 'indigo',
    mark: 'OR',
    image: 'https://orb-rush-mando.start.ng/cover.png?v=1792223743',
  },
  {
    id: 'whot',
    title: 'Whot',
    href: 'https://start.ng/games/whot',
    theme: 'gold',
    mark: 'W',
    image: 'https://whot.start.ng/cover.png?v=1793002908',
  },
  {
    id: 'portal-pals',
    title: 'Portal Pals',
    href: 'https://start.ng/games/portal-pals',
    theme: 'sunset',
    mark: 'PP',
    image: 'https://portal-pals.start.ng/cover.png?v=1792331019',
  },
  {
    id: 'circuit-racer',
    title: 'Circuit Racer',
    href: 'https://start.ng/games/circuit-racer',
    theme: 'sunset',
    mark: 'CR',
    image: 'https://circuit-racer.start.ng/cover.png?v=1792276714',
  },
]

export const CATEGORIES: readonly Category[] = [
  {
    id: 'endless-runners',
    label: 'Endless runners',
    count: '38 games',
    href: 'https://start.ng/categories/endless-runners',
    theme: 'mint',
    image: 'https://start.ng/category-art/endless-runners.webp',
  },
  {
    id: 'nigerian-themed',
    label: 'Nigerian themed',
    count: '43 games',
    href: 'https://start.ng/categories/nigerian-themed',
    theme: 'sunset',
    image: 'https://start.ng/category-art/nigerian-themed.webp',
  },
  {
    id: 'brainy-games',
    label: 'Brainy games',
    count: '25 games',
    href: 'https://start.ng/categories/brainy-games',
    theme: 'violet',
    image: 'https://start.ng/category-art/brainy-games.webp',
  },
  {
    id: 'space-and-sci-fi',
    label: 'Space and sci-fi',
    count: '9 games',
    href: 'https://start.ng/categories/space-and-sci-fi',
    theme: 'night',
    image: 'https://start.ng/category-art/space-and-sci-fi.webp',
  },
  {
    id: 'racing-and-driving',
    label: 'Racing and driving',
    count: '14 games',
    href: 'https://start.ng/categories/racing-and-driving',
    theme: 'gold',
    image: 'https://start.ng/category-art/racing-and-driving.webp',
  },
  {
    id: 'catch-and-dodge',
    label: 'Catch and dodge',
    count: '29 games',
    href: 'https://start.ng/categories/catch-and-dodge',
    theme: 'coral',
    image: 'https://start.ng/category-art/catch-and-dodge.webp',
  },
  {
    id: 'ancient-ruins-and-treasure',
    label: 'Ancient ruins and treasure',
    count: '8 games',
    href: 'https://start.ng/categories/ancient-ruins-and-treasure',
    theme: 'forest',
    image: 'https://start.ng/category-art/ancient-ruins-and-treasure.webp',
  },
  {
    id: 'with-friends',
    label: 'With friends',
    count: '8 games',
    href: 'https://start.ng/categories/with-friends',
    theme: 'indigo',
    image: 'https://start.ng/category-art/with-friends.webp',
  },
]

export const NEW_GAMES: readonly GameEntry[] = [
  {
    id: 'lagos-legends',
    title: 'Lagos Legends Street Quest',
    creator: 'Triple',
    displayUrl: 'lagos-legends-street-quest.start.ng',
    href: 'https://start.ng/games/lagos-legends-street-quest',
    theme: 'gold',
    mark: 'L',
  },
  {
    id: 'bingo',
    title: 'Bingo',
    creator: 'Hamzat',
    displayUrl: 'bingo.start.ng',
    href: 'https://start.ng/games/bingo',
    theme: 'sunset',
    mark: 'B',
    image: 'https://bingo.start.ng/cover.png?v=1793006979',
  },
  {
    id: 'quiz',
    title: 'Quiz',
    creator: 'Hamzat',
    displayUrl: 'quiz.start.ng',
    href: 'https://start.ng/games/quiz',
    theme: 'mint',
    mark: 'Q',
    image: 'https://quiz.start.ng/cover.png?v=1793006984',
  },
  {
    id: 'ludo',
    title: 'Ludo',
    creator: 'Hamzat',
    displayUrl: 'ludo.start.ng',
    href: 'https://start.ng/games/ludo',
    theme: 'indigo',
    mark: 'L',
    image: 'https://ludo.start.ng/cover.png?v=1793002911',
  },
  {
    id: 'whot',
    title: 'Whot',
    creator: 'Hamzat',
    displayUrl: 'whot.start.ng',
    href: 'https://start.ng/games/whot',
    theme: 'gold',
    mark: 'W',
    image: 'https://whot.start.ng/cover.png?v=1793002908',
  },
]

export const COMMUNITY_GAMES: readonly CommunityGame[] = [
  {
    id: 'the-hangout',
    title: 'The Hangout',
    creator: 'start.ng',
    displayUrl: 'start.ng/hangout',
    href: 'https://start.ng/hangout',
    theme: 'moss',
    mark: 'TH',
    image: 'https://start.ng/hangout-cover.jpg',
    cta: 'Play',
    featured: true,
  },
  {
    id: 'lagos-bike-rush',
    title: 'Lagos Bike Rush',
    creator: 'OBA',
    displayUrl: 'lagos-bike-rush.start.ng',
    href: 'https://start.ng/games/lagos-bike-rush',
    theme: 'mint',
    mark: 'LB',
    image: 'https://lagos-bike-rush.start.ng/cover.png?v=1792309258',
    cta: 'View',
  },
  {
    id: 'jemi-game-arcade',
    title: 'Jemi Game Arcade',
    creator: 'Jemi',
    displayUrl: 'jemi-game-arcade.start.ng',
    href: 'https://start.ng/games/jemi-game-arcade',
    theme: 'coral',
    mark: 'JG',
    image: 'https://jemi-game-arcade.start.ng/cover.png?v=1792287546',
    cta: 'View',
  },
  {
    id: 'boju-boju',
    title: 'Boju Boju',
    creator: '99PlusOne',
    displayUrl: 'boju-boju.start.ng',
    href: 'https://start.ng/games/boju-boju',
    theme: 'sunset',
    mark: 'BB',
    image: 'https://boju-boju.start.ng/cover.png?v=1792338368',
    cta: 'View',
  },
  {
    id: 'job-hunt',
    title: 'Job Hunt',
    creator: 'Raji',
    displayUrl: 'job-hunt.start.ng',
    href: 'https://start.ng/games/job-hunt',
    theme: 'coral',
    mark: 'JH',
    image: 'https://job-hunt.start.ng/startng-cover.webp?v=1792208405',
    cta: 'View',
  },
  {
    id: 'tesla-skyrun',
    title: 'Tesla Skyrun',
    creator: 'Favour',
    displayUrl: 'tesla-skyrun.start.ng',
    href: 'https://start.ng/games/tesla-skyrun',
    theme: 'violet',
    mark: 'TS',
    image: 'https://tesla-skyrun.start.ng/cover.png?v=1792500744',
    cta: 'View',
  },
  {
    id: 'danfo-make-way',
    title: 'Danfo Make Way',
    creator: 'Okeke',
    displayUrl: 'danfo-make-way.start.ng',
    href: 'https://start.ng/games/danfo-make-way',
    theme: 'gold',
    mark: 'DM',
    image: 'https://danfo-make-way.start.ng/cover.jpg?v=1792447533',
    cta: 'View',
  },
  {
    id: 'inkbreak',
    title: 'Inkbreak',
    creator: 'henryuks',
    displayUrl: 'inkbreak.start.ng',
    href: 'https://start.ng/games/inkbreak',
    theme: 'sunset',
    mark: 'IB',
    image: 'https://inkbreak.start.ng/cover.png?v=1793088584',
    cta: 'View',
  },
]

export const CREATOR_PICKS: readonly CreatorPick[] = [
  {
    id: 'the-plot',
    title: 'The Plot',
    creator: 'AroicX',
    displayUrl: 'theplot.usevale.art',
    href: 'https://start.ng/creators/74-the-plot',
    theme: 'rose',
    mark: 'TP',
    image: 'https://api.start.ng/indie/74/cover.webp',
  },
  {
    id: 'campus-life',
    title: 'Campus Life',
    creator: 'Trenches',
    displayUrl: 'campuslife.live',
    href: 'https://start.ng/creators/73-campus-life',
    theme: 'mint',
    mark: 'CL',
    image: 'https://api.start.ng/indie/73/cover.webp',
  },
  {
    id: 'nairobi-stories',
    title: 'Nairobi Stories',
    creator: 'Zitrion',
    displayUrl: 'nairobistories.xyz',
    href: 'https://start.ng/creators/40-nairobi-stories',
    theme: 'coral',
    mark: 'NS',
    image: 'https://api.start.ng/indie/40/cover.webp',
  },
  {
    id: 'myguy',
    title: 'MyGuy',
    creator: 'Sava',
    displayUrl: 'playmyguy.com',
    href: 'https://start.ng/creators/39-myguy',
    theme: 'indigo',
    mark: 'MG',
    image: 'https://api.start.ng/indie/39/cover.webp',
  },
]

export const CREATOR_BAND: readonly CreatorBandTile[] = [
  {
    id: 'm-eko-3d',
    label: 'Ọmọ Eko 3D by Zekeri',
    href: 'https://start.ng/creators/32-m-eko-3d',
    image: 'https://api.start.ng/indie/32/cover.webp',
    badge: 'Most clicked',
  },
  {
    id: 'kingdoms-clash',
    label: 'Kingdoms Clash by Zekeri',
    href: 'https://start.ng/creators/28-kingdoms-clash',
    image: 'https://api.start.ng/indie/28/cover.webp',
  },
  {
    id: 'tesla-skyrun-indie',
    label: 'Tesla SkyRun by Favour',
    href: 'https://start.ng/creators/5-tesla-skyrun',
    image: 'https://api.start.ng/indie/5/cover.webp',
  },
]

export const BUILD_STEPS = [
  {
    title: 'Build it',
    body: 'Any static browser game: HTML, JavaScript, three.js, Phaser. Players bring their start.ng character, scores and friends.',
  },
  {
    title: 'Push it to GitHub',
    body: 'A public repo with a ready-to-play index.html at the top or in dist/, plus a cover.png for its card.',
  },
  {
    title: 'Publish it',
    body: 'One API call with your repo link, no key needed. Or hand your AI start.ng/docs and let it do the lot.',
  },
  {
    title: 'Approve it once',
    body: "Open the link you get back and it's live at yourgame.start.ng, with its own leaderboard if you want one. After that, every push updates it.",
  },
] as const

export const FAQS: readonly Faq[] = [
  {
    question: 'What is start.ng?',
    answer:
      'A home for free browser games made by the HNG community. Each game has its own address, like yourgame.start.ng, and you play it right in your browser.',
  },
  {
    question: 'Is it free?',
    answer: 'Yes. Every game on start.ng is free to play in your browser, with nothing to download.',
  },
  {
    question: 'Are there Nigerian or African web games?',
    answer:
      'Yes. Many games here are Naija-themed, from danfo rush hour to jollof and Lagos markets, and we welcome games from across Africa.',
  },
  {
    question: 'Do I need an account to play?',
    answer:
      'No. Sign in to get your start.ng character, keep your scores on the leaderboards and join the daily tournament.',
  },
  {
    question: 'What is the daily tournament?',
    answer:
      'Every day a few start.ng games are picked for 24 hours, and the best player wins. Points count towards the overall leaderboard.',
  },
  {
    question: 'How do I put my game on start.ng?',
    answer:
      'Push your browser game to a public GitHub repo, publish it with one API call and approve it once. It goes live at yourgame.start.ng. The docs have every step.',
  },
]
