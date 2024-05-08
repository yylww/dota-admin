'use client'

import { useHydration } from "@/app/hooks/useHydration"
import dayjs from "dayjs"
import { Suspense } from "react"

export default function LocalTime({ date, format }) {
  const hydrated = useHydration()
  return (
    <Suspense key={hydrated ? 'local' : 'utc'}>
      <time dateTime={new Date(date).toISOString()}>
        { dayjs(date).format(format) }
        { hydrated ? '' : ' (UTC)'}
      </time>
    </Suspense>
  )
}