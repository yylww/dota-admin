'use client'

import { Line } from "./LineComponent"
import { MatchComponent } from "./MatchComponent"

export const SingleElimination = ({ 
  matchMap, 
  status = 'editable', 
  matches = [],
  onChange,
  width = 170, // 比赛组件宽度
  height = 30, // 比赛组件中队伍高度，比赛组件高度为 height * 2
  lineSpacing = 10, // 行间隔
  columnSpacing = 20, // 列间隔
}) => {
  if (!matchMap) return <div>TBD</div>

  const matchHeight = height * 2 // 比赛组件高度 
  // 根据最多组件数量和行间隙计算容器高度
  const containerHeight = matchHeight * matchMap[0].length + (matchMap.length - 1) * lineSpacing
  // 根据单列组件宽度和列间隙计算容器宽度
  const containerWidth = (width + columnSpacing) * matchMap.length - columnSpacing

  // 计算各比赛组件位置数据
  const handleComponentPosition = (result) => {
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result[i].length; j++) {
        let top = j * (matchHeight + lineSpacing)
        if (i >= result.length - 1 && j >= result[i].length - 1 && result[i].length > 1) {
          // 最后一列三四名
          top = result[i][j - 1].top + matchHeight + columnSpacing * 2
        } else {
          // 根据上一列，计算当前列的位置
          const prev = result[i - 1]
          if (prev) {
            if (prev.length === result[i].length && i < result.length - 1) {
              // 如果上一轮数量跟本轮相同，下一轮比赛根据上一轮位置上调 height / 2
              top = prev[j].top - (height / 2)
              prev[j].position[1] = {
                top: top + (height / 2) * 3,
                left: width + columnSpacing,
              }
            } else {
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

  const result = matchMap
  const dataWithPosition = handleComponentPosition(JSON.parse(JSON.stringify(matchMap)))
  const handleChange = (values, i, j, k) => {
    result[i][j].teams[k] = values
    onChange(result)
  }

  const filterMatch = (teams, matches) => {
    const match = matches.find(item => {
      const { homeTeamId, awayTeamId } = item
      return teams.includes(homeTeamId) && teams.includes(awayTeamId)
    })
    return match
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', width: containerWidth, height: containerHeight }}>
      {
        dataWithPosition.map((columns, i) => (
          <div key={i} style={{ position: 'relative', width }}>
            {
              columns.map((item, j) => (
                <div key={j}>
                  <div style={{ position: 'absolute', top: item.top, width: width, height: height * 2 }}>
                    <MatchComponent onChange={((values, k) => handleChange(values, i, j, k))} status={status} teams={item.teams} match={filterMatch(item.teams, matches)} />
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