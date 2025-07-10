"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react"
import { useCart } from "../context/CartContext"

export default function CartPage() {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="h-24 w-24 mx-auto text-gray-300 mb-6" />
        <h1 className="text-3xl font-playfair font-light mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8 text-lg">Discover our latest collections and add items to your cart.</p>
        <Button asChild size="lg" className="bg-rose-600 hover:bg-rose-700">
          <Link href="/products">
            Start Shopping
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-playfair font-light mb-2">Shopping Cart</h1>
        <p className="text-gray-600 text-lg">
          {items.length} item{items.length !== 1 ? "s" : ""} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={`${item.id}-${item.size}-${item.color}`} className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-gray-600">
                          Color: {item.color} • Size: {item.size}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id, item.size, item.color)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.size, item.color, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                          className="h-10 w-10 rounded-full"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                          className="h-10 w-10 rounded-full"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-between items-center pt-6">
            <Button variant="outline" onClick={clearCart} className="border-2 bg-transparent">
              Clear Cart
            </Button>
            <Button variant="outline" asChild className="border-2 bg-transparent">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 border-0 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-playfair font-semibold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium">{total >= 100 ? "Free" : "$9.99"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="font-medium">${(total * 0.08).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-xl">
                  <span>Total</span>
                  <span>${(total + (total >= 100 ? 0 : 9.99) + total * 0.08).toFixed(2)}</span>
                </div>
              </div>

              {total < 100 && (
                <div className="bg-rose-50 p-4 rounded-xl mb-6 border border-rose-200">
                  <p className="text-sm text-rose-800">Add ${(100 - total).toFixed(2)} more for free shipping!</p>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex gap-3">
                  <Input placeholder="Promo code" className="rounded-xl" />
                  <Button variant="outline" className="border-2 rounded-xl bg-transparent">
                    Apply
                  </Button>
                </div>

                <Button className="w-full bg-rose-600 hover:bg-rose-700 py-4 text-lg rounded-xl" size="lg" asChild>
                  <Link href="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">Secure checkout with SSL encryption</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
