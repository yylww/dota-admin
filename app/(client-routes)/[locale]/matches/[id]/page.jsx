import { ScoreComponent } from "./ScoreComponent"
import { TabComponent } from "./TabComponent"
import { DetailComponent } from "./DetailComponent"
import { getMatch } from "@/app/lib/match"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params: { id, locale } }) {
  const t = await getTranslations()
  const { homeTeam, awayTeam, tournament, stage, group } = await getMatch(+id)
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
  const index = searchParams.tab ? Number(searchParams.tab) - 1 : 0
  return (
    <div className="bg-white">
      <ScoreComponent data={data} />
      {
        data.games.length > 0 ? <TabComponent id={+params.id} length={data.games.length} tabIndex={index} /> : <div className="w-full py-4 text-center">{ t('Match.noGames') }</div>
      }
      {
        data.games.length > 0 ? <DetailComponent data={data.games[index]} /> : null
      }
    </div>
  )
}