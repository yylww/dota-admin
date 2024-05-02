import { getStatistics } from "@/app/lib/statistics"
import Ranking from "./Ranking"

export default async function Page() {
  const { banRanking, pickRanking, rateRanking, noplays } = await getStatistics()
  const banSort = banRanking.sort((a, b) => b.count - a.count).slice(0, 10)
  const pickSort = pickRanking.sort((a, b) => b.count - a.count).slice(0, 10)
  const winSort = rateRanking.filter(item => item.count > 3).sort((a, b) => b.percent - a.percent).slice(0, 20)
  const loseSort = rateRanking.filter(item => item.count > 3).sort((a, b) => a.percent - b.percent).slice(0, 20)
  return (
    <div className="grid grid-cols-2 gap-10 p-4 bg-white">
      <Ranking data={pickSort}>
        <div className="text-base">出场最多的英雄</div>
      </Ranking>
      <Ranking data={banSort}>
        <div className="text-base">禁用最多的英雄</div>
      </Ranking>
      <Ranking data={winSort}>
        <div className="text-base">胜率最高的英雄</div>
      </Ranking>
      <Ranking data={loseSort} index={loseSort.length - 1}>
        <div className="text-base">胜率最低的英雄</div>
      </Ranking>
    </div>
  )
}