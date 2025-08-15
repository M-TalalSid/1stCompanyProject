import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter,Noto_Sans_JP , Dancing_Script} from "next/font/google"
import "./globals.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { CartProvider } from "./context/CartContext"
import { AuthProvider } from "./context/AuthContext"
import { WishlistProvider } from "./context/WishlistContext"
import { Toaster } from "@/components/ui/toaster"


// Import Dancing Script font
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"], // You can also add 500, 600 if you need
  variable: "--font-dancing-script",
  display: "swap",
})
// Load the Google Font
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"], // Choose weights you need
  variable: "--font-noto-sans-jp", // CSS variable
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
    // <html lang="en" className={`${notoSansJP.variable}`}>
    <html lang="en" className={`${dancingScript.variable}`}>
      <body className="font-dancing-script">
      {/* <body className="font-noto-sans-jp"> */}
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
