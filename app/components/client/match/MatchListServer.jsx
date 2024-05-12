import MatchListClient from "./MatchListClient"
import { getMatches } from "@/app/lib/match"
import IntlClientProvider from "../IntlClientProvider"

export default async function MatchListServer({ params }) {
  const data = await getMatches(params)

  return (
    <div className="w-full">
      <IntlClientProvider>
        <MatchListClient data={data} />
      </IntlClientProvider>
    </div>
  )
}