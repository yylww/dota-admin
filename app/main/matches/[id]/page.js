import { fetcher } from "@/app/utils/fetcher";

export const revalidate = 0
export default async function Page({ params }) {
  const data = await fetcher(`/api/matches/${params.id}`)
  return (
    <div>
      {
        data.games.map((item, i) => {
          return (
            <div key={i}>{ item.radiant.name } vs { item.dire.name }</div>
          )
        })
      }
    </div>
  )
}