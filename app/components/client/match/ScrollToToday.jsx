'use client'

import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"

export default function ScrollToToday() {
  const t = useTranslations('tips')
  const ref = useRef(null)
  useEffect(() => {
    ref.current.scrollIntoView({
      block: 'nearest'
    })
  })
  return (
    <div ref={ref} className="px-2 rounded-md bg-blue-500 text-white md:scroll-m-[83px]">{ t('today') }</div>
  )
}