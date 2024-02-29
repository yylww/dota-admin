import { Inter } from 'next/font/google'
import './globals.css'
import StypedComponentsRegistry from '@/app/lib/AntdRegistry'
import { SWRProvider } from './swr-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '雯逸小岛',
  description: '一家想做什么就做什么的店',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StypedComponentsRegistry>
          <SWRProvider>
            {children}
          </SWRProvider>
        </StypedComponentsRegistry>
      </body>
    </html>
  )
}
