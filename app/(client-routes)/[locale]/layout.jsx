
import { GoogleAnalytics } from '@next/third-parties/google'
import { getMessages, getTranslations } from 'next-intl/server'
import Header from "@/app/components/client/Header"
import '@/app/globals.css'
import { NextIntlClientProvider } from 'next-intl'
import NextTopLoader from 'nextjs-toploader'

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(',')
  }
}

export default async function RootLayout({ children, params: { locale } }) {
  const messages = await getMessages()
  return (
    <html lang={locale} className="text-[16px]">
      <body className="scroll-smooth">
        <NextTopLoader
          color='#3b82f6'
          height={2}
          showSpinner={false}
          shadow={false}
        />
        <NextIntlClientProvider messages={messages}>
          <div id="main" className="flex flex-col w-full min-h-full bg-gray-100 text-gray-900">
            <Header />
            <div className="flex-1 w-full md:w-[990px] min-h-full pb-14 md:pt-12 md:pb-4 mx-auto">{ children }</div>
          </div>
        </NextIntlClientProvider>
      </body>
      <GoogleAnalytics gaId='G-VJSZWKJG6X' />
    </html>
  )
}
