'use client'

import clsx from 'clsx'
import Link from "next/link"
import { usePathname } from 'next/navigation'

export default function Header({ locale }) {
  const pathname = usePathname()

  return (
    <div className="fixed z-10 flex shrink-0 w-full justify-center h-12  bg-white text-md">
      <div className="flex w-[1000px]">
        <Link href="/" className={clsx(
          "flex flex-1 justify-center items-center h-full border-b ",
          pathname === '/' || pathname === '/en' ? "border-b-blue-500 text-blue-500" : "border-b-gray-200",
        )}>{ locale.home }</Link>
        <Link href="/statistics" className={clsx(
          "flex flex-1 justify-center items-center h-full border-b ",
          pathname === '/statistics' || pathname === '/en/statistics' ? "border-b-blue-500 text-blue-500" : "border-b-gray-200",
        )}>{ locale.statistic }</Link>
        <Link href="/tournaments" className={clsx(
          "flex flex-1 justify-center items-center h-full border-b ",
          pathname === '/tournaments' || pathname === '/en/tournaments' ? "border-b-blue-500 text-blue-500" : "border-b-gray-200",
        )}>{ locale.tournament }</Link>
        {/* <Link href="/records" className="flex flex-1 justify-center items-center h-full">{ t('time') }</Link> */}
      </div>
    </div>
  )
}