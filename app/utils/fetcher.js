export const fetcher = async (url) => {
  const data = await fetch(process.env.API_URL + url).then(r => r.json())
  return data
}