import { getTournaments } from "@/app/lib/tournament"
import HotTournamentClient from "./HotTournamentClient"
import { getTranslations } from "next-intl/server"
import { TrophyIcon } from "@heroicons/react/24/outline"

export default async function HotTournamentServer() {
  const data = await getTournaments()
  const t = await getTranslations('tournament')
  return (
    <div className="flex flex-col w-full p-4 border border-gray-200 rounded-md bg-white">
      <div className="flex gap-2 pb-2 text-lg">
        <TrophyIcon className="w-6 text-blue-500" />
        <p className="font-medium">{ t('title') }</p>
      </div>
      <HotTournamentClient data={data} />
    </div>
  )
}