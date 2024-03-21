// 单败淘汰制对阵图

import { Line } from "./LineComponent"
import { MatchComponent } from "./MatchComponent"

export const SingleElimination = ({ 
  initData, 
  matches = [],
  width = 120, // 比赛组件宽度
  height = 30, // 比赛组件中队伍高度，比赛组件高度为 height * 2
  lineSpacing = 10, // 行间隔
  columnSpacing = 20, // 列间隔
}) => {
  // 填充数据
  const makeArr = (number) => {
    const arr = []
    for (let i = 0; i < number; i++) {
      arr[i] = { teams: [] }
    }
    return arr
  }
  initData = [
    { teams: [1,2] }, 
    { teams: [3,4] }, 
    { teams: [5,6] }, 
    { teams: [7,8] },
  ]

  // 根据初始数据比赛场次来计算出总的列数
  const stageNum = Math.log2(initData.length) + 1
  const matchHeight = height * 2 // 比赛组件高度 
  // 根据最多组件数量和行间隙计算容器高度
  const containerHeight = initData.length * matchHeight + (initData.length - 1) * lineSpacing
  // 根据单列组件宽度和列间隙计算容器宽度
  const containerWidth = (width + columnSpacing) * stageNum - columnSpacing

  // 第一步，根据第一轮数量来确定对阵图数据结构
  const handleDataStructure = (initData) => {
    if (!initData) return false
    const result = []
    for (let i = 0; i < stageNum; i++) {
      if (i === 0) {
        result[i] = initData
      } else {
        result[i] = makeArr(result[i - 1].length / 2)
      }
    }
    return result
  }

  // 第二步，计算各比赛组件位置数据
  const handleComponentPosition = (result) => {
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result[i].length; j++) {
        let top = j * (matchHeight + lineSpacing)
        // 根据上一列，计算当前列的位置
        const prev = result[i - 1]
        if (prev) {
          const gap = prev[j * 2 + 1].top - prev[j * 2].top - matchHeight
          top = prev[j * 2 + 1].top - (gap / 2) - height
          prev[j * 2].position[1] = {
            top: top + height / 2,
            left: width + columnSpacing,
          }
          prev[j * 2 + 1].position[1] = {
            top: prev[j * 2].position[1].top + height,
            left: width + columnSpacing,
          }
        }
        result[i][j].top = top
        if (i < result.length - 1) {
          result[i][j].position = [{
            top: top + height,
            left: width,
          }]
        }
      }
    }
    return result
  }

  const handleMatchScore = (teams, games) => {
    const arr = [0, 0]
    if (games && games.length > 0) {
      games.map(game => {
        const radiant = game.records.filter(record => record.radiant)
        if (teams[0].id === game.radiantTeamId) {
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
    return arr
  }

  const getWinId = (teams) => {
    // 通过teams id 在matches中找到匹配的match
    // 然后通过 match 计算胜者id并返回
    // 如果match未完成，返回null
    const match = matches.find(item => {
      const teamIds = item.teams.map(team => team.id)
      return teamIds.includes(teams[0]) && teamIds.includes(teams[1])
    })
    if (match) {
      const { games, bo } = match
      const score = handleMatchScore(teams, games)
      if (score[0] + score[1] < bo) {
        return null
      } else {
        return score[0] > score[1] ? teams[0] : teams[1]
      }
    } else {
      return null
    }
  }

  const handleMatchWin = (result) => {
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result[i].length; j++) {
        const { teams } = result[i][j]
        // todo 判断赢的队伍
        if (teams[0] && teams[1]) {
          const winId = getWinId(teams)
          if (result[i + 1] && winId) {
            result[i + 1][Math.floor(j / 2)].teams[j % 2] = winId
          }
        }
      }
    }
    return result
  }

  let result = handleDataStructure(initData)
  result = handleComponentPosition(result)
  result = handleMatchWin(result)
  console.log(result)

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', width: containerWidth, height: containerHeight }}>
      {
        result.map((columns, i) => (
          <div key={i} style={{ position: 'relative', width }}>
            {
              columns.map((item, j) => (
                <div key={j}>
                  <div style={{ position: 'absolute', top: item.top, width: width }}>
                    <MatchComponent teams={item.teams} score={item.score} width={width} height={height} />
                  </div>
                  {
                    (i < result.length - 1) ? 
                    <Line direction='top' position={item.position} columnSpacing={columnSpacing} /> : null
                  }
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}