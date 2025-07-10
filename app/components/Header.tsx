"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, ShoppingCart, User, Menu, Heart } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { useWishlist } from "../context/WishlistContext"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { items } = useCart()
  const { user, logout } = useAuth()
  const { items: wishlistItems } = useWishlist()

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const wishlistCount = wishlistItems.length

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-3xl font-playfair font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent"
          >
            LUXE
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-12">
            <DropdownMenu>
              <DropdownMenuTrigger className="text-gray-700 hover:text-rose-600 transition-colors font-medium">
                Women
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem>
                  <Link href="/women/dresses" className="w-full">
                    Dresses
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/women/tops" className="w-full">
                    Tops & Blouses
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/women/bottoms" className="w-full">
                    Bottoms
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/women/outerwear" className="w-full">
                    Outerwear
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/women/shoes" className="w-full">
                    Shoes
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/women/bags" className="w-full">
                    Bags
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="text-gray-700 hover:text-rose-600 transition-colors font-medium">
                Men
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem>
                  <Link href="/men/shirts" className="w-full">
                    Shirts
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/men/pants" className="w-full">
                    Pants & Trousers
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/men/suits" className="w-full">
                    Suits & Blazers
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/men/outerwear" className="w-full">
                    Outerwear
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/men/shoes" className="w-full">
                    Shoes
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/men/accessories" className="w-full">
                    Accessories
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="text-gray-700 hover:text-rose-600 transition-colors font-medium">
                Kids
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem>
                  <Link href="/kids/girls" className="w-full">
                    Girls (2-14 years)
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/kids/boys" className="w-full">
                    Boys (2-14 years)
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/kids/baby-girls" className="w-full">
                    Baby Girls (0-24 months)
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/kids/baby-boys" className="w-full">
                    Baby Boys (0-24 months)
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/kids/shoes" className="w-full">
                    Kids Shoes
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/accessories" className="text-gray-700 hover:text-rose-600 transition-colors font-medium">
              Accessories
            </Link>
            <Link href="/sale" className="text-rose-600 hover:text-rose-700 transition-colors font-semibold">
              Sale
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden xl:flex items-center flex-1 max-w-md mx-8">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const query = formData.get("search") as string
                if (query.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(query.trim())}`
                }
              }}
              className="relative w-full"
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                name="search"
                type="search"
                placeholder="Search for products..."
                className="pl-12 pr-4 py-3 rounded-full border-gray-300 focus:border-rose-500 focus:ring-rose-500"
              />
            </form>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search */}
            <Button variant="ghost" size="icon" className="xl:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="h-6 w-6" />
            </Button>

            {/* User Account */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-rose-50">
                  <User className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {user ? (
                  <>
                    <DropdownMenuItem>
                      <Link href="/account" className="w-full">
                        My Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/orders" className="w-full">
                        Order History
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/admin" className="w-full">
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem>
                      <Link href="/login" className="w-full">
                        Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/register" className="w-full">
                        Register
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="relative hover:bg-rose-50" asChild>
              <Link href="/wishlist">
                <Heart className="h-6 w-6" />
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs bg-rose-500">
                    {wishlistCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Shopping Cart */}
            <Button variant="ghost" size="icon" className="relative hover:bg-rose-50" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-6 w-6" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs bg-rose-500">
                    {itemCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <nav className="flex flex-col space-y-6 mt-8">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Women</h3>
                    <div className="flex flex-col space-y-2 ml-4">
                      <Link href="/women/dresses" className="text-gray-600 hover:text-rose-600">
                        Dresses
                      </Link>
                      <Link href="/women/tops" className="text-gray-600 hover:text-rose-600">
                        Tops & Blouses
                      </Link>
                      <Link href="/women/bottoms" className="text-gray-600 hover:text-rose-600">
                        Bottoms
                      </Link>
                      <Link href="/women/outerwear" className="text-gray-600 hover:text-rose-600">
                        Outerwear
                      </Link>
                      <Link href="/women/shoes" className="text-gray-600 hover:text-rose-600">
                        Shoes
                      </Link>
                      <Link href="/women/bags" className="text-gray-600 hover:text-rose-600">
                        Bags
                      </Link>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Men</h3>
                    <div className="flex flex-col space-y-2 ml-4">
                      <Link href="/men/shirts" className="text-gray-600 hover:text-rose-600">
                        Shirts
                      </Link>
                      <Link href="/men/pants" className="text-gray-600 hover:text-rose-600">
                        Pants & Trousers
                      </Link>
                      <Link href="/men/suits" className="text-gray-600 hover:text-rose-600">
                        Suits & Blazers
                      </Link>
                      <Link href="/men/outerwear" className="text-gray-600 hover:text-rose-600">
                        Outerwear
                      </Link>
                      <Link href="/men/shoes" className="text-gray-600 hover:text-rose-600">
                        Shoes
                      </Link>
                      <Link href="/men/accessories" className="text-gray-600 hover:text-rose-600">
                        Accessories
                      </Link>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Kids</h3>
                    <div className="flex flex-col space-y-2 ml-4">
                      <Link href="/kids/girls" className="text-gray-600 hover:text-rose-600">
                        Girls
                      </Link>
                      <Link href="/kids/boys" className="text-gray-600 hover:text-rose-600">
                        Boys
                      </Link>
                      <Link href="/kids/baby-girls" className="text-gray-600 hover:text-rose-600">
                        Baby Girls
                      </Link>
                      <Link href="/kids/baby-boys" className="text-gray-600 hover:text-rose-600">
                        Baby Boys
                      </Link>
                      <Link href="/kids/shoes" className="text-gray-600 hover:text-rose-600">
                        Kids Shoes
                      </Link>
                    </div>
                  </div>
                  <Link href="/accessories" className="text-lg font-medium">
                    Accessories
                  </Link>
                  <Link href="/sale" className="text-lg font-medium text-rose-600">
                    Sale
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="xl:hidden py-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const query = formData.get("search") as string
                if (query.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(query.trim())}`
                }
                setIsSearchOpen(false)
              }}
              className="relative"
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                name="search"
                type="search"
                placeholder="Search for products..."
                className="pl-12 pr-4 py-3 rounded-full"
              />
            </form>
          </div>
        )}
      </div>
    </header>
  )
}
