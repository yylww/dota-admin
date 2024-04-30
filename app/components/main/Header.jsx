import { useTranslations } from 'next-intl'
import Link from "next/link";

export default function Header() {
  const t = useTranslations('header')
  return (
    <div className="fixed z-10 flex shrink-0 w-full justify-center h-12 border-b border-b-gray-200 bg-white text-md">
      <div className="flex w-[1000px]">
        <Link href="/main" className="flex flex-1 justify-center items-center h-full">{ t('home') }</Link>
        <Link href="/main/tournaments" className="flex flex-1 justify-center items-center h-full">{ t('tournament') }</Link>
        <Link href="/main/statistics" className="flex flex-1 justify-center items-center h-full">{ t('statistics') }</Link>
        <Link href="/main/records" className="flex flex-1 justify-center items-center h-full">{ t('time') }</Link>
      </div>
    </div>
  )
}