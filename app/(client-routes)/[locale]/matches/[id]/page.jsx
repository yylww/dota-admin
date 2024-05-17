import { ScoreComponent } from "./ScoreComponent"
import { TabComponent } from "./TabComponent"
import { DetailComponent } from "./DetailComponent"
import { getMatch } from "@/app/lib/match"

export default async function Page({ params, searchParams }) {
  const data = await getMatch(+params.id)
  const index = searchParams.tab ? Number(searchParams.tab) - 1 : 0
  return (
    <div className="bg-white">
      <ScoreComponent data={data} />
      {
        data.games.length > 0 ? <TabComponent id={+params.id} length={data.games.length} tabIndex={index} /> : <div className="w-full text-center">暂无比赛数据，请稍后再试。</div>
      }
      {
        data.games.length > 0 ? <DetailComponent data={data.games[index]} /> : null
      }
    </div>
  )
}