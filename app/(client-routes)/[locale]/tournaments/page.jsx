import { Suspense } from "react"
import { TournamentsSkeleton } from "@/app/components/client/skeletons"
import { getTournaments } from "@/app/lib/tournament"
import TournamentListClient from "./TournamentListClient"

export default function Page() {
  return (
    <Suspense fallback={<TournamentsSkeleton />}>
      <TournamentListServer />
    </Suspense>
  )
}

async function TournamentListServer() {
  const data = await getTournaments()
  return (
    <TournamentListClient data={data} />
  )
}