import { getMatches } from "./lib/match"

export default async function sitemap() {
  const matches = await getMatches()
  const matchesMap = matches.map(item => ({
    url: `https://playdota2.com/matches/${item.id}`,
    lastModified: item.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))
  const enMatchesMap = matches.map(item => ({
    url: `https://playdota2.com/en/matches/${item.id}`,
    lastModified: item.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))
  return [
    {
      url: 'https://playdota2.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://playdota2.com/en',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://playdota2.com/statistics',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://playdota2.com/en/statistics',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...matchesMap,
    ...enMatchesMap,
  ]
}