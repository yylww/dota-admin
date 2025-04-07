import { LocalRangeDate } from '@/app/components/client/LocalTime';
import { getLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { getTournaments } from '@/app/lib/tournament';

export default async function TournamentList() {
  const data = await getTournaments();
  const locale = await getLocale();
  const formatter = new Intl.NumberFormat();
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 p-2 md:p-0 md:pt-4'>
      {data.map((item, i) => {
        const { id, title, title_en, logo, startDate, endDate, bonus } = item;
        return (
          <Link href={`/tournaments/${id}`} key={i}>
            <div className='bg-white rounded-md overflow-hidden'>
              <Image
                src={logo}
                width={0}
                height={0}
                sizes='100%'
                priority
                style={{ aspectRatio: 64 / 25 }}
                className='w-full h-auto object-cover'
                alt={title_en}
              />
              <div className='flex flex-col gap-2 p-2'>
                <div className='flex justify-between'>
                  <span>{locale === 'en' ? title_en : title}</span>
                  <span className='text-yellow-500'>${formatter.format(bonus)}</span>
                </div>
                <LocalRangeDate data={[startDate, endDate]} className='text-sm text-black/60' />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
