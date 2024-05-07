'use client'

import { useEffect, useState } from "react"

export function useHydration() {
  const [hydration, setHydration] = useState(false)
  useEffect(() => {
    setHydration(true)
  }, [])
  return hydration
}