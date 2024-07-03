import MatchListClient from "./MatchListClient"
import { getMatches } from "@/app/lib/match"

export default async function MatchListServer({ params, children }) {
  const data = await getMatches(params)
  if (data.length === 0 && !children) {
    return null
  }
  return (
    <div className="w-full">
      {
        data.length > 0 ?
        <MatchListClient data={data} /> :
        <div>{ children }</div>
      }
    </div>
  )
}