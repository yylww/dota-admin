import HotTournamentServer from "@/app/components/client/tournament/HotTournamentServer"
import MatchListServer from "@/app/components/client/match/MatchListServer"
import { Suspense } from "react"
import { HotTournamentSkeleton, MatchListSkeleton } from "@/app/components/client/skeletons"
import { getLatestTournamentId } from "@/app/lib/tournament"

export const dynamic = 'force-dynamic'

export default async function Page() {
  const tournamentId = await getLatestTournamentId()
  return (
    <div className="flex justify-between">
      <div className="relative hidden md:block">
        <div className="fixed mt-4 w-[240px]">
          <Suspense fallback={<HotTournamentSkeleton />}>
            <HotTournamentServer />
          </Suspense>
        </div>
      </div>
      <div className="flex flex-col gap-2 md:gap-4 w-full md:w-[750px] md:p-4">
        <Suspense fallback={<MatchListSkeleton />}>
          <MatchListServer params={{ status: [0, 1], orderBy: { startTime: 'asc' } }} />
          <MatchListServer params={{ tournamentId, status: [2], orderBy: { startTime: 'desc' } }} />
        </Suspense>
      </div>
    </div>
  )
}