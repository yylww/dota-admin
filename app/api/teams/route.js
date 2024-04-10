import prisma from "@/app/utils/db";
import { auth } from "@/auth";

export const GET = async () => {
  try {
    const teams = await prisma.team.findMany({
      include: {
        players: true,
        region: true,
      }
    })
    return Response.json(teams)
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
      const team = await prisma.team.create({ data })
      return Response.json(team)
    } catch (error) {
      console.log('Failed', error)
      return Response.json({ message: error.message, status: 400 })
    }
  } else {
    return Response.json({ message: "Failed", status: 401 })
  }
})