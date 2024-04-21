import { getAchievements } from "@/app/lib/achievement"

export const GET = async () => {
  try {
    const achievements = await getAchievements()
    return Response.json(achievements)
  } catch (error) {
    console.log('Failed', error)
    throw error
  }
}