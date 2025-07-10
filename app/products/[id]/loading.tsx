import { Skeleton } from "@/components/ui/skeleton"

export default function ProductLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images Skeleton */}
        <div className="space-y-4">
          <Skeleton className="aspect-square rounded-2xl" />
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-xl" />
            ))}
          </div>
        </div>

        {/* Product Details Skeleton */}
        <div className="space-y-6">
          <div>
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-6" />
            <Skeleton className="h-10 w-1/3 mb-8" />
          </div>

          <Skeleton className="h-20 w-full" />

          {/* Color Selection Skeleton */}
          <div>
            <Skeleton className="h-6 w-24 mb-4" />
            <div className="flex gap-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="w-12 h-12 rounded-full" />
              ))}
            </div>
          </div>

          {/* Size Selection Skeleton */}
          <div>
            <Skeleton className="h-6 w-16 mb-4" />
            <div className="grid grid-cols-5 gap-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 rounded-xl" />
              ))}
            </div>
          </div>

          {/* Quantity Skeleton */}
          <div>
            <Skeleton className="h-6 w-20 mb-4" />
            <Skeleton className="h-12 w-48" />
          </div>

          {/* Action Buttons Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-14 w-full" />
            <div className="flex gap-4">
              <Skeleton className="h-14 flex-1" />
              <Skeleton className="h-14 w-24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
