import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Award, Leaf, Globe, Star } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-rose-100 text-rose-800 hover:bg-rose-200">Est. 2020</Badge>
          <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6 bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
            About LUXE
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We believe that fashion is more than just clothing—it's a form of self-expression, a way to tell your story,
            and a means to feel confident and beautiful every day.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-playfair font-bold mb-6 text-gray-900">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2020 with a vision to democratize luxury fashion, LUXE began as a small boutique with big
                  dreams. Our founders, passionate about sustainable fashion and timeless design, set out to create a
                  brand that would offer premium quality clothing at accessible prices.
                </p>
                <p>
                  What started as a curated collection of essential pieces has grown into a comprehensive fashion
                  destination, serving customers worldwide with carefully selected designs that blend contemporary
                  trends with classic elegance.
                </p>
                <p>
                  Today, we're proud to be a trusted name in fashion, known for our commitment to quality,
                  sustainability, and exceptional customer service.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-rose-200 to-purple-200 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <Heart className="h-16 w-16 text-rose-600 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-800">Made with Love</p>
                  <p className="text-gray-600">Every piece tells a story</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold mb-4 text-gray-900">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
                <p className="text-gray-600">
                  We're committed to ethical production practices and sustainable materials that respect our planet and
                  future generations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Quality</h3>
                <p className="text-gray-600">
                  Every piece is crafted with meticulous attention to detail, using only the finest materials and
                  time-tested techniques.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community</h3>
                <p className="text-gray-600">
                  We believe in building lasting relationships with our customers, partners, and the communities we
                  serve.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-rose-600 to-purple-600 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-rose-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-rose-100">Premium Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-rose-100">Countries Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8★</div>
              <div className="text-rose-100">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold mb-4 text-gray-900">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">The passionate people behind LUXE</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-rose-200 to-rose-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-rose-700">SJ</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Sarah Johnson</h3>
                <p className="text-rose-600 font-medium mb-3">Founder & CEO</p>
                <p className="text-gray-600 text-sm">
                  Former fashion editor with 15 years of experience in luxury retail. Passionate about sustainable
                  fashion and empowering women through style.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-200 to-purple-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-700">MC</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Michael Chen</h3>
                <p className="text-purple-600 font-medium mb-3">Creative Director</p>
                <p className="text-gray-600 text-sm">
                  Award-winning designer who brings fresh perspectives to timeless silhouettes. Believes that great
                  design should be both beautiful and functional.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-700">ER</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Emma Rodriguez</h3>
                <p className="text-blue-600 font-medium mb-3">Head of Sustainability</p>
                <p className="text-gray-600 text-sm">
                  Environmental scientist turned fashion advocate. Leads our sustainability initiatives and ensures our
                  commitment to ethical practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Globe className="h-16 w-16 text-rose-600 mx-auto mb-6" />
            <h2 className="text-4xl font-playfair font-bold mb-6 text-gray-900">Our Mission</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              To make luxury fashion accessible, sustainable, and meaningful. We strive to create pieces that not only
              look beautiful but also make you feel confident, comfortable, and connected to something greater than
              yourself.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                Ethical Production
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                Fair Trade
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                Carbon Neutral Shipping
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                Sustainable Materials
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <Star className="h-12 w-12 text-rose-600 mx-auto mb-4" />
            <h2 className="text-3xl font-playfair font-bold mb-4 text-gray-900">Join Our Journey</h2>
            <p className="text-lg text-gray-600 mb-8">
              Be part of a community that values quality, sustainability, and timeless style. Discover your next
              favorite piece today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-rose-600 hover:bg-rose-700">
                <Link href="/products">Shop Collection</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
