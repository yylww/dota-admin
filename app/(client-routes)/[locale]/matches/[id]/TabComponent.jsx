import clsx from "clsx"
import { useTranslations } from "next-intl"
import Link from "next/link"

export const TabComponent = ({ id, length, tabIndex }) => {
  const t = useTranslations('Match')
  return (
    <section className="p-2 md:px-4">
      <div className="flex w-full h-9 p-1 rounded-sm text-black/60 bg-black/5">
        {
          [...Array(length)].map((_, index) => (
            <Link
              href={`/matches/${id}?tab=${index+1}`} 
              replace
              key={index} 
              className={clsx(
                "flex flex-1 h-full justify-center items-center cursor-pointer rounded-sm",
                tabIndex === index ? "bg-white text-black" : ""
              )}
            >
              { t('tab', { number: index + 1 }) }
            </Link>
          ))
        }
      </div>
    </section>
    
  )
} 