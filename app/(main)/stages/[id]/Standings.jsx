import { Flex } from 'antd'
import styles from './style.module.scss'

export const Standings = ({ list, matches, width = 400 }) => {
  const staticURL = process.env.NEXT_PUBLIC_STATIC_URL
  const tableData = list.map((item, i) => {
    const filterMatches = matches.filter(match => {
      const teamIds = match.teams.map(team => team.id)
      if (teamIds.includes(item.teamId)) {
        return match
      }
    })
    const bo = filterMatches[0].bo
    const team = filterMatches[0].teams.find(team => team.id === item.teamId)
    const matchPoints = (bo % 2 === 0) ? [0, 0, 0] : [0, 0]
    const gamePoints = [0, 0]

    filterMatches.forEach(match => {
      const games = match.games
      const arr = [0, 0]
      if (games && games.length > 0) {
        games.map(game => {
          const radiant = game.records.find(record => record.radiant)
          if (item.teamId === game.radiantTeamId) {
            if (radiant.win) {
              arr[0] += 1
            } else {
              arr[1] += 1
            }
          } else {
            if (!radiant.win) {
              arr[0] += 1
            } else {
              arr[1] += 1
            }
          }
        }) 
      }
      if (bo % 2 === 0) {
        if (arr[0] > arr[1]) {
          matchPoints[0] += 1
        } else if (arr[0] === arr[1]) {
          matchPoints[1] += 1
        } else {
          matchPoints[2] += 1
        }
      } else {
        if (arr[0] > arr[1]) {
          matchPoints[0] += 1
        } else {
          matchPoints[1] += 1
        }
      }
      
      gamePoints[0] += arr[0]
      gamePoints[1] += arr[1]
    })

    return {
      team,
      status: item.status,
      matchPoints,
      gamePoints,
    }
  })
  
  return (
    <table className={styles.table} style={{ width }}>
      <tbody>
        <th colSpan={7} className={styles.th}>积分榜</th>
        {
          tableData.map((rowData, i) => (
            <tr key={i} className={[styles.win, styles.lose, styles.extra, styles.upper, styles.lower][rowData.status]}>
              <td className={styles.td} style={{ width: 40 }}>{i + 1}</td>
              <td colSpan={4} className={styles.td}>
                <Flex align='center'>
                  <img style={{ width: 20, margin: '0 16px' }} src={`${staticURL}${rowData.team.logo}`} />
                  <span>{ rowData.team.name }</span>
                </Flex>
              </td>
              <td className={styles.td}>{ rowData.matchPoints.join('-') }</td>
              <td className={styles.td}>{ rowData.gamePoints.join('-') }</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}