import type { Property } from '../data/properties'

interface PropertyDetailProps {
  property: Property
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
  onClose: () => void
  onInquire: (property: Property) => void
}

export function PropertyDetail({ property, isFavorite, onToggleFavorite, onClose, onInquire }: PropertyDetailProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price)
  }

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-modal modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="btn-close btn-close-white detail-close" onClick={onClose} aria-label="Cerrar" />

        <div className="detail-image">
          <img src={property.image} alt={property.title} />
          <span className="detail-type badge rounded-pill text-bg-dark">{property.type}</span>
        </div>

        <div className="modal-body detail-body">
          <div className="d-flex justify-content-between align-items-start gap-3 mb-4">
            <div>
              <h2 className="detail-price">USD {formatPrice(property.price)}</h2>
              <h3 className="detail-title text-white">{property.title}</h3>
              <p className="detail-location text-body-secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {property.location}
              </p>
            </div>
            <button
              className={`detail-fav-btn btn btn-outline-danger rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center ${isFavorite ? 'active' : ''}`}
              onClick={() => onToggleFavorite(property.id)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          <div className="detail-stats d-flex flex-wrap gap-4 p-3 rounded-3 mb-4">
            {property.bedrooms > 0 && (
              <div className="stat">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 4v16" />
                  <path d="M2 8h18a2 2 0 0 1 2 2v10" />
                  <path d="M2 17h20" />
                  <path d="M6 8v9" />
                </svg>
                <div>
                  <span className="stat-value">{property.bedrooms}</span>
                  <span className="stat-label">{property.bedrooms === 1 ? 'Habitación' : 'Habitaciones'}</span>
                </div>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="stat">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 12h16a1 1 0 0 1 1 1v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a1 1 0 0 1 1-1z" />
                  <path d="M6 12V5a2 2 0 0 1 2-2h3v2.25" />
                </svg>
                <div>
                  <span className="stat-value">{property.bathrooms}</span>
                  <span className="stat-label">{property.bathrooms === 1 ? 'Baño' : 'Baños'}</span>
                </div>
              </div>
            )}
            <div className="stat">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
              <div>
                <span className="stat-value">{property.area}</span>
                <span className="stat-label">m²</span>
              </div>
            </div>
            {property.yearBuilt > 0 && (
              <div className="stat">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <div>
                  <span className="stat-value">{property.yearBuilt}</span>
                  <span className="stat-label">Año</span>
                </div>
              </div>
            )}
          </div>

          <div className="detail-section mb-4">
            <h4>Descripción</h4>
            <p>{property.description}</p>
          </div>

          <div className="detail-section mb-4">
            <h4>Características</h4>
            <div className="features-grid d-flex flex-wrap gap-2">
              {property.features.map((feature) => (
                <span key={feature} className="feature-tag">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div className="detail-actions d-flex flex-column flex-sm-row gap-3 border-top pt-4">
            <button className="btn btn-primary flex-grow-1 d-inline-flex align-items-center justify-content-center gap-2" onClick={() => onInquire(property)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Consultar por esta propiedad
            </button>
            <button className="btn btn-outline-light d-inline-flex align-items-center justify-content-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Llamar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}