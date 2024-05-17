import { getTournament } from "@/app/lib/tournament"
import { Suspense } from "react"
import TournamentClient from "./TournamentClient"

export default async function Page({ params }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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