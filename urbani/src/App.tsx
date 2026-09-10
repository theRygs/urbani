import { useState, useMemo, useCallback } from 'react'
import { properties } from './data/properties'
import type { Property } from './data/properties'
import { Header } from './components/Header'
import { SearchBar } from './components/SearchBar'
import type { Filters } from './components/SearchBar'
import { PropertyGrid } from './components/PropertyGrid'
import { PropertyDetail } from './components/PropertyDetail'
import { InquiryForm } from './components/InquiryForm'
import { Favorites } from './components/Favorites'
import './App.css'

function App() {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    type: '',
  })
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [inquiryProperty, setInquiryProperty] = useState<Property | null>(null)
  const [showFavorites, setShowFavorites] = useState(false)

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      if (filters.search) {
        const query = filters.search.toLowerCase()
        const match =
          property.title.toLowerCase().includes(query) ||
          property.location.toLowerCase().includes(query) ||
          property.description.toLowerCase().includes(query)
        if (!match) return false
      }
      if (filters.minPrice && property.price < Number(filters.minPrice)) return false
      if (filters.maxPrice && property.price > Number(filters.maxPrice)) return false
      if (filters.bedrooms && property.bedrooms < Number(filters.bedrooms)) return false
      if (filters.bathrooms && property.bathrooms < Number(filters.bathrooms)) return false
      if (filters.type && property.type !== filters.type) return false
      return true
    })
  }, [filters])

  return (
    <div className="app">
      <Header
        favoritesCount={favorites.size}
        onShowFavorites={() => setShowFavorites(!showFavorites)}
        showFavorites={showFavorites}
      />

      <main className="main">
        {!showFavorites && (
          <>
            <section className="hero-section">
              <h1>
                Encontrá tu <span className="highlight">próximo hogar</span>
              </h1>
              <p className="hero-subtitle">
                Explorá las mejores propiedades en venta en México
              </p>
            </section>
            <SearchBar onFilterChange={setFilters} />
            <div className="results-info">
              <span>{filteredProperties.length} propiedad{filteredProperties.length !== 1 ? 'es' : ''} encontrada{filteredProperties.length !== 1 ? 's' : ''}</span>
            </div>
            <PropertyGrid
              properties={filteredProperties}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onSelect={setSelectedProperty}
            />
          </>
        )}

        {showFavorites && (
          <Favorites
            properties={properties}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onSelect={setSelectedProperty}
          />
        )}
      </main>

      <footer className="footer">
        <p>Urbani — Prototipo de búsqueda y compra de casas</p>
      </footer>

      {selectedProperty && (
        <PropertyDetail
          property={selectedProperty}
          isFavorite={favorites.has(selectedProperty.id)}
          onToggleFavorite={toggleFavorite}
          onClose={() => setSelectedProperty(null)}
          onInquire={(p) => {
            setSelectedProperty(null)
            setInquiryProperty(p)
          }}
        />
      )}

      {inquiryProperty && (
        <InquiryForm
          property={inquiryProperty}
          onClose={() => setInquiryProperty(null)}
        />
      )}
    </div>
  )
}

export default App
