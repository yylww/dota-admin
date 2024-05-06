export const Line = ({direction, position, columnSpacing}) => {
  const [start, end] = position
  const startX = start.left
  const startY = start[direction]
  const endX = end.left
  const endY = end[direction]
  const leftLineWidth = columnSpacing / 2 - 1
  const rightLineWidth = (endX - startX) > columnSpacing ? (endX - startX - leftLineWidth + 1) : (columnSpacing / 2 + 1)

  return (
    <div style={{ position: 'absolute', left: startX, [direction]: (startY - 1)  }}>
      <div style={{ 
        position: 'absolute', 
        left: 0, 
        [direction]: 0, 
        width: leftLineWidth, 
        height: 2,
        backgroundColor: '#eee',
      }}></div>
      <div style={{
        position: 'absolute',
        left: leftLineWidth,
        [direction]: endY > startY ? 0 : -Math.abs(endY - startY + 2),
        width: 2,
        height: Math.abs(endY - startY),
        backgroundColor: '#eee',
      }}></div>
      <div style={{
        position: 'absolute',
        left: leftLineWidth,
        [direction]: endY - startY,
        width: rightLineWidth,
        height: 2,
        backgroundColor: '#eee',
      }}></div>
    </div>
  )
}