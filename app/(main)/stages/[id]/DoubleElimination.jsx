import { MatchComponent } from "./MatchComponent"

export const DoubleElimination = () => {
  const initData = { 
    upper: [{ teams: [1,2], score: [2,0] }, { teams: [3,4], score: [1,2] }],
    lower: [{ teams: [5,6], score: [0,2] }, { teams: [7,8], score: [2,0] }],
  }
  const stageNum = Math.log2((initData.upper.length + initData.lower.length)) * 2 + 1
  // console.log('stageNum: ', stageNum)
  const  result = []
  for (let i = 0; i < stageNum; i++) {
    if (i < stageNum - 1) {
      result[i] = { upper: [], lower: [] }
    } else {
      result[i] = { final: [] }
    }
  }
  for (let i = 0; i < stageNum; i++) {
    if (i + 1 >= stageNum) {
      break
    }
    if (i === 0) {
      result[i].lower = initData.lower
    }
    if (i === 1) {
      result[i].upper = initData.upper
    }
    if (i < stageNum - 2) {
      const upperLength = result[i].upper.length
      const lowerLength = result[i].lower.length
      if (upperLength > 0) {
        // 当前列有胜者组比赛时，下一轮胜者组数量减半
        if (upperLength > 1) {
          result[i + 2].upper = new Array(upperLength / 2).fill({ teams: [], score: [0,0] })
        }
        // 当前列有胜者组比赛时，下一轮败者组数量减半
        if (lowerLength > 1) {
          result[i + 1].lower = new Array(lowerLength / 2).fill({ teams: [], score: [0,0] })
        }
      } else {
        // 当前列没有有胜者组比赛时，下一轮败者组数量不变
        result[i + 1].lower = new Array(lowerLength).fill({ teams: [], score: [0,0] })
      }
    } else {
      result[i + 1].final = [{ teams: [], score: [0,0] }]
    }
  }
  console.log(result)

  // for (let i = 0; i < result.length; i++) {
  //   if (i === 0) {
  //     result[i].lower = initData.lower
  //   }
  //   if (i === 1) {
  //     result[i].upper = initData.upper
  //   }
  //   if (i + 1 >= 5) {
  //     break
  //   }

  //   // 胜者组
  //   const upper = result[i].upper
  //   for (let j = 0; j < upper.length; j++) {
  //     const { teams, score } = upper[j]
  //     const winId = score[0] > score[1] ? teams[0] : teams[1]
  //     const loseId = score[0] < score[1] ? teams[0] : teams[1]
  //     const index = upper.length > 1 ? i + 2 : i + 1 
  //     if (!result[index].upper[Math.floor(j / 2)]) {
  //       result[index].upper[Math.floor(j / 2)] = { teams: [], score: [2, 1] }
  //     }
  //     result[index].upper[Math.floor(j / 2)].teams[j % 2] = winId
  //     result[i].lower[j].teams[0] = loseId
  //   }

  //   // 败者组
  //   const lower = result[i].lower
  //   for (let j = 0; j < lower.length; j++) {
  //     const { teams, score } = lower[j]
  //     const winId = score[0] > score[1] ? teams[0] : teams[1]
  //     if (i < result.length - 2) {
  //       if (upper.length > 0) {
  //         // 有胜者组且不为败者组决赛时，败者组2合1
  //         // 其余情况败者组胜者与胜者组败者合并
  //         if (!result[i + 1].lower[Math.floor(j / 2)]) {
  //           result[i + 1].lower[Math.floor(j / 2)] = { teams: [], score: [2, 1] }
  //         }
  //         result[i + 1].lower[Math.floor(j / 2)].teams[j % 2] = winId
  //       } else {
  //         result[i + 1].lower[j] = { teams: [null, winId], score: [1,2] }
  //       }
  //     } else {
  //       // 败者组决赛
  //       result[i + 1].upper[j].teams[1] = winId
  //     } 
  //   }
  //   console.log(i, result[i]);
  // }
  // console.log(result);

  const rowGap = 4
  const colGap = 10
  const width = 120
  const height = 30
  const componentHeight = height * 2
  // const dataArr = [
  //   { upper: [], lower: [1, 2] },
  //   { upper: [1, 2], lower: [1, 2] },
  //   { upper: [], lower: [1] },
  //   { upper: [1], lower: [1] },
  //   { final: [1] },
  // ]
  // console.log(dataArr);
  const maxComponentNum = result.find(item => item.upper.length > 0).upper.length + result[0].lower.length
  const containerHeight = (maxComponentNum + 1) * componentHeight + maxComponentNum * rowGap
  const containerWidth = (width + colGap) * result.length
  const allData = []
  for (let i = 0; i < result.length; i++) {
    allData[i] = {}
    if (result[i].upper && result[i].upper.length > 0) {
      allData[i].upper = []
      for (let j = 0; j < result[i].upper.length; j++) {
        let top = j * (componentHeight + rowGap)
        // 胜者组比赛从第二轮开始，下一轮比赛位置根据上一轮位置居中
        // 上一轮胜者组数据
        const prevUpper = allData[i - 1] && allData[i - 1].upper ? allData[i - 1].upper : (allData[i - 2] && allData[i - 2].upper ? allData[i - 2].upper : null)
        if (i > 0 && prevUpper) {
          const gap = prevUpper[j * 2 + 1].top - (prevUpper[j * 2].top + componentHeight)
          top = prevUpper[j * 2 + 1].top - (gap / 2) - height
        }
        allData[i].upper[j] = {
          top,
          lineTop: top + height,
        }
      } 
    }
    if (result[i].lower && result[i].lower.length > 0) {
      allData[i].lower = []
      for (let j = 0; j < result[i].lower.length; j++) {
        let bottom = j * (componentHeight + rowGap)
        // 从第二轮开始，根据是否有胜者组比赛来区分败者组第二轮的位置
        // 上一轮败者组数据
        const prevLower = allData[i - 1] ? allData[i - 1].lower : null
        if (i > 0 && prevLower) {
          if (result[i].upper.length > 0) {
            // 有胜者组比赛，下一轮败者组比赛根据上一轮位置上调 height / 2
            bottom = prevLower[j].bottom + (height / 2)
          } else {
            // 无胜者组比赛，下一轮败者组比赛位置为上一轮的两组比赛的居中位置
            const gap = prevLower[j * 2].bottom - (prevLower[j * 2 + 1].bottom + componentHeight)
            bottom = prevLower[j * 2].bottom - (gap / 2) - height
          }
        }
        allData[i].lower[j] = {
          bottom,
          lineTop: bottom + height,
        }
      } 
    }
    if (result[i].final) {
      allData[i].final = []
      // 总决赛，上一轮胜者组和败者组居中位置
      // 上一轮胜者组数据
      const prevUpper = allData[i - 1].upper
      // 上一轮败者组数据
      const prevLower = allData[i - 1].lower
      const gap = containerHeight - (prevUpper[0].top + componentHeight) - (prevLower[0].bottom + componentHeight)
      const top = prevUpper[0].top + (gap / 2) + componentHeight - height
      allData[i].final[0] = {
        top,
        lineTop: top + height,
      }
    }
  }
  console.log(allData)
  return (
    // <></>
    <div style={{ display: 'flex', justifyContent: 'space-between', width: containerWidth, height: containerHeight }}>
      {
        allData.map(({ upper, lower, final }, i) => (
          <div key={i} style={{ position: 'relative', width: width }}>
            {
              upper ? 
              upper.map((item, j) => (
                <div key={j} style={{ position: 'absolute', top: item.top, width: width }}>
                  <MatchComponent width={width} height={height} />
                </div>
              )) : null
            }
            {
              lower ? 
              lower.map((item, j) => (
                <div key={j} style={{ position: 'absolute', bottom: item.bottom, width: width }}>
                  <MatchComponent width={width} height={height} />
                </div>
              )) : null
            }
            {
              final ? 
              final.map((item, j) => (
                <div key={j} style={{ position: 'absolute', top: item.top, width: width }}>
                  <MatchComponent height={height} />
                </div>
              )) : null
            }
          </div>
        ))
      }
    </div>
  )
}