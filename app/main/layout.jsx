import Footer from "../components/Footer";
import Header from "../components/Header";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col w-full h-full text-sm md:text-base">
      <Header />
      <div className="flex-1 w-full p-2 md:p-6 bg-gray-900 text-gray-100">{ children }</div>
      <Footer />
    </div>
  )
}