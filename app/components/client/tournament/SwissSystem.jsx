// 'use client'

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
    <table className="w-full border-collapse">
      <thead>
        <tr className="h-12 font-medium text-center text-xs md:text-lg">
          <td className="border-gray-200 bg-slate-200">Team</td>
          <td className="border-gray-200 bg-slate-200">Scores</td>
          <td className="border-gray-200 bg-slate-200">R1</td>
          <td className="border-gray-200 bg-slate-200">R2</td>
          <td className="border-gray-200 bg-slate-200">R3</td>
          <td className="border-gray-200 bg-slate-200">R4</td>
          <td className="border-gray-200 bg-slate-200">R5</td>
        </tr>
      </thead>
      <tbody>
        {
          dataArr.map((item, i) => {
            const { team, matchList, scores, status } = item
            return (
              <tr className="w-full h-16 text-center" key={i}>
                <td className={clsx(
                  "border border-gray-200 w-[19%] h-full",
                  { "bg-green-200": status === 0 || status === 3 },
                  { "bg-yellow-200": status === 4 },
                  { "bg-red-200": status === 1 },
                  { "bg-blue-200": status === 2 },
                  { "bg-slate-200": status === 5 },
                )}>
                  <div className="flex flex-col justify-center items-center">
                    <div className="relative w-5 h-5">
                      <Image src={team.logo} fill sizes="100%" className="object-contain" alt={team.name} />
                    </div>
                    <span className="text-sm">{ team.tag }</span>
                  </div>
                </td>
                <td className={clsx(
                  "border border-gray-200 w-[13.5%] h-full text-lg font-bold",
                  { "bg-green-200": status === 0 || status === 3 },
                  { "bg-yellow-200": status === 4 },
                  { "bg-red-200": status === 1 },
                  { "bg-blue-200": status === 2 },
                  { "bg-slate-200": status === 5 },
                )}>{ scores.join(':') }</td>
                {
                  [...Array(Math.log2(dataArr.length) + 1)].map((_, j) => {
                    if (matchList[j]) {
                      const { id, homeTeam, awayTeam, homeScore, awayScore } = matchList[j]
                      const opponent = homeTeam.id === team.id ? awayTeam : homeTeam
                      const matchScores = homeTeam.id === team.id ? [homeScore, awayScore] : [awayScore, homeScore]
                      return (
                        <td className={clsx(
                          "border border-gray-200 w-[13.5%] h-full",
                          { "bg-green-200": matchScores[0] > matchScores[1] },
                          { "bg-yellow-200": matchScores[0] === matchScores[1] },
                          { "bg-red-200": matchScores[0] < matchScores[1] },
                        )} key={j}>
                          <Link className="flex flex-col items-center" href={`/matches/${id}`}>
                            <div className="relative flex justify-center items-center w-5 h-5 hover:cursor-pointer">
                              <Image src={opponent.logo} fill sizes="100%" className="object-contain" alt={opponent.name} />
                            </div>
                            <span className="hover:text-blue-500">{ matchScores.join(':') }</span>
                          </Link>
                        </td>
                      )
                    } else {
                      return <td className="border border-gray-200 w-[13.5%] bg-slate-200 h-full" key={j}></td>
                    }
                  })
                }
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}