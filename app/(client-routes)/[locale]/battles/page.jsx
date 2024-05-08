import { getMatches } from "@/app/lib/match"
import MatchList from "@/app/components/client/MatchList"
import IntlClientProvider from "@/app/components/client/IntlClientProvider"

export default async function Page({ searchParams }) {
  const ids = searchParams.ids.split(',').map(id => +id)
  const matches = await getMatches({ status: 2, ids, orderBy: { startTime: 'asc' } })
  return (
    <div className="bg-white">
      {
        matches && matches.length > 0 
        ?
        <IntlClientProvider>
          <MatchList data={matches} width="w-full" />
        </IntlClientProvider> 
        : 
        <div className="flex justify-center items-center h-16">无交手记录</div>
      }
    </div>
  )
}