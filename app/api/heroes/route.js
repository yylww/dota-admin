import prisma from "@/app/utils/db";
import { auth } from "@/auth";

export const GET = async () => {
  try {
    const heroes = await prisma.hero.findMany({
      orderBy: [{ id: 'asc' }],
    })
    return Response.json(heroes)
  } catch (error) {
    console.log('Failed', error)
    return Response.json({ message: error.message, status: 400 })
  }
}

export const POST = auth(async (req) => {
  const isLoggedIn = !!req.auth?.user
  if (isLoggedIn) {
    const data = await req.json()
    try {
      const hero = await prisma.hero.create({ data })
      return Response.json(hero)
    } catch (error) {
      console.log('Failed', error)
      return Response.json({ message: error.message, status: 400 })
    }
  } else {
    return Response.json({ message: "Failed", status: 401 })
  }
})