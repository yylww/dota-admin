import { Inter } from 'next/font/google'
import './globals.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import Script from 'next/script'
import { getTranslations } from 'next-intl/server'

const inter = Inter({ subsets: ['latin'] })

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
  return (
    <html lang={locale} className="text-[15px] md:text-[16px]">
      <head>
        <Script id='BdAnalytics' dangerouslySetInnerHTML={getBdAnalyticsTag()} />
      </head>
      <body className={`${inter.className} scroll-smooth`}>
        <AntdRegistry>
          {children}
        </AntdRegistry>
      </body>
    </html>
  )
}
