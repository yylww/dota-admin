// import { Inter } from 'next/font/google'
import Script from 'next/script'
import { GoogleAnalytics } from '@next/third-parties/google'
import { getTranslations } from 'next-intl/server'
import Footer from "@/app/components/client/Footer";
import Header from "@/app/components/client/Header";
import '@/app/globals.css'
import { useTranslations } from 'next-intl';

// const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(',')
  }
}

export default function RootLayout({ children, params: { locale } }) {
  const getBdAnalyticsTag = () => {
    return {
      __html: `
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?eb339d1f4a11c93b5890269746291ca3";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
      `,
    }
  }
  const t = useTranslations('header')
  return (
    <html lang={locale} className="text-[15px] md:text-[16px]">
      <head>
        <Script id='BdAnalytics' dangerouslySetInnerHTML={getBdAnalyticsTag()} />
      </head>
      <body className="scroll-smooth">
        <div id="main" className="flex flex-col w-full min-h-full bg-gray-100 text-gray-900 text-sm md:text-base">
          <Header locale={{ home: t('home'), statistic: t('statistic'), tournament: t('tournament') }} />
          <div className="flex-1 w-full md:w-[990px] min-h-full pt-12 pb-4 mx-auto">{ children }</div>
          {/* <Footer /> */}
        </div>
      </body>
      <GoogleAnalytics gaId='G-VJSZWKJG6X' />
    </html>
  )
}
