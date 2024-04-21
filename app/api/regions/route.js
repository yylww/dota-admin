import { getRegions } from "@/app/lib/region"

export const GET = async () => {
  try {
    const regions = await getRegions()
    return Response.json(regions)
  } catch (error) {
    console.log('Failed', error)
    throw error
  }
}
