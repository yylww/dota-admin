import { Suspense } from "react"
import { MatchListSkeleton } from "@/app/components/client/skeletons"
import MatchListServer from "@/app/components/client/match/MatchListServer"

export default async function Page({ searchParams }) {
  const ids = searchParams.ids.split(',').map(id => +id)
  return (
    <div className="bg-white">
      <Suspense fallback={<MatchListSkeleton />}>
        <MatchListServer params={{ status: 2, ids, orderBy: { startTime: 'asc' } }}>
          <div className="flex justify-center items-center h-16">无交手记录</div>
        </MatchListServer>
      </Suspense>
    </div>
  )
}