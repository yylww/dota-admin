'use client'

import { useEffect, useState } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"

export function useQueryParams() {
  const queries = {}
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const iterators = params.keys()
  
  for (const key of iterators) {
    queries[key] = params.get(key)
  }

  const pathname = usePathname()
  const { replace } = useRouter()
  const handleSearchParams = (key, value) => {
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    replace(`${pathname}?${params.toString()}`)
  }
  
  // useEffect(() => {
  //   handleSearchParams(queryParams)
  // }, [])

  return [queries, handleSearchParams]
}