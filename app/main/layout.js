import Header from "../ui/Header";

export default function MainLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="w-[650px] mx-auto p-4 border">{ children }</div>
    </div>
  )
}