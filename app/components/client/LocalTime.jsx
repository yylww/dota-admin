'use client'

import { useHydration } from "@/app/hooks/useHydration"
import dayjs from "dayjs"
import { Suspense } from "react"

export function LocalTime({ data, format }) {
  const hydrated = useHydration()
  return (
    <Suspense key={hydrated ? 'local' : 'utc'}>
      <span>
        { dayjs(data).format(format) }
        { hydrated ? '' : ' (UTC)'}
      </span>
    </Suspense>
  )
}

export function LocalRangeDate({ data }) {
  const hydrated = useHydration()
  return (
    <Suspense key={hydrated ? 'local' : 'utc'}>
      <div>
        <span>{ dayjs(data[0]).format('YYYY/MM/DD') }</span>
        <span> - </span>
        <span>{ dayjs(data[1]).format('YYYY/MM/DD') }</span>
        <span>{ hydrated ? '' : ' (UTC)'}</span>
      </div>
    </Suspense>
  )
}