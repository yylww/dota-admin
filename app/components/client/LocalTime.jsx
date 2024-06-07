'use client'

import { useHydration } from "@/app/hooks/useHydration"
import dayjs from "dayjs"
import { Suspense } from "react"

var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

export function LocalTime({ data, format, className }) {
  const hydrated = useHydration()
  return (
    <Suspense key={hydrated ? 'local' : 'utc'}>
      <span className={className}>
        { dayjs(data).format(format) }
        { hydrated ? '' : ' (UTC)'}
      </span>
    </Suspense>
  )
}

export function LocalRangeDate({ data, className }) {
  const hydrated = useHydration()
  return (
    <Suspense key={hydrated ? 'local' : 'utc'}>
      <div className={className}>
        <span>{ dayjs(data[0]).utcOffset(8).format('YYYY/MM/DD') }</span>
        <span> - </span>
        <span>{ dayjs(data[1]).utcOffset(8).format('YYYY/MM/DD') }</span>
        <span>{ hydrated ? '' : ' (UTC)'}</span>
      </div>
    </Suspense>
  )
}