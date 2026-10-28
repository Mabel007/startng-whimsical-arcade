import type { GameArt } from '../data/games'

interface GameArtworkProps {
  readonly art: GameArt
}

/**
 * Original, dependency-free SVG scenes for the three approved games.
 * Every scene is decorative: the radio label and Press Start link carry
 * the accessible names, so the artwork is hidden from assistive tech.
 */
export function GameArtwork({ art }: GameArtworkProps) {
  if (art === 'rush') {
    return (
      <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="rush-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffd36e" />
            <stop offset="52%" stopColor="#ff7a59" />
            <stop offset="100%" stopColor="#7a1f5c" />
          </linearGradient>
          <radialGradient id="rush-sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff7c2" />
            <stop offset="70%" stopColor="#ffd36e" />
            <stop offset="100%" stopColor="#ffb703" />
          </radialGradient>
          <linearGradient id="rush-road" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2b1638" />
            <stop offset="100%" stopColor="#100817" />
          </linearGradient>
          <linearGradient id="rush-bike" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff9ec4" />
            <stop offset="100%" stopColor="#ff3d7f" />
          </linearGradient>
          <linearGradient id="rush-bus" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffe96a" />
            <stop offset="100%" stopColor="#ffb703" />
          </linearGradient>
        </defs>

        <rect width="400" height="220" fill="url(#rush-sky)" />
        <circle cx="312" cy="58" r="37" fill="url(#rush-sun)" />

        <g fill="#4a174b" opacity="0.72">
          <rect x="0" y="96" width="30" height="58" />
          <rect x="36" y="78" width="22" height="76" />
          <rect x="66" y="108" width="38" height="46" />
          <rect x="112" y="90" width="18" height="64" />
          <rect x="240" y="98" width="26" height="56" />
          <rect x="272" y="80" width="20" height="74" />
          <rect x="300" y="106" width="34" height="48" />
          <rect x="344" y="88" width="18" height="66" />
          <rect x="368" y="110" width="32" height="44" />
        </g>
        <g fill="#ffd36e" opacity="0.5">
          <rect x="42" y="88" width="4" height="5" />
          <rect x="50" y="104" width="4" height="5" />
          <rect x="76" y="118" width="6" height="5" />
          <rect x="88" y="118" width="6" height="5" />
          <rect x="278" y="92" width="4" height="5" />
          <rect x="286" y="110" width="4" height="5" />
          <rect x="350" y="100" width="4" height="5" />
          <rect x="374" y="122" width="6" height="5" />
        </g>

        <path d="M0 150h400v70H0z" fill="url(#rush-road)" />
        <path d="M0 150h400" stroke="#ffc44d" strokeWidth="2" opacity="0.55" />

        <g stroke="#ffd36e" strokeLinecap="round" opacity="0.55">
          <path d="M198 158l-4 14M194 180l-5 18M190 206l-4 14" strokeWidth="3" />
          <path d="M210 158l4 14M218 180l5 18M226 206l4 14" strokeWidth="3" />
          <path d="M330 170h34M350 186h30M14 174h26M0 192h30" strokeWidth="3" opacity="0.6" />
        </g>

        <g transform="translate(22 102)">
          <rect x="0" y="12" width="78" height="34" rx="7" fill="url(#rush-bus)" />
          <rect x="6" y="18" width="60" height="13" rx="3" fill="#2b1136" />
          <g fill="#55e7ff" opacity="0.55">
            <rect x="10" y="21" width="10" height="7" rx="1.5" />
            <rect x="24" y="21" width="10" height="7" rx="1.5" />
            <rect x="38" y="21" width="10" height="7" rx="1.5" />
            <rect x="52" y="21" width="9" height="7" rx="1.5" />
          </g>
          <rect x="0" y="35" width="78" height="5" fill="#2b1136" />
          <circle cx="15" cy="46" r="6" fill="#120a1c" />
          <circle cx="62" cy="46" r="6" fill="#120a1c" />
          <circle cx="76" cy="25" r="3" fill="#fff7c2" />
        </g>

        <g transform="translate(300 120)">
          <path d="M0 22c0-8 6-14 14-16l12-4 20 1 14 9 6 10v10H0z" fill="#2a173f" />
          <path d="M16 8h26l10 10H8z" fill="#55e7ff" opacity="0.4" />
          <circle cx="16" cy="32" r="7" fill="#120a1c" />
          <circle cx="58" cy="32" r="7" fill="#120a1c" />
          <rect x="0" y="19" width="66" height="4" rx="2" fill="#ff4fa3" />
        </g>

        <g transform="translate(110 104)">
          <ellipse cx="104" cy="92" rx="92" ry="9" fill="#08040e" opacity="0.45" />
          <g stroke="#ffe968" strokeWidth="4" strokeLinecap="round" opacity="0.9">
            <path d="M-48 36h34M-58 50h24M-38 64h30" />
            <path d="M-34 24h18" opacity="0.55" />
          </g>

          <circle cx="34" cy="78" r="20" fill="#120a1c" stroke="#ffb703" strokeWidth="3" />
          <circle cx="34" cy="78" r="6" fill="#ff9ec4" />
          <circle cx="166" cy="78" r="20" fill="#120a1c" stroke="#ffb703" strokeWidth="3" />
          <circle cx="166" cy="78" r="6" fill="#ff9ec4" />

          <path d="M34 78L74 46l30 32M74 46l58 32M74 46l22-16" fill="none" stroke="#fff4e3" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M96 62l16-18 42 4" fill="none" stroke="#ffc44d" strokeWidth="4" strokeLinecap="round" />
          <path d="M144 34l18 2 8 42" fill="none" stroke="#fff4e3" strokeWidth="4" strokeLinecap="round" />

          <path d="M58 46c8-16 26-22 42-14 8 4 12 12 12 22l-17 7-27-2z" fill="url(#rush-bike)" />
          <path d="M62 45l12 7 3 14-10 4-8-13z" fill="#2b1136" opacity="0.9" />
          <path d="M94 54l24 6 8 15-14 2-13-10z" fill="#ff7a59" />

          <path d="M82 38c-4-13 4-25 16-27 12-2 22 7 22 19" fill="none" stroke="#2b1136" strokeWidth="11" strokeLinecap="round" />
          <circle cx="108" cy="18" r="13" fill="#ffc44d" stroke="#2b1136" strokeWidth="3" />
          <path d="M99 20c6 4 13 3 18-2" stroke="#2b1136" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M108 5c1-5 6-8 10-7" stroke="#ff4fa3" strokeWidth="3" strokeLinecap="round" fill="none" />

          <path d="M80 42l-14 28 8 9" fill="none" stroke="#fff4e3" strokeWidth="5" strokeLinecap="round" />
          <path d="M100 55l10 21" stroke="#fff4e3" strokeWidth="5" strokeLinecap="round" />

          <circle cx="188" cy="49" r="8" fill="#fff7c2" />
          <path d="M188 49l48-16 22 6-40 22z" fill="#fff7c2" opacity="0.26" />
        </g>

        <rect width="400" height="220" fill="url(#rush-sky)" opacity="0.06" />
      </svg>
    )
  }

  if (art === 'boju') {
    return (
      <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="boju-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#123f34" />
            <stop offset="100%" stopColor="#061c17" />
          </linearGradient>
          <pattern id="boju-wall" width="48" height="48" patternUnits="userSpaceOnUse">
            <rect width="48" height="48" fill="#174a3a" />
            <path d="M0 24L24 0l24 24-24 24z" fill="#1f5b45" />
            <path d="M0 0h24v24H0zM24 24h24v24H24z" fill="#2b6b52" opacity="0.42" />
            <circle cx="24" cy="24" r="5" fill="#c9ff4a" opacity="0.22" />
            <path d="M24 10v28M10 24h28" stroke="#ffd36e" strokeWidth="1" opacity="0.16" />
          </pattern>
          <linearGradient id="boju-mask" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffcf6b" />
            <stop offset="100%" stopColor="#c0522f" />
          </linearGradient>
          <radialGradient id="boju-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff6bd6" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#ff6bd6" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="400" height="220" fill="url(#boju-sky)" />
        <circle cx="322" cy="52" r="88" fill="url(#boju-glow)" />
        <circle cx="322" cy="54" r="26" fill="#ffeab0" opacity="0.86" />

        <rect y="46" width="400" height="174" fill="url(#boju-wall)" />
        <rect y="38" width="400" height="10" fill="#2f7d64" />
        <rect y="34" width="400" height="4" fill="#c9ff4a" opacity="0.45" />

        <g stroke="#4f9b7c" strokeWidth="2" opacity="0.4">
          <path d="M0 120h400M0 192h400" />
          <path d="M84 62v140M318 62v140" />
        </g>

        <g stroke="#d7fff0" strokeWidth="1.6" opacity="0.55">
          <path d="M-4 74c74 20 130 18 206 2 64-14 126-10 202 4" fill="none" />
        </g>
        <g>
          <path d="M36 76l7 30 22-3-6-29z" fill="#ff6bd6" opacity="0.9" />
          <path d="M74 78l-5 26 20 4 7-28z" fill="#ffc44d" opacity="0.9" />
          <path d="M224 78l8 27 22-5-6-25z" fill="#55e7ff" opacity="0.85" />
        </g>

        <g transform="translate(120 98)">
          <ellipse cx="28" cy="104" rx="42" ry="7" fill="#04120e" opacity="0.45" />

          <path d="M3 52c0-11 9-20 20-20h13c11 0 20 9 20 20v43H3z" fill="url(#boju-wall)" stroke="#b6ffd4" strokeWidth="2.6" />
          <path d="M6 46l18 11 16-12 16 10" fill="none" stroke="#b6ffd4" strokeWidth="2" opacity="0.8" />

          <circle cx="23" cy="27" r="14" fill="#6b3b2a" />
          <path d="M10 25c2-11 10-16 20-14 7 2 10 8 10 16-5-3-9-5-15-5-6 0-10 1-15 3z" fill="#24110c" />
          <g fill="#fff4e3">
            <circle cx="19" cy="28" r="2.6" />
            <circle cx="29" cy="28" r="2.6" />
          </g>
          <g fill="#0a0412">
            <circle cx="19.5" cy="28" r="1.2" />
            <circle cx="29.5" cy="28" r="1.2" />
          </g>
          <path d="M21 35c2 1.5 4 1.5 6 0" stroke="#fff4e3" strokeWidth="1.5" strokeLinecap="round" />

          <path d="M8 58l-8 24 5 18" fill="none" stroke="url(#boju-wall)" strokeWidth="10" strokeLinecap="round" />
          <path d="M7 58l9 22 5 19" fill="none" stroke="#b6ffd4" strokeWidth="1.6" opacity="0.45" />
          <path d="M52 59l8 22 1 20" fill="none" stroke="url(#boju-wall)" strokeWidth="10" strokeLinecap="round" />
          <path d="M55 59l6 22 1 20" fill="none" stroke="#b6ffd4" strokeWidth="1.6" opacity="0.45" />

          <path d="M9 94h18v12H9zM35 94h17v12H35z" fill="url(#boju-wall)" stroke="#b6ffd4" strokeWidth="2" />
          <path d="M9 94l17 12M35 94l17 12" stroke="#b6ffd4" strokeWidth="1.4" opacity="0.5" />
        </g>

        <g transform="translate(268 66)">
          <path d="M16 142c-16-30-18-68 2-94 14-18 40-28 62-14 16 11 20 32 12 48-12 26-42 40-76 60z" fill="#5a1b4f" />
          <g strokeLinecap="round">
            <path d="M22 132c-12-28-12-58 5-80" stroke="#ff6bd6" strokeWidth="7" fill="none" />
            <path d="M9 138c-4-30 1-62 20-82" stroke="#ffc44d" strokeWidth="5" fill="none" />
            <path d="M36 123c-8-27-3-54 15-68" stroke="#c9ff4a" strokeWidth="5" fill="none" />
            <path d="M47 112c-4-20 2-42 16-51" stroke="#55e7ff" strokeWidth="4" fill="none" />
            <path d="M61 83l-8-21M52 92l-17-13M70 75l7-18M39 103l-18-7" stroke="#ffeab0" strokeWidth="3" opacity="0.9" />
          </g>

          <g transform="translate(40 22)">
            <path d="M0 20c0-11 9-20 20-20h12c11 0 20 9 20 20v26H0z" fill="url(#boju-mask)" stroke="#2b0a20" strokeWidth="2" />
            <path d="M7 7l13 9L34 6l6 10-13 9-21-3z" fill="#ff6bd6" />
            <g fill="#2b0a20">
              <path d="M10 24c4-4 8-4 12 0-2 5-10 5-12 0z" />
              <path d="M30 24c4-4 8-4 12 0-2 5-10 5-12 0z" />
            </g>
            <path d="M18 38c5 3 11 3 16 0" stroke="#2b0a20" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M6 0l4-10 8 6M40 0l-4-10-8 6" stroke="#c9ff4a" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        </g>

        <g transform="translate(30 169)">
          <ellipse cx="22" cy="30" rx="20" ry="4" fill="#04120e" opacity="0.4" />
          <path d="M8 18c0-9 8-15 17-13 8 2 12 9 12 16l-5 8H13z" fill="#ffb15e" />
          <path d="M31 14l9-7 3 10-6 4z" fill="#ff8a3d" />
          <path d="M7 18l-4 6 5 5 4-6z" fill="#ff8a3d" />
          <path d="M15 6l-1-5 4 3 2-6 3 6 4-2-2 6" fill="#ff4f6d" />
          <circle cx="29" cy="12" r="1.6" fill="#0a0412" />
          <path d="M18 34l-4 7M26 34l4 7" stroke="#ffc44d" strokeWidth="3" strokeLinecap="round" />
        </g>

        <g stroke="#c9ff4a" strokeWidth="2" strokeLinecap="round" opacity="0.55">
          <path d="M226 160h28M238 174h30M218 148h18" />
        </g>
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="job-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0b1f3a" />
          <stop offset="58%" stopColor="#15506a" />
          <stop offset="100%" stopColor="#f08a5d" />
        </linearGradient>
        <linearGradient id="job-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c46a3c" />
          <stop offset="100%" stopColor="#6d2f24" />
        </linearGradient>
        <linearGradient id="job-board" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#effcff" />
          <stop offset="100%" stopColor="#9fd8e6" />
        </linearGradient>
        <radialGradient id="job-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#55e7ff" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#55e7ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="220" fill="url(#job-sky)" />
      <circle cx="88" cy="48" r="28" fill="#ffd36e" opacity="0.9" />
      <circle cx="318" cy="102" r="92" fill="url(#job-glow)" />

      <g fill="#0a1628" opacity="0.88">
        <rect x="0" y="96" width="26" height="62" />
        <rect x="32" y="80" width="20" height="78" />
        <rect x="58" y="108" width="34" height="50" />
        <rect x="98" y="90" width="18" height="68" />
        <rect x="120" y="116" width="28" height="42" />
        <rect x="154" y="100" width="16" height="58" />
        <rect x="176" y="120" width="32" height="38" />
        <rect x="216" y="106" width="22" height="52" />
        <rect x="244" y="124" width="28" height="34" />
      </g>
      <g fill="#ffd36e" opacity="0.55">
        <rect x="36" y="88" width="4" height="4" />
        <rect x="44" y="102" width="4" height="4" />
        <rect x="64" y="116" width="5" height="4" />
        <rect x="78" y="116" width="5" height="4" />
        <rect x="224" y="114" width="4" height="4" />
        <rect x="232" y="130" width="4" height="4" />
      </g>

      <g stroke="#ffd36e" strokeWidth="1.5" opacity="0.5">
        <path d="M0 70c52 8 72 22 104 24 32 2 52-10 82-6 34 4 54 20 92 16 42-4 66-24 122-18" fill="none" />
        <g fill="#ffeab0" stroke="none">
          <circle cx="20" cy="73" r="2" />
          <circle cx="68" cy="82" r="2" />
          <circle cx="132" cy="92" r="2" />
          <circle cx="202" cy="84" r="2" />
          <circle cx="286" cy="94" r="2" />
          <circle cx="362" cy="82" r="2" />
        </g>
      </g>

      <path d="M0 160h400v60H0z" fill="url(#job-floor)" />
      <path d="M0 160h400" stroke="#ffc44d" strokeWidth="3" opacity="0.75" />
      <g stroke="#ffd6a8" opacity="0.4">
        <path d="M0 180h400M0 202h400M80 160L42 220M180 160l-18 60M280 160l18 60M360 160l38 60" />
      </g>
      <path d="M124 220c26-42 126-42 152 0" fill="none" stroke="#ffeab0" strokeWidth="2.5" opacity="0.65" />
      <path d="M200 160v60" stroke="#ffeab0" strokeWidth="2" opacity="0.45" />

      <g transform="translate(286 44)">
        <rect x="-38" y="-14" width="88" height="60" rx="5" fill="url(#job-board)" stroke="#0b1f3a" strokeWidth="4" />
        <rect x="-24" y="0" width="60" height="31" rx="2" fill="none" stroke="#ff7a59" strokeWidth="3" />
        <path d="M-24 15h60M6 0v31" stroke="#ff7a59" strokeWidth="1.5" opacity="0.55" />
        <path d="M22 46v42" stroke="#0b1f3a" strokeWidth="7" />
        <path d="M22 50L0 72h44z" fill="none" stroke="#ff7a59" strokeWidth="4" strokeLinejoin="round" />
        <path d="M0 100c2 18 44 18 46 0M7 106l4 16M16 108l2 16M25 108l0 16M34 106l-2 16M41 102l-4 15" fill="none" stroke="#eafcff" strokeWidth="2.2" strokeLinecap="round" opacity="0.9" />
      </g>

      <path d="M48 202c44-24 102-58 208-92" fill="none" stroke="#c9ff4a" strokeWidth="2" strokeDasharray="3 7" strokeLinecap="round" opacity="0.85" />

      <g transform="translate(150 72) rotate(-13)">
        <rect x="0" y="0" width="74" height="52" rx="4" fill="#fff4e3" stroke="#0b1f3a" strokeWidth="2.5" />
        <rect x="10" y="10" width="23" height="12" rx="2" fill="#55e7ff" opacity="0.8" />
        <text x="47" y="21" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" fontWeight="700" fill="#0b1f3a">
          CV
        </text>
        <g stroke="#0b1f3a" strokeWidth="2" strokeLinecap="round" opacity="0.55">
          <path d="M10 30h54M10 38h48M10 46h30" />
        </g>
        <path d="M64 6l6 6-8 8-6-2z" fill="#ffc44d" stroke="#0b1f3a" strokeWidth="1.5" />
      </g>

      <g stroke="#c9ff4a" strokeWidth="3" strokeLinecap="round" opacity="0.8">
        <path d="M230 84h20M238 94h14M222 104h18" />
      </g>

      <g transform="translate(50 150)">
        <ellipse cx="20" cy="42" rx="24" ry="5" fill="#3b1512" opacity="0.5" />
        <rect x="4" y="14" width="34" height="24" rx="4" fill="#ffc44d" stroke="#0b1f3a" strokeWidth="2" />
        <path d="M4 20h34M11 14v-5h9v5M11 38v5M31 38v5" fill="none" stroke="#0b1f3a" strokeWidth="2.5" />
        <circle cx="20" cy="8" r="8" fill="#ff7a59" stroke="#0b1f3a" strokeWidth="2" />
        <path d="M14 8h12M20 2v12" stroke="#fff4e3" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      </g>

      <g transform="translate(232 178)">
        <circle cx="20" cy="20" r="17" fill="#ff8a3d" stroke="#0b1f3a" strokeWidth="2.5" />
        <path d="M3 20h34M20 3v34M8 8c8 7 16 7 24 0M8 32c8-7 16-7 24 0" fill="none" stroke="#0b1f3a" strokeWidth="1.8" opacity="0.75" />
      </g>

      <g fill="#ffc44d">
        <circle cx="352" cy="162" r="6" stroke="#6d3a00" strokeWidth="1.5" />
        <circle cx="368" cy="178" r="4" stroke="#6d3a00" strokeWidth="1.5" />
      </g>

      <path d="M0 160h400v60H0z" fill="url(#job-floor)" opacity="0.12" />
    </svg>
  )
}
