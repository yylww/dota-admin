'use client'

import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons"
import clsx from "clsx";
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useRef, useState } from "react"

function Option({ label, value, sort, order, handleClick }) {
  return (
    <div className="flex flex-1 justify-center items-center cursor-pointer" onClick={() => handleClick(value)}>
      <span className={clsx(sort === value ? "text-blue-500" : "")}>{ label }</span>
      <div className={clsx("flex items-center", sort === value ? "block" : "hidden")}>
        { order === 'desc' ? <CaretDownOutlined style={{ color: "#3b82f6" }} /> : <CaretUpOutlined style={{ color: "#3b82f6" }} /> }
      </div>
    </div>
  )
}

export default function DataList({ data, teamId }) {
  const t = useTranslations('Statistic')
  const ref = useRef(null)
  const [order, setOrder] = useState('desc')
  const [sort, setSort] = useState('picks')
  const handleClick = (value) => {
    if (value === sort) {
      setOrder(order === 'desc' ? 'asc' : 'desc')
    } else {
      setOrder('desc')
      setSort(value)
    }
    ref.current.scrollIntoView()
  }
  const handleBanPick = (data, teamId) => {
    const heroObj = {}
    data.map((game) => {
      const { bans, picks, radiantTeamId, radiantWin } = game
      // 具体到队伍时，picks和bans过滤出该队伍数据
      const filterPicks = teamId ? picks.filter(({ radiant }) => (teamId === radiantTeamId && radiant) || (teamId != radiantTeamId && !radiant)) : picks
      const filterBans = teamId ? bans.filter(({ radiant }) => (teamId === radiantTeamId && radiant) || (teamId != radiantTeamId && !radiant)) : bans
      const oppositeBans = teamId ? bans.filter(({ radiant }) => (teamId === radiantTeamId && !radiant) || (teamId != radiantTeamId && radiant)) : bans
      filterPicks.map(pick => {
        const { heroId, hero, radiant } = pick
        if (heroObj[heroId]) {
          heroObj[heroId].picks += 1
          if (radiantWin === radiant) {
            heroObj[heroId].win += 1
          }
        } else {
          heroObj[heroId] = {
            avatar: hero.avatar,
            picks: 1,
            win: radiantWin === radiant ? 1 : 0,
            bans: 0,
            banned: 0,
            bannedWin: 0,
          }
        }
      })
      filterBans.map(ban => {
        const { heroId, hero } = ban
        if (heroObj[heroId]) {
          heroObj[heroId].bans += 1
        } else {
          heroObj[heroId] = {
            avatar: hero.avatar,
            picks: 0,
            win: 0,
            bans: 1,
            banned: 0,
            bannedWin: 0,
          }
        }
      })
      if (teamId) {
        oppositeBans.map(ban => {
          const { heroId, hero, radiant } = ban
          if (heroObj[heroId]) {
            heroObj[heroId].banned += 1
            if (radiantWin === radiant) {
              heroObj[heroId].bannedWin += 1
            }
          } else {
            heroObj[heroId] = {
              avatar: hero.avatar,
              picks: 0,
              win: 0,
              bans: 0,
              banned: 1,
              bannedWin: radiantWin === radiant ? 1 : 0,
            }
          }
        })
      }
    })
    const formatData = Object.values(heroObj)
      .map(item => ({ 
        ...item, 
        winRate: item.picks > 0 ? (item.win / item.picks * 100).toFixed(1) : 0,
        bannedWinRate: item.banned > 0 ? (item.bannedWin / item.banned * 100).toFixed(1) : 0, 
      }))
    return formatData.sort((a, b) => {
      if (sort === 'picks') {
        return order === 'asc' ? a.picks - b.picks : b.picks - a.picks
      } else if (sort === 'winRate') {
        return order === 'asc' ? a.winRate - b.winRate : b.winRate - a.winRate
      } else if (sort === 'bans') {
        return order === 'asc' ? a.bans - b.bans : b.bans - a.bans
      } else if (sort === 'banned') {
        return order === 'asc' ? a.banned - b.banned : b.banned - a.banned
      } else if (sort === 'bannedWinRate') {
        return order === 'asc' ? a.bannedWinRate - b.bannedWinRate : b.bannedWinRate - a.bannedWinRate
      }
    })
  }
  const results = handleBanPick(data, teamId)
  return (
    <section ref={ref} className="w-full scroll-m-12">
      <section className="z-20 sticky top-[42px] md:top-12 flex justify-between gap-1 items-center h-[45px] md:h-[54px] px-2 md:px-4 text-sm md:text-base text-black/70 bg-white border-b border-b-black/5 md:border-t md:border-t-black/5">
        <div className="w-[48px] md:w-[64px]">{t('hero')}</div>
        <Option label={t('picks')} value="picks" sort={sort} order={order} handleClick={handleClick} />
        <Option label={t('rate')} value="winRate" sort={sort} order={order} handleClick={handleClick} />
        <Option label={t('bans')} value="bans" sort={sort} order={order} handleClick={handleClick} />
        {
          teamId ? 
          <>
            <Option label={t('banned')} value="banned" sort={sort} order={order} handleClick={handleClick} />
            <Option label={t('bannedWinRate')} value="bannedWinRate" sort={sort} order={order} handleClick={handleClick} />
          </> : null
        }
      </section>
      <div>
        {
          results.map((item, i) => {
            const { avatar, picks, winRate, bans, banned, bannedWinRate } = item
            return (
              <div className="flex gap-1 justify-between items-center p-2 md:px-4 border-b last:border-0 even:bg-slate-50 border-b-black/5 text-center text-black/70" key={i}>
                <Image src={avatar} width={0} height={0} sizes="100%" className="w-[48px] md:w-[64px] h-[27px] md:h-[36px] rounded-sm" alt={avatar} />
                <div className={clsx("flex-1", { "font-medium text-black/90": sort === "picks" })}>{picks}</div>
                <div className={clsx("flex-1", { "font-medium text-black/90": sort === "winRate" })}>{winRate}%</div>
                <div className={clsx("flex-1", { "font-medium text-black/90": sort === "bans" })}>{bans}</div>
                {
                  teamId ? 
                  <>
                    <div className={clsx("flex-1", { "font-medium text-black/90": sort === "banned" })}>{ banned }</div>
                    <div className={clsx("flex-1", { "font-medium text-black/90": sort === "bannedWinRate" })}>{ bannedWinRate }%</div>
                  </> : null
                }
              </div>
            )
          })
        }
      </div>
    </section>
  )
}