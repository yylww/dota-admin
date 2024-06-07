'use client' // Error components must be Client Components
 
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
 
export default function Error({ error, reset }) {
  const t = useTranslations('Error')
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="flex justify-center gap-2 mt-[30%]">
      <h2>{t('error')}</h2>
      <button
        className="text-blue-500"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        {t('reset')}
      </button>
    </div>
  )
}