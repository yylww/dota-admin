import { Suspense } from "react"
import TournamentServer from "./TournamentServer"

export default async function Page() {
  return (
    <Suspense>
      <TournamentServer />
    </Suspense>
  )
}