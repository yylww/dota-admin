import { getMatches } from "./lib/match"

export default async function sitemap() {
  const matches = await getMatches()
  const matchesMap = matches.map(item => ({
    url: `https://playdota2.com/main/matches/${item.id}`,
    lastModified: item.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))
  return [
    {
      url: 'https://playdota2.com/main',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://playdota2.com/en/main',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // {
    //   url: 'https://playdota2.com/main/statistics',
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 1,
    // },
    // {
    //   url: 'https://playdota2.com/en/main/statistics',
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 1,
    // },
    ...matchesMap,
  ]
}