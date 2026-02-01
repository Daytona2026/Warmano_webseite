'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { MapPin, Loader2 } from 'lucide-react'

interface AddressSuggestion {
  street: string
  houseNumber: string
  zipCode: string
  city: string
  fullAddress: string
}

interface AddressAutocompleteProps {
  onAddressSelect: (address: {
    street: string
    zipCode: string
    city: string
  }) => void
  placeholder?: string
  className?: string
  initialValue?: string
}

// Photon API (free, based on OpenStreetMap)
const PHOTON_API = 'https://photon.komoot.io/api'

export default function AddressAutocomplete({
  onAddressSelect,
  placeholder = 'Adresse eingeben...',
  className = '',
  initialValue = '',
}: AddressAutocompleteProps) {
  const [query, setQuery] = useState(initialValue)
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<NodeJS.Timeout>()

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const searchAddresses = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 3) {
      setSuggestions([])
      return
    }

    setIsLoading(true)

    try {
      // Search with German focus
      const response = await fetch(
        `${PHOTON_API}?q=${encodeURIComponent(searchQuery)}&limit=5&lang=de&lat=48.137154&lon=11.576124&location_bias_scale=0.5`
      )

      if (!response.ok) throw new Error('Search failed')

      const data = await response.json()

      const results: AddressSuggestion[] = data.features
        .filter((feature: { properties: { type?: string; country?: string; countrycode?: string } }) => {
          // Filter for German addresses with street info
          const props = feature.properties
          return (props.country === 'Germany' || props.country === 'Deutschland' || props.countrycode === 'DE') &&
                 (props.type === 'house' || props.type === 'street')
        })
        .map((feature: {
          properties: {
            name?: string
            street?: string
            housenumber?: string
            postcode?: string
            city?: string
            locality?: string
            district?: string
          }
        }) => {
          const props = feature.properties
          const street = props.street || props.name || ''
          const houseNumber = props.housenumber || ''
          const zipCode = props.postcode || ''
          const city = props.city || props.locality || props.district || ''

          return {
            street: street + (houseNumber ? ` ${houseNumber}` : ''),
            houseNumber,
            zipCode,
            city,
            fullAddress: `${street}${houseNumber ? ` ${houseNumber}` : ''}, ${zipCode} ${city}`.trim(),
          }
        })
        .filter((addr: AddressSuggestion) => addr.street && addr.city)

      setSuggestions(results)
      setShowSuggestions(results.length > 0)
    } catch (error) {
      console.error('Address search error:', error)
      setSuggestions([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setSelectedIndex(-1)

    // Debounce search
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      searchAddresses(value)
    }, 300)
  }

  const handleSelectSuggestion = (suggestion: AddressSuggestion) => {
    setQuery(suggestion.fullAddress)
    setShowSuggestions(false)
    onAddressSelect({
      street: suggestion.street,
      zipCode: suggestion.zipCode,
      city: suggestion.city,
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          handleSelectSuggestion(suggestions[selectedIndex])
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        break
    }
  }

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-warmano-gray-500 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          placeholder={placeholder}
          className={`w-full pl-10 pr-10 py-3 bg-warmano-gray-800/50 border border-warmano-gray-700/50 rounded-xl text-white placeholder-warmano-gray-500 focus:outline-none focus:border-warmano-orange transition-colors ${className}`}
          autoComplete="off"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-warmano-gray-500 animate-spin" />
        )}
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-warmano-gray-800 border border-warmano-gray-700 rounded-xl shadow-xl overflow-hidden">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelectSuggestion(suggestion)}
              className={`w-full px-4 py-3 text-left flex items-start gap-3 hover:bg-warmano-gray-700 transition-colors ${
                index === selectedIndex ? 'bg-warmano-gray-700' : ''
              }`}
            >
              <MapPin className="w-5 h-5 text-warmano-orange flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-medium">{suggestion.street}</p>
                <p className="text-sm text-warmano-gray-400">
                  {suggestion.zipCode} {suggestion.city}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
