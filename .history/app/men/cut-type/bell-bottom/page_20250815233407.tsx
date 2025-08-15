"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Heart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useWishlist } from "../context/WishlistContext"
import SpinnerLoader from "../loader/page"

const pants = [
  {
    name: "Shirts",
    href: "/men/shirts",
    image: "/placeholder.svg?height=400&width=300",
    description: "Dress shirts and casual wear",
    count: 42,
  },
  {
    name: "Pants & Trousers",
    href: "/men/pants",
    image: "/placeholder.svg?height=400&width=300",
    description: "Formal and casual bottoms",
    count: 35,
  },
  {
    name: "Suits & Blazers",
    href: "/men/suits",
    image: "/placeholder.svg?height=400&width=300",
    description: "Professional and formal wear",
    count: 28,
  },
  {
    name: "Outerwear",
    href: "/men/outerwear",
    image: "/placeholder.svg?height=400&width=300",
    description: "Jackets, coats, and sweaters",
    count: 31,
  },
  {
    name: "Shoes",
    href: "/men/shoes",
    image: "/placeholder.svg?height=400&width=300",
    description: "Dress shoes, sneakers, and boots",
    count: 48,
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, []);
  
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
  if (loading) return <SpinnerLoader />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-gray-900/80" />
        <div className="absolute inset-0">
          <Image src="/placeholder.svg?height=600&width=1200" alt="Men's Pants" fill className="object-cover" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-playfair font-light mb-4">Pants & Trousers</h1>
          <p className="text-xl font-light">Premium bottoms for every occasion</p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menCategories.map((category) => (
              <Link key={category.name} href={category.href} className="group">
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                  <CardContent className="p-0">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-6 left-6 text-white">
                        <h3 className="text-2xl font-playfair font-semibold mb-2">{category.name}</h3>
                        <p className="text-sm opacity-90 mb-2">{category.description}</p>
                        <p className="text-xs opacity-75">{category.count} items</p>
                      </div>
                      <div className="absolute top-6 right-6">
                        <ArrowRight className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
