import { getTeams } from "@/app/lib/team"

export const GET = async () => {
  try {
    const teams = await getTeams()
    return Response.json(teams)
  } catch (error) {
    console.log('Failed', error)
    throw error
  }
}
