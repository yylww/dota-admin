import { Suspense } from "react"
import { TournamentsSkeleton } from "@/app/components/client/skeletons"
import TournamentList from "@/app/components/client/tournament/TournamentList"

export default async function Page() {
  return (
    <Suspense fallback={<TournamentsSkeleton />}>
      <TournamentList />
    </Suspense>
  )
}