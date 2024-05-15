import { getTranslations } from "next-intl/server"

export default async function Page() {
  const t = await getTranslations('tips')
  return (
    <div className="w-full text-center mt-10">{ t('develop') }</div>
  )
}