'use client'

import { useHydration } from "@/app/hooks/useHydration"
import dayjs from "dayjs"
import { Suspense } from "react"

export default function LocalTime({ data, format }) {
  const hydrated = useHydration()
  return (
    <Suspense key={hydrated ? 'local' : 'utc'}>
      <time dateTime={new Date(data).toISOString()}>
        { dayjs(data).format(format) }
        { hydrated ? '' : ' (UTC)'}
      </time>
    </Suspense>
  )
}