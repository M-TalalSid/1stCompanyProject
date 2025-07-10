import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

const womenCategories = [
  {
    name: "Dresses",
    href: "/women/dresses",
    image: "/placeholder.svg?height=400&width=300",
    description: "Elegant dresses for every occasion",
    count: 45,
  },
  {
    name: "Tops & Blouses",
    href: "/women/tops",
    image: "/placeholder.svg?height=400&width=300",
    description: "Sophisticated tops and blouses",
    count: 67,
  },
  {
    name: "Bottoms",
    href: "/women/bottoms",
    image: "/placeholder.svg?height=400&width=300",
    description: "Pants, skirts, and shorts",
    count: 38,
  },
  {
    name: "Outerwear",
    href: "/women/outerwear",
    image: "/placeholder.svg?height=400&width=300",
    description: "Jackets, coats, and blazers",
    count: 29,
  },
  {
    name: "Shoes",
    href: "/women/shoes",
    image: "/placeholder.svg?height=400&width=300",
    description: "Heels, flats, and boots",
    count: 52,
  },
  {
    name: "Bags",
    href: "/women/bags",
    image: "/placeholder.svg?height=400&width=300",
    description: "Handbags, clutches, and totes",
    count: 34,
  },
]

export default function WomenPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-900/80 to-purple-900/80" />
        <div className="absolute inset-0">
          <Image src="/placeholder.svg?height=800&width=1600" alt="Women's Fashion" fill className="object-cover" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-playfair font-light mb-4">Women's Collection</h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto">
            Discover elegance redefined with our curated selection of premium women's fashion
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-light mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600">Find your perfect style in our carefully curated collections</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {womenCategories.map((category) => (
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
