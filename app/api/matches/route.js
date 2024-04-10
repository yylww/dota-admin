import { auth } from "@/auth";
import prisma from "@/app/utils/db";

export const GET = async () => {
  try {
    const matches = await prisma.match.findMany({
      include: {
        tournament: true,
        stage: true,
        homeTeam: true,
        awayTeam: true,
      }
    })
    return Response.json(matches)
  } catch (error) {
    console.log('Failed', error)
    return Response.json({ message: error.message, status: 400 })
  }
}

export const POST = auth(async (req) => {
  const isLoggedIn = !!req.auth?.user
  if (isLoggedIn) {
    try {
      const data = await req.json()
      const match = await prisma.match.create({ data })
      return Response.json(match)
    } catch (error) {
      console.log('Failed', error)
      return Response.json({ message: error.message, status: 400 })
    }
  } else {
    return Response.json({ message: "Failed", status: 401 });
  }
});