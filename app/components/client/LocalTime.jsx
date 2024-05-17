'use client'

import { useHydration } from "@/app/hooks/useHydration"
import { useFormatter } from "next-intl"
import { Suspense } from "react"

export default function LocalTime({ data }) {
  const hydrated = useHydration()
  const format = useFormatter()
  const dateString = format.dateTime(data, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric', 
    minute: 'numeric',
  })
  return (
    <Suspense key={hydrated ? 'local' : 'utc'}>
      <time dateTime={new Date(data).toISOString()}>
        { dateString }
        { hydrated ? '' : ' (UTC)'}
      </time>
    </Suspense>
  )
}