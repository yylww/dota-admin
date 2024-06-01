import { getMatches } from "./lib/match"
import { getTournaments } from "./lib/tournament"

export default async function sitemap() {
  const matchData = getMatches()
  const tournamentData = getTournaments()
  const [matches, tournaments] = await Promise.all([matchData, tournamentData])
  const matchesMap = matches.map(item => ({
    url: `https://www.playdota2.com/matches/${item.id}`,
    lastModified: item.updatedAt,
    changeFrequency: 'yearly',
    priority: 0.8,
    alternates: {
      languages: {
        en: `https://www.playdota2.com/en/matches/${item.id}`,
      },
    },
  }))
  const tournamentsMap = tournaments.map(item => ({
    url: `https://www.playdota2.com/tournaments/${item.id}`,
    lastModified: item.updatedAt,
    changeFrequency: 'yearly',
    priority: 0.8,
    alternates: {
      languages: {
        en: `https://www.playdota2.com/en/tournaments/${item.id}`,
      },
    },
  }))

  return [
    {
      url: 'https://www.playdota2.com',
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
      alternates: {
        languages: {
          en: 'https://www.playdota2.com/en',
        },
      },
    },
    {
      url: 'https://www.playdota2.com/statistics',
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
      alternates: {
        languages: {
          en: 'https://www.playdota2.com/en/statistics',
        },
      },
    },
    {
      url: 'https://www.playdota2.com/tournaments',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          en: 'https://www.playdota2.com/en/tournaments',
        },
      },
    },
    ...matchesMap,
    ...tournamentsMap,
  ]
}