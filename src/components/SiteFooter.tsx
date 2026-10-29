const PLAY_LINKS = [
  ['All games', 'https://start.ng/games'],
  ['Daily tournament', 'https://start.ng/tournament'],
  ['Leaderboard', 'https://start.ng/leaderboard'],
  ['Categories', 'https://start.ng/categories'],
  ['The Hangout', 'https://start.ng/hangout'],
] as const

const MAKE_LINKS = [
  ['Independent creators', 'https://start.ng/creators'],
  ['Build a game', 'https://start.ng/docs'],
  ['Docs for your AI (.md)', 'https://start.ng/docs.md'],
] as const

const ABOUT_LINKS = [['About start.ng', 'https://start.ng/about']] as const

function FooterColumn({
  title,
  links,
  label,
}: {
  readonly title: string
  readonly links: ReadonlyArray<readonly [string, string]>
  readonly label: string
}) {
  return (
    <nav className="footer-col" aria-label={label}>
      <h2>{title}</h2>
      {links.map(([text, href]) => (
        <a key={text} href={href}>
          {text}
        </a>
      ))}
    </nav>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <a className="brand brand--footer" href="https://start.ng/" aria-label="start.ng home">
            <b>
              start<span>.ng</span>
            </b>
          </a>
          <p>Nigeria's home for browser games, made by the community and by creators across Africa.</p>
        </div>

        <FooterColumn title="Play" links={PLAY_LINKS} label="Play footer" />
        <FooterColumn title="Make games" links={MAKE_LINKS} label="Make games footer" />
        <FooterColumn title="About" links={ABOUT_LINKS} label="About footer" />
      </div>

      <div className="site-footer__bottom">
        <p>© 2026 start.ng</p>
        <p>Games from Nigeria and across Africa.</p>
      </div>
    </footer>
  )
}
