import LocalTime from "@/app/components/client/LocalTime"
import clsx from "clsx"
import Image from "next/image"

export const ScoreComponent = ({ data }) => {
  const { startTime, homeTeam, homeScore, awayTeam, awayScore } = data
  return (
    <div className="flex justify-center gap-3 md:gap-6 w-full mb-2 py-2 md:py-6">
      <div className="flex justify-center items-center gap-2 md:gap-3 w-[33%] h-24 md:h-32 rounded-md">
        <div className="flex-1 md:text-2xl text-right">{homeTeam.name}</div>
        <Image src={homeTeam.logo} width={0} height={0} sizes="100%" className="shrink-0 w-6 md:w-10 h-auto" alt={homeTeam.name} />
      </div>
      <div className="flex flex-col justify-center w-[25%] md:w-32 h-24 md:h-32">
        <div className="flex justify-between w-full">
          <div className={clsx("flex justify-center items-center w-10 md:w-16 h-16 md:h-20 rounded-sm text-6xl", homeScore > awayScore ? "text-green-500" : "")}>{ homeScore }</div>
          <div className="flex flex-col justify-center gap-1 md:gap-3 h-16 md:h-20">
            <div className="w-2 h-2 rounded-full bg-gray-900"></div>
            <div className="w-2 h-2 rounded-full bg-gray-900"></div>
          </div>
          <div className={clsx("flex justify-center items-center w-10 md:w-16 h-16 md:h-20 rounded-sm text-6xl", homeScore < awayScore ? "text-green-500" : "")}>{ awayScore }</div>
        </div>
        <div className="text-center text-md">
          <LocalTime data={startTime} format="MM-DD HH:mm" />
        </div>
      </div>
      <div className="flex justify-center items-center gap-2 md:gap-3 w-[33%] h-24 md:h-32 rounded-md">
        <Image src={awayTeam.logo} width={0} height={0} sizes="100%" className="shrink-0 w-6 md:w-10 h-auto" alt={awayTeam.name} />
        <div className="flex-1 md:text-2xl">{awayTeam.name}</div>
      </div>
    </div>
  )
}