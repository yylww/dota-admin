'use client'

import { useEffect, useRef } from "react"

export default function ScrollToToday() {
  const ref = useRef(null)
  useEffect(() => {
    ref.current.scrollIntoView()
  })
  return (
    <div ref={ref} className="px-2 rounded-md bg-blue-500 text-white scroll-m-[83px]">今天</div>
  )
}