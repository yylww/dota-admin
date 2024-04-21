import { getAchievement } from "@/app/lib/achievement"

export const GET = async (req, { params }) => {
  const id = Number(params.id)
  try {
    const achievement = await getAchievement(id)
    return Response.json(achievement)
  } catch (error) {
    console.log('Failed', error)
    throw error
  }
}