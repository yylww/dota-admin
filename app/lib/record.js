'use server'

import prisma from "@/app/utils/db"

export async function getRecord(id) {
  return prisma.record.findUnique({
    where: { id },
    include: {
      player: true,
      hero: true,
      game: {
        include: {
          radiant: true,
          dire: true,
        }
      },
    },
  })
}

export async function getRecords() {
  return prisma.record.findMany()
}

export async function getRecordList(query, take, skip) {
  return {
    list: await prisma.record.findMany({
      take,
      skip,
      include: {
        player: true,
        hero: true,
        game: {
          include: {
            radiant: true,
            dire: true,
          }
        },
      },
    }),
    total: await prisma.record.count(),
  } 
}

export async function createRecord(data) {
  return prisma.record.create({
    data,
  })
}

export async function updateRecord(id, data) {
  return prisma.record.update({
    where: { id },
    data,
  })
}

export async function deleteRecord(id) {
  return prisma.record.delete({
    where: { id },
  })
}