import type { Property } from '../data/properties'
import { PropertyCard } from './PropertyCard'

interface FavoritesProps {
  properties: Property[]
  favorites: Set<number>
  onToggleFavorite: (id: number) => void
  onSelect: (property: Property) => void
}

export function Favorites({ properties, favorites, onToggleFavorite, onSelect }: FavoritesProps) {
  const favoriteProperties = properties.filter((p) => favorites.has(p.id))

  if (favoriteProperties.length === 0) {
    return (
      <div className="no-results">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <h3>No tenés favoritos aún</h3>
        <p>Hacé click en el corazón de las propiedades que te gusten</p>
      </div>
    )
  }

  return (
    <div>
      <div className="favorites-header">
        <h2>Tus favoritos ({favoriteProperties.length})</h2>
      </div>
      <div className="property-grid">
        {favoriteProperties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            isFavorite={true}
            onToggleFavorite={onToggleFavorite}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  )
}
