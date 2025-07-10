"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Heart } from "lucide-react"
import { useWishlist } from "../context/WishlistContext"
import { useToast } from "@/hooks/use-toast"

const accessories = [
  {
    id: 701,
    name: "Leather Handbag",
    price: 199.99,
    originalPrice: 259.99,
    image: "/placeholder.svg?height=500&width=400",
    rating: 4.8,
    reviews: 156,
    colors: ["Black", "Brown", "Tan"],
    sizes: ["One Size"],
    badge: "Premium",
    category: "accessories",
  },
  {
    id: 702,
    name: "Silk Scarf",
    price: 89.99,
    originalPrice: 119.99,
    image: "/placeholder.svg?height=500&width=400",
    rating: 4.6,
    reviews: 89,
    colors: ["Floral", "Geometric", "Solid"],
    sizes: ["One Size"],
    badge: "Elegant",
    category: "accessories",
  },
  {
    id: 703,
    name: "Designer Sunglasses",
    price: 149.99,
    originalPrice: 199.99,
    image: "/placeholder.svg?height=500&width=400",
    rating: 4.7,
    reviews: 123,
    colors: ["Black", "Tortoise", "Gold"],
    sizes: ["One Size"],
    badge: "Trending",
    category: "accessories",
  },
  {
    id: 704,
    name: "Leather Belt",
    price: 79.99,
    originalPrice: 99.99,
    image: "/placeholder.svg?height=500&width=400",
    rating: 4.5,
    reviews: 67,
    colors: ["Black", "Brown", "Cognac"],
    sizes: ["S", "M", "L", "XL"],
    badge: "Classic",
    category: "accessories",
  },
  {
    id: 705,
    name: "Pearl Necklace",
    price: 299.99,
    originalPrice: 399.99,
    image: "/placeholder.svg?height=500&width=400",
    rating: 4.9,
    reviews: 234,
    colors: ["White", "Cream"],
    sizes: ["One Size"],
    badge: "Luxury",
    category: "accessories",
  },
  {
    id: 706,
    name: "Cashmere Gloves",
    price: 59.99,
    originalPrice: 79.99,
    image: "/placeholder.svg?height=500&width=400",
    rating: 4.4,
    reviews: 45,
    colors: ["Black", "Gray", "Camel"],
    sizes: ["S", "M", "L"],
    badge: "Winter",
    category: "accessories",
  },
  {
    id: 707,
    name: "Luxury Watch",
    price: 599.99,
    originalPrice: 799.99,
    image: "/placeholder.svg?height=500&width=400",
    rating: 4.8,
    reviews: 98,
    colors: ["Silver", "Gold", "Rose Gold"],
    sizes: ["One Size"],
    badge: "Premium",
    category: "accessories",
  },
  {
    id: 708,
    name: "Wool Hat",
    price: 39.99,
    originalPrice: 54.99,
    image: "/placeholder.svg?height=500&width=400",
    rating: 4.3,
    reviews: 76,
    colors: ["Black", "Gray", "Beige"],
    sizes: ["One Size"],
    badge: "Cozy",
    category: "accessories",
  },
]

export default function AccessoriesPage() {
  const [sortBy, setSortBy] = useState("featured")
  const [filteredProducts, setFilteredProducts] = useState(accessories)
  const { addItem: addToWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()

  const handleSort = (value: string) => {
    setSortBy(value)
    const sorted = [...accessories]

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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-orange-900/80" />
        <div className="absolute inset-0">
          <Image src="/placeholder.svg?height=600&width=1200" alt="Accessories" fill className="object-cover" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-playfair font-light mb-4">Accessories</h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto">
            Complete your look with our curated collection of premium accessories
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-playfair font-light">Premium Accessories</h2>
              <p className="text-gray-600 text-lg">{filteredProducts.length} products</p>
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
                      <Badge className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 border-0">
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
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-amber-600 transition-colors">
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
