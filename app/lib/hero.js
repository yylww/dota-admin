'use server'

import prisma from "@/app/utils/db"

export async function getHero(id) {
  return prisma.hero.findUnique({
    where: { id },
  })
}

export async function getHeroes() {
  return prisma.hero.findMany()
}

export async function getHeroList(query, take, skip) {
  const or = query ? {
    OR: [
      { cname: { contains: query } },
      { name: { contains: query } },
    ],
  } : {}
  return {
    list: await prisma.hero.findMany({
      where: { ...or },
      take,
      skip,
    }),
    total: await prisma.hero.count({ where: { ...or }}),
  } 
}

export async function createHero(data) {
  return prisma.hero.create({
    data,
  })
}

export async function updateHero(id, data) {
  return prisma.hero.update({
    where: { id },
    data,
  })
}

export async function deleteHero(id) {
  return prisma.hero.delete({
    where: { id },
  })
}