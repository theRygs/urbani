import { useState } from 'react'

export interface Filters {
  search: string
  minPrice: string
  maxPrice: string
  bedrooms: string
  bathrooms: string
  type: string
}

interface SearchBarProps {
  onFilterChange: (filters: Filters) => void
}

const defaultFilters: Filters = {
  search: '',
  minPrice: '',
  maxPrice: '',
  bedrooms: '',
  bathrooms: '',
  type: '',
}

export function SearchBar({ onFilterChange }: SearchBarProps) {
  const [filters, setFilters] = useState<Filters>(defaultFilters)
  const [expanded, setExpanded] = useState(false)

  const updateFilter = (key: keyof Filters, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    setFilters(defaultFilters)
    onFilterChange(defaultFilters)
  }

  const hasActiveFilters = Object.values(filters).some((v) => v !== '')

  return (
    <div className="search-bar">
      <div className="search-main">
        <div className="search-input-wrapper">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por ubicación, barrio o zona..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
          />
        </div>
        <button className="filter-toggle" onClick={() => setExpanded(!expanded)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
          </svg>
          Filtros
          {hasActiveFilters && <span className="filter-dot" />}
        </button>
      </div>

      {expanded && (
        <div className="search-filters">
          <div className="filter-group">
            <label>Rango de precio (USD)</label>
            <div className="filter-row">
              <input
                type="number"
                placeholder="Mínimo"
                value={filters.minPrice}
                onChange={(e) => updateFilter('minPrice', e.target.value)}
              />
              <span className="filter-separator">—</span>
              <input
                type="number"
                placeholder="Máximo"
                value={filters.maxPrice}
                onChange={(e) => updateFilter('maxPrice', e.target.value)}
              />
            </div>
          </div>

          <div className="filter-group">
            <label>Habitaciones</label>
            <div className="filter-options">
              {['', '1', '2', '3', '4'].map((val) => (
                <button
                  key={val}
                  className={`filter-chip ${filters.bedrooms === val ? 'active' : ''}`}
                  onClick={() => updateFilter('bedrooms', val)}
                >
                  {val === '' ? 'Todas' : `${val}+`}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>Baños</label>
            <div className="filter-options">
              {['', '1', '2', '3'].map((val) => (
                <button
                  key={val}
                  className={`filter-chip ${filters.bathrooms === val ? 'active' : ''}`}
                  onClick={() => updateFilter('bathrooms', val)}
                >
                  {val === '' ? 'Todos' : `${val}+`}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>Tipo de propiedad</label>
            <div className="filter-options">
              {[
                { value: '', label: 'Todos' },
                { value: 'casa', label: 'Casa' },
                { value: 'departamento', label: 'Depto' },
                { value: 'ph', label: 'PH' },
                { value: 'terreno', label: 'Terreno' },
              ].map(({ value, label }) => (
                <button
                  key={value}
                  className={`filter-chip ${filters.type === value ? 'active' : ''}`}
                  onClick={() => updateFilter('type', value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {hasActiveFilters && (
            <button className="clear-filters" onClick={clearFilters}>
              Limpiar filtros
            </button>
          )}
        </div>
      )}
    </div>
  )
}
