import { getTranslations } from "next-intl/server"
import { NotFound } from "./NotFound"
import { getTeam } from "@/app/lib/team"
import Image from "next/image"
import MatchListServer from "@/app/components/client/match/MatchListServer"
import { Suspense } from "react"
import { MatchListSkeleton } from "@/app/components/client/skeletons"

export async function generateMetadata({ params: { id, locale } }) {
  const data = await getTeam(+id)
  if (!data) {
    return {
      title: "Not Found"
    }
  }
  const { name, players } = data
  return {
    title: name,
    description: `${data.name} ${locale === 'en' ? 'includes' : '包括'} ${players.map(item => item.nickname).join(', ')}`
  }
}

export default async function Page({ params: { id, locale } }) {
  const t = await getTranslations()
  const data = await getTeam(+id)
  if (!data) {
    return <NotFound id={id} />
  }
  const { name, logo, region, players, achievements } = data
  return (
    <section className="flex flex-col gap-2 md:p-4">
      <section className="flex flex-col items-center p-2 bg-white md:rounded-md">
        <div className="relative w-10 h-10">
          <Image src={logo} fill className="object-contain" alt={name} />
        </div>
        <div className="mt-1">{ name }</div>
        <div>{t('Team.region', { region: locale === 'en' ? region.name : region.cname})}</div>
      </section>
      <section className="p-2 md:p-4 bg-white md:rounded-md">
        <h3 className="mb-1 font-medium">{t('Team.info')}</h3>
        <div className="flex justify-between">
          {
            players.map((item, i) => (
              <div className="flex flex-col justify-center items-center" key={i}>
                <div>{ item.nickname }</div>
                <div className="text-sm text-gray-500">{t('Team.position', { position: item.position })}</div>
              </div>
            ))
          }
        </div>
      </section>
      <section>
        <h3 className="font-medium p-2 md:p-4 mb-2 bg-white md:rounded-md">近期赛程</h3>
        <Suspense fallback={<MatchListSkeleton />}>
          <MatchListServer params={{ teamId: +id, status: [2], take: 5 }} />
        </Suspense>
      </section>

    </section>
  )
}