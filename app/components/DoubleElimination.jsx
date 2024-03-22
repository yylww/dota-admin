import { Line } from "./LineComponent"
import { MatchComponent } from "./MatchComponent"

// 填充数据
const makeArr = (number) => {
  const arr = []
  for (let i = 0; i < number; i++) {
    arr[i] = { teams: [] }
  }
  return arr
}

export const getMatchMapData = (upperLength, lowerLength = 0) => {
  if (!upperLength) return false
  // 根据初始数据中胜者组比赛场次和败者组比赛场次来计算出总的列数
  const stageNum = Math.log2((upperLength + lowerLength)) * 2 + 1
  const result = []
  for (let i = 0; i < stageNum; i++) {
    if (i === 0) {
      result[i] = {
        upper: lowerLength === 0 ? makeArr(upperLength) : [],
        lower: lowerLength === 0 ? makeArr(upperLength / 2) : makeArr(lowerLength)
      }
    } else if (i === 1) {
      result[i] = {
        upper: lowerLength === 0 ? makeArr(upperLength / 2) : makeArr(upperLength),
        lower: [],
      }
    } else if (i < stageNum - 1) {
      result[i] = { upper: [], lower: [] }
    } else {
      result[i] = { final: [{ teams: [] }] }
    }
  }
  for (let i = 0; i < stageNum - 2; i++) {
    const upperLen = result[i].upper.length
    const lowerLen = result[i].lower.length
    if (upperLen > 1) {
      if (i === 0) {
        // 第一列胜者组数量大于1，下一列胜者组数量减半，当前列败者组数量为当前列胜者组数量的一半
        result[i + 1].upper = makeArr(upperLen / 2)
        result[i + 1].lower = makeArr(upperLen / 2) 
      } else {
        // 胜者组数量大于1且不为第一列，下一列胜者组数量为0，下下一列胜者组数量减半，下一列败者组数量为当前列败者组数量的一半
        result[i + 2].upper = makeArr(upperLen / 2)
        result[i + 1].lower = makeArr(lowerLen / 2) 
      }
    } else if (upperLen === 0) {
      // 无胜者组，下一列败者组数量不变
      result[i + 1].lower = makeArr(lowerLen)
    } else if (upperLen === 1) {
      // 胜者组数量为1，即为胜者组决赛，无需处理
    }
  }
  return result
}

export const DoubleElimination = ({
  matchMap, 
  status = 'editable',
  matches = [],
  onChange,
  width = 160, // 比赛组件宽度
  height = 30, // 比赛组件中队伍高度，比赛组件高度为 height * 2
  lineSpacing = 10, // 行间隔
  columnSpacing = 20, // 列间隔
}) => {
  if (!matchMap) return <div>TBD</div>
  
  const upperLen = matchMap[0].upper.length > 0 ? matchMap[0].upper.length : matchMap[1].upper.length
  const lowerLen = matchMap[0].lower.length
  const matchHeight = height * 2 // 比赛组件高度 
  // 根据初始数据中胜者组比赛场次和败者组比赛场次来计算出单列最多组件数量
  const maxComponentNum = upperLen + lowerLen
  // 根据最多组件数量和行间隙计算容器高度
  const containerHeight = (maxComponentNum + 1) * matchHeight + maxComponentNum * lineSpacing
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
        result[i].final[0].top = top
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
          // 从第二轮开始，根据是否有胜者组比赛来区分败者组第二轮的位置
          // 上一轮败者组数据
          const prevLower = result[i - 1] ? result[i - 1].lower : null
          if (prevLower) {
            if (upper.length > 0) {
              // 有胜者组比赛，下一轮败者组比赛根据上一轮位置上调 height / 2
              bottom = prevLower[j].bottom + (height / 2)
              prevLower[j].position[1] = {
                bottom: bottom + (height / 2),
                left: width + columnSpacing,
              }
            } else {
              // 无胜者组比赛，下一轮败者组比赛位置为上一轮的两组比赛的居中位置
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
                    <MatchComponent onChange={((values, k) => handleChange('upper', values, i, j, k))} status={status} teams={item.teams} matches={matches.filter(match => match.group === 1)} />
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
                    <MatchComponent onChange={((values, k) => handleChange('lower', values, i, j, k))} status={status} teams={item.teams} matches={matches.filter(match => match.group === 2)} />
                  </div>
                  <Line direction="bottom" position={item.position} columnSpacing={columnSpacing} />
                </div>
                
              )) : null
            }
            {
              final ? 
              final.map((item, j) => (
                <div key={j} style={{ position: 'absolute', top: item.top, width: width, height: height * 2 }}>
                  <MatchComponent onChange={((values, k) => handleChange('final', values, i, j, k))} status={status} teams={item.teams} matches={matches.filter(match => match.group === 3)} />
                </div>
              )) : null
            }
          </div>
        ))
      }
    </div>
  )
}





// 第二步，根据初始胜者组败者组数据，生成对阵图数据
  // for (let i = 0; i < stageNum; i++) {
  //   /* start 处理对阵图比赛队伍数据 */
  //   // 胜者组
  //   for (let j = 0; j < upper.length; j++) {
  //     const { teams, score } = upper[j]
  //     // todo 判断赢的队伍
  //     if (!score) {
  //       continue
  //     }
  //     const winId = score[0] > score[1] ? teams[0] : teams[1]
  //     const loseId = score[0] < score[1] ? teams[0] : teams[1]
  //     if (i < result.length - 2) {
  //       const index = (upper.length > 1 && i > 0) ? i + 2 : i + 1 
  //       result[index].upper[Math.floor(j / 2)].teams[j % 2] = winId
  //     } else {
  //       // 胜者组决赛
  //       result[i + 1].final[0].teams[0] = winId
  //       // result[i + 1].final[0].score = [3, 2]
  //     }
  //     if (i === 0 && upper.length > 0) {
  //       // 第一列有胜者组时，胜者组的败者组成第一列败者组
  //       result[i].lower[Math.floor(j / 2)].teams[j % 2] = loseId
  //     } else {
  //       result[i].lower[j].teams[0] = loseId
  //     }
  //   }

  //   // 败者组
  //   for (let j = 0; j < lower.length; j++) {
  //     const { teams, score } = lower[j]
  //     // todo 判断赢的队伍
  //     if (!score) {
  //       continue
  //     }
  //     const winId = score[0] > score[1] ? teams[0] : teams[1]
  //     if (i < result.length - 2) {
  //       if (upper.length > 0 && i > 0) {
  //         // 有胜者组且不为败者组决赛时，败者组2合1
  //         // 其余情况败者组胜者与胜者组败者合并
  //         result[i + 1].lower[Math.floor(j / 2)].teams[j % 2] = winId
  //       } else {
  //         result[i + 1].lower[j] = { teams: [null, winId] }
  //       }
  //     } else {
  //       // 败者组决赛
  //       result[i + 1].final[0].teams[1] = winId
  //     } 
  //   }
  //   /* end 处理对阵图比赛队伍数据 */
  //   console.log(i, result[i])
  // }