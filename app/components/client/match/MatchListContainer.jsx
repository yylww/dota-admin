import { Suspense } from "react"
import MatchListClient from "./MatchListClient"
import { getMatches } from "@/app/lib/match"

export default function MatchListServerContainer({ params, children }) {
  const data = getMatches(params)
  if (data.length === 0 && !children) {
    return null
  }
  return (
    <div className="w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <MatchListClient dataPromise={data} />
      </Suspense>
    </div>
  )
}