// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent'

const range = (min, max) => {
  return Math.floor(Math.random() * (max - min) ) + min
}

export function HotTournamentSkeleton() {
  return (
    <div className={`${shimmer} flex flex-col w-full gap-2 p-4 bg-white border border-gray-200 rounded-md`}>
      <div className="flex gap-2">
        <div className="h-7 w-8 rounded-sm bg-gray-200" />
        <div style={{ width: `${range(36, 68)}%` }} className="h-7 rounded-sm bg-gray-200" />
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

export function TournamentSkeleton() {
  return (
    <div className={`${shimmer} w-full p-2 bg-white`}>
      <div className="h-40 w-full bg-gray-200" />
      <div className="flex flex-col gap-2 py-2">
        <div className="flex justify-between">
          <div style={{ width: `${range(36, 50)}%` }} className="h-7 rounded-sm bg-gray-200" />
          <div style={{ width: `${range(36, 50)}%` }} className="h-7 rounded-sm bg-gray-200" />
        </div>
        <div style={{ width: `${range(36, 60)}%` }} className="h-7 rounded-sm bg-gray-200" />
      </div>
    </div>
  )
}

export function TournamentsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:pt-4">
      <TournamentSkeleton />
      <TournamentSkeleton />
      <TournamentSkeleton />
      <TournamentSkeleton />
      <TournamentSkeleton />
      <TournamentSkeleton />
    </div>
  )
}

export function MatchSkeleton() {
  return (
    <div className={`${shimmer} flex flex-col w-full p-2 md:p-4 gap-2 md:border md:border-gray-200 md:rounded-md bg-white`}>
      <div style={{ width: `${range(40, 60)}%` }} className="h-7 rounded-sm bg-gray-200" />
      <div style={{ width: `${range(50, 80)}%` }} className="h-7 rounded-sm bg-gray-200" />
      <div className="flex justify-between gap-2 items-center">
        <div className="h-10 w-[15%] rounded-sm bg-gray-200"></div>
        <div className="h-10 flex-1 rounded-sm bg-gray-200"></div>
        <div className="h-10 w-[20%] rounded-sm bg-gray-200"></div>
      </div>
      <div className="flex justify-between gap-2 items-center">
        <div className="h-10 w-[15%] rounded-sm bg-gray-200"></div>
        <div className="h-10 flex-1 rounded-sm bg-gray-200"></div>
        <div className="h-10 w-[20%] rounded-sm bg-gray-200"></div>
      </div>
    </div>
  )
}

export function MatchListSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <MatchSkeleton />
      <MatchSkeleton />
      <MatchSkeleton />
      <MatchSkeleton />
    </div>
  )
}

