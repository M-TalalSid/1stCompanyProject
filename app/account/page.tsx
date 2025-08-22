"use client";

import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Package,
  Heart,
  Settings,
  MapPin,
  CreditCard,
  Camera,
  Search,
  Star,
  Trash2,
  Plus,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";

const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "Delivered",
    total: 89.97,
    items: [
      { name: "Premium Cotton T-Shirt", quantity: 2, price: 29.99 },
      { name: "Denim Jacket", quantity: 1, price: 89.99 },
    ],
    rating: 0,
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "Shipped",
    total: 59.99,
    items: [{ name: "Summer Dress", quantity: 1, price: 59.99 }],
    rating: 0,
  },
  {
    id: "ORD-003",
    date: "2024-01-05",
    status: "Processing",
    total: 129.99,
    items: [{ name: "Leather Boots", quantity: 1, price: 129.99 }],
    rating: 0,
  },
];

const mockWishlist = [
  {
    id: 1,
    name: "Silk Scarf",
    price: 49.99,
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Designer Watch",
    price: 199.99,
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Leather Wallet",
    price: 79.99,
    image: "/placeholder.svg",
  },
];

const mockAddresses = [
  {
    id: 1,
    name: "Home",
    address: "123 Main Street, New York, NY 10001",
    isDefault: true,
  },
  {
    id: 2,
    name: "Office",
    address: "456 Business Ave, New York, NY 10002",
    isDefault: false,
  },
];

const mockPayments = [
  {
    id: 1,
    type: "Visa",
    last4: "1234",
    expiry: "12/25",
  },
  {
    id: 2,
    type: "MasterCard",
    last4: "5678",
    expiry: "06/26",
  },
];

export default function AccountPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [orders, setOrders] = useState(mockOrders);
  const [wishlist, setWishlist] = useState(mockWishlist);
  const [addresses, setAddresses] = useState(mockAddresses);
  const [payments, setPayments] = useState(mockPayments);
  const [newAddress, setNewAddress] = useState({ name: "", address: "" });
  const [profilePic, setProfilePic] = useState<string | null>(null);

  if (!user) {
    return null;
  }

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRateOrder = (orderId: string, rating: number) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, rating } : order
      )
    );
  };

  const handleRemoveWishlist = (id: number) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  const handleAddAddress = () => {
    if (newAddress.name && newAddress.address) {
      setAddresses([
        ...addresses,
        { ...newAddress, id: addresses.length + 1, isDefault: false },
      ]);
      setNewAddress({ name: "", address: "" });
    }
  };

  const handleSetDefaultAddress = (id: number) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const handleRemovePayment = (id: number) => {
    setPayments(payments.filter((payment) => payment.id !== id));
  };

  const handleProfilePicChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setProfilePic(URL.createObjectURL(file));
    }
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
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg transition-transform hover:scale-105">
              <img
                src={profilePic || "/placeholder-avatar.svg"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Welcome back, {user.name}!</h1>
              <p className="text-lg mt-2">
                Curate your style with sophistication.
              </p>
            </div>
          </div>
          <Switch
            checked={darkMode}
            onCheckedChange={setDarkMode}
            className="data-[state=checked]:bg-rose-600"
          />
        </motion.div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-rose-500 to-purple-600 p-1.5 rounded-2xl shadow-lg overflow-hidden">
            {[
              { value: "profile", icon: User, label: "Profile" },
              { value: "orders", icon: Package, label: "Orders" },
              { value: "wishlist", icon: Heart, label: "Wishlist" },
              { value: "settings", icon: Settings, label: "Settings" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-3 text-lg font-semibold text-white py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:text-rose-600 data-[state=active]:shadow-2xl transition-all duration-300 hover:bg-rose-100/30 hover:scale-105"
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="profile" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card
                    className={`${darkMode ? "bg-gray-800/90" : "bg-white/90"} backdrop-blur-lg border-none shadow-2xl rounded-3xl transition-all duration-300 hover:shadow-rose-400/30`}
                  >
                    <CardHeader>
                      <CardTitle className="text-3xl font-bold">
                        Personal Information
                      </CardTitle>
                      <CardDescription
                        className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                      >
                        Refine your personal details
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center cursor-pointer transition-transform hover:scale-105">
                          <label htmlFor="profilePic">
                            {profilePic ? (
                              <img
                                src={profilePic}
                                alt="Profile"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Camera className="h-8 w-8 text-gray-500" />
                            )}
                            <Input
                              id="profilePic"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleProfilePicChange}
                            />
                          </label>
                        </div>
                        <div>
                          <Label
                            htmlFor="profilePic"
                            className="text-lg font-semibold cursor-pointer"
                          >
                            Update Profile Picture
                          </Label>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <Label
                            htmlFor="firstName"
                            className="text-lg font-semibold"
                          >
                            First Name
                          </Label>
                          <Input
                            id="firstName"
                            defaultValue="John"
                            className={`mt-2 rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-purple-500" : "border-gray-300 focus:ring-rose-500"}`}
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="lastName"
                            className="text-lg font-semibold"
                          >
                            Last Name
                          </Label>
                          <Input
                            id="lastName"
                            defaultValue="Doe"
                            className={`mt-2 rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-purple-500" : "border-gray-300 focus:ring-rose-500"}`}
                          />
                        </div>
                      </div>
                      <div>
                        <Label
                          htmlFor="email"
                          className="text-lg font-semibold"
                        >
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue={user.email}
                          className={`mt-2 rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-purple-500" : "border-gray-300 focus:ring-rose-500"}`}
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="phone"
                          className="text-lg font-semibold"
                        >
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          className={`mt-2 rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-purple-500" : "border-gray-300 focus:ring-rose-500"}`}
                        />
                      </div>
                      <div>
                        <Label htmlFor="bio" className="text-lg font-semibold">
                          Bio
                        </Label>
                        <Textarea
                          id="bio"
                          placeholder="Tell us about yourself..."
                          className={`mt-2 rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-purple-500" : "border-gray-300 focus:ring-rose-500"}`}
                        />
                      </div>
                      <Button className="bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white text-lg font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
                        Save Changes
                      </Button>
                    </CardContent>
                  </Card>

                  <Card
                    className={`${darkMode ? "bg-gray-800/90" : "bg-white/90"} backdrop-blur-lg border-none shadow-2xl rounded-3xl transition-all duration-300 hover:shadow-rose-400/30`}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-3xl font-bold">
                        <MapPin className="h-7 w-7 text-rose-600" />
                        Address Book
                      </CardTitle>
                      <CardDescription
                        className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                      >
                        Manage your shipping addresses
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {addresses.map((addr) => (
                        <div
                          key={addr.id}
                          className={`p-4 rounded-xl ${darkMode ? "bg-gray-700/50" : "bg-gray-50/50"} flex justify-between items-center`}
                        >
                          <div>
                            <h4 className="text-lg font-semibold">
                              {addr.name}
                            </h4>
                            <p
                              className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                            >
                              {addr.address}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {addr.isDefault ? (
                              <Badge className="bg-rose-600">Default</Badge>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSetDefaultAddress(addr.id)}
                                className="rounded-xl"
                              >
                                Set Default
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Separator />
                      <div className="space-y-4">
                        <Label className="text-lg font-semibold">
                          Add New Address
                        </Label>
                        <Input
                          placeholder="Address Name (e.g., Home)"
                          value={newAddress.name}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              name: e.target.value,
                            })
                          }
                          className={`rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-purple-500" : "border-gray-300 focus:ring-rose-500"}`}
                        />
                        <Textarea
                          placeholder="Full Address"
                          value={newAddress.address}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              address: e.target.value,
                            })
                          }
                          className={`rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-purple-500" : "border-gray-300 focus:ring-rose-500"}`}
                        />
                        <Button
                          onClick={handleAddAddress}
                          className="bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white text-lg font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          <Plus className="h-5 w-5 mr-2" /> Add Address
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="orders" className="space-y-8">
                <Card
                  className={`${darkMode ? "bg-gray-800/90" : "bg-white/90"} backdrop-blur-lg border-none shadow-2xl rounded-3xl transition-all duration-300 hover:shadow-rose-400/30`}
                >
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold">
                      Order History
                    </CardTitle>
                    <CardDescription
                      className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      Track and review your purchases
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative mb-6">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="Search orders..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`pl-10 rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-purple-500" : "border-gray-300 focus:ring-rose-500"}`}
                      />
                    </div>
                    <AnimatePresence>
                      {filteredOrders.map((order) => (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className={`border ${darkMode ? "border-gray-700" : "border-gray-200"} rounded-2xl p-6 ${darkMode ? "bg-gray-900/50" : "bg-white/50"} backdrop-blur-sm shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-semibold">
                                Order {order.id}
                              </h3>
                              <p
                                className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                              >
                                Placed on {order.date}
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge
                                variant={
                                  order.status === "Delivered"
                                    ? "default"
                                    : "secondary"
                                }
                                className={
                                  order.status === "Delivered"
                                    ? "bg-rose-600 text-white"
                                    : "bg-purple-600 text-white"
                                }
                              >
                                {order.status}
                              </Badge>
                              <p className="text-lg font-semibold mt-2">
                                ${order.total.toFixed(2)}
                              </p>
                            </div>
                          </div>
                          <Separator className="my-4" />
                          <div className="space-y-3">
                            {order.items.map((item, index) => (
                              <div
                                key={index}
                                className="flex justify-between text-lg"
                              >
                                <span>
                                  {item.name} × {item.quantity}
                                </span>
                                <span>
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>
                          {order.status === "Delivered" && (
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
                          <div className="flex gap-3 mt-6">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-lg font-semibold rounded-xl border-rose-500 text-rose-600 hover:bg-rose-50/50 transition-colors"
                                >
                                  View Details
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                View order details
                              </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-lg font-semibold rounded-xl border-rose-500 text-rose-600 hover:bg-rose-50/50 transition-colors"
                                >
                                  Track Order
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Track your order</TooltipContent>
                            </Tooltip>
                            {order.status === "Delivered" && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-lg font-semibold rounded-xl border-rose-500 text-rose-600 hover:bg-rose-50/50 transition-colors"
                                  >
                                    Reorder
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Reorder items</TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {filteredOrders.length === 0 && (
                      <p className="text-center text-lg">No orders found.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="wishlist" className="space-y-8">
                <Card
                  className={`${darkMode ? "bg-gray-800/90" : "bg-white/90"} backdrop-blur-lg border-none shadow-2xl rounded-3xl transition-all duration-300 hover:shadow-rose-400/30`}
                >
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold">
                      Your Wishlist
                    </CardTitle>
                    <CardDescription
                      className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      Curated items for your next purchase
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {wishlist.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <AnimatePresence>
                          {wishlist.map((item) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className={`border ${darkMode ? "border-gray-700" : "border-gray-200"} rounded-2xl p-4 flex flex-col gap-4 hover:scale-105 transition-transform duration-300 shadow-sm hover:shadow-md`}
                            >
                              <div className="w-full h-40 bg-gray-200 rounded-xl"></div>
                              <div>
                                <h4 className="text-xl font-semibold">
                                  {item.name}
                                </h4>
                                <p className="text-lg font-semibold">
                                  ${item.price.toFixed(2)}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Button className="flex-1 rounded-xl bg-rose-600 hover:bg-rose-700 text-white">
                                  Add to Cart
                                </Button>
                                <Button
                                  variant="ghost"
                                  onClick={() => handleRemoveWishlist(item.id)}
                                  className="text-red-500"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </Button>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Heart className="h-16 w-16 mx-auto text-rose-300 mb-6 animate-pulse" />
                        <h3 className="text-2xl font-semibold mb-3">
                          Your Wishlist Is Empty
                        </h3>
                        <p
                          className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"} mb-6`}
                        >
                          Discover and save items you love.
                        </p>
                        <Button className="bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white text-lg font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
                          Explore Products
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card
                    className={`${darkMode ? "bg-gray-800/90" : "bg-white/90"} backdrop-blur-lg border-none shadow-2xl rounded-3xl transition-all duration-300 hover:shadow-rose-400/30`}
                  >
                    <CardHeader>
                      <CardTitle className="text-3xl font-bold">
                        Account Security
                      </CardTitle>
                      <CardDescription
                        className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                      >
                        Enhance your account protection
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label
                          htmlFor="currentPassword"
                          className="text-lg font-semibold"
                        >
                          Current Password
                        </Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          className={`mt-2 rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-purple-500" : "border-gray-300 focus:ring-rose-500"}`}
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="newPassword"
                          className="text-lg font-semibold"
                        >
                          New Password
                        </Label>
                        <Input
                          id="newPassword"
                          type="password"
                          className={`mt-2 rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-purple-500" : "border-gray-300 focus:ring-rose-500"}`}
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="confirmPassword"
                          className="text-lg font-semibold"
                        >
                          Confirm New Password
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          className={`mt-2 rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-purple-500" : "border-gray-300 focus:ring-rose-500"}`}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="twoFactor"
                          className="text-lg font-semibold"
                        >
                          Enable Two-Factor Authentication
                        </Label>
                        <Switch
                          id="twoFactor"
                          className="data-[state=checked]:bg-rose-600"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="emailVerify"
                          className="text-lg font-semibold"
                        >
                          Email Verification
                        </Label>
                        <Switch
                          id="emailVerify"
                          className="data-[state=checked]:bg-rose-600"
                          defaultChecked
                        />
                      </div>
                      <Button className="bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white text-lg font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
                        Update Security
                      </Button>
                    </CardContent>
                  </Card>

                  <Card
                    className={`${darkMode ? "bg-gray-800/90" : "bg-white/90"} backdrop-blur-lg border-none shadow-2xl rounded-3xl transition-all duration-300 hover:shadow-rose-400/30`}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-3xl font-bold">
                        <CreditCard className="h-7 w-7 text-rose-600" />
                        Payment Methods
                      </CardTitle>
                      <CardDescription
                        className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                      >
                        Manage your payment options
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {payments.map((payment) => (
                        <div
                          key={payment.id}
                          className={`p-4 rounded-xl ${darkMode ? "bg-gray-700/50" : "bg-gray-50/50"} flex justify-between items-center`}
                        >
                          <div className="flex items-center gap-4">
                            <CreditCard className="h-6 w-6 text-rose-600" />
                            <div>
                              <h4 className="text-lg font-semibold">
                                {payment.type} **** {payment.last4}
                              </h4>
                              <p
                                className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                              >
                                Expires {payment.expiry}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            onClick={() => handleRemovePayment(payment.id)}
                            className="text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      {payments.length === 0 && (
                        <div className="text-center py-8">
                          <CreditCard className="h-12 w-12 mx-auto text-rose-300 mb-4" />
                          <p
                            className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                          >
                            No payment methods added.
                          </p>
                        </div>
                      )}
                      <Separator />
                      <div className="space-y-4">
                        <Label className="text-lg font-semibold">
                          Add New Payment Method
                        </Label>
                        <Select>
                          <SelectTrigger
                            className={`rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-purple-500" : "border-gray-300 focus:ring-rose-500"}`}
                          >
                            <SelectValue placeholder="Card Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="visa">Visa</SelectItem>
                            <SelectItem value="mastercard">
                              MasterCard
                            </SelectItem>
                            <SelectItem value="amex">
                              American Express
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          placeholder="Card Number"
                          className={`rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-purple-500" : "border-gray-300 focus:ring-rose-500"}`}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            placeholder="Expiry (MM/YY)"
                            className={`rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-purple-500" : "border-gray-300 focus:ring-rose-500"}`}
                          />
                          <Input
                            placeholder="CVV"
                            className={`rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-purple-500" : "border-gray-300 focus:ring-rose-500"}`}
                          />
                        </div>
                        <Button className="w-full bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white text-lg font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
                          <Plus className="h-5 w-5 mr-2" /> Add Payment
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card
                  className={`${darkMode ? "bg-gray-800/90" : "bg-white/90"} backdrop-blur-lg border-none shadow-2xl rounded-3xl transition-all duration-300 hover:shadow-rose-400/30`}
                >
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold">
                      Account Preferences
                    </CardTitle>
                    <CardDescription
                      className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      Customize your experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-semibold">
                          Email Notifications
                        </h3>
                        <p
                          className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          Receive order updates and promotions
                        </p>
                      </div>
                      <Switch
                        className="data-[state=checked]:bg-rose-600"
                        defaultChecked
                      />
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-semibold">SMS Alerts</h3>
                        <p
                          className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          Get instant updates on your phone
                        </p>
                      </div>
                      <Switch className="data-[state=checked]:bg-rose-600" />
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-semibold">Dark Mode</h3>
                        <p
                          className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          Toggle dark theme
                        </p>
                      </div>
                      <Switch
                        checked={darkMode}
                        onCheckedChange={setDarkMode}
                        className="data-[state=checked]:bg-rose-600"
                      />
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-semibold text-red-600">
                          Delete Account
                        </h3>
                        <p
                          className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          Permanently delete your account
                        </p>
                      </div>
                      <Button variant="destructive" className="rounded-xl">
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </div>
    </TooltipProvider>
  );
}
