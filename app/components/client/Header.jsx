'use client'

import { HomeIcon, ChartBarIcon, LanguageIcon, TrophyIcon } from '@heroicons/react/20/solid'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from "@/app/messages/navigation"
import { usePathname, useSearchParams } from 'next/navigation'
import clsx from 'clsx'

export default function Header() {
  const locale = useLocale()
  const t = useTranslations('Header')
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const href = `${pathname.replace('/en', '/zh')}?${params.toString()}`

  return (
    <div className="fixed bottom-0 md:top-0 z-10 md:z-40 flex shrink-0 w-full justify-center h-12 border-t border-t-gray-100 md:border-t-0 md:border-b md:border-b-gray-100 bg-slate-50 text-xs md:text-base">
      <div className="flex justify-around items-center w-full md:w-[900px] px-2">
        <Link href="/" className="flex justify-center items-center h-full">
          <div className={clsx(
            "flex flex-col md:flex-row md:gap-1 justify-center items-center py-1 px-2 md:px-4 rounded-lg",
            pathname === '/' || pathname === '/en' ? "text-blue-500" : ""
          )}>
            <HomeIcon className="w-5" />
            <span>{ t('home') }</span>
          </div>
        </Link>
        <div className="w-[1px] h-6 bg-gray-100"></div>
        <Link href="/tournaments" className="flex justify-center items-center h-full">
          <div className={clsx(
            "flex flex-col md:flex-row md:gap-1 justify-center items-center py-1 px-2 md:px-4 rounded-lg",
            pathname.includes('tournaments') ? "text-blue-500" : ""
          )}>
            <TrophyIcon className="w-5" />
            <span>{ t('tournament') }</span>
          </div>
        </Link>
        <div className="w-[1px] h-6 bg-gray-100"></div>
        <Link href="/statistics" className="flex justify-center items-center h-full">
          <div className={clsx(
            "flex flex-col md:flex-row md:gap-1 justify-center items-center py-1 px-2 md:px-4 rounded-lg",
            pathname.includes('statistics') ? "text-blue-500" : ""
          )}>
            <ChartBarIcon className="w-5" />
            <span>{ t('statistic') }</span>
          </div>
        </Link>
        <div className="w-[1px] h-6 bg-gray-100"></div>
        <Link href={href} locale={locale === 'en' ? 'zh' : 'en'} className="flex justify-center items-center h-full">
          <div className="flex md:gap-1 justify-center items-center">
            <LanguageIcon className="w-5" />
            <span>{t('language')}</span>
          </div>
        </Link>
      </div>
    </div>
  )
}