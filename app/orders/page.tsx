"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, Truck, CheckCircle, Clock, Search, Filter } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/navigation"

const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "delivered",
    total: 189.99,
    items: [
      { name: "Luxury Cashmere Sweater", quantity: 1, price: 189.99, image: "/placeholder.svg?height=100&width=100" },
    ],
    trackingNumber: "1Z999AA1234567890",
    estimatedDelivery: "Delivered",
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "shipped",
    total: 459.98,
    items: [
      { name: "Silk Evening Dress", quantity: 1, price: 299.99, image: "/placeholder.svg?height=100&width=100" },
      { name: "Designer Leather Jacket", quantity: 1, price: 159.99, image: "/placeholder.svg?height=100&width=100" },
    ],
    trackingNumber: "1Z999AA1234567891",
    estimatedDelivery: "Jan 18, 2024",
  },
  {
    id: "ORD-003",
    date: "2024-01-05",
    status: "processing",
    total: 299.99,
    items: [
      { name: "Premium Leather Handbag", quantity: 1, price: 299.99, image: "/placeholder.svg?height=100&width=100" },
    ],
    trackingNumber: "Processing",
    estimatedDelivery: "Jan 20, 2024",
  },
  {
    id: "ORD-004",
    date: "2023-12-28",
    status: "cancelled",
    total: 89.99,
    items: [{ name: "Cotton T-Shirt", quantity: 2, price: 44.99, image: "/placeholder.svg?height=100&width=100" }],
    trackingNumber: "Cancelled",
    estimatedDelivery: "Cancelled",
  },
]

export default function OrdersPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  if (!user) {
    router.push("/login")
    return null
  }

  const filteredOrders = mockOrders
    .filter((order) => {
      const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || order.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "amount-high":
          return b.total - a.total
        case "amount-low":
          return a.total - b.total
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
    })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "shipped":
        return <Truck className="h-5 w-5 text-blue-600" />
      case "processing":
        return <Package className="h-5 w-5 text-orange-600" />
      case "cancelled":
        return <Clock className="h-5 w-5 text-red-600" />
      default:
        return <Package className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200"
      case "shipped":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "processing":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-playfair font-light mb-2">Order History</h1>
        <p className="text-gray-600 text-lg">Track and manage your orders</p>
      </div>

      {/* Filters and Search */}
      <Card className="mb-8 border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search by order number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="amount-high">Amount: High to Low</SelectItem>
                <SelectItem value="amount-low">Amount: Low to High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-3">
                      {getStatusIcon(order.status)}
                      Order {order.id}
                    </CardTitle>
                    <CardDescription>Placed on {new Date(order.date).toLocaleDateString()}</CardDescription>
                  </div>
                  <div className="text-right">
                    <Badge className={`${getStatusColor(order.status)} border`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    <p className="text-lg font-semibold mt-2">${order.total.toFixed(2)}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg?height=64&width=64"
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Order Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-gray-700">Tracking Number</p>
                      <p className="text-gray-600">{order.trackingNumber}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700">Estimated Delivery</p>
                      <p className="text-gray-600">{order.estimatedDelivery}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700">Items</p>
                      <p className="text-gray-600">{order.items.length} item(s)</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-4">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      View Details
                    </Button>
                    {order.status === "shipped" && (
                      <Button variant="outline" size="sm" className="bg-transparent">
                        Track Package
                      </Button>
                    )}
                    {order.status === "delivered" && (
                      <Button variant="outline" size="sm" className="bg-transparent">
                        Reorder
                      </Button>
                    )}
                    {order.status === "delivered" && (
                      <Button variant="outline" size="sm" className="bg-transparent">
                        Write Review
                      </Button>
                    )}
                    {(order.status === "processing" || order.status === "shipped") && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                      >
                        Cancel Order
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12 border-0 shadow-md">
          <CardContent>
            <Package className="h-24 w-24 mx-auto text-gray-300 mb-6" />
            <h3 className="text-2xl font-semibold mb-4">No orders found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || statusFilter !== "all"
                ? "No orders match your current filters."
                : "You haven't placed any orders yet."}
            </p>
            <div className="space-x-4">
              {(searchQuery || statusFilter !== "all") && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setStatusFilter("all")
                  }}
                  className="bg-transparent"
                >
                  Clear Filters
                </Button>
              )}
              <Button asChild className="bg-rose-600 hover:bg-rose-700">
                <Link href="/products">Start Shopping</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
