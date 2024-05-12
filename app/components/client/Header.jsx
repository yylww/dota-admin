'use client'

import clsx from 'clsx'
import Link from "next/link"
import { usePathname } from 'next/navigation'

export default function Header({ locale }) {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 md:top-0 z-10 flex shrink-0 w-full justify-center h-12 border-t border-t-gray-200 md:border-t-0 md:border-b md:border-b-gray-200 bg-white text-md">
      <div className="flex w-[1000px]">
        <Link href="/" className={clsx(
          "flex flex-1 justify-center items-center h-full",
          pathname === '/' || pathname === '/en' ? "border-b border-b-blue-500 text-blue-500" : "",
        )}>{ locale.home }</Link>
        <Link href="/statistics" className={clsx(
          "flex flex-1 justify-center items-center h-full",
          pathname === '/statistics' || pathname === '/en/statistics' ? "border-b border-b-blue-500 text-blue-500" : "",
        )}>{ locale.statistic }</Link>
        <Link href="/tournaments" className={clsx(
          "flex flex-1 justify-center items-center h-full",
          pathname === '/tournaments' || pathname === '/en/tournaments' ? "border-b border-b-blue-500 text-blue-500" : "",
        )}>{ locale.tournament }</Link>
        {/* <Link href="/records" className="flex flex-1 justify-center items-center h-full">{ t('time') }</Link> */}
      </div>
    </div>
  )
}