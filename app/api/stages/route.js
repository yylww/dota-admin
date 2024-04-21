import { getStages } from "@/app/lib/stage"

export const GET = async () => {
  try {
    const stages = await getStages()
    return Response.json(stages)
  } catch (error) {
    console.log('Failed', error)
    throw error
  }
}
