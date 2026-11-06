function LagosBikeRush({ reacting }: { readonly reacting: boolean }) {
  return (
    <svg
      viewBox="0 0 200 130"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className="game-reaction__svg"
    >
      <defs>
        <linearGradient id="lr-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd36e" />
          <stop offset="55%" stopColor="#ff7a59" />
          <stop offset="100%" stopColor="#7a1f5c" />
        </linearGradient>
        <linearGradient id="lr-road" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2b1638" />
          <stop offset="100%" stopColor="#100817" />
        </linearGradient>
      </defs>

      <rect width="200" height="130" rx="8" fill="url(#lr-sky)" />
      <circle cx="160" cy="30" r="18" fill="#fff7c2" opacity="0.85" />

      <g fill="#4a174b" opacity="0.6">
        <rect x="0" y="52" width="18" height="36" />
        <rect x="22" y="42" width="14" height="46" />
        <rect x="40" y="56" width="22" height="32" />
        <rect x="130" y="50" width="16" height="38" />
        <rect x="150" y="44" width="12" height="44" />
        <rect x="168" y="56" width="20" height="32" />
      </g>

      <rect y="82" width="200" height="48" fill="url(#lr-road)" />
      <path d="M0 82h200" stroke="#ffc44d" strokeWidth="1.5" opacity="0.5" />

      <g stroke="#ffd36e" strokeLinecap="round" opacity="0.5">
        <path d="M98 88l-2 8M94 100l-3 10M90 116l-2 8" strokeWidth="2" />
        <path d="M108 88l2 8M114 100l3 10M120 116l2 8" strokeWidth="2" />
      </g>

      {reacting && (
        <g className="game-reaction__rush-streaks">
          <line x1="20" y1="86" x2="50" y2="86" stroke="#ffe968" strokeWidth="3" strokeLinecap="round" />
          <line x1="10" y1="96" x2="36" y2="96" stroke="#ffe968" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          <line x1="26" y1="106" x2="48" y2="106" stroke="#ffe968" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        </g>
      )}

      <g transform="translate(55 58)">
      <g className="game-reaction__bike">
        <circle cx="16" cy="40" r="11" fill="#120a1c" stroke="#ffb703" strokeWidth="2" />
        <circle cx="16" cy="40" r="3.5" fill="#ff9ec4" />
        <circle cx="72" cy="40" r="11" fill="#120a1c" stroke="#ffb703" strokeWidth="2" />
        <circle cx="72" cy="40" r="3.5" fill="#ff9ec4" />

        <path
          d="M16 40L34 22l16 18M34 22l28 18M34 22l10-8"
          fill="none"
          stroke="#fff4e3"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M44 30l8-10 20 2" fill="none" stroke="#ffc44d" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M64 22l10 2 4 22" fill="none" stroke="#fff4e3" strokeWidth="2.5" strokeLinecap="round" />

        <path d="M28 22c4-10 14-12 22-6 4 3 6 8 6 12l-8 4-14-2z" fill="#ff6b8a" />
        <path d="M44 18c-2-8 4-14 10-14 8-2 12 4 12 10" fill="none" stroke="#2b1136" strokeWidth="5" strokeLinecap="round" />
        <circle cx="56" cy="8" r="7" fill="#ffc44d" stroke="#2b1136" strokeWidth="2" />
      </g>
      </g>
    </svg>
  )
}

