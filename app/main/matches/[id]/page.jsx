import { ScoreComponent } from "./ScoreComponent";
import { TabComponent } from "./TabComponent";
import { DetailComponent } from "./DetailComponent";
import { Suspense } from "react";
import { getMatch } from "@/app/lib/match";

export default async function Page({ params, searchParams }) {
  const data = await getMatch(+params.id)
  const index = searchParams.tab ? Number(searchParams.tab) - 1 : 0
  return (
    <div>
      <ScoreComponent data={data} />
      <Suspense fallback={<div>Loading...</div>}>
        <TabComponent length={data.games.length} />
      </Suspense>
      <DetailComponent data={data.games[index]} />
    </div>
  )
}