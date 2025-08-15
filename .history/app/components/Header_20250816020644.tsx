"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, ShoppingCart, User, Menu, Heart } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { useWishlist } from "../context/WishlistContext"
import { useRouter } from "next/navigation"
import Image from 'next/image';
import { Plus, Minus } from "lucide-react";




export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { items } = useCart()
  const { user, logout } = useAuth()
  const { items: wishlistItems } = useWishlist()
  const router = useRouter()


  const [open, setOpen] = useState(false) // control state

  const handleLinkClick = () => {
    setOpen(false) // close when link is clicked
  }


  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const wishlistCount = wishlistItems.length
  const [openWomen, setOpenWomen] = useState(false);
  const [openMen, setOpenMen] = useState(false);
  const [openWomenSub, setOpenWomenSub] = useState<string | null>(null);
  const [openMenSub, setOpenMenSub] = useState<string | null>(null);
  const link = (path: string) => path.toLowerCase();
  const toggleSub = (section: string, current: string | null, setFn: (val: string | null) => void) => {
    setFn(current === section ? null : section);
  };
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          {/* <Link
            href="/"
          >
            <Image
              src="/logo.png"   // automatically looks in public/
              alt="Company Logo"
              width={150}       // required
              height={50}       // required
              priority          // loads faster
              className="mx-5"
             />
          </Link> */}

          <Link
            href="/"
            className="text-2xl mx-5 max-sm:text-lg font-noto-sans-jp font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent"
          >
            All About Jeans
          </Link>
          {/* Desktop Navigation */}
<<<<<<< HEAD
          <nav className="hidden lg:flex items-center space-x-12 text-lg">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-rose-50 text-lg">
                  <span className="text-gray-700 hover:text-rose-600 transition-colors font-medium">
                    Men
                  </span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="relative left-44 w-56">

                {/* Fit Types */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Fit Types</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem><Link href="/men/fit-type/slim-fit">Slim Fit</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href="/men/fit-type/skinny-fit">Skinny Fit</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href="/men/fit-type/regular-fit">Regular Fit</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href="/men/fit-type/relaxed-fit">Relaxed Fit</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href="/men/fit-type/loose-fit">Loose Fit</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href="/men/fit-type/athletic-fit">Athletic Fit</Link></DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                {/* Cut Types */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Cut Types</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem><Link href="/men/cut-type/straight-cut">Straight Cut</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href="/men/cut-type/bell-bottom">Bell Bottom</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href="/men/cut-type/wide-leg">Wide-Leg</Link></DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                {/* Style & Design Type */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Style & Design Type</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem><Link href="/men/style-design-type/ripped">Ripped</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href="/men/style-design-type/patchwork">Patchwork</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href="/men/style-design-type/cargo-jeans">Cargo Jeans</Link></DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                {/* Rise Types */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Rise Types</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem><Link href="/men/rise-type/high-rise">High-Rise (High Waist)</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href="/men/rise-type/mid-rise">Mid-Rise</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href="/men/rise-type/low-rise">Low-Rise</Link></DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                {/* Functional Type */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Functional Types</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem><Link href="/men/functional-type/jegging">Jeggings</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href="/men/functional-type/stretch-jeans">Stretch Jeans</Link></DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

              </DropdownMenuContent>
            </DropdownMenu>


            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-rose-50 text-lg">
                  <span className="text-gray-700 hover:text-rose-600 transition-colors font-medium">
                    Women
                  </span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="relative left-44 w-56">

                {/* Fit Types */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Fit Types</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem><Link href="/women/fit-type/slim-fit">Slim Fit</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href="/women/fit-type/skinny-fit">Skinny Fit</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href="/women/fit-type/regular-fit">Regular Fit</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href="/women/fit-type/relaxed-fit">Relaxed Fit</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href="/women/fit-type/loose-fit">Loose Fit</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href="/women/fit-type/athletic-fit">Athletic Fit</Link></DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                {/* Cut Types */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Cut Types</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem><Link href="/women/cut-type/straight-cut">Straight Cut</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href="/women/cut-type/bell-bottom">Bell Bottom</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href="/women/cut-type/wide-leg">Wide-Leg</Link></DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                {/* Style & Design Type */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Style & Design Type</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem><Link href="/women/style-design-type/ripped">Ripped</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href="/women/style-design-type/patchwork">Patchwork</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href="/women/style-design-type/cargo-jeans">Cargo Jeans</Link></DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                {/* Rise Types */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Rise Types</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem><Link href="/women/rise-type/high-rise">High-Rise (High Waist)</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href="/women/rise-type/mid-rise">Mid-Rise</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href="/women/rise-type/low-rise">Low-Rise</Link></DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                {/* Functional Type */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Functional Types</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem><Link href="/women/functional-type/jegging">Jeggings</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href="/women/functional-type/stretch-jeans">Stretch Jeans</Link></DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

              </DropdownMenuContent>
            </DropdownMenu>


=======
          <nav className="hidden lg:flex items-center space-x-12">
            <Link href="/men" className="text-gray-700 hover:text-rose-600 transition-colors font-medium">
              Men
            </Link>
>>>>>>> origin/main

            <Link href="/sale" className="text-gray-700 hover:text-rose-600 transition-colors font-medium">
              Sale
            </Link>

            <Link href="/about" className="text-gray-700 hover:text-rose-600 transition-colors font-medium">
              About
            </Link>
<<<<<<< HEAD

            <Link href="/contact" className="text-gray-700 hover:text-rose-600 transition-colors font-medium">
              Contact
            </Link>

=======
            <Link href="/contact" className="text-gray-700 hover:text-rose-600 transition-colors font-semibold">
              Contact
            </Link>
>>>>>>> origin/main
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
            {/* <Button variant="ghost" size="icon" className="xl:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="h-6 w-6" />
            </Button> */}

            {/* User Account */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-rose-50">
                  <User className="max-lg:hidden h-6 w-6" />
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
                    <DropdownMenuItem
                      onClick={() => {
                        logout()
                        router.push('/auth-pages/login')
                      }}
                    >
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem>
                      <Link href="/auth-pages/login" className="w-full">
                        Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/auth-pages/register" className="w-full">
                        Register
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="max-lg:hidden relative hover:bg-rose-50" asChild>
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
            <Button variant="ghost" size="icon" className="max-lg:hidden relative hover:bg-rose-50" asChild>
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
            <Button variant="ghost" size="icon" className="sm:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="h-6 w-6" />
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden h-6 w-6">
                  <Menu className="" />
                </button>
              </SheetTrigger>

              <SheetContent side="right" className="w-80 p-4 flex flex-col bg-white/20 text-white backdrop-blur-sm">
                {/* Header Icons */}
                <div className="flex space-x-2 mt-5">
                  {/* User */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="hover:bg-rose-50">
                        <User className="h-6 w-6" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      {user ? (
                        <>
                          <DropdownMenuItem><Link href="/account">My Account</Link></DropdownMenuItem>
                          <DropdownMenuItem><Link href="/orders">Order History</Link></DropdownMenuItem>
                          <DropdownMenuItem><Link href="/admin">Admin Panel</Link></DropdownMenuItem>
                          <DropdownMenuItem onClick={() => { logout(); router.push("/auth-pages/login"); }}>Logout</DropdownMenuItem>
                        </>
                      ) : (
                        <>
                          <DropdownMenuItem><Link href="/auth-pages/login">Login</Link></DropdownMenuItem>
                          <DropdownMenuItem><Link href="/auth-pages/register">Register</Link></DropdownMenuItem>
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

                  {/* Cart */}
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
                </div>

                {/* Scrollable Menu */}
                <nav className="mt-6 flex-1 overflow-y-auto space-y-4 pr-2">
                  {/* MEN */}
                  <div>
                    <button
                      onClick={() => setOpenMen(!openMen)}
                      className="flex items-center justify-between w-full font-semibold text-white"
                    >
                      Men
                      {openMen ? <Minus size={18} /> : <Plus size={18} />}
                    </button>
                    <ul
                      className={`ml-4 mt-2 space-y-1 text-white/90 overflow-hidden transition-all duration-300 ease-in-out ${openMen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                    >
                      {[
                        { key: "fit", label: "Fit Types", path: "fit-type", items: ["Slim Fit", "Skinny Fit", "Regular Fit", "Relaxed Fit", "Loose Fit", "Athletic Fit"] },
                        { key: "cut", label: "Cut Types", path: "cut-type", items: ["Straight Cut", "Bell Bottom", "Wide-Leg"] },
                        { key: "style", label: "Style & Design Type", path: "style-design-type", items: ["Ripped", "Patchwork", "Cargo Jeans"] },
                        { key: "rise", label: "Rise Types", path: "rise-type", items: ["High-Rise", "Mid-Rise", "Low-Rise"] },
                        { key: "functional", label: "Functional Types", path: "functional-type", items: ["Jegging", "Stretch Jeans"] },
                      ].map(section => (
                        <li key={section.key}>
                          <button
                            onClick={() => toggleSub(section.key, openMenSub, setOpenMenSub)}
                            className="flex items-center justify-between w-full font-medium"
                          >
                            {section.label}
                            {openMenSub === section.key ? <Minus size={16} /> : <Plus size={16} />}
                          </button>
                          <ul
                            className={`ml-4 mt-1 text-white/80 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${openMenSub === section.key ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                              }`}
                          >
                            {section.items.map((item, i) => {
                              const slug = item.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "")
                              return (
                                <li key={i}>
                                  <Link href={`/men/${section.path}/${slug}`}
                                    className="block hover:text-rose-500"
                                    onClick={handleLinkClick}
                                  >
                                    {item}
                                  </Link>
                                </li>
                              )
                            })}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* WOMEN */}
                  <div>
                    <button
                      onClick={() => setOpenWomen(!openWomen)}
                      className="flex items-center justify-between w-full font-semibold text-white"
                    >
                      Women
                      {openWomen ? <Minus size={18} /> : <Plus size={18} />}
                    </button>
                    <ul
                      className={`ml-4 mt-2 space-y-1 text-white/90 overflow-hidden transition-all duration-300 ease-in-out ${openWomen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                    >
                      {[
                        { key: "fit", label: "Fit Types", path: "fit-type", items: ["Slim Fit", "Skinny Fit", "Regular Fit", "Relaxed Fit", "Loose Fit", "Athletic Fit"] },
                        { key: "cut", label: "Cut Types", path: "cut-type", items: ["Straight Cut", "Bell Bottom", "Wide-Leg"] },
                        { key: "style", label: "Style & Design Type", path: "style-design-type", items: ["Ripped", "Patchwork", "Cargo Jeans"] },
                        { key: "rise", label: "Rise Types", path: "rise-type", items: ["High-Rise", "Mid-Rise", "Low-Rise"] },
                        { key: "functional", label: "Functional Types", path: "functional-type", items: ["Jegging", "Stretch Jeans"] },
                      ].map(section => (
                        <li key={section.key}>
                          <button
                            onClick={() => toggleSub(section.key, openWomenSub, setOpenWomenSub)}
                            className="flex items-center justify-between w-full font-medium"
                          >
                            {section.label}
                            {openWomenSub === section.key ? <Minus size={16} /> : <Plus size={16} />}
                          </button>
                          <ul
                            className={`ml-4 mt-1 text-white/80 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${openWomenSub === section.key ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                              }`}
                          >
                            {section.items.map((item, i) => {
                              const slug = item.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "")
                              return (
                                <li key={i}>
                                  <Link
                                    href={`/women/${section.path}/${slug}`}
                                    className="block hover:text-rose-500"
                                    onClick={handleLinkClick}
                                  >
                                    {item}
                                  </Link>
                                </li>
                              )
                            })}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>

                  
                  {/* Static Links */}
                  <div className="flex flex-col space-y-2 mt-4">
                    <Link href="/sale" className="text-lg font-medium hover:text-rose-600">Sale</Link>
                    <Link href="/about" className="text-lg font-medium hover:text-rose-600">About</Link>
                    <Link href="/contact" className="text-lg font-medium hover:text-rose-600">Contact</Link>
                  </div>
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
