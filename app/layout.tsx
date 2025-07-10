import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { CartProvider } from "./context/CartContext"
import { AuthProvider } from "./context/AuthContext"
import { WishlistProvider } from "./context/WishlistContext"
import { Toaster } from "@/components/ui/toaster"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Luxe Fashion - Premium Designer Clothing",
  description:
    "Discover timeless elegance with our curated collection of premium fashion pieces for men, women, and kids.",
  keywords:
    "luxury fashion, designer clothing, premium apparel, men's fashion, women's fashion, kids fashion, accessories",
  authors: [{ name: "Luxe Fashion" }],
  openGraph: {
    title: "Luxe Fashion - Premium Designer Clothing",
    description: "Discover timeless elegance with our curated collection of premium fashion pieces",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxe Fashion - Premium Designer Clothing",
    description: "Discover timeless elegance with our curated collection of premium fashion pieces",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className={inter.className}>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <Header />
              <main>{children}</main>
              <Footer />
              <Toaster />
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
