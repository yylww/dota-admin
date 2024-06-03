import clsx from "clsx"
import { useTranslations } from "next-intl"
import Link from "next/link"

export const TabComponent = ({ id, length, tabIndex }) => {
  const t = useTranslations('Match')
  return (
    <div className="flex w-full h-12 bg-white md:text-lg">
      {
        [...Array(length)].map((_, index) => (
          <Link
            href={`/matches/${id}?tab=${index+1}`} 
            replace
            key={index} 
            className={clsx(
              "flex flex-1 h-full justify-center items-center cursor-pointer border-b-2",
              tabIndex === index ? "text-blue-500 border-b-blue-500" : "border-b-gray-200"
            )}
          >
            { t('tab', { number: index + 1 }) }
          </Link>
        ))
      }
    </div>
  )
} 