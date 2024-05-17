'use client'

import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"

export default function SwissSystem({ data }) {
  const { groups, matches } = data
  const dataArr = groups
    .reduce((prev, current) => [...prev, ...current.list], [])
    .map(({ teamId, status }) => {
      const { homeTeam, awayTeam } = matches.find(({ homeTeam, awayTeam }) => homeTeam.id === teamId || awayTeam.id === teamId)
      const matchList = matches.filter(({ homeTeam, awayTeam }) => homeTeam.id === teamId || awayTeam.id === teamId)
      const team = homeTeam.id === teamId ? homeTeam : awayTeam
      const scores = [0, 0]
      matchList.map(match => {
        const { homeTeam, homeScore, awayScore } = match
        if (match.status === 2) {
          if (homeTeam.id === team.id) {
            scores[homeScore > awayScore ? 0 : 1] += 1
          } else {
            scores[homeScore < awayScore ? 0 : 1] += 1
          }
        }
      })
      return {
        team,
        matchList,
        scores,
        status,
      }
    })
  dataArr.sort((a, b) => {
    if (a.scores[0] === b.scores[0]) {
      return a.scores[1] - b.scores[1]
    }
    return b.scores[0] - a.scores[0]
  })
  return (
    <div className="flex flex-col gap-1 bg-white">
      <div className="flex justify-between h-12 font-medium text-xs md:text-lg">
        <div className="flex items-center justify-center bg-slate-200 basis-[18%]">Team</div>
        <div className="flex items-center justify-center bg-slate-200 basis-[13%]">Scores</div>
        <div className="flex items-center justify-center bg-slate-200 basis-[13%]">R1</div>
        <div className="flex items-center justify-center bg-slate-200 basis-[13%]">R2</div>
        <div className="flex items-center justify-center bg-slate-200 basis-[13%]">R3</div>
        <div className="flex items-center justify-center bg-slate-200 basis-[13%]">R4</div>
        <div className="flex items-center justify-center bg-slate-200 basis-[13%]">R5</div>
      </div>
      {
        dataArr.map((item, i) => {
          const { team, matchList, scores, status } = item
          return (
            <div className="flex justify-between items-center w-full h-16" key={i}>
              <div className={clsx(
                "flex flex-col justify-center items-center basis-[18%] h-full",
                { "bg-green-200": status === 0 || status === 3 },
                { "bg-yellow-200": status === 4 },
                { "bg-red-200": status === 1 },
                { "bg-blue-200": status === 2 },
                { "bg-slate-200": status === 5 },
              )}>
                <Image src={team.logo} width={0} height={0} sizes="100%" className="w-5 h-auto" alt={team.name} />
                <span className="text-sm">{ team.tag }</span>
              </div>
              <div className={clsx(
                "flex justify-center items-center basis-[13%] h-full text-lg font-bold",
                { "bg-green-200": status === 0 || status === 3 },
                { "bg-yellow-200": status === 4 },
                { "bg-red-200": status === 1 },
                { "bg-blue-200": status === 2 },
                { "bg-slate-200": status === 5 },
              )}>{ scores.join(':') }</div>
              {
                [...Array(Math.log2(dataArr.length) + 1)].map((_, j) => {
                  if (matchList[j]) {
                    const { id, homeTeam, awayTeam, homeScore, awayScore } = matchList[j]
                    const opponent = homeTeam.id === team.id ? awayTeam : homeTeam
                    const matchScores = homeTeam.id === team.id ? [homeScore, awayScore] : [awayScore, homeScore]
                    return (
                      <Link className={clsx(
                        "flex flex-col items-center basis-[13%] h-full",
                        { "bg-green-200": matchScores[0] > matchScores[1] },
                        { "bg-yellow-200": matchScores[0] === matchScores[1] },
                        { "bg-red-200": matchScores[0] < matchScores[1] },
                      )} key={j} href={`/matches/${id}`}>
                        <div className="flex justify-center items-center w-5 h-10 hover:cursor-pointer">
                          <Image src={opponent.logo} width={0} height={0} sizes="100%" className="w-full h-auto" alt={opponent.name} />
                        </div>
                        <span className="hover:text-blue-500">{ matchScores.join(':') }</span>
                      </Link>
                    )
                  } else {
                    return <div className="basis-[13%] bg-slate-200 h-full" key={j}></div>
                  }
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}