export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto pb-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="text-center space-y-3 pt-6 pb-4">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto rounded-3xl bg-text-primary/10" />

        {/* Title */}
        <div className="space-y-2">
          <div className="h-7 w-48 mx-auto bg-text-primary/10 rounded-lg" />
          <div className="h-4 w-32 mx-auto bg-text-primary/10 rounded-lg" />
        </div>

        {/* Amount */}
        <div className="h-10 w-56 mx-auto bg-text-primary/10 rounded-lg" />
      </div>

      {/* Progress Bar Skeleton */}
      <div className="space-y-2 px-5 py-4">
        <div className="flex justify-between items-center">
          <div className="h-4 w-20 bg-text-primary/10 rounded" />
          <div className="h-4 w-40 bg-text-primary/10 rounded" />
        </div>
        <div className="w-full h-2 bg-text-primary/10 rounded-full" />
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-border-soft" />

      {/* Participants List Skeleton */}
      <div className="space-y-4 px-5 py-4">
        <div className="h-6 w-36 bg-text-primary/10 rounded-lg" />

        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-surface-card rounded-2xl p-4 shadow-soft border border-border-soft"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-text-primary/10 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 bg-text-primary/10 rounded" />
                  <div className="h-3 w-20 bg-text-primary/10 rounded" />
                </div>
                <div className="w-16 h-6 bg-text-primary/10 rounded-full" />
                <div className="w-5 h-5 bg-text-primary/10 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
