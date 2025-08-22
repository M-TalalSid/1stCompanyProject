"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Star,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { Label } from "recharts";

const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "delivered",
    total: 189.99,
    items: [
      {
        name: "Luxury Cashmere Sweater",
        quantity: 1,
        price: 189.99,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    trackingNumber: "1Z999AA1234567890",
    estimatedDelivery: "Delivered",
    rating: 0,
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "shipped",
    total: 459.98,
    items: [
      {
        name: "Silk Evening Dress",
        quantity: 1,
        price: 299.99,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        name: "Designer Leather Jacket",
        quantity: 1,
        price: 159.99,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    trackingNumber: "1Z999AA1234567891",
    estimatedDelivery: "Jan 18, 2024",
    rating: 0,
  },
  {
    id: "ORD-003",
    date: "2024-01-05",
    status: "processing",
    total: 299.99,
    items: [
      {
        name: "Premium Leather Handbag",
        quantity: 1,
        price: 299.99,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    trackingNumber: "Processing",
    estimatedDelivery: "Jan 20, 2024",
    rating: 0,
  },
  {
    id: "ORD-004",
    date: "2023-12-28",
    status: "cancelled",
    total: 89.99,
    items: [
      {
        name: "Cotton T-Shirt",
        quantity: 2,
        price: 44.99,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    trackingNumber: "Cancelled",
    estimatedDelivery: "Cancelled",
    rating: 0,
  },
  {
    id: "ORD-005",
    date: "2023-12-20",
    status: "delivered",
    total: 349.98,
    items: [
      {
        name: "Elegant Silk Blouse",
        quantity: 1,
        price: 129.99,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        name: "Designer Sunglasses",
        quantity: 1,
        price: 219.99,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    trackingNumber: "1Z999AA1234567892",
    estimatedDelivery: "Delivered",
    rating: 0,
  },
];

export default function OrdersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [darkMode, setDarkMode] = useState(false);
  const [orders, setOrders] = useState(mockOrders);

  if (!user) {
    router.push("/login");
    return null;
  }

  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch = order.id
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "amount-high":
          return b.total - a.total;
        case "amount-low":
          return a.total - b.total;
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "shipped":
        return <Truck className="h-5 w-5 text-blue-600" />;
      case "processing":
        return <Package className="h-5 w-5 text-orange-600" />;
      case "cancelled":
        return <Clock className="h-5 w-5 text-red-600" />;
      default:
        return <Package className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "shipped":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "processing":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleRateOrder = (orderId: string, rating: number) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, rating } : order
      )
    );
  };

  return (
    <TooltipProvider>
      <div
        className={`container mx-auto px-4 py-12 min-h-screen transition-colors duration-500 ${darkMode ? "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100" : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800"}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h1 className="text-4xl font-playfair font-light mb-2">
              Order History
            </h1>
            <p className="text-gray-600 text-lg">
              Track and Manage your Orders with Elegance
            </p>
          </div>
          <Switch
            checked={darkMode}
            onCheckedChange={setDarkMode}
            className="data-[state=checked]:bg-rose-600"
          />
        </motion.div>

        <Card
          className={`${darkMode ? "bg-gray-800/90" : "bg-white/90"} backdrop-blur-lg border-none shadow-2xl rounded-3xl mb-12 transition-all duration-300 hover:shadow-rose-400/30`}
        >
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search by order number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-10 rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-purple-500" : "border-gray-300 focus:ring-rose-500"}`}
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger
                  className={`w-48 rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-purple-500" : "border-gray-300 focus:ring-rose-500"}`}
                >
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
                <SelectTrigger
                  className={`w-48 rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-purple-500" : "border-gray-300 focus:ring-rose-500"}`}
                >
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="amount-high">
                    Amount: High to Low
                  </SelectItem>
                  <SelectItem value="amount-low">
                    Amount: Low to High
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {filteredOrders.length > 0 ? (
          <div className="space-y-8">
            <AnimatePresence>
              {filteredOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className={`${darkMode ? "bg-gray-800/90" : "bg-white/90"} backdrop-blur-lg border-none shadow-2xl rounded-3xl transition-all duration-300 hover:shadow-rose-400/30 hover:scale-[1.02]`}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                            {getStatusIcon(order.status)}
                            Order {order.id}
                          </CardTitle>
                          <CardDescription
                            className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                          >
                            Placed on{" "}
                            {new Date(order.date).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={`${getStatusColor(order.status)} border rounded-xl px-3 py-1`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </Badge>
                          <p className="text-xl font-semibold mt-2">
                            ${order.total.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="space-y-4">
                          {order.items.map((item, index) => (
                            <div
                              key={index}
                              className={`flex items-center gap-4 p-4 ${darkMode ? "bg-gray-700/50" : "bg-gray-50/50"} rounded-2xl`}
                            >
                              <div className="w-20 h-20 bg-gray-200 rounded-xl flex-shrink-0 overflow-hidden">
                                <img
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src =
                                      "/placeholder.svg?height=80&width=80";
                                  }}
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-lg font-semibold">
                                  {item.name}
                                </h4>
                                <p
                                  className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                                >
                                  Quantity: {item.quantity}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <Separator />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                          <div>
                            <p className="font-semibold text-gray-700">
                              Tracking Number
                            </p>
                            <p
                              className={` ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                            >
                              {order.trackingNumber}
                            </p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-700">
                              Estimated Delivery
                            </p>
                            <p
                              className={` ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                            >
                              {order.estimatedDelivery}
                            </p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-700">Items</p>
                            <p
                              className={` ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                            >
                              {order.items.length} item(s)
                            </p>
                          </div>
                        </div>

                        {order.status === "delivered" && (
                          <div className="mt-6">
                            <Label className="text-lg font-semibold">
                              Rate this order
                            </Label>
                            <div className="flex gap-1 mt-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Button
                                  key={star}
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleRateOrder(order.id, star)
                                  }
                                  className={
                                    star <= order.rating
                                      ? "text-yellow-400"
                                      : "text-gray-400"
                                  }
                                >
                                  <Star
                                    className="h-5 w-5"
                                    fill={
                                      star <= order.rating
                                        ? "currentColor"
                                        : "none"
                                    }
                                  />
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-3 pt-4">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-transparent text-lg font-semibold rounded-xl border-rose-500 text-rose-600 hover:bg-rose-50/50"
                              >
                                View Details
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>View order details</TooltipContent>
                          </Tooltip>
                          {order.status === "shipped" && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-transparent text-lg font-semibold rounded-xl border-rose-500 text-rose-600 hover:bg-rose-50/50"
                                >
                                  Track Package
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                Track your package
                              </TooltipContent>
                            </Tooltip>
                          )}
                          {order.status === "delivered" && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-transparent text-lg font-semibold rounded-xl border-rose-500 text-rose-600 hover:bg-rose-50/50"
                                >
                                  Reorder
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Reorder items</TooltipContent>
                            </Tooltip>
                          )}
                          {order.status === "delivered" && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-transparent text-lg font-semibold rounded-xl border-rose-500 text-rose-600 hover:bg-rose-50/50"
                                >
                                  Write Review
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Write a review</TooltipContent>
                            </Tooltip>
                          )}
                          {(order.status === "processing" ||
                            order.status === "shipped") && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent text-lg font-semibold rounded-xl"
                                >
                                  Cancel Order
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Cancel this order</TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <Card
            className={`${darkMode ? "bg-gray-800/90" : "bg-white/90"} backdrop-blur-lg border-none shadow-2xl rounded-3xl text-center py-16 transition-all duration-300 hover:shadow-rose-400/30`}
          >
            <CardContent>
              <Package className="h-24 w-24 mx-auto text-rose-300 mb-6 animate-pulse" />
              <h3 className="text-2xl font-semibold mb-4">No Orders Found</h3>
              <p
                className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"} mb-6`}
              >
                {searchQuery || statusFilter !== "all"
                  ? "No orders match your current filters."
                  : "You haven't placed any orders yet."}
              </p>
              <div className="space-x-4">
                {(searchQuery || statusFilter !== "all") && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setStatusFilter("all");
                    }}
                    className="bg-transparent text-lg font-semibold rounded-xl border-rose-500 text-rose-600 hover:bg-rose-50/50"
                  >
                    Clear Filters
                  </Button>
                )}
                <Button
                  asChild
                  className="bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white text-lg font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Link href="/products">Start Shopping</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </TooltipProvider>
  );
}
