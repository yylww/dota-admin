import { getPlayers } from "@/app/lib/player"

export const GET = async () => {
  try {
    const players = await getPlayers()
    return Response.json(players)
  } catch (error) {
    console.log('Failed', error)
    throw error
  }
}