function BojuBoju({ reacting }: { readonly reacting: boolean }) {
  return (
    <svg
      viewBox="0 0 200 130"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className="game-reaction__svg"
    >
      <defs>
        <linearGradient id="bb-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#123f34" />
          <stop offset="100%" stopColor="#061c17" />
        </linearGradient>
        <linearGradient id="bb-mask" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffcf6b" />
          <stop offset="100%" stopColor="#c0522f" />
        </linearGradient>
      </defs>

      <rect width="200" height="130" rx="8" fill="url(#bb-sky)" />
      <circle cx="160" cy="28" r="40" fill="#ff6bd6" opacity="0.12" />
      <circle cx="160" cy="28" r="14" fill="#ffeab0" opacity="0.8" />

      <g stroke="#4f9b7c" strokeWidth="1" opacity="0.3">
        <path d="M0 60h200M0 100h200" />
      </g>

      <g transform="translate(48 32) scale(1.25)">
        <ellipse cx="28" cy="72" rx="30" ry="5" fill="#04120e" opacity="0.35" />

        <path
          d="M3 36c0-8 6-14 14-14h13c8 0 14 6 14 14v30H3z"
          fill="#1f5b45"
          stroke="#b6ffd4"
          strokeWidth="1.8"
        />

        <g className="game-reaction__head">
          <circle cx="23" cy="18" r="10" fill="#6b3b2a" />
          <path
            d="M13 16c2-8 7-11 14-10 5 1 7 5 7 11-4-2-7-4-11-4s-7 1-10 3z"
            fill="#24110c"
          />
          <g fill="#fff4e3">
            <circle cx="19" cy="20" r="2.6" />
            <circle cx="27" cy="20" r="2.6" />
          </g>
          <g className="game-reaction__pupils" fill="#0a0412">
            <circle cx="19.4" cy="20" r="1" />
            <circle cx="27.4" cy="20" r="1" />
          </g>
          <path d="M20 25c2 1.2 4 1.2 5 0" stroke="#fff4e3" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          <path d="M16 15l5-1M25 14l5 1" stroke="#24110c" strokeWidth="1.4" strokeLinecap="round" />
        </g>
      </g>

      {reacting && (
        <g transform="translate(130 44)" className="game-reaction__boju-sparks">
          <path d="M0 30l4 12 8-2-2-12z" fill="#ff6bd6" opacity="0.7" />
          <path d="M14 32l-2 10 8 2 3-10z" fill="#ffc44d" opacity="0.7" />
        </g>
      )}

      <g transform="translate(134 80)" opacity="0.5">
        <path d="M0 0c8-4 18-2 24 4" stroke="#c9ff4a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  )
}

function JobHunt({ reacting }: { readonly reacting: boolean }) {
  return (
    <svg
      viewBox="0 0 200 130"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className="game-reaction__svg"
    >
      <defs>
        <linearGradient id="jh-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0b1f3a" />
          <stop offset="60%" stopColor="#15506a" />
          <stop offset="100%" stopColor="#f08a5d" />
        </linearGradient>
        <linearGradient id="jh-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c46a3c" />
          <stop offset="100%" stopColor="#6d2f24" />
        </linearGradient>
      </defs>

      <rect width="200" height="130" rx="8" fill="url(#jh-sky)" />
      <circle cx="44" cy="24" r="14" fill="#ffd36e" opacity="0.85" />

      <g fill="#0a1628" opacity="0.7">
        <rect x="0" y="52" width="14" height="34" />
        <rect x="18" y="44" width="10" height="42" />
        <rect x="32" y="58" width="18" height="28" />
        <rect x="120" y="50" width="10" height="36" />
        <rect x="134" y="56" width="16" height="30" />
        <rect x="156" y="48" width="12" height="38" />
        <rect x="174" y="58" width="14" height="28" />
      </g>

      <rect y="86" width="200" height="44" fill="url(#jh-floor)" />
      <path d="M0 86h200" stroke="#ffc44d" strokeWidth="2" opacity="0.6" />

      <g transform="translate(130 20)">
        <rect x="0" y="0" width="50" height="36" rx="3" fill="#effcff" stroke="#0b1f3a" strokeWidth="2.5" />
        <rect x="8" y="7" width="16" height="8" rx="1.5" fill="#55e7ff" opacity="0.7" />
        <text x="36" y="14" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fontWeight="700" fill="#0b1f3a">
          OPEN
        </text>
        <g stroke="#0b1f3a" strokeWidth="1.2" strokeLinecap="round" opacity="0.5">
          <path d="M8 22h34M8 27h30M8 32h20" />
        </g>
      </g>

      <path
        d="M30 108c22-14 56-32 110-50"
        fill="none"
        stroke="#c9ff4a"
        strokeWidth="1.5"
        strokeDasharray="2 4"
        strokeLinecap="round"
        opacity="0.7"
      />

      <g className="game-reaction__cv">
        <g transform="translate(60 44) rotate(-10)">
          <rect x="0" y="0" width="44" height="32" rx="3" fill="#fff4e3" stroke="#0b1f3a" strokeWidth="1.8" />
          <rect x="6" y="6" width="14" height="7" rx="1" fill="#55e7ff" opacity="0.7" />
          <text x="30" y="12" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="6.5" fontWeight="700" fill="#0b1f3a">
            CV
          </text>
          <g stroke="#0b1f3a" strokeWidth="1.2" strokeLinecap="round" opacity="0.45">
            <path d="M6 19h32M6 24h28M6 29h18" />
          </g>
          <path d="M36 4l4 4-5 5-4-2z" fill="#ffc44d" stroke="#0b1f3a" strokeWidth="1" />
        </g>
      </g>

      <g transform="translate(26 82)">
        <ellipse cx="12" cy="26" rx="14" ry="3" fill="#3b1512" opacity="0.4" />
        <rect x="2" y="8" width="22" height="16" rx="3" fill="#ffc44d" stroke="#0b1f3a" strokeWidth="1.5" />
        <circle cx="12" cy="4" r="5.5" fill="#ff7a59" stroke="#0b1f3a" strokeWidth="1.5" />
      </g>

      {reacting && (
        <g className="game-reaction__job-reaction">
          <g stroke="#c9ff4a" strokeWidth="2" strokeLinecap="round" opacity="0.7">
            <path d="M118 50h12M122 58h10M114 66h12" />
          </g>
        </g>
      )}
    </svg>
  )
}

export function GameReaction({
  gameId,
  reacting,
}: {
  readonly gameId: string
  readonly reacting: boolean
}) {
  if (gameId === 'lagos-bike-rush') {
    return <LagosBikeRush reacting={reacting} />
  }
  if (gameId === 'boju-boju') {
    return <BojuBoju reacting={reacting} />
  }
  if (gameId === 'job-hunt') {
    return <JobHunt reacting={reacting} />
  }
  return null
}
