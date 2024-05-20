'use client'

import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"

export default function ScrollToToday() {
  const t = useTranslations('tips')
  const ref = useRef(null)
  useEffect(() => {
    ref.current.scrollIntoView()
  })
  return (
    <div ref={ref} className="px-2 rounded-md bg-blue-500 text-white scroll-m-2 md:scroll-m-[83px]">{ t('today') }</div>
  )
}