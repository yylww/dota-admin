
import Image from 'next/image'
import clsx from 'clsx'

export const Standings = ({ title, list, matches }) => {
  const tableData = list.map((item, i) => {
    const filterMatches = matches.filter(item => !item.extra).filter(match => {
      const teamIds = [match.homeTeamId, match.awayTeamId]
      if (teamIds.includes(item.teamId)) {
        return match
      }
    })
    const { bo, homeTeam, homeTeamId, awayTeam } = filterMatches[0]
    const team = item.teamId === homeTeamId ? homeTeam : awayTeam
    const hasExtra = matches.filter(item => item.extra).some(({ homeTeamId, awayTeamId }) => homeTeamId === item.teamId || awayTeamId === item.teamId)
    const matchPoints = (bo % 2 === 0) ? [0, 0, 0] : [0, 0]
    const gamePoints = [0, 0]

    filterMatches.forEach(match => {
      const { bo, homeTeamId, homeScore, awayScore } = match
      const score = item.teamId === homeTeamId ? [homeScore, awayScore] : [awayScore, homeScore] 
      if (bo % 2 === 0) {
        if (score[0] > score[1]) {
          matchPoints[0] += 1
        } 
        if (score[0] === score[1] && score[0] !== 0) {
          matchPoints[1] += 1
        } 
        if (score[0] < score[1]) {
          matchPoints[2] += 1
        }
      } else {
        if (score[0] > score[1]) {
          matchPoints[0] += 1
        } else {
          matchPoints[1] += 1
        }
      }
      
      gamePoints[0] += score[0]
      gamePoints[1] += score[1]
    })

    return {
      team,
      status: item.status,
      matchPoints,
      gamePoints,
      hasExtra,
    }
  }).sort((a, b) => {
    if (a.gamePoints[0] === b.gamePoints[0]) {
      return b.gamePoints[1] - a.gamePoints[1]
    } else {
      return b.gamePoints[0] - a.gamePoints[0]
    }
  })
  
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th colSpan={6} className="h-[30px] font-medium border text-center">{ title }</th>
        </tr>
      </thead>
      <tbody>
        {
          tableData.map((rowData, i) => (
            <tr key={i} className={clsx(["bg-green-100", "bg-red-100", "bg-blue-100", "bg-green-100", "bg-yellow-100", "bg-gray-100"][rowData.status])}>
              <td colSpan={4} className="h-[30px] border text-center">
                <div className="flex items-center">
                  <div className="relative mx-4 w-[20px] h-[20px]">
                    <Image src={`${rowData.team.logo}`} fill sizes="100% 100%" alt={rowData.team.name} />
                  </div>
                  <span>{ rowData.team.name }{ rowData.hasExtra ? '*' : '' }</span>
                </div>
              </td>
              <td className="h-[30px] border text-center">{ rowData.matchPoints.join('-') }</td>
              <td className="h-[30px] border text-center">{ rowData.gamePoints.join('-') }</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}