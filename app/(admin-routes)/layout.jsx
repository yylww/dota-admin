import { AntdRegistry } from '@ant-design/nextjs-registry'
import SideNav from "@/app/components/SideNav"
import '@/app/globals.css'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AntdRegistry>
          <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-56">
              <SideNav />
            </div>
            <div className="flex-grow p-4 md:overflow-y-auto">{ children }</div>
          </div>
        </AntdRegistry>
      </body>
    </html>
  )
}
