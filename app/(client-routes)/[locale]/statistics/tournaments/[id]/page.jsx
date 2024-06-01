import { getStatisticData } from "@/app/lib/statistics"

export default async function Page({ params }) {
  const data = await getStatisticData({ tournamentId: +params.id })
  const radiantWinRate = (data.filter(item => item.radiantWin).length / data.length * 100).toFixed(2)

  return (
    <div>
      <h1></h1>
      <div></div>
      天辉胜率：{ radiantWinRate }%
      比赛数：{ data.length }
      天辉胜场数：{ data.filter(item => item.radiantWin).length }
    </div>
  )
}