import { useEffect, useState } from 'react'
import { NAV_LINKS } from '../data/site'

type Theme = 'light' | 'dark'

const THEME_KEY = 'theme'

function readInitialTheme(): Theme {
  if (document.documentElement.dataset.theme === 'dark') {
    return 'dark'
  }

  try {
    return window.localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>(readInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#292a23' : '#f6f5ee')

    try {
      window.localStorage.setItem(THEME_KEY, theme)
    } catch {
      // Storage can be unavailable in private or embedded contexts.
    }
  }, [theme])

  useEffect(() => {
    if (!menuOpen) {
      return
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark'
  const themeLabel = nextTheme === 'dark' ? 'Dark mode' : 'Light mode'

  function toggleTheme() {
    setTheme(nextTheme)
  }

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="https://start.ng/" aria-label="start.ng home">
          <b>
            start<span>.ng</span>
          </b>
        </a>

        <nav
          id="pages-menu"
          className={`site-nav${menuOpen ? ' is-open' : ''}`}
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <button
            type="button"
            className="theme-toggle theme-row"
            aria-label={`Switch to ${nextTheme} mode`}
            title={themeLabel}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            <span>{themeLabel}</span>
          </button>
        </nav>

        <button
          type="button"
          className="theme-toggle"
          aria-label={`Switch to ${nextTheme} mode`}
          title={themeLabel}
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>

        <button
          type="button"
          className="nav-menu-btn"
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="pages-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="nav-menu-icon" aria-hidden="true" />
          <span>Menu</span>
        </button>

        <a
          className="header-signin"
          href="https://start.ng/?signin"
          title="Sign in on start.ng (opens the start.ng sign-in dialog)"
        >
          Sign in
        </a>
      </div>
    </header>
  )
}
