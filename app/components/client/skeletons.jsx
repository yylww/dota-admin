// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent'

export function HotTournamentSkeleton() {
  return (
    <div className={`${shimmer} flex flex-col w-full gap-2 p-4 bg-white border border-gray-200 rounded-md`}>
      <div className="flex gap-2">
        <div className="h-7 w-8 rounded-sm bg-gray-200" />
        <div className="h-7 w-[40%] rounded-sm bg-gray-200" />
      </div>
      <div className="h-7 w-[80%] rounded-sm bg-gray-200" />
      <div className="h-7 w-[90%] rounded-sm bg-gray-200" />
      <div className="h-7 w-[60%] rounded-sm bg-gray-200" />
      <div className="h-7 w-[70%] rounded-sm bg-gray-200" />
      <div className="h-7 w-[75%] rounded-sm bg-gray-200" />
      <div className="h-7 w-[68%] rounded-sm bg-gray-200" />
      <div className="h-7 w-[85%] rounded-sm bg-gray-200" />
    </div>
  )
}

export function MatchSkeleton() {
  return (
    <div className={`${shimmer} flex flex-col w-full p-4 gap-2 border border-gray-200 rounded-md bg-white`}>
      <div className="h-7 w-[30%] rounded-sm bg-gray-200" />
      <div className="h-7 w-[40%] rounded-sm bg-gray-200" />
      <div className="flex justify-between gap-4 items-center">
        <div className="h-7 w-[15%] rounded-sm bg-gray-200"></div>
        <div className="flex flex-col flex-1 gap-2 justify-between">
          <div className="flex justify-between">
            <div className="h-7 w-[40%] rounded-sm bg-gray-200"></div>
            <div className="h-7 w-[50%] rounded-sm bg-gray-200"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-7 w-[45%] rounded-sm bg-gray-200"></div>
            <div className="h-7 w-[35%] rounded-sm bg-gray-200"></div>
          </div>
        </div>
        <div className="h-7 w-[15%] rounded-sm bg-gray-200"></div>
      </div>
      <div className="flex justify-between gap-4 items-center">
        <div className="h-7 w-[15%] rounded-sm bg-gray-200"></div>
        <div className="flex flex-col flex-1 gap-2 justify-between">
          <div className="flex justify-between">
            <div className="h-7 w-[40%] rounded-sm bg-gray-200"></div>
            <div className="h-7 w-[40%] rounded-sm bg-gray-200"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-7 w-[45%] rounded-sm bg-gray-200"></div>
            <div className="h-7 w-[35%] rounded-sm bg-gray-200"></div>
          </div>
        </div>
        <div className="h-7 w-[15%] rounded-sm bg-gray-200"></div>
      </div>
    </div>
  )
}

export function MatchListSkeleton() {
  return (
    <div className="flex flex-col gap-2 p-2 md:p-4">
      <MatchSkeleton />
      <MatchSkeleton />
      <MatchSkeleton />
    </div>
  )
}

