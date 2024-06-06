'use client'

import { ChartBarIcon, HomeIcon, LanguageIcon, TrophyIcon } from '@heroicons/react/24/outline'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from "@/app/messages/navigation"
import { usePathname } from 'next/navigation'

export default function Header() {
  const locale = useLocale()
  const t = useTranslations('Header')
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 md:top-0 z-10 flex shrink-0 w-full justify-center h-14 border-t border-t-gray-100 md:border-t-0 md:border-b md:border-b-gray-100 bg-indigo-200 text-xs md:text-base">
      <div className="flex items-center w-full md:w-[1000px]">
        <Link href="/" className="flex flex-1 justify-center items-center h-full">
          <div className="flex flex-col md:flex-row md:gap-1 justify-center items-center">
            <HomeIcon className="w-5" />
            <span>{ t('home') }</span>
          </div>
        </Link>
        <div className="w-[1px] h-6 bg-gray-100"></div>
        <Link href="/tournaments" className="flex flex-1 justify-center items-center h-full">
          <div className="flex flex-col md:flex-row md:gap-1 justify-center items-center">
            <TrophyIcon className="w-5" />
            <span>{ t('tournament') }</span>
          </div>
        </Link>
        <div className="w-[1px] h-6 bg-gray-100"></div>
        <Link href="/statistics" className="flex flex-1 justify-center items-center h-full">
          <div className="flex flex-col md:flex-row md:gap-1 justify-center items-center">
            <ChartBarIcon className="w-5" />
            <span>{ t('statistic') }</span>
          </div>
        </Link>
        <div className="w-[1px] h-6 bg-gray-100"></div>
        <Link href={pathname.replace('/en', '/zh')} locale={locale === 'en' ? 'zh' : 'en'} className="flex flex-1 justify-center items-center h-full">
          <div className="flex flex-col md:flex-row md:gap-1 justify-center items-center">
            <LanguageIcon className="w-5" />
            <span>{t('language')}</span>
          </div>
        </Link>
      </div>
    </div>
  )
}