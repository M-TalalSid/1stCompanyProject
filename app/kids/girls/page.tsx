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

const girlsClothing = [
  {
    id: 501,
    name: "Princess Dress",
    price: 49.99,
    originalPrice: 69.99,
    image: "/placeholder.svg?height=500&width=400",
    rating: 4.8,
    reviews: 156,
    colors: ["Pink", "Purple", "Blue"],
    sizes: ["2T", "3T", "4T", "5T", "6", "7", "8"],
    badge: "Popular",
    category: "kids",
  },
  {
    id: 502,
    name: "Unicorn T-Shirt",
    price: 24.99,
    originalPrice: 34.99,
    image: "/placeholder.svg?height=500&width=400",
    rating: 4.6,
    reviews: 89,
    colors: ["White", "Pink", "Lavender"],
    sizes: ["2T", "3T", "4T", "5T", "6", "7", "8", "10"],
    badge: "New",
    category: "kids",
  },
  {
    id: 503,
    name: "Denim Overalls",
    price: 39.99,
    originalPrice: 54.99,
    image: "/placeholder.svg?height=500&width=400",
    rating: 4.7,
    reviews: 123,
    colors: ["Light Blue", "Dark Blue"],
    sizes: ["2T", "3T", "4T", "5T", "6", "7", "8"],
    badge: "Sale",
    category: "kids",
  },
  {
    id: 504,
    name: "Floral Leggings",
    price: 19.99,
    originalPrice: 29.99,
    image: "/placeholder.svg?height=500&width=400",
    rating: 4.5,
    reviews: 67,
    colors: ["Pink Floral", "Purple Floral", "Blue Floral"],
    sizes: ["2T", "3T", "4T", "5T", "6", "7", "8", "10"],
    badge: "",
    category: "kids",
  },
  {
    id: 505,
    name: "Rainbow Cardigan",
    price: 34.99,
    originalPrice: 44.99,
    image: "/placeholder.svg?height=500&width=400",
    rating: 4.4,
    reviews: 45,
    colors: ["Rainbow", "Pastel Rainbow"],
    sizes: ["2T", "3T", "4T", "5T", "6", "7", "8"],
    badge: "Cozy",
    category: "kids",
  },
  {
    id: 506,
    name: "Tutu Skirt",
    price: 29.99,
    originalPrice: 39.99,
    image: "/placeholder.svg?height=500&width=400",
    rating: 4.9,
    reviews: 234,
    colors: ["Pink", "Purple", "White", "Gold"],
    sizes: ["2T", "3T", "4T", "5T", "6", "7", "8"],
    badge: "Best Seller",
    category: "kids",
  },
]

export default function KidsGirlsPage() {
  const [sortBy, setSortBy] = useState("featured")
  const [filteredProducts, setFilteredProducts] = useState(girlsClothing)
  const { addItem: addToWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()

  const handleSort = (value: string) => {
    setSortBy(value)
    const sorted = [...girlsClothing]

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
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/80 to-purple-900/80" />
        <div className="absolute inset-0">
          <Image src="/placeholder.svg?height=600&width=1200" alt="Girls Clothing" fill className="object-cover" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-playfair font-light mb-4">Girls Collection</h1>
          <p className="text-xl font-light">Stylish and comfortable clothes for girls (2-14 years)</p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold">Girls Clothing</h2>
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
                      <Badge className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-purple-500 border-0">
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
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-pink-600 transition-colors">
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
