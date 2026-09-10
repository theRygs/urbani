import type { Property } from '../data/properties'
import { PropertyCard } from './PropertyCard'

interface PropertyGridProps {
  properties: Property[]
  favorites: Set<number>
  onToggleFavorite: (id: number) => void
  onSelect: (property: Property) => void
}

export function PropertyGrid({ properties, favorites, onToggleFavorite, onSelect }: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="no-results">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
          <path d="M8 11h6" />
        </svg>
        <h3>No se encontraron propiedades</h3>
        <p>Intentá con otros filtros de búsqueda</p>
      </div>
    )
  }

  return (
    <div className="property-grid">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          isFavorite={favorites.has(property.id)}
          onToggleFavorite={onToggleFavorite}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}
