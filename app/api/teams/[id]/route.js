import { getTeam } from "@/app/lib/team"

export const GET = async (req, { params }) => {
  const id = Number(params.id)
  try {
    const team = await getTeam(id)
    return Response.json(team)
  } catch (error) {
    console.log('Failed', error)
    throw error
  }
}
