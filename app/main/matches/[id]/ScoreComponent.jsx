import clsx from "clsx"
import dayjs from "dayjs"
import Image from "next/image"

export const ScoreComponent = ({ data }) => {
  const { startTime, homeTeam, homeScore, awayTeam, awayScore } = data
  return (
    <div className="flex justify-center gap-6 w-full mb-2 md:py-6 text-gray-100">
      <div className="flex gap-2 md:gap-6">
        <div className="flex flex-col justify-center gap-3 w-24 md:w-32 h-24 md:h-32 rounded-md bg-gray-500">
          <div className="flex items-center justify-center w-full h-16">
            <Image src={homeTeam.logo} width={0} height={0} sizes="100%" className="w-6 md:w-10 h-auto" alt={homeTeam.name} />
          </div>
          <div className="text-sm md:text-base text-center">{homeTeam.name}</div>
        </div>
        <div className="flex flex-col justify-between w-40 h-32 ">
          <div className="flex justify-between w-full h-full">
            <div className={clsx("flex justify-center items-center w-16 h-20 bg-gray-500 rounded-sm text-5xl", homeScore > awayScore ? "text-green-500" : "")}>{ homeScore }</div>
            <div className="flex flex-col justify-center gap-3 h-20">
              <div className="w-3 h-3 bg-gray-500"></div>
              <div className="w-3 h-3 bg-gray-500"></div>
            </div>
            <div className={clsx("flex justify-center items-center w-16 h-20 bg-gray-500 rounded-sm text-5xl", homeScore < awayScore ? "text-green-500" : "")}>{ awayScore }</div>
          </div>
          <div className="text-center text-md">{ dayjs(startTime).format('YYYY-MM-DD HH:mm') }</div>
          <div className="text-center text-md">已结束</div>
        </div>
        <div className="flex flex-col justify-center gap-3 w-24 md:w-32 h-24 md:h-32 rounded-md bg-gray-500">
          <div className="flex items-center justify-center w-full h-16">
            <Image src={awayTeam.logo} width={0} height={0} sizes="100%" className="w-6 md:w-10 h-auto" alt={awayTeam.name} />
          </div>
          <div className="text-sm md:text-base text-center">{awayTeam.name}</div>
        </div>
      </div>
    </div>
  )
}