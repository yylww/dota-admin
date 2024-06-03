import { Suspense } from "react"
import { TournamentsSkeleton } from "@/app/components/client/skeletons"
import TournamentList from "@/app/components/client/tournament/TournamentList"
import { getTranslations } from "next-intl/server"
import { getTournaments } from "@/app/lib/tournament"

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale })
  const data = await getTournaments({ take: 5 })
  const titleArr = data.map(({ title }) => title)
  const enTitleArr = data.map(({ title_en }) => title_en)
  return {
    title: t('Tournament.metadata.title'),
    description: locale === 'en' ? `Includes ${enTitleArr.join(', ')} and other events.` : `包含${titleArr.join('，')}赛事。`
  }
}

export default async function Page() {
  return (
    <Suspense fallback={<TournamentsSkeleton />}>
      <TournamentList />
    </Suspense>
  )
}