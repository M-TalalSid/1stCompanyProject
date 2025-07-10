import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

const kidsCategories = [
  {
    name: "Girls (2-14 years)",
    href: "/kids/girls",
    image: "/placeholder.svg?height=400&width=300",
    description: "Stylish and comfortable clothing for girls",
    count: 89,
  },
  {
    name: "Boys (2-14 years)",
    href: "/kids/boys",
    image: "/placeholder.svg?height=400&width=300",
    description: "Durable and trendy clothes for boys",
    count: 76,
  },
  {
    name: "Baby Girls (0-24 months)",
    href: "/kids/baby-girls",
    image: "/placeholder.svg?height=400&width=300",
    description: "Soft and adorable outfits for baby girls",
    count: 45,
  },
  {
    name: "Baby Boys (0-24 months)",
    href: "/kids/baby-boys",
    image: "/placeholder.svg?height=400&width=300",
    description: "Cute and comfortable clothes for baby boys",
    count: 42,
  },
  {
    name: "Kids Shoes",
    href: "/kids/shoes",
    image: "/placeholder.svg?height=400&width=300",
    description: "Comfortable and stylish footwear",
    count: 38,
  },
  {
    name: "Kids Accessories",
    href: "/kids/accessories",
    image: "/placeholder.svg?height=400&width=300",
    description: "Fun accessories and essentials",
    count: 29,
  },
]

export default function KidsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 to-pink-900/80" />
        <div className="absolute inset-0">
          <Image src="/placeholder.svg?height=800&width=1600" alt="Kids Fashion" fill className="object-cover" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-playfair font-light mb-4">Kids Collection</h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto">
            Playful, comfortable, and stylish clothing for your little ones
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-light mb-4">Shop by Age & Category</h2>
            <p className="text-xl text-gray-600">Quality clothing designed for growing kids</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {kidsCategories.map((category) => (
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
