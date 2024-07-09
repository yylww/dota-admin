import { Suspense } from "react"
import TournamentDetail from "@/app/components/client/tournament/TournamentDetail"
import { MatchListSkeleton } from "@/app/components/client/skeletons"
import { getTournament } from "@/app/lib/tournament"

export async function generateMetadata({ params: { id, locale } }) {
  const { title, title_en, description, description_en } = await getTournament(+id)
  return {
    title: `${locale === 'en' ? title_en : title}`,
    description: locale === 'en' ? description_en : description
  }
}
 
export default function Page({ params }) {
  return (
    <div className="md:p-4">
      <Suspense fallback={<MatchListSkeleton />}>
        <TournamentDetail id={+params.id} />
      </Suspense>
    </div>
  )
}