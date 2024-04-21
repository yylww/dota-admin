import { getTournament } from "@/app/lib/tournament"

export const GET = async (req, { params }) => {
  const id = Number(params.id)
  try {
    const tournament = await getTournament(id)
    return Response.json(tournament)
  } catch (error) {
    console.log('Failed', error)
    throw error
  }
}
