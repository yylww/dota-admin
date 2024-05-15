import { Suspense } from "react"
import { MatchListSkeleton } from "@/app/components/client/skeletons"
import MatchListServer from "@/app/components/client/match/MatchListServer"
import { getTranslations } from "next-intl/server"

export default async function Page({ searchParams }) {
  const t = await getTranslations('tips')
  const ids = searchParams.ids.split(',').map(id => +id)
  return (
    <div className="md:pt-4">
      <Suspense fallback={<MatchListSkeleton />}>
        <MatchListServer params={{ status: [2], ids }}>
          <div className="flex justify-center items-center h-16">{ t('noRecords') }</div>
        </MatchListServer>
      </Suspense>
    </div>
  )
}