import { getHero } from "@/app/lib/hero"

export const GET = async (req, { params }) => {
  const id = Number(params.id)
  try {
    const hero = await getHero(id)
    return Response.json(hero)
  } catch (error) {
    console.log('Failed', error)
    throw error
  }
}
