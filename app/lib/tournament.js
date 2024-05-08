'use server'

import prisma from "@/app/lib/db";

export const getTournament = async (id) => {
  try {
    return prisma.tournament.findUnique({ 
      where: { id },
      include: {
        achievements: {
          include: {
            teams: true,
          },
        },
        teams: {
          include: {
            players: true,
          },
        },
      }
    })
  } catch (error) {
    throw error
  }
}

// export const getHotTournaments = async (take) => {
//   try {
//     return prisma.tournament.findMany({
//       orderBy: {
//         createdAt: 'desc',
//       },
//     })
//   } catch (error) {
//     throw error
//   }
// }

// export const getRecentTournament = async () => {
//   try {
//     return prisma.tournament.findFirst({
//       orderBy: {
//         createdAt: 'desc',
//       },
//       include: {
//         matches: {
//           include: {
//             stage: true,
//             homeTeam: true,
//             awayTeam: true,
//             games: {
//               orderBy: {
//                 startTime: 'asc',
//               },
//             },
//           },
//         },
//       },
//     })
//   } catch (error) {
//     throw error
//   }
// }

export const getTournaments = async () => {
  try {
    return prisma.tournament.findMany({
      orderBy: [
        { createdAt: 'desc' },
      ],
      include: {
        stages: {
          include: {
            matches: {
              orderBy: {
                startTime: 'asc',
              },
              include: {
                tournament: true,
                stage: true,
                homeTeam: true,
                awayTeam: true,
                games: {
                  orderBy: {
                    startTime: 'asc',
                  },
                },
              },
            },
          },
        },
      },
    })
  } catch (error) {
    throw error
  }
}

export const createTournament = async (data) => {
  try {
    return prisma.tournament.create({
      data: {
        ...data,
        teams: {
          connect: data.teams.map(id => ({ id })),
        },
      }
    })
  } catch (error) {
    throw error
  }
}

export const updateTournament = async (id, data) => {
  try {
    return prisma.tournament.update({ 
      where: { id },
      data: {
        ...data,
        teams: {
          set: data.teams.map(id => ({ id })),
        },
      },
    })
  } catch (error) {
    throw error
  }
}

export const deleteTournament = async (id) => {
  try {
    return prisma.tournament.delete({ 
      where: { id },
    })
  } catch (error) {
    throw error
  }
}