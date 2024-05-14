import { getStatistics } from "@/app/lib/statistics"
import Ranking from "./Ranking"
import { getTranslations } from "next-intl/server"

export default async function Page({ params: { locale } }) {
  const t = await getTranslations('statistic')
  const { banRanking, pickRanking, rateRanking, noplays } = await getStatistics()
  const banSort = banRanking.sort((a, b) => b.count - a.count).slice(0, 20)
  const pickSort = pickRanking.sort((a, b) => b.count - a.count).slice(0, 20)
  const winSort = rateRanking.filter(item => item.count > 3).sort((a, b) => b.percent - a.percent).slice(0, 20)
  const loseSort = rateRanking.filter(item => item.count > 3).sort((a, b) => a.percent - b.percent).slice(0, 20)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-4 bg-white">
      <Ranking data={pickSort}>
        <div>{ t('pickRank') }</div>
      </Ranking>
      <Ranking data={banSort}>
        <div>{ t('banRank') }</div>
      </Ranking>
      <Ranking data={winSort}>
        <div>{ t('winRank') }</div>
      </Ranking>
      <Ranking data={loseSort} index={loseSort.length - 1}>
        <div>{ t('loseRank') }</div>
      </Ranking>
    </div>
  )
}