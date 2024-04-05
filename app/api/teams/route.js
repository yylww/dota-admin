import prisma from "@/app/utils/db"

export async function GET() {
  const data = await prisma.team.findMany()
  return Response.json(data)
}