import { getRegion } from "@/app/lib/region"

export const GET = async (req, { params }) => {
  const id = Number(params.id)
  try {
    const region = await getRegion(id)
    return Response.json(region)
  } catch (error) {
    console.log('Failed', error)
    throw error
  }
}
