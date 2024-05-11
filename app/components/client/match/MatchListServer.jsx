import MatchListClient from "./MatchListClient"
import { getMatchByTouranamentId } from "@/app/lib/match"
import IntlClientProvider from "../IntlClientProvider"

export default async function MatchListServer({ tournamentId }) {
  const data = await getMatchByTouranamentId(tournamentId)

  return (
    <div className="w-full">
      <IntlClientProvider>
        <MatchListClient data={data} />
      </IntlClientProvider>
    </div>
  )
}