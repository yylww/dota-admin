'use client'

import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import Link from "next/link"
import { usePathname } from 'next/navigation'

export default function Header() {
  const t = useTranslations('Header')
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 md:top-0 z-10 flex shrink-0 w-full justify-center h-12 border-t border-t-gray-200 md:border-t-0 md:border-b md:border-b-gray-200 bg-white text-md">
      <div className="flex w-[1000px]">
        <Link href="/" className={clsx(
          "flex flex-1 justify-center items-center h-full",
          pathname === '/' || pathname === '/en' ? "border-b border-b-blue-500 text-blue-500" : "",
        )}>{ t('home') }</Link>
        <Link href="/statistics" className={clsx(
          "flex flex-1 justify-center items-center h-full",
          pathname.includes('statistics') ? "border-b border-b-blue-500 text-blue-500" : "",
        )}>{ t('statistic') }</Link>
        <Link href="/tournaments" className={clsx(
          "flex flex-1 justify-center items-center h-full",
          pathname.includes('tournaments') ? "border-b border-b-blue-500 text-blue-500" : "",
        )}>{ t('tournament') }</Link>
      </div>
    </div>
  )
}