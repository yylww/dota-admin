import { getRecord } from "@/app/lib/record"

export const GET = async (req, { params }) => {
  const id = Number(params.id)
  try {
    const record = await getRecord(id)
    return Response.json(record)
  } catch (error) {
    console.log('Failed', error)
    throw error
  }
}
