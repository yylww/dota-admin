import { getTournament } from "@/app/lib/tournament"
import { Suspense } from "react"
import TournamentClient from "./TournamentClient"
import { MatchListSkeleton } from "@/app/components/client/skeletons"

export default async function Page({ params }) {
  return (
    <Suspense fallback={<MatchListSkeleton />}>
      <TournamentServer id={+params.id} />
    </Suspense>
  )
}

async function TournamentServer({ id }) {
  const data = await getTournament(id)
  return (
    <TournamentClient data={data} />
  )
}