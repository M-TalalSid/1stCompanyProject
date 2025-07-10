"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Heart } from "lucide-react"
import { useWishlist } from "../../context/WishlistContext"
import { useToast } from "@/hooks/use-toast"

const pants = [
  {
    id: 311,
    name: "Tailored Dress Pants",
    price: 129.99,
    originalPrice: 169.99,
    image: "/placeholder.svg?height=500&width=400",
    rating: 4.8,
    reviews: 156,
    colors: ["Navy", "Charcoal", "Black"],
    sizes: ["30", "32", "34", "36", "38", "40"],
    badge: "Professional",
    category: "men",
  },
  {
    id: 312,
    name: "Premium Denim Jeans",
    price: 99.99,
    originalPrice: 139.99,
    image: "/placeholder.svg?height=500&width=400",
    rating: 4.7,
    reviews: 234,
    colors: ["Dark Blue", "Light Blue", "Black"],
    sizes: ["30", "32", "34", "36", "38", "40"],
    badge: "Best Seller",
    category: "men",
  },
  {
    id: 313,
    name: "Chino Pants",
    price: 79.99,
    originalPrice: 99.99,
    image: "/placeholder.svg?height=500&width=400",
    rating: 4.6,
    reviews: 123,
    colors: ["Khaki", "Navy", "Olive"],
    sizes: ["30", "32", "34", "36", "38", "40"],
    badge: "Casual",
    category: "men",
  },
  {
    id: 314,
    name: "Athletic Joggers",
    price: 59.99,
    originalPrice: 79.99,
    image: "/placeholder.svg?height=500&width=400",
    rating: 4.5,
    reviews: 89,
    colors: ["Black", "Gray", "Navy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: "Comfort",
    category: "men",
  },
  {
    id: 315,
    name: "Cargo Shorts",
    price: 49.99,
    originalPrice: 69.99,
    image: "/placeholder.svg?height=500&width=400",
    rating: 4.4,
    reviews: 67,
    colors: ["Khaki", "Olive", "Black"],
    sizes: ["30", "32", "34", "36", "38"],
    badge: "Summer",
    category: "men",
  },
  {
    id: 316,
    name: "Formal Tuxedo Pants",
    price: 149.99,
    originalPrice: 199.99,
    image: "/placeholder.svg?height=500&width=400",
    rating: 4.9,
    reviews: 45,
    colors: ["Black"],
    sizes: ["30", "32", "34", "36", "38", "40"],
    badge: "Formal",
    category: "men",
  },
]

export default function MenPantsPage() {
  const [sortBy, setSortBy] = useState("featured")
  const [filteredProducts, setFilteredProducts] = useState(pants)
  const { addItem: addToWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()

  const handleSort = (value: string) => {
    setSortBy(value)
    const sorted = [...pants]

    switch (value) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        sorted.sort((a, b) => b.price - a.price)
        break
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    setFilteredProducts(sorted)
  }

  const handleWishlistToggle = (product: any) => {
    if (!isInWishlist(product.id)) {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
      })
      toast({
        title: "Added to wishlist!",
        description: `${product.name} has been added to your wishlist.`,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-gray-900/80" />
        <div className="absolute inset-0">
          <Image src="/placeholder.svg?height=600&width=1200" alt="Men's Pants" fill className="object-cover" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-playfair font-light mb-4">Pants & Trousers</h1>
          <p className="text-xl font-light">Premium bottoms for every occasion</p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold">Men's Pants & Trousers</h2>
              <p className="text-gray-600">{filteredProducts.length} products</p>
            </div>
            <Select value={sortBy} onValueChange={handleSort}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Link href={`/products/${product.id}`}>
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                    {product.badge && (
                      <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-indigo-500 border-0">
                        {product.badge}
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                      onClick={() => handleWishlistToggle(product)}
                    >
                      <Heart
                        className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-rose-500 text-rose-500" : "text-gray-600"}`}
                      />
                    </Button>
                  </div>
                  <div className="p-4">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold">${product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
