import prisma from "@/app/utils/db";
import { auth } from "@/auth";

export const GET = async () => {
  try {
    const players = await prisma.player.findMany({
      include: {
        team: true,
      }
    })
    return Response.json(players)
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
      const player = await prisma.player.create({ data })
      return Response.json(player)
    } catch (error) {
      console.log('Failed', error)
      return Response.json({ message: error.message, status: 400 })
    }
  } else {
    return Response.json({ message: "Failed", status: 401 })
  }
})