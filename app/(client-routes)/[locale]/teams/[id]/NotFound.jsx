import { useTranslations } from 'next-intl'
import Link from 'next/link'
 
export const NotFound = ({ id }) => {
  const t = useTranslations()
  return (
    <div className='flex flex-col justify-center gap-6 mt-[30%] text-center'>
      <h2>{ t('Team.notFound', { id })}</h2>
      <Link href="/" className='text-blue-500'>{ t('NotFound.backHome') }</Link>
    </div>
  )
}