"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Heart, Timer } from "lucide-react"
import { useWishlist } from "../context/WishlistContext"
import { useToast } from "@/hooks/use-toast"

const saleProducts = [
  {
    id: 801,
    name: "Designer Evening Gown",
    price: 199.99,
    originalPrice: 399.99,
    image: "/placeholder.svg?height=500&width=400",
    rating: 4.9,
    reviews: 156,
    colors: ["Black", "Navy", "Burgundy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "50% OFF",
    category: "women",
    discount: 50,
  },
  {
    id: 802,
    name: "Luxury Wool Coat",
    price: 299.99,
    originalPrice: 599.99,
    image: "/placeholder.svg?height=500&width=400",
    rating: 4.8,
    reviews: 89,
    colors: ["Camel", "Black", "Gray"],
    sizes: ["S", "M", "L", "XL"],
    badge: "50% OFF",
    category: "women",
    discount: 50,
  },
  {
    id: 803,
    name: "Premium Leather Jacket",
    price: 249.99,
    originalPrice: 449.99,
    image: "/placeholder.svg?height=500&width=400",
    rating: 4.7,
    reviews: 123,
    colors: ["Black", "Brown"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: "44% OFF",
    category: "men",
    discount: 44,
  },
  {
    id: 804,
    name: "Cashmere Scarf Set",
    price: 89.99,
    originalPrice: 179.99,
    image: "/placeholder.svg?height=500&width=400",
    rating: 4.6,
    reviews: 67,
    colors: ["Gray", "Beige", "Navy"],
    sizes: ["One Size"],
    badge: "50% OFF",
    category: "accessories",
    discount: 50,
  },
  {
    id: 805,
    name: "Silk Pajama Set",
    price: 129.99,
    originalPrice: 219.99,
    image: "/placeholder.svg?height=500&width=400",
    rating: 4.8,
    reviews: 234,
    colors: ["Champagne", "Navy", "Rose"],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "41% OFF",
    category: "women",
    discount: 41,
  },
  {
    id: 806,
    name: "Designer Sneakers",
    price: 149.99,
    originalPrice: 299.99,
    image: "/placeholder.svg?height=500&width=400",
    rating: 4.5,
    reviews: 98,
    colors: ["White", "Black", "Gray"],
    sizes: ["6", "7", "8", "9", "10", "11"],
    badge: "50% OFF",
    category: "accessories",
    discount: 50,
  },
  {
    id: 807,
    name: "Formal Suit Set",
    price: 399.99,
    originalPrice: 799.99,
    image: "/placeholder.svg?height=500&width=400",
    rating: 4.9,
    reviews: 45,
    colors: ["Navy", "Charcoal", "Black"],
    sizes: ["38", "40", "42", "44", "46"],
    badge: "50% OFF",
    category: "men",
    discount: 50,
  },
  {
    id: 808,
    name: "Kids Party Dress",
    price: 39.99,
    originalPrice: 79.99,
    image: "/placeholder.svg?height=500&width=400",
    rating: 4.7,
    reviews: 76,
    colors: ["Pink", "Purple", "White"],
    sizes: ["2T", "3T", "4T", "5T", "6", "7", "8"],
    badge: "50% OFF",
    category: "kids",
    discount: 50,
  },
]

export default function SalePage() {
  const [sortBy, setSortBy] = useState("discount")
  const [filteredProducts, setFilteredProducts] = useState(saleProducts)
  const { addItem: addToWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()

  const handleSort = (value: string) => {
    setSortBy(value)
    const sorted = [...saleProducts]

    switch (value) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        sorted.sort((a, b) => b.price - a.price)
        break
      case "discount":
        sorted.sort((a, b) => b.discount - a.discount)
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
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 to-pink-900/80" />
        <div className="absolute inset-0">
          <Image src="/placeholder.svg?height=600&width=1200" alt="Sale" fill className="object-cover" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-playfair font-light mb-4">SALE</h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto mb-6">
            Up to 50% off on selected premium items
          </p>
          <div className="flex items-center justify-center gap-2 text-lg">
            <Timer className="h-6 w-6" />
            <span>Limited time offer - Don't miss out!</span>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-playfair font-light">Sale Items</h2>
              <p className="text-gray-600 text-lg">{filteredProducts.length} products on sale</p>
            </div>
            <Select value={sortBy} onValueChange={handleSort}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="discount">Highest Discount</SelectItem>
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
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 border-0 text-white font-bold">
                      {product.badge}
                    </Badge>
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
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-red-600 transition-colors">
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
                      <span className="text-xl font-bold text-red-600">${product.price}</span>
                      <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm font-medium text-green-600">
                        You save ${(product.originalPrice - product.price).toFixed(2)}
                      </span>
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
