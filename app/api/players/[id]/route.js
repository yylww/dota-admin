import { getPlayer } from "@/app/lib/player"

export const GET = async (req, { params }) => {
  const id = Number(params.id)
  try {
    const player = await getPlayer(id)
    return Response.json(player)
  } catch (error) {
    console.log('Failed', error)
    throw error
  }
}
