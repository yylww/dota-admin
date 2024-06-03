import { useTranslations } from 'next-intl'
import Link from 'next/link'
 
export default function NotFound() {
  const t = useTranslations('NotFound')
  return (
    <div className='flex flex-col justify-center gap-6 mt-6 text-center'>
      <h2>{ t('notFound') }</h2>
      <Link href="/" className='text-blue-500'>{ t('backHome') }</Link>
    </div>
  )
}