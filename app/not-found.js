import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex flex-col justify-center gap-6 mt-6 text-center'>
      <h2>未找到相关页面</h2>
      {/* <p>Could not find requested resource</p> */}
      <Link href="/main" className='text-blue-500'>返回首页</Link>
    </div>
  )
}