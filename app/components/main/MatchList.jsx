
import dayjs from "dayjs"
import Match from "./Match"
import clsx from "clsx"
import ScrollToToday from "./ScrollToToday"

export default function MatchList({ data, width }) {
  const sortDate = Object.keys(data).sort((a, b) => dayjs(b).unix() - dayjs(a).unix())
  return (
    <div className={clsx("flex flex-col gap-4 p-1 md:p-4", width)}>
      {
        sortDate.map((item, i) => {
          const { title, matches } = data[item]
          return (
            <div className="flex flex-col gap-2 px-3 md:px-4 py-2 md:py-4 border border-gray-200 rounded-md bg-white" key={i}>
              <div className="flex items-center gap-2">
                <div className="text-base md:text-lg">{ item }</div>
                { dayjs().format('YYYY-MM-DD') === item ? <ScrollToToday /> : null }
              </div>
              <div className="font-medium">{ title }</div>
              {
                matches.map((match, j) => (
                  <Match key={j} data={match} />
                ))
              }
            </div>
          )
        })
      }
    </div>
  )
}