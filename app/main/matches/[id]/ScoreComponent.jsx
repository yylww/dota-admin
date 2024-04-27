import clsx from "clsx"
import dayjs from "dayjs"
import Image from "next/image"

export const ScoreComponent = ({ data }) => {
  const { startTime, homeTeam, homeScore, awayTeam, awayScore } = data
  return (
    <div className="flex justify-center gap-2 md:gap-6 w-full mb-2 py-2 md:py-6">
      <div className="flex gap-2 md:gap-6">
        <div className="flex justify-center items-center gap-1 md:gap-3 flex-1 md:w-32 h-24 md:h-32 rounded-md">
          <div className="flex-1 text-sm md:text-base text-center">{homeTeam.name}</div>
          <div className="flex items-center justify-center w-full h-16">
            <Image src={homeTeam.logo} width={0} height={0} sizes="100%" className="w-6 md:w-10 h-auto" alt={homeTeam.name} />
          </div>
        </div>
        <div className="flex flex-col justify-between flex-1 md:w-40 h-24 md:h-32">
          <div className="flex justify-between w-full h-full">
            <div className={clsx("flex justify-center items-center w-10 md:w-16 h-16 md:h-20 rounded-sm text-5xl", homeScore > awayScore ? "text-green-500" : "")}>{ homeScore }</div>
            <div className="flex flex-col justify-center gap-1 md:gap-3 h-16 md:h-20">
              <div className="w-2 h-2 rounded-full bg-gray-900"></div>
              <div className="w-2 h-2 rounded-full bg-gray-900"></div>
            </div>
            <div className={clsx("flex justify-center items-center w-10 md:w-16 h-16 md:h-20 rounded-sm text-5xl", homeScore < awayScore ? "text-green-500" : "")}>{ awayScore }</div>
          </div>
          <div className="text-center text-md">{ dayjs(startTime).format('MM-DD HH:mm') }</div>
          <div className="text-center text-md">已结束</div>
        </div>
        <div className="flex justify-center items-center gap-1 md:gap-3 flex-1 md:w-32 h-24 md:h-32 rounded-md">
          <div className="flex items-center justify-center w-full h-16">
            <Image src={awayTeam.logo} width={0} height={0} sizes="100%" className="w-6 md:w-10 h-auto" alt={awayTeam.name} />
          </div>
          <div className="flex-1 text-sm md:text-base text-center">{awayTeam.name}</div>
        </div>
      </div>
    </div>
  )
}