import { getMatch } from "@/app/lib/match"

export const GET = async (req, { params }) => {
  const id = Number(params.id)
  try {
    const match = await getMatch(id)
    return Response.json(match)
  } catch (error) {
    console.log('Failed', error)
    throw error
  }
}
