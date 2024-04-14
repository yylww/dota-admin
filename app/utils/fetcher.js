export const fetcher = async (url) => {
  const data = await fetch(process.env.API_URL + url, { next: { revalidate: 10 }}).then(r => r.json())
  return data
}