import Footer from "../components/main/Footer";
import Header from "../components/main/Header";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col w-full min-h-full bg-gray-100 text-gray-900 text-sm md:text-base">
      <Header />
      <div className="flex-1 w-full md:w-[990px] min-h-full pt-12 mx-auto">{ children }</div>
      <Footer />
    </div>
  )
}