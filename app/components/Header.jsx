import Link from "next/link";

export default function Header() {
  return (
    <div className="flex w-full justify-center h-16 bg-blue-900 text-gray-100 text-lg">
      <div className="flex w-[1000px]">
        <Link href="/main" className="flex flex-1 justify-center items-center h-full">首页</Link>
        <Link href="/main/tournaments" className="flex flex-1 justify-center items-center h-full">赛事信息</Link>
        <Link href="/main/statistics" className="flex flex-1 justify-center items-center h-full">数据统计</Link>
        <Link href="/main/records" className="flex flex-1 justify-center items-center h-full">时光站</Link>
      </div>
    </div>
  )
}