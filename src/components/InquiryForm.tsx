import { useState } from 'react'
import type { Property } from '../data/properties'

interface InquiryFormProps {
  property: Property
  onClose: () => void
}

export function InquiryForm({ property, onClose }: InquiryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `Hola, estoy interesado/a en la propiedad "${property.title}" en ${property.location}. Me gustaría obtener más información.`,
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="detail-overlay" onClick={onClose}>
        <div className="inquiry-modal modal-content p-4" onClick={(e) => e.stopPropagation()}>
          <div className="inquiry-success text-center py-4">
            <svg className="text-success mb-3" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <h3 className="h4">¡Consulta enviada!</h3>
            <p className="text-body-secondary mb-4">Un asesor se pondrá en contacto contigo a la brevedad.</p>
            <button className="btn btn-primary px-5" onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="inquiry-modal modal-content p-4" onClick={(e) => e.stopPropagation()}>
        <button className="btn-close btn-close-white detail-close" onClick={onClose} aria-label="Cerrar" />

        <div className="inquiry-header">
          <h3 className="h4">Consultar propiedad</h3>
          <p className="inquiry-property text-body-secondary">{property.title} — {property.location}</p>
        </div>

        <form className="inquiry-form d-flex flex-column gap-3" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Nombre completo</label>
            <input
              id="name"
              type="text"
              required
              className="form-control"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Tu nombre"
            />
          </div>

          <div className="form-row row g-3">
            <div className="col-12 col-sm-6">
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  className="form-control"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="tu@email.com"
                />
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="form-group">
                <label className="form-label" htmlFor="phone">Teléfono</label>
                <input
                  id="phone"
                  type="tel"
                  className="form-control"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+54 11 1234-5678"
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              rows={4}
              className="form-control"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 d-inline-flex align-items-center justify-content-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            Enviar consulta
          </button>
        </form>
      </div>
    </div>
  )
}