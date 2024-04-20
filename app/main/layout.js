import Header from "../ui/Header";

export default function MainLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="w-full p-2 md:p-6 bg-gray-900 text-gray-100">{ children }</div>
    </div>
  )
}