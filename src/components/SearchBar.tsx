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
      <div className="search-main d-flex flex-column flex-sm-row gap-2">
        <div className="search-input-wrapper flex-grow-1">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            className="search-input form-control form-control-lg"
            placeholder="Buscar por ubicación, barrio o zona..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
          />
        </div>
        <button
          type="button"
          className={`filter-toggle btn btn-light btn-lg d-flex align-items-center justify-content-center gap-2 ${hasActiveFilters ? 'text-primary' : ''}`}
          onClick={() => setExpanded(!expanded)}
        >
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
          <div className="row g-3">
            <div className="col-12 col-md-6 col-xl-3">
              <label className="filter-label">Rango de precio (USD)</label>
              <div className="d-flex align-items-center gap-2">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Mínimo"
                  value={filters.minPrice}
                  onChange={(e) => updateFilter('minPrice', e.target.value)}
                />
                <span className="filter-separator">—</span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Máximo"
                  value={filters.maxPrice}
                  onChange={(e) => updateFilter('maxPrice', e.target.value)}
                />
              </div>
            </div>

            <div className="col-12 col-md-6 col-xl-3">
              <span className="filter-label d-block">Habitaciones</span>
              <div className="filter-options d-flex flex-wrap gap-2">
                {['', '1', '2', '3', '4'].map((val) => (
                  <button
                    key={val}
                    type="button"
                    className={`filter-chip btn btn-sm rounded-pill ${filters.bedrooms === val ? 'btn-primary active' : 'btn-outline-light'}`}
                    onClick={() => updateFilter('bedrooms', val)}
                  >
                    {val === '' ? 'Todas' : `${val}+`}
                  </button>
                ))}
              </div>
            </div>

            <div className="col-12 col-md-6 col-xl-3">
              <span className="filter-label d-block">Baños</span>
              <div className="filter-options d-flex flex-wrap gap-2">
                {['', '1', '2', '3'].map((val) => (
                  <button
                    key={val}
                    type="button"
                    className={`filter-chip btn btn-sm rounded-pill ${filters.bathrooms === val ? 'btn-primary active' : 'btn-outline-light'}`}
                    onClick={() => updateFilter('bathrooms', val)}
                  >
                    {val === '' ? 'Todos' : `${val}+`}
                  </button>
                ))}
              </div>
            </div>

            <div className="col-12 col-md-6 col-xl-3">
              <span className="filter-label d-block">Tipo de propiedad</span>
              <div className="filter-options d-flex flex-wrap gap-2">
                {[
                  { value: '', label: 'Todos' },
                  { value: 'casa', label: 'Casa' },
                  { value: 'departamento', label: 'Depto' },
                  { value: 'ph', label: 'PH' },
                  { value: 'terreno', label: 'Terreno' },
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    className={`filter-chip btn btn-sm rounded-pill ${filters.type === value ? 'btn-primary active' : 'btn-outline-light'}`}
                    onClick={() => updateFilter('type', value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {hasActiveFilters && (
            <button className="clear-filters btn btn-outline-danger w-100 mt-3" onClick={clearFilters}>
              Limpiar filtros
            </button>
          )}
        </div>
      )}
    </div>
  )
}