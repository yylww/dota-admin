import Image from 'next/image'

export const Achievements = ({ data }) => {
  const formatter = new Intl.NumberFormat()
  const tableData = []
  data.map(item => {
    const range = item.rank.split('-')
    const length = range.length > 1 ? Number(range[1]) - Number(range[0]) + 1 : 1
    const arr = [...new Array(length)]
    arr.map((_, i) => {
      tableData.push({
        ...item,
        rank: range[0],
        team: item.teams.length > 0 ? item.teams[i] : null,
      })
    })
  })
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <td className="h-[30px] font-medium border text-center">#</td>
          <td className="h-[30px] font-medium border text-left pl-4">Team</td>
          <td className="h-[30px] font-medium border text-center">$USD</td>
          { tableData[0].point ? <td className="h-[30px] font-medium border text-center">Points</td> : null }
        </tr>
      </thead>
      <tbody>
        {
          tableData.sort((a, b) => Number(a.rank) - Number(b.rank)).map((rowData, i) => (
            <tr key={i} className="bg-gray-100 h-12 text-center">
              <td className="w-[40px] border">{ rowData.rank }</td>
              <td className="border">
                { 
                  rowData.team ?
                  <div className="flex gap-2 items-center pl-4">
                    <Image src={`${rowData.team.logo}`} width={0} height={0} sizes="100%" className="w-6 h-auto" alt={rowData.team.name} />
                    <span>{ rowData.team.tag }</span>
                  </div> : 
                  <div className="text-left pl-4">TBD</div>
                }
              </td>
              <td className="h-[30px] border">${ formatter.format(rowData.bonus) }</td>
              { rowData.point ? <td className="h-[30px] border">{ rowData.point }</td> : null }
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}