import { getMatches } from "./lib/match"
import { getTournaments } from "./lib/tournament"

export default async function sitemap() {
  const matchData = getMatches()
  const tournamentData = getTournaments()
  const [matches, tournaments] = await Promise.all([matchData, tournamentData])
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
  const tournamentsMap = tournaments.map(item => ({
    url: `https://playdota2.com/tournaments/${item.id}`,
    lastModified: item.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))
  const enTournamentsMap = tournaments.map(item => ({
    url: `https://playdota2.com/en/tournaments/${item.id}`,
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
    {
      url: 'https://playdota2.com/tournaments',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://playdota2.com/en/tournaments',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...matchesMap,
    ...enMatchesMap,
    ...tournamentsMap,
    ...enTournamentsMap,
  ]
}