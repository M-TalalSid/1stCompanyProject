"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star, Heart, Truck, Shield, RotateCcw } from "lucide-react"
import { getAllProducts } from "@/lib/products-database"
import { useWishlist } from "./context/WishlistContext"
import { useEffect, useState } from "react"
import SpinnerLoader from "./loader/page"

export default function HomePage() {
  const [loading, setLoading] = useState(true);
      
        useEffect(() => {
          const timeout = setTimeout(() => setLoading(false), 1500);
          return () => clearTimeout(timeout);
        }, []);
        
  const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlist()
  const allProducts = getAllProducts()

  // Get featured products (first 4 products from database)
  const featuredProducts = allProducts.slice(0, 4)

  const isInWishlist = (productId: number) => {
    return wishlistItems.some((item) => item.id === productId)
  }

  const handleWishlistToggle = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category,
      })
    }
  }
        if (loading) return <SpinnerLoader />;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-purple-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <Badge className="mb-6 bg-rose-100 text-rose-800 hover:bg-rose-200">New Collection Available</Badge>
          <h1 className="text-6xl md:text-8xl font-playfair font-bold mb-6 bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
           All About Jeans
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover our curated collection of premium fashion pieces that blend contemporary style with classic
            sophistication
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-lg px-8 py-6" asChild>
              <Link href="/products">
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent" asChild>
              <Link href="/about">Learn Our Story</Link>
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-rose-200 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-60 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-20 w-12 h-12 bg-blue-200 rounded-full opacity-60 animate-pulse delay-500"></div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-gray-900">Featured Pieces</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked selections that embody our commitment to quality and style
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-2xl transition-all duration-200 border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Link href={`/products/${product.id}`}>
                      <div className="aspect-square bg-gray-100 overflow-hidden">
                        <img
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-400"
                        />
                      </div>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`absolute top-4 right-4 ${
                        isInWishlist(product.id)
                          ? "text-rose-600 bg-white/90"
                          : "text-gray-600 bg-white/90 hover:text-rose-600"
                      } shadow-lg`}
                      onClick={() => handleWishlistToggle(product)}
                    >
                      <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                    </Button>
                    {product.isSale && <Badge className="absolute top-4 left-4 bg-rose-600 shadow-lg">Sale</Badge>}
                    {product.isNew && <Badge className="absolute top-4 left-4 bg-green-600 shadow-lg">New</Badge>}
                  </div>
                  <div className="p-6">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600 mb-3 capitalize text-sm">
                      {product.category} • {product.subcategory}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xl text-gray-900">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-gray-500 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">{product.rating}</span>
                      </div>
                    </div>
                    <Button className="w-full bg-rose-600 hover:bg-rose-700" asChild>
                      <Link href={`/products/${product.id}`}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 ">
            <div className="text-center shadow-xl border bg-white p-10 rounded border-gray-300 ">
              <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Free Shipping</h3>
              <p className="text-gray-600">
                Complimentary shipping on all orders over $100. Fast and reliable delivery worldwide.
              </p>
            </div>

            <div className="text-center shadow-xl border bg-white p-10 rounded border-gray-300 ">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Payment</h3>
              <p className="text-gray-600">
                Your payment information is protected with bank-level security and encryption.
              </p>
            </div>

            <div className="text-center shadow-xl border bg-white p-10 rounded border-gray-300 ">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <RotateCcw className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Returns</h3>
              <p className="text-gray-600">
                Not satisfied? Return any item within 60 days for a full refund or exchange.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
