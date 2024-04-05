import SideNav from "@/app/ui/SideNav"

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-56">
        <SideNav />
      </div>
      <div className="flex-grow p-4 md:overflow-y-auto">{ children }</div>
    </div>
  )
}
