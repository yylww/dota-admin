import { ScoreComponent } from "./ScoreComponent"
import { TabComponent } from "./TabComponent"
import { getMatch } from "@/app/lib/match"
import { getTranslations } from "next-intl/server"
import { BanPick } from "./BanPick"
import { PlayerData } from "./PlayerData"
import { NotFound } from "./NotFound"

export async function generateMetadata({ params: { id, locale } }) {
  const data = await getMatch(+id)
  if (!data) {
    return {
      title: "Not Found"
    }
  }
  const t = await getTranslations()
  const { homeTeam, awayTeam, tournament, stage, group } = data
  const tournamentTitle = locale === 'en' ? tournament.title_en : tournament.title
  const stageTitle = locale === 'en' ? stage.title_en : stage.title
  const groupText = group > 0 ? ` ${['', t('Match.upper'), t('Match.lower'), t('Match.final')][group]}` : ''
  return {
    title: `${homeTeam.name} vs ${awayTeam.name} - ${tournamentTitle}`,
    description: `${tournamentTitle} ${stageTitle}${groupText} ${homeTeam.name} vs ${awayTeam.name}`
  }
}

export default async function Page({ params, searchParams }) {
  const t = await getTranslations()
  const data = await getMatch(+params.id)
  if (!data) {
    return <NotFound id={params.id} />
  }
  const index = searchParams.tab ? Number(searchParams.tab) - 1 : 0
  const radiants = data.games[index].records.filter(item => item.radiant).sort((a, b) => Number(a.player.position) - Number(b.player.position))
  const dires = data.games[index].records.filter(item => !item.radiant).sort((a, b) => Number(a.player.position) - Number(b.player.position))
  return (
    <div className="bg-white">
      <ScoreComponent data={data} />
      {
        data.games.length > 0 ? 
        <div className="pb-2">
          <TabComponent id={+params.id} length={data.games.length} tabIndex={index} />
          <BanPick data={data.games[index]} />
          <div className="flex flex-col md:flex-row md:gap-4">
            <PlayerData data={radiants} radiant={true} />
            <PlayerData data={dires} radiant={false} />
          </div>
        </div> : 
        <div className="w-full py-4 text-center">{ t('Match.noGames') }</div>
      }
    </div>
  )
}