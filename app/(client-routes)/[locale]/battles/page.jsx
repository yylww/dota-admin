import { Suspense } from "react"
import { MatchListSkeleton } from "@/app/components/client/skeletons"
import MatchListServer from "@/app/components/client/match/MatchListServer"
import { getTranslations } from "next-intl/server"
import { useTranslations } from "next-intl"

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations()
  return {
    title: t('Battle.metadata.title'),
    description: t('Battle.metadata.description')
  }
}

export default function Page({ searchParams }) {
  const t = useTranslations('Battle')
  const teamIds = searchParams.teamIds.split(',').map(id => +id)
  return (
    <div className="md:pt-4">
      <Suspense fallback={<MatchListSkeleton />}>
        <MatchListServer params={{ status: [2], teamIds }}>
          <div className="flex justify-center items-center h-16">{ t('noRecords') }</div>
        </MatchListServer>
      </Suspense>
    </div>
  )
}