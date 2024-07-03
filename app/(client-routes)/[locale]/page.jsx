import HotTournamentServer from "@/app/components/client/tournament/HotTournamentServer"
import MatchListServer from "@/app/components/client/match/MatchListServer"
import { Suspense } from "react"
import { HotTournamentSkeleton, MatchListSkeleton } from "@/app/components/client/skeletons"
import { getLatestTournamentId } from "@/app/lib/tournament"
import TournamentRouter from "@/app/components/client/tournament/TournamentRouter"

export default async function Page({ searchParams }) {
  const tournamentId = searchParams.tournament ? +searchParams.tournament : await getLatestTournamentId()
  return (
    <div className="flex justify-between">
      <div className="relative hidden md:block">
        <div className="fixed mt-4 w-[240px]">
          <Suspense fallback={<HotTournamentSkeleton />}>
            <HotTournamentServer tournamentId={tournamentId} />
          </Suspense>
        </div>
      </div>
      <div className="flex flex-col gap-2 md:gap-4 w-full md:w-[660px] md:p-4">
        <Suspense fallback={<MatchListSkeleton />}>
          <MatchListServer params={{ tournamentId, orderBy: { startTime: 'desc' } }} />
        </Suspense>
        <div className="block md:hidden">
          <Suspense>
            <TournamentRouter current={tournamentId} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}