"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star, Heart, Truck, Shield, RotateCcw } from "lucide-react"
import { getAllProducts } from "@/lib/products-database"
import { useWishlist } from "./context/WishlistContext"

export default function HomePage() {
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-purple-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <Badge className="mb-6 bg-rose-100 text-rose-800 hover:bg-rose-200">New Collection Available</Badge>
          <h1 className="text-6xl md:text-8xl font-playfair font-bold mb-6 bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
            Timeless Elegance
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
              <Card key={product.id} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Link href={`/products/${product.id}`}>
                      <div className="aspect-square bg-gray-100 overflow-hidden">
                        <img
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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

      {/* Categories Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-gray-900">Shop by Category</h2>
            <p className="text-xl text-gray-600">Explore our carefully curated collections</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-80 bg-gradient-to-br from-rose-200 to-rose-300">
                  <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=300')] bg-cover bg-center opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-3xl font-playfair font-bold mb-4">Women</h3>
                      <p className="mb-6">Elegant & Contemporary</p>
                      <Button variant="secondary" asChild>
                        <Link href="/women">Shop Women</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-80 bg-gradient-to-br from-blue-200 to-blue-300">
                  <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=300')] bg-cover bg-center opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-3xl font-playfair font-bold mb-4">Men</h3>
                      <p className="mb-6">Sophisticated & Modern</p>
                      <Button variant="secondary" asChild>
                        <Link href="/men">Shop Men</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-80 bg-gradient-to-br from-green-200 to-green-300">
                  <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=300')] bg-cover bg-center opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-3xl font-playfair font-bold mb-4">Kids</h3>
                      <p className="mb-6">Playful & Comfortable</p>
                      <Button variant="secondary" asChild>
                        <Link href="/kids">Shop Kids</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Free Shipping</h3>
              <p className="text-gray-600">
                Complimentary shipping on all orders over $100. Fast and reliable delivery worldwide.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Payment</h3>
              <p className="text-gray-600">
                Your payment information is protected with bank-level security and encryption.
              </p>
            </div>

            <div className="text-center">
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

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-rose-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-playfair font-bold mb-4">Stay in Style</h2>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to our newsletter for exclusive offers and style inspiration
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <Button className="bg-white text-rose-600 hover:bg-gray-100 px-6 py-3">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
