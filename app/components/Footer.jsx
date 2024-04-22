import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex w-full justify-center items-center h-16 text-gray-600">
      <Link href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2024233916号</Link>
    </div>
  )
}