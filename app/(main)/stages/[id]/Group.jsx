import styles from './style.module.scss'

export const Group = ({ teams, matches }) => {
  const tableData = []
  const lastRow = [null]
  const getMatch = (teamA, teamB, matches) => {
    const result = matches.find(match => {
      const teamIds = match.teams.map(team => team.id)
      if (teamIds.includes(teamA) && teamIds.includes(teamB)) {
        return true
      }
    })
    return result
  }
  const handleCellData = (teamIds, games) => {
    const arr = [0, 0]
    if (games && games.length > 0) {
      games.map(game => {
        const radiant = game.records.filter(record => record.radiant)
        if (teamIds[0] === game.radiantTeamId) {
          if (radiant[0].win) {
            arr[0] += 1
          } else {
            arr[1] += 1
          }
        } else {
          if (!radiant[0].win) {
            arr[0] += 1
          } else {
            arr[1] += 1
          }
        }
      }) 
    }
    // 0: 左边胜 1: 平局 2: 右边胜
    let status = 0
    if (arr[0] > arr[1]) {
      status = 0
    } else if (arr[0] === arr[1]) {
      status = 1
    } else {
      status = 2
    }
    return {
      status,
      score: arr.join(':'),
    }
  }
  
  teams.forEach((teamA, i) => {
    let rowData = []
    let match = null
    teams.forEach((teamB, j) => {
      if (teamA === teamB) {
        rowData.push(null)
      } else {
        match = getMatch(teamA, teamB, matches)
        rowData.push(handleCellData([teamA, teamB], match.games))
      }
    })
    const teamData = match.teams.filter(team => team.id === teamA)[0]
    lastRow.push(teamData)
    tableData.push([teamData, ...rowData])
  })
  tableData.push(lastRow)
  
  return (
    <table className={styles.table}>
      <tbody>
        {
          tableData.map((rowData, i) => (
            <tr key={i}>
              {
                rowData.map((colData, j) => {
                  let content = ''
                  let style = styles.empty
                  if (colData) {
                    style = colData.tag ? styles.white : [styles.win, styles.equal, styles.lose][colData.status]
                    content = colData.tag ? <img width={15} src={`${process.env.NEXT_PUBLIC_STATIC_URL}${colData.logo}`} /> : colData.score
                  }
                  return <td className={`${style} ${styles.td}`} key={j}>{ content }</td>
                })
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}