import { getGames } from "@/app/lib/game"

export const GET = async () => {
  try {
    const games = await getGames()
    return Response.json(games)
  } catch (error) {
    console.log('Failed', error)
    throw error
  }
}