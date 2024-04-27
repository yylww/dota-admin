'use client'

import { ArrowUpIcon } from "@heroicons/react/24/outline"

const ScrollToTop = () => {
  const handleScroll = () => {
    document.getElementById('main').scrollIntoView()
  }

  return (
    <div 
      className="fixed bottom-10 right-10 hidden md:flex justify-center items-center w-10 h-10 rounded-full text-gray-400 hover:text-gray-500 bg-gray-300 hover:bg-gray-400"
      onClick={handleScroll}
    >
      <ArrowUpIcon className="w-5" />
    </div>
  )
}

export default ScrollToTop