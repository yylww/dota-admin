import { getStage } from "@/app/lib/stage"

export const GET = async (req, { params }) => {
  const id = Number(params.id)
  try {
    const stage = await getStage(id)
    return Response.json(stage)
  } catch (error) {
    console.log('Failed', error)
    throw error
  }
}
