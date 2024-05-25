'use client'

import { Line } from "./LineComponent"
import { MatchComponent } from "./MatchComponent"

export const DoubleElimination = ({
  matchMap, 
  status = 'editable',
  matches = [],
  onChange,
  width = 150, // 比赛组件宽度
  height = 30, // 比赛组件中队伍高度，比赛组件高度为 height * 2
  lineSpacing = 10, // 行间隔
  columnSpacing = 20, // 列间隔
}) => {
  if (!matchMap) return <div>TBD</div>
  
  const upperLen = matchMap[0].upper.length > 0 ? matchMap[0].upper.length : matchMap[1].upper.length
  const lowerLen = matchMap[0].lower.length > 0 ? matchMap[0].lower.length : matchMap[1].lower.length
  const matchHeight = height * 2 // 比赛组件高度 
  // 根据初始数据中胜者组比赛场次和败者组比赛场次来计算出单列最多组件数量
  const maxComponentNum = upperLen + lowerLen
  // 根据最多组件数量和行间隙计算容器高度
  const containerHeight = maxComponentNum * (matchHeight + lineSpacing) + lineSpacing
  // 根据单列组件宽度和列间隙计算容器宽度
  const containerWidth = (width + columnSpacing) * matchMap.length - columnSpacing
  
  // 第二步，计算各比赛组件位置数据
  const handleComponentPosition = (result) => {
    for (let i = 0; i < result.length; i++) {
      const { upper, lower, final } = result[i]
      if (final) {
        // 总决赛，上一轮胜者组和败者组居中位置
        const prevUpper = result[i - 1].upper // 上一轮胜者组数据
        const prevLower = result[i - 1].lower // 上一轮败者组数据
        const gap = containerHeight - (prevUpper[0].top + matchHeight) - (prevLower[0].bottom + matchHeight)
        const top = prevUpper[0].top + (gap / 2) + matchHeight - height
        result[i].final[0] = {
          ...result[i].final[0],
          top,
        }
        prevUpper[0].position[1] = {
          top: top + (height / 2),
          left: width + columnSpacing,
        }
        prevLower[0].position[1] = {
          bottom: containerHeight - (top + matchHeight) + height / 2,
          left: width + columnSpacing,
        }
      } else {
        // 胜者组
        for (let j = 0; j < upper.length; j++) {
          let top = j * (matchHeight + lineSpacing)
          // 胜者组比赛从第二轮开始，下一轮比赛位置根据上一轮位置居中
          // 上一轮胜者组数据
          const prevUpper = result[i - 1] && result[i - 1].upper.length > 0 ? result[i - 1].upper : (result[i - 2] && result[i - 2].upper.length > 0 ? result[i - 2].upper : null)
          if (prevUpper) {
            const gap = prevUpper[j * 2 + 1].top - (prevUpper[j * 2].top + matchHeight)
            top = prevUpper[j * 2 + 1].top - (gap / 2) - height
            const left = i === 1 && upper.length > 0 ? (width + columnSpacing) : ((width + columnSpacing) * 2)
            prevUpper[j * 2].position[1] = {
              top: top + height / 2,
              left,
            }
            prevUpper[j * 2 + 1].position[1] = {
              top: prevUpper[j * 2].position[1].top + height,
              left,
            }
          }
          result[i].upper[j].top = top
          result[i].upper[j].position = [{
            top: top + height,
            left: width,
          }]
        } 
        // 败者组
        for (let j = 0; j < lower.length; j++) {
          let bottom = j * (matchHeight + lineSpacing)
          // 上一轮败者组数据
          const prevLower = result[i - 1] ? result[i - 1].lower : null
          if (prevLower) {
            if (prevLower.length === lower.length) {
              // 如果上一轮数量跟本轮相同，下一轮败者组比赛根据上一轮位置上调 height / 2
              bottom = prevLower[j].bottom + (height / 2)
              prevLower[j].position[1] = {
                bottom: bottom + (height / 2),
                left: width + columnSpacing,
              }
            } else {
              // 如果上一轮数量跟本轮不相同，下一轮败者组比赛位置为上一轮的两组比赛的居中位置
              const gap = prevLower[j * 2].bottom - (prevLower[j * 2 + 1].bottom + matchHeight)
              bottom = prevLower[j * 2].bottom - (gap / 2) - height
              prevLower[j * 2].position[1] = {
                bottom: bottom + height / 2,
                left: width + columnSpacing,
              }
              prevLower[j * 2 + 1].position[1] = {
                bottom: prevLower[j * 2].position[1].bottom + height,
                left: width + columnSpacing,
              }
            }
          }
          result[i].lower[j].bottom = bottom
          result[i].lower[j].position = [{
            bottom: bottom + height,
            left: width,
          }]
        } 
      }
    }
    return result
  }
  
  const result = matchMap
  const dataWithPosition = handleComponentPosition(JSON.parse(JSON.stringify(matchMap)))
  const handleChange = (target, values, i, j, k) => {
    result[i][target][j].teams[k] = values
    onChange(result)
  }

  const filterMatch = (group, teams, matches) => {
    const groupMatches = matches.filter(item => item.group === group)
    const match = groupMatches.find(item => {
      const { homeTeamId, awayTeamId } = item
      return teams.includes(homeTeamId) && teams.includes(awayTeamId)
    })
    return match
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', width: containerWidth, height: containerHeight }}>
      {
        dataWithPosition.map(({ upper, lower, final }, i) => (
          <div key={i} style={{ position: 'relative', width }}>
            {
              (upper && upper.length > 0) ? 
              upper.map((item, j) => (
                <div key={j}>
                  <div style={{ position: 'absolute', top: item.top, width: width, height: height * 2 }}>
                    <MatchComponent onChange={((values, k) => handleChange('upper', values, i, j, k))} status={status} teams={item.teams} match={filterMatch(1, item.teams, matches)} />
                  </div>
                  <Line direction="top" position={item.position} columnSpacing={columnSpacing} />
                </div>
              )) : null
            }
            {
              (lower && lower.length > 0) ? 
              lower.map((item, j) => (
                <div key={j}>
                  <div style={{ position: 'absolute', bottom: item.bottom, width: width, height: height * 2 }}>
                    <MatchComponent onChange={((values, k) => handleChange('lower', values, i, j, k))} status={status} teams={item.teams} match={filterMatch(2, item.teams, matches)} />
                  </div>
                  <Line direction="bottom" position={item.position} columnSpacing={columnSpacing} />
                </div>
                
              )) : null
            }
            {
              final ? 
              final.map((item, j) => (
                <div key={j} style={{ position: 'absolute', top: item.top, width: width, height: height * 2 }}>
                  <MatchComponent onChange={((values, k) => handleChange('final', values, i, j, k))} status={status} teams={item.teams} match={filterMatch(3, item.teams, matches)} />
                </div>
              )) : null
            }
          </div>
        ))
      }
    </div>
  )
}