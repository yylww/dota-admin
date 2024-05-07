'use client'

import { useHydration } from "@/app/hooks/useHydration"
import dayjs from "dayjs"
import { Suspense } from "react"

var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')

dayjs.extend(utc)
dayjs.extend(timezone)

export default function LocalTime({ date }) {
  const hydrated = useHydration()
  return (
    <Suspense key={hydrated ? 'local' : 'utc'}>
      <time dateTime={new Date(date).toISOString()}>
        { dayjs(date).format('HH:mm') }
        { hydrated ? '' : ' (UTC)'}
        { dayjs.tz.guess() }
      </time>
    </Suspense>
  )
}