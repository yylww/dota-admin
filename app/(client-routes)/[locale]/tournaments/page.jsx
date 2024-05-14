import { Suspense } from "react"
import TournamentServer from "./TournamentServer"
import { TournamentsSkeleton } from "@/app/components/client/skeletons"

export default function Page() {
  return (
    <Suspense fallback={<TournamentsSkeleton />}>
      <TournamentServer />
    </Suspense>
  )
}