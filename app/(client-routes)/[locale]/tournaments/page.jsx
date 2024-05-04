import { getTranslations } from "next-intl/server"

export default async function Page() {
  const t = await getTranslations('tips')
  return (
    <div className="w-full h-full min-h-80 flex justify-center items-center">{ t('develop') }</div>
  )
}