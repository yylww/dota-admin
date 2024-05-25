import { Suspense } from "react"
import TournamentDetail from "@/app/components/client/tournament/TournamentDetail"
import { MatchListSkeleton } from "@/app/components/client/skeletons"

export default async function Page({ params }) {
  return (
    <div className="md:p-4">
      <Suspense fallback={<MatchListSkeleton />}>
        <TournamentDetail id={+params.id} />
      </Suspense>
    </div>
  )
}