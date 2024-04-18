import Link from "next/link";

export default function Header() {
  return (
    <div className="flex w-full justify-center h-16 bg-blue-900 text-white">
      <div className="flex w-[1000px]">
        <Link href="/main" className="flex flex-1 justify-center items-center h-full">首页</Link>
        <Link href="/tournament" className="flex flex-1 justify-center items-center h-full">赛事信息</Link>
        <Link href="/statistics" className="flex flex-1 justify-center items-center h-full">数据统计</Link>
        <Link href="/team" className="flex flex-1 justify-center items-center h-full">战队信息</Link>
        <Link href="/game" className="flex flex-1 justify-center items-center h-full">游戏资料</Link>
      </div>
    </div>
  )
}