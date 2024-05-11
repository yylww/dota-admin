import { getLatestTournamentId } from "../../lib/tournament"
import HotTournamentServer from "@/app/components/client/tournament/HotTournamentServer"
import MatchListServer from "@/app/components/client/match/MatchListServer"
import { Suspense } from "react"
import { HotTournamentSkeleton, MatchListSkeleton } from "@/app/components/client/skeletons"

export const dynamic = 'force-dynamic'

export default async function Page({ searchParams }) {
  const tournamentId = searchParams.tournament ? Number(searchParams.tournament) : await getLatestTournamentId()
  return (
    <div className="flex justify-between">
      <div className="relative hidden md:block">
        <div className="fixed mt-4 w-[240px]">
          <Suspense fallback={<HotTournamentSkeleton />}>
            <HotTournamentServer />
          </Suspense>
        </div>
      </div>
      <div className="w-[750px]">
        <Suspense key={tournamentId} fallback={<MatchListSkeleton />}>
          <MatchListServer tournamentId={tournamentId} />
        </Suspense>
      </div>
    </div>
  )
}