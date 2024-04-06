
import Image from 'next/image'
import clsx from 'clsx'

export const Standings = ({ list, matches, width = 400 }) => {
  const tableData = list.map((item, i) => {
    const filterMatches = matches.filter(match => {
      const teamIds = [match.homeTeamId, match.awayTeamId]
      if (teamIds.includes(item.teamId)) {
        return match
      }
    })
    const { bo, homeTeam, homeTeamId, awayTeam } = filterMatches[0]
    const team = item.teamId === homeTeamId ? homeTeam : awayTeam
    const matchPoints = (bo % 2 === 0) ? [0, 0, 0] : [0, 0]
    const gamePoints = [0, 0]

    filterMatches.forEach(match => {
      const { bo, homeTeamId, homeScore, awayScore } = match
      const score = item.teamId === homeTeamId ? [homeScore, awayScore] : [awayScore, homeScore] 
      if (bo % 2 === 0) {
        if (score[0] > score[1]) {
          matchPoints[0] += 1
        } else if (score[0] === score[1]) {
          matchPoints[1] += 1
        } else {
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
    }
  })
  
  return (
    <table className="border-collapse" style={{ width }}>
      <thead>
        <tr>
          <th colSpan={7} className="h-[30px] font-bold border text-center">积分榜</th>
        </tr>
      </thead>
      <tbody>
        {
          tableData.map((rowData, i) => (
            <tr key={i} className={clsx(["bg-green-100", "bg-red-100", "bg-blue-100", "bg-green-100", "bg-yellow-100"][rowData.status])}>
              <td className="w-[40px] h-[30px] border text-center">{i + 1}</td>
              <td colSpan={4} className="h-[30px] border text-center">
                <div className="flex items-center">
                  <div className="relative mx-4 w-[20px] h-[20px]">
                    <Image src={`${rowData.team.logo}`} fill sizes="100% 100%" alt={rowData.team.name} />
                  </div>
                  <span>{ rowData.team.name }</span>
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