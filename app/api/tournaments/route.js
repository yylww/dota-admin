import { getTournaments } from "@/app/lib/tournament"

export const GET = async () => {
  try {
    const tournaments = await getTournaments()
    return Response.json(tournaments)
  } catch (error) {
    console.log('Failed', error)
    throw error
  }
}
