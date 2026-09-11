import type { Property } from '../data/properties'

interface PropertyCardProps {
  property: Property
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
  onSelect: (property: Property) => void
}

export function PropertyCard({ property, isFavorite, onToggleFavorite, onSelect }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price)
  }

  return (
    <article
      className="property-card card border-0 h-100"
      onClick={() => onSelect(property)}
      role="button"
      tabIndex={0}
    >
      <div className="card-image">
        <img src={property.image} alt={property.title} loading="lazy" />
        <button
          className={`favorite-btn btn btn-light rounded-circle ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite(property.id)
          }}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        <span className="card-type badge rounded-pill text-bg-dark">{property.type}</span>
      </div>
      <div className="card-content card-body">
        <div className="card-price">
          USD {formatPrice(property.price)}
        </div>
        <h3 className="card-title h5 text-white fw-semibold">{property.title}</h3>
        <p className="card-location text-body-secondary">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {property.location}
        </p>
        <div className="card-details d-flex gap-4">
          {property.bedrooms > 0 && (
            <span className="detail">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 4v16" />
                <path d="M2 8h18a2 2 0 0 1 2 2v10" />
                <path d="M2 17h20" />
                <path d="M6 8v9" />
              </svg>
              {property.bedrooms} {property.bedrooms === 1 ? 'hab' : 'habs'}
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="detail">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12h16a1 1 0 0 1 1 1v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a1 1 0 0 1 1-1z" />
                <path d="M6 12V5a2 2 0 0 1 2-2h3v2.25" />
              </svg>
              {property.bathrooms} {property.bathrooms === 1 ? 'baño' : 'baños'}
            </span>
          )}
          <span className="detail">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
            {property.area} m²
          </span>
        </div>
      </div>
    </article>
  )
}