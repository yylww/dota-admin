import { getHeroes } from "@/app/lib/hero"
import { useTranslations } from "next-intl"
import Image from "next/image"

export default async function TournamentStatictis({ data }) {
  const t = useTranslations('TournamentDetail')
  const heroes = await getHeroes()
  const radiantWinGames = data.filter(item => item.radiantWin)
  const direWinGames = data.filter(item => !item.radiantWin)
  const radiantWinRate = (radiantWinGames.length / data.length * 100).toFixed(2)
  const duration = Math.round(data.reduce((prev, current) => prev + current.duration, 0) / data.length)
  const orderByDuration = data.sort((a, b) => a.duration - b.duration)
  const minDuration = orderByDuration[0].duration
  const maxDuration = orderByDuration[orderByDuration.length - 1].duration
  const banObj = {}
  const pickObj = {}
  data.map(game => {
    const { bans, picks, radiantWin } = game
    bans.map(ban => {
      const { heroId, hero } = ban
      if (banObj[heroId]) {
        banObj[heroId].count += 1
      } else {
        banObj[heroId] = { 
          ...hero, 
          count: 1,
        }
      }
    })
    picks.map(pick => {
      const { heroId, hero, radiant } = pick
      if (pickObj[heroId]) {
        pickObj[heroId].count += 1
        if (radiantWin === radiant) {
          pickObj[heroId].winCount += 1
        }
      } else {
        pickObj[heroId] = { 
          ...hero, 
          count: 1,
          winCount: radiantWin === radiant ? 1 : 0,
        }
      }
    })
  })
  const pickHeroIds = Object.keys(pickObj).map(item => +item)
  const noPickHeroIds = heroes.filter((hero) => !pickHeroIds.includes(hero.id))
  const rateRanking = Object.values(pickObj).filter(item => item.count >= 5).map(item => ({ ...item, percent: (item.winCount / item.count * 100).toFixed(1) }))
  return (
    <div className="bg-white p-2 md:p-4">
      <h2 className="mb-2 font-medium">{t('statictis')}</h2>
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center gap-1 p-2 bg-gray-200">
          <span className="font-medium text-base">{ data.length }</span>
          <span className="text-gray-500 text-xs">比赛场次</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 bg-gray-200">
          <span className="font-medium text-base">{ pickHeroIds.length }</span>
          <span className="text-gray-500 text-xs">上场英雄</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 bg-gray-200">
          <span className="font-medium text-base">{ noPickHeroIds.length }</span>
          <span className="text-gray-500 text-xs">未上场</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 bg-gray-200">
          <span className="font-medium text-base">{ Math.floor(duration / 60) }:{ duration % 60 }</span>
          <span className="text-gray-500 text-xs">场均时长</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 bg-gray-200">
          <span className="font-medium text-base">{ Math.floor(maxDuration / 60) }:{ maxDuration % 60 }</span>
          <span className="text-gray-500 text-xs">最长时长</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 bg-gray-200">
          <span className="font-medium text-base">{ Math.floor(minDuration / 60) }:{ minDuration % 60 }</span>
          <span className="text-gray-500 text-xs">最短时长</span>
        </div>
      </div>
      <div className="flex justify-between mt-2 mb-1">
        <div>
          <span>天辉胜率：</span>
          <span className="text-blue-500">{ radiantWinRate }%</span>
        </div>
        <div>
          <span>夜魇胜率：</span>
          <span className="text-blue-500">{ 100 - radiantWinRate }%</span>
        </div>
      </div>
      <div className="flex items-center text-gray-500">
        <div style={{ width: `${radiantWinRate}%` }} className="h-6 pl-1 bg-green-200">{ radiantWinGames.length }</div>
        <div style={{ width: `${100 - radiantWinRate}%` }} className="h-6 pr-1 text-right bg-red-200">{ direWinGames.length }</div>
      </div>
      <div className="mt-2">
        <h3 className="mb-1">Pick最多</h3>
        <div className="grid grid-cols-6 gap-1">
          {
            Object.values(pickObj).sort((a, b) => b.count - a.count).slice(0, 6).map((item, i) => (
              <div className="flex flex-col items-center" key={i}>
                <Image src={item.avatar} width={0} height={0} sizes="100%" className="w-full h-auto" alt={item.name} />
                <span className="text-sm text-gray-600">{ item.count }次</span>
              </div>
            ))
          }
        </div>
        <h3 className="mt-2 mb-1">Ban最多</h3>
        <div className="grid grid-cols-6 gap-1">
          {
            Object.values(banObj).sort((a, b) => b.count - a.count).slice(0, 6).map((item, i) => (
              <div className="flex flex-col items-center" key={i}>
                <Image src={item.avatar} width={0} height={0} sizes="100%" className="w-full h-auto" alt={item.name} />
                <span className="text-sm text-gray-600">{ item.count }次</span>
              </div>
            ))
          }
        </div>
        <h3 className="mt-2 mb-1">胜率最高</h3>
        <div className="grid grid-cols-6 gap-1">
          {
            rateRanking.sort((a, b) => b.percent - a.percent).slice(0, 6).map((item, i) => (
              <div className="flex flex-col items-center" key={i}>
                <Image src={item.avatar} width={0} height={0} sizes="100%" className="w-full h-auto" alt={item.name} />
                <span className="text-sm text-gray-600">{ item.percent }%</span>
              </div>
            ))
          }
        </div>
        <h3 className="mt-2 mb-1">胜率最低</h3>
        <div className="grid grid-cols-6 gap-1">
          {
            rateRanking.sort((a, b) => a.percent - b.percent).slice(0, 6).map((item, i) => (
              <div className="flex flex-col items-center" key={i}>
                <Image src={item.avatar} width={0} height={0} sizes="100%" className="w-full h-auto" alt={item.name} />
                <span className="text-sm text-gray-600">{ item.percent }%</span>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}