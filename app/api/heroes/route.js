import { getHeroes } from "@/app/lib/hero"

export const GET = async () => {
  try {
    const heroes = await getHeroes()
    return Response.json(heroes)
  } catch (error) {
    console.log('Failed', error)
    throw error
  }
}
