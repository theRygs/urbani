interface HeaderProps {
  favoritesCount: number
  onShowFavorites: () => void
  showFavorites: boolean
}

export function Header({ favoritesCount, onShowFavorites, showFavorites }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>Urbani</span>
        </div>
        <nav className="header-nav">
          <button
            className={`nav-btn ${!showFavorites ? 'active' : ''}`}
            onClick={() => showFavorites && onShowFavorites()}
          >
            Explorar
          </button>
          <button
            className={`nav-btn ${showFavorites ? 'active' : ''}`}
            onClick={onShowFavorites}
          >
            Favoritos
            {favoritesCount > 0 && <span className="badge">{favoritesCount}</span>}
          </button>
        </nav>
      </div>
    </header>
  )
}
