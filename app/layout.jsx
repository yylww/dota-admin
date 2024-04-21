import { Inter } from 'next/font/google'
import './globals.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DOTA2赛事',
  description: 'DOTA2赛事预告，赛事资讯',
  keywords: ['DOTA', 'DOTA2', '赛事', '预告', '资讯', '比赛', 'TI', '统计'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          {children}
        </AntdRegistry>
      </body>
    </html>
  )
}
