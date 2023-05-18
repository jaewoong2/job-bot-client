'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef } from 'react'

export const GA_TRACKING_ID = 'G-XG605Y4FZR'

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (action: Gtag.EventNames, { event_category, event_label, value }: Gtag.EventParams) => {
  window.gtag('event', action, {
    event_category,
    event_label,
    value,
  })
}

export const useGtag = () => {
  const pathname = usePathname() // Get current route
  const searchParams = useSearchParams()
  // Save pathname on component mount into a REF
  const savedPathNameRef = useRef(pathname)

  const handleRouteChange = useCallback((url: string) => {
    if (process.env.NODE_ENV === 'development') return
    pageview(url)
  }, [])

  useEffect(() => {
    // If REF has been changed, do the stuff
    if (savedPathNameRef.current !== pathname) {
      const url = pathname + searchParams.toString()
      handleRouteChange(url)
      // Update REF
      savedPathNameRef.current = pathname
    }
  }, [pathname, handleRouteChange, searchParams])
}
