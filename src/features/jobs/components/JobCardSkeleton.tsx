export function JobCardSkeleton() {
  return (
    <div className="rounded-2xl p-5 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border backdrop-blur-md animate-pulse">
      {/* Top row */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-xl bg-light-elevated dark:bg-dark-elevated flex-shrink-0" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-2.5 w-20 rounded-full bg-light-elevated dark:bg-dark-elevated" />
          <div className="h-3.5 w-40 rounded-full bg-light-elevated dark:bg-dark-elevated" />
        </div>
      </div>
      {/* Meta */}
      <div className="flex gap-4 mb-4">
        <div className="h-2.5 w-24 rounded-full bg-light-elevated dark:bg-dark-elevated" />
        <div className="h-2.5 w-16 rounded-full bg-light-elevated dark:bg-dark-elevated" />
        <div className="h-2.5 w-20 rounded-full bg-light-elevated dark:bg-dark-elevated" />
      </div>
      {/* Tags */}
      <div className="flex gap-2 mb-4">
        {[60, 48, 52].map((w) => (
          <div
            key={w}
            className="h-6 rounded-full bg-light-elevated dark:bg-dark-elevated"
            style={{ width: w }}
          />
        ))}
      </div>
      {/* Footer */}
      <div className="pt-4 border-t border-light-border dark:border-dark-border">
        <div className="h-2.5 w-12 rounded-full bg-light-elevated dark:bg-dark-elevated" />
      </div>
    </div>
  )
}