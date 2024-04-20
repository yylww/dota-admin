import { fetcher } from "@/app/utils/fetcher";
import { ScoreComponent } from "./ScoreComponent";
import { TabComponent } from "./TabComponent";
import { DetailComponent } from "./DetailComponent";

export const revalidate = 0
export default async function Page({ params, searchParams }) {
  const data = await fetcher(`/api/matches/${params.id}`)
  const index = searchParams.tab ? Number(searchParams.tab) - 1 : 0
  return (
    <div>
      <ScoreComponent data={data} />
      <TabComponent length={data.games.length} />
      <DetailComponent data={data.games.reverse()[index]} />
    </div>
  )
}