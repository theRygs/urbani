interface HeaderProps {
  favoritesCount: number
  onShowFavorites: () => void
  showFavorites: boolean
}

export function Header({ favoritesCount, onShowFavorites, showFavorites }: HeaderProps) {
  return (
    <nav className="header sticky-top navbar navbar-expand">
      <div className="header-inner container d-flex justify-content-between align-items-center gap-3">
        <a className="logo navbar-brand d-flex align-items-center gap-2" href="#">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>Urbani</span>
        </a>
        <div className="nav nav-pills gap-1">
          <button
            type="button"
            className={`nav-link btn ${!showFavorites ? 'active' : ''}`}
            onClick={() => showFavorites && onShowFavorites()}
          >
            Explorar
          </button>
          <button
            type="button"
            className={`nav-link btn ${showFavorites ? 'active' : ''}`}
            onClick={onShowFavorites}
          >
            Favoritos
            {favoritesCount > 0 && (
              <span className="badge bg-primary rounded-pill ms-1">{favoritesCount}</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}