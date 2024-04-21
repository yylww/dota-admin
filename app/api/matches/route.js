import prisma from "@/app/lib/db"
import { getMatches } from "@/app/lib/match"

export const GET = async (req) => {
  const searchParams = req.nextUrl.searchParams
  const take = searchParams.get('take') ? Number(searchParams.get('take')) : undefined
  const skip = searchParams.get('skip') ? Number(searchParams.get('skip')) : undefined
  const status = searchParams.get('status') ? Number(searchParams.get('status')) : undefined
  const ids = searchParams.get('ids') ? ids.split(',').map(id => Number(id)) : undefined
  const orderBy = searchParams.get('sort') ? JSON.parse(searchParams.get('sort')) : [{ status: 'asc'}, { startTime: 'desc' }]
  try {
    const matches = await getMatches({ ids, status, orderBy, take, skip })
    return Response.json(matches)
  } catch (error) {
    console.log('Failed', error)
    throw error
  }
}
