import { getRecords } from "@/app/lib/record"

export const GET = async () => {
  try {
    const records = await getRecords()
    return Response.json(records)
  } catch (error) {
    console.log('Failed', error)
    throw error
  }
}
