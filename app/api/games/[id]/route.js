import { getGame } from "@/app/lib/game"

export const GET = async (req, { params }) => {
  const id = params.id
  try {
    const game = await getGame(id)
    return Response.json(game)
  } catch (error) {
    console.log('Failed', error)
    throw error
  }
}