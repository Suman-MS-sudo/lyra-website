'use client'

import { useState } from 'react'
import ChatBot from './ChatBot'
import { SITE } from '@/lib/data'

export default function FloatingActionButtons() {
  const [showChat, setShowChat] = useState(false)

  const openMaps = () => {
    const encodedAddress = encodeURIComponent(SITE.address)
    const googleMapsUrl = `https://maps.google.com/maps?q=${encodedAddress}`
    
    // Check if it's mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    if (isMobile) {
      try {
        // For iOS devices - try Apple Maps first
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
          window.location.href = `maps://maps.google.com/maps?q=${encodedAddress}`
        } 
        // For Android devices - try Google Maps app
        else if (/Android/.test(navigator.userAgent)) {
          window.location.href = `intent://maps.google.com/maps?q=${encodedAddress}#Intent;scheme=https;package=com.google.android.apps.maps;end`
        }
        // Fallback for other mobile devices
        else {
          window.open(googleMapsUrl, '_blank')
        }
      } catch (error) {
        // Fallback to web maps if native apps fail
        window.open(googleMapsUrl, '_blank')
      }
    } else {
      // Desktop - open Google Maps in new tab
      window.open(googleMapsUrl, '_blank')
    }
  }

  return (
    <>
      {/* Chat Component */}
      <ChatBot isOpen={showChat} setIsOpen={setShowChat} />
      
      {/* Floating Action Buttons - positioned to avoid mobile nav overlap */}
      <div className="fixed bottom-28 right-4 z-50 flex flex-col gap-3 md:bottom-6 md:right-6">
        
        {/* Maps Button */}
        <div className="relative group">
          <button
            onClick={openMaps}
            className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            title="Get Directions"
          >
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          {/* Tooltip */}
          <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Get Directions
          </div>
        </div>

        {/* Chat Button - only show if chat is not open */}
        {!showChat && (
          <div className="relative group">
            <button
              onClick={() => setShowChat(true)}
              className="w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group animate-pulse"
              title="Chat with us"
            >
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
            {/* Tooltip */}
            <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              Chat with us!
            </div>
          </div>
        )}
      </div>
    </>
  )
}