import { CategoryTile } from './components/CategoryTile'
import { CommunityGameCard } from './components/CommunityGameCard'
import { CoverArt } from './components/CoverArt'
import { ArrowRightIcon } from './components/Icons'
import { MiniGameCard } from './components/MiniGameCard'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { CATALOGUE } from './data/catalogue'
import {
  BUILD_STEPS,
  CATEGORIES,
  COMMUNITY_GAMES,
  CREATOR_BAND,
  CREATOR_PICKS,
  FAQS,
  HERO_LINK,
  NEW_GAMES,
  TOURNAMENT,
  TOURNAMENT_GAMES,
} from './data/site'

function Eyebrow({ children }: { readonly children: string }) {
  return <p className="eyebrow">{children}</p>
}

export default function App() {
  return (
    <div className="page">
      <a className="skip-link" href="#games">
        Skip to the games
      </a>

      <SiteHeader />

      <main>
        <section className="hero container" aria-labelledby="hero-title">
          <Eyebrow>Big imagination. Played everywhere.</Eyebrow>

          <h1 id="hero-title" className="hero__title">
            Good vibes.{' '}
            <br />
            <span className="hero__highlight">Good games.</span>
          </h1>

          <p className="hero__copy">
            Games made by builders in the community.{' '}
            <br />
            Each one lives at its own address, like{' '}
            <a href={HERO_LINK.href}>{HERO_LINK.label}</a>.{' '}
            <br />
            Pick one and play right in your browser.
          </p>

          <div className="hero__actions">
            <a className="button button--dark" href="#games">
              Play now
            </a>
            <a
              className="button button--ghost"
              href="https://start.ng/?signin"
              title="Create a free account on start.ng (opens the start.ng sign-in dialog)"
            >
              Create free account
            </a>
          </div>
        </section>

        <section className="section section--tournament container" aria-labelledby="tournament-title">
          <div className="tournament-card">
            <div className="tournament-card__body">
              <Eyebrow>Today's tournament</Eyebrow>
              <h2 id="tournament-title">
                5 games. 24 hours.{' '}
                <br />
                One winner.
              </h2>
              <p>Share to enter, then play. New games, revealed when it starts.</p>
            </div>

            <div className="tournament-card__games" aria-label="Today's tournament games">
              {TOURNAMENT_GAMES.map((game) => (
                <a key={game.id} className="tournament-game" href={game.href} aria-label={game.title}>
                  <CoverArt theme={game.theme} mark={game.mark} image={game.image} size="mini" />
                </a>
              ))}
            </div>

            <a className="button button--dark button--small" href={TOURNAMENT.href}>
              See the tournament
              <ArrowRightIcon />
            </a>
          </div>

          <a className="challenge-card" href={TOURNAMENT.challengeHref}>
            <span className="challenge-card__body">
              <Eyebrow>Daily challenge</Eyebrow>
              <span className="challenge-card__title">Reach 59 in Rooftop Rush</span>
              <span className="challenge-card__copy">
                One goal a day, set from how people really play.
              </span>
            </span>
            <span className="challenge-card__badge" aria-hidden="true">
              R
            </span>
            <span className="text-link">
              Take the challenge
              <ArrowRightIcon />
            </span>
          </a>
        </section>

        <section className="section section--categories container" aria-labelledby="categories-title">
          <div className="section-head">
            <h2 id="categories-title">Pick a category</h2>
            <a className="text-link" href="https://start.ng/categories">
              All categories
              <ArrowRightIcon />
            </a>
          </div>

          <div className="category-grid">
            {CATEGORIES.map((category) => (
              <CategoryTile key={category.id} category={category} />
            ))}
          </div>
        </section>

        <section className="section section--new container" aria-labelledby="new-title">
          <div className="section-head">
            <div>
              <h2 id="new-title">New this week</h2>
              <p className="section-sub">Every new game shows here first</p>
            </div>
          </div>

          <div className="new-grid">
            {NEW_GAMES.map((game) => (
              <MiniGameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        <section id="games" className="section section--community container" aria-labelledby="games-title">
          <div className="section-head">
            <div>
              <h2 id="games-title">Games from the community</h2>
              <p className="section-sub">
                <span className="tag">Most played</span>
                What everyone's playing this week
              </p>
            </div>
          </div>

          <div className="community-grid">
            {COMMUNITY_GAMES.map((game) => (
              <CommunityGameCard key={game.id} game={game} />
            ))}
          </div>

          <p className="see-all">
            <a className="button button--dark button--small" href="https://start.ng/games">
              See all {CATALOGUE.length} games
              <ArrowRightIcon />
            </a>
          </p>

          <details className="az-games">
            <summary>Every game on start.ng, A to Z ({CATALOGUE.length})</summary>
            <ul>
              {CATALOGUE.map((game) => (
                <li key={game.href}>
                  <a href={game.href}>{game.title}</a> <span>{game.by}</span>
                </li>
              ))}
            </ul>
          </details>
        </section>

        <section className="section section--creators container" aria-labelledby="creators-title">
          <div className="creator-band">
            <div className="creator-band__copy">
              <Eyebrow>Independent creators</Eyebrow>
              <h2 id="creators-title">
                Explore games from <mark>independent creators</mark>
              </h2>
              <p>
                Games made and hosted by creators everywhere, from itch.io to their own sites. Find
                something new, or show the community what you've made.
              </p>
              <div className="creator-band__actions">
                <a className="button button--dark button--small" href="https://start.ng/creators">
                  Explore games
                  <ArrowRightIcon />
                </a>
                <a
                  className="button button--ghost button--small"
                  href="https://start.ng/creators"
                  title="Submit your game on start.ng"
                >
                  Submit your game
                </a>
              </div>
            </div>

            <div className="creator-band__art">
              {CREATOR_BAND.map((tile, index) => (
                <a
                  key={tile.id}
                  className={`band-tile band-tile--${index}`}
                  href={tile.href}
                  aria-label={tile.label}
                >
                  <img src={tile.image} alt="" loading="lazy" decoding="async" />
                  {tile.badge ? <span className="band-tile__badge">{tile.badge}</span> : null}
                </a>
              ))}
            </div>
          </div>

          <div className="section-head section-head--creators">
            <h3>New from independent creators</h3>
            <a className="text-link" href="https://start.ng/creators">
              See all
              <ArrowRightIcon />
            </a>
          </div>

          <div className="creator-grid">
            {CREATOR_PICKS.map((game) => (
              <MiniGameCard key={game.id} game={game} showMeta />
            ))}
          </div>
        </section>

        <section className="section section--build container" aria-labelledby="build-title">
          <h2 id="build-title">Got a game? Put it on start.ng</h2>

          <div className="build-steps">
            {BUILD_STEPS.map((step) => (
              <article className="build-step" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>

          <div className="build-actions">
            <a className="button button--dark" href="https://start.ng/docs">
              Read the docs
              <ArrowRightIcon />
            </a>
            <a className="button button--ghost" href="https://start.ng/docs.md">
              Docs for your AI (.md)
            </a>
          </div>
        </section>

        <section className="section section--about container about" aria-labelledby="about-title">
          <h2 id="about-title">About start.ng</h2>
          <p>
            start.ng is Nigeria's home for browser games, built by the HNG community. Every game is
            free to play in your browser with no download, and many are made in Naija: danfo rush
            hour, jollof catching, Lagos markets and more.
          </p>
          <p>
            We're also building a home for web games from across Africa. If you make games anywhere
            on the continent, you can put yours on start.ng for free.
          </p>
          <a className="text-link" href="https://start.ng/about">
            More about start.ng
            <ArrowRightIcon />
          </a>

          <h3 className="questions-title">Questions</h3>
          <div className="faq">
            {FAQS.map((faq) => (
              <details className="faq__item" key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
