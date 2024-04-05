'use server'

import prisma from "@/app/utils/db"

export async function getRegion(id) {
  return prisma.region.findUnique({
    where: { id },
  })
}

export async function getRegions() {
  return prisma.region.findMany()
}

export async function getRegionList(query, take, skip) {
  const or = query ? {
    OR: [
      { cname: { contains: query } },
      { name: { contains: query } },
    ],
  } : {}
  return {
    list: await prisma.region.findMany({
      where: { ...or },
      take,
      skip,
      include: {
        teams: true,
      },
    }),
    total: await prisma.region.count({ where: { ...or }}),
  } 
}

export async function createRegion(data) {
  return prisma.region.create({
    data,
  })
}

export async function updateRegion(id, data) {
  return prisma.region.update({
    where: { id },
    data,
  })
}

export async function deleteRegion(id) {
  return prisma.region.delete({
    where: { id },
  })
}