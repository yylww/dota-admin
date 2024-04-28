import { Inter } from 'next/font/google'
import './globals.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '时光站',
  // description: 'DOTA2赛事预告，赛事资讯，比赛数据，获奖记录',
  description: 'DOTA2游戏时光站，游戏比赛记录，赛事资讯',
  keywords: ['DOTA', 'DOTA2', '赛事', '预告', '资讯', '比赛', 'TI', '统计'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="text-[15px] md:text-[16px]">
      <body className={`${inter.className} scroll-smooth`}>
        <AntdRegistry>
          {children}
        </AntdRegistry>
      </body>
      <GoogleAnalytics gaId='GTM-MVT3BPKN' />
    </html>
  )
}
