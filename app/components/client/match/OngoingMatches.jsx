import { getMatches } from "@/app/lib/match";
import clsx from "clsx";
import Image from "next/image";
import { LocalTime } from "../LocalTime";

function MatchScore({ bo, score }) {
  const length = Math.floor(bo / 2) + 1
  const array = [...Array(score).fill(true), ...Array(length - score).fill(false)]
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      {
        array.map((item, i) => (
          <div className={clsx("w-2 h-2 rounded-full", item ? "bg-green-500" : "bg-gray-500")} key={i}></div>
        ))
      }
    </div>
  )
}

export default async function OngoingMatches() {
  const data = await getMatches({ status: [1] })
  if (data.length === 0) {
    return null
  }
  const title = data[0].tournament.title + '-' + data[0].stage.title
  return (
    <div className="bg-[#1d1f23] p-2 text-[#f2f2f2] flex flex-col gap-2">
      <div className="text-sm">正在进行的比赛</div>
      <div className="text-sm">{title}</div>
      {
        data.map((item, i) => {
          const { startTime, bo, homeTeam, homeScore, awayTeam, awayScore, games } = item
          return (
            <div className="p-2 rounded-lg bg-[#272b35] border border-[#43454e]" key={i}>
              <div className="flex justify-between">
                {/* <div className="flex justify-center w-[6%]">
                  <MatchScore bo={bo} score={homeScore} />
                </div> */}
                <div className="flex justify-center w-[25%]">
                  <div className="flex flex-col gap-2 justify-center items-center">
                    <Image src={homeTeam.logo} width={0} height={0} sizes="100%" className="w-auto h-8" alt={homeTeam.name} />
                    <span className="text-sm">{homeTeam.tag}</span>
                  </div>
                </div>
                <div className="flex justify-center items-center w-[12.5%] text-3xl">{ homeScore }</div>
                <div className="flex flex-col justify-center items-center gap-2">
                  <span>Bo{bo}</span>
                  <span>Game { i + 1 }</span>
                </div>
                <div className="flex justify-center items-center w-[12.5%] text-3xl">{ awayScore }</div>
                <div className="flex justify-center w-[25%]">
                  <div className="flex flex-col gap-2 justify-center items-center">
                    <Image src={awayTeam.logo} width={0} height={0} sizes="100%" className="w-auto h-8" alt={awayTeam.name} />
                    <span className="text-sm">{awayTeam.tag}</span>
                  </div>
                </div>
                {/* <div className="flex justify-center w-[6%]">
                  <MatchScore bo={bo} score={awayScore} />
                </div> */}
              </div>
              <div className="flex justify-between mt-6 mb-2">
                <span>Results</span>
                <span>
                  <LocalTime data={startTime} format="MM-DD HH:mm" />
                </span>
              </div>
              <div className="flex flex-col gap-[3px]">
                {
                  games.map((game, j) => {
                    const { picks, radiantWin, radiantTeamId, duration } = game
                    const leftWin = homeTeam.id === radiantTeamId ? radiantWin : !radiantWin
                    const leftPicks = homeTeam.id === radiantTeamId ? picks.filter(item => item.radiant) : picks.filter(item => !item.radiant)
                    const rightPicks = homeTeam.id != radiantTeamId ? picks.filter(item => item.radiant) : picks.filter(item => !item.radiant)
                    return (
                      <div className="flex justify-between items-center" key={j}>
                        <div className="flex">
                          { 
                            leftPicks.map((item, k) => (
                              <div key={k}>
                                <Image key={k} src={item.hero.avatar} width={0} height={0} sizes="100%" className="w-[24px] h-auto" alt={item.hero.name} />
                              </div>
                            ))
                          }
                        </div>
                        <div className="flex justify-center items-center w-4">
                          { leftWin ? <div className="w-[5px] h-[5px] rounded-full bg-green-500"></div> : null }
                        </div>
                        <div className="flex-1 shrink-0 text-center text-xs text-gray-300">{ Math.floor(duration / 60) }:{ (duration % 60) > 9 ? (duration % 60) : `0${duration % 60}` }</div>
                        <div className="flex justify-center items-center w-4">
                          { !leftWin ? <div className="w-[5px] h-[5px] rounded-full bg-green-500"></div> : null }
                        </div>
                        <div className="flex flex-row-reverse">
                          { 
                            rightPicks.map((item, k) => (
                              <div key={k}>
                                <Image src={item.hero.avatar} width={0} height={0} sizes="100%" className="w-[24px] h-auto" alt={item.hero.name} />
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )
        })
      }
    </div>
  )
}