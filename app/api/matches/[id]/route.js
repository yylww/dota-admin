import prisma from "@/app/utils/db";
import { auth } from "@/auth";

export const GET = async (req, { params }) => {
  const id = Number(params.id)
  try {
    const match = await prisma.match.findUnique({ 
      where: { id },
      include: {
        tournament: true,
        stage: true,
        homeTeam: true,
        awayTeam: true,
        games: {
          include: {
            radiant: true,
            dire: true,
            records: {
              include: {
                player: true,
                hero: true,
              },
            },
            bans: {
              include: {
                hero: true,
              },
            },
            picks: {
              include: {
                hero: true,
              },
            },
          }
        },
      },
    })
    return Response.json(match)
  } catch (error) {
    console.log('Failed', error)
    return Response.json({ message: error.message, status: 400 })
  }
}

export const POST = auth(async (req, { params }) => {
  const isLoggedIn = !!req.auth?.user
  if (isLoggedIn) {
    const id = Number(params.id)
    const data = await req.json()
    try {
      const match = await prisma.match.update({ 
        where: { id },
        data, 
      })
      return Response.json(match)
    } catch (error) {
      console.log('Failed', error)
      return Response.json({ message: error.message, status: 400 })
    }
  } else {
    return Response.json({ message: "Failed", status: 401 });
  }
});

export const DELETE = auth(async (req, { params }) => {
  const isLoggedIn = !!req.auth?.user
  if (isLoggedIn) {
    const id = Number(params.id)
    try {
      const match = await prisma.match.delete({ where: { id }})
      return Response.json(match)
    } catch (error) {
      console.log('Failed', error)
      return Response.json({ message: error.message, status: 400 })
    }
  } else {
    return Response.json({ message: "Failed", status: 401 });
  }
  
})