import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Package, ArrowLeft } from "lucide-react"

export default function ProductNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4 max-w-md mx-auto">
        <div className="mb-8">
          <Package className="h-24 w-24 text-gray-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Not Found</h1>
          <p className="text-gray-600 leading-relaxed">
            Sorry, we couldn't find the product you're looking for. It may have been removed or doesn't exist.
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/products">
            <Button className="w-full bg-rose-600 hover:bg-rose-700">Browse All Products</Button>
          </Link>

          <Link href="/">
            <Button variant="outline" className="w-full bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
