export default function Loading() {
  return (
    <div className="fixed inset-0 bg-warmano-black flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-warmano-gray-800 rounded-full" />
          <div className="absolute inset-0 w-12 h-12 border-4 border-warmano-orange border-t-transparent rounded-full animate-spin" />
        </div>
        <span className="text-xl font-bold text-warmano-white tracking-tight">
          WARMANO
          <span className="text-warmano-orange">.</span>
        </span>
      </div>
    </div>
  )
}
