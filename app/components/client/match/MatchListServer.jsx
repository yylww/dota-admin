import MatchListClient from "./MatchListClient"
import { getMatches } from "@/app/lib/match"
import IntlClientProvider from "../IntlClientProvider"

export default async function MatchListServer({ params, children }) {
  const data = await getMatches(params)
  if (data.length === 0 && !children) {
    return null
  }
  return (
    <div className="w-full">
      {
        data.length > 0 ?
        <IntlClientProvider>
          <MatchListClient data={data} />
        </IntlClientProvider> :
        <div>{ children }</div>
      }
    </div>
  )
}