export default async function Ranking({ data, index = 0, children }) {
  return (
    <div className="flex flex-col gap-2 w-full text-sm">
      { children }
      {
        data.map((item, i) => {
          const width = `${(item.percent / data[index].percent * 100).toFixed(2)}%`
          return (
            <div className="relative flex gap-2 items-center w-full h-7 p-2" key={i}>
              <div style={{ width }} className="absolute left-0 h-full rounded-sm bg-gradient-to-r from-[#06b6d450] to-[#3b82f650]"></div>
              <div>第{i+1}名</div>
              <div>{ item.cname } - { item.count } - { (item.percent * 100).toFixed(1) }%</div>
            </div>
          )
        })
      }
    </div>
  )
}