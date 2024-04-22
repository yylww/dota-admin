import Footer from "../components/Footer";
import Header from "../components/Header";

export default function MainLayout({ children }) {
  return (
    <div className="w-full h-full">
      <Header />
      <div className="w-full p-2 md:p-6 bg-gray-900 text-gray-100">{ children }</div>
      <Footer />
    </div>
  )
}