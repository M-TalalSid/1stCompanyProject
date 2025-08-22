"use client";

import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Package,
  Heart,
  Settings,
  MapPin,
  CreditCard,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

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
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "Shipped",
    total: 59.99,
    items: [{ name: "Summer Dress", quantity: 1, price: 59.99 }],
  },
];

export default function AccountPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <User className="h-8 w-8 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2 text-2xl">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2 text-2xl">
            <Package className="h-4 w-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="flex items-center gap-2 text-2xl">
            <Heart className="h-4 w-4" />
            Wishlist
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2 text-2xl">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Personal Information</CardTitle>
                <CardDescription className="text-2xl">Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <Label htmlFor="firstName" className="text-2xl">First Name</Label>
                    <Input id="firstName" defaultValue="John"/>
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-2xl">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-2xl">Email</Label>
                  <Input id="email" type="email" defaultValue={user.email} />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-2xl">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <Button className="text-xl">Save Changes</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <MapPin className="h-6 w-6" />
                  Shipping Address
                </CardTitle>
                <CardDescription className="text-xl">Your default shipping address</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address" className="text-xl">Address</Label>
                  <Input id="address" placeholder="123 Main Street" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-xl">City</Label>
                    <Input id="city" placeholder="New York" />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-xl">State</Label>
                    <Input id="state" placeholder="NY" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="zip" className="text-xl">ZIP Code</Label>
                    <Input id="zip" placeholder="10001" />
                  </div>
                  <div>
                    <Label htmlFor="country" className="text-xl">Country</Label>
                    <Input id="country" defaultValue="United States" />
                  </div>
                </div>
                <Button className="text-xl">Update Address</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Order History</CardTitle>
              <CardDescription className="text-xl font-semibold">
                View and Track Your Recent Orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-semibold">Order {order.id}</h3>
                        <p className="text-lg font-semibold text-gray-600">
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
                        >
                          {order.status}
                        </Badge>
                        <p className="text-lg font-semibold mt-1">
                          ${order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <Separator className="my-3" />
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-lg font-semibold"
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
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="text-lg font-semibold">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="text-lg font-semibold">
                        Track Order
                      </Button>
                      {order.status === "Delivered" && (
                        <Button variant="outline" size="sm" className="text-lg font-semibold">
                          Reorder
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wishlist" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Your Wishlist</CardTitle>
              <CardDescription className="text-2xl font-semibold">Items you've saved for later</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Heart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-2xl font-semibold mb-2">
                  Your Wishlist Is Empty
                </h3>
                <p className="text-gray-600 mb-4 text-lg font-semibold">
                  Save Items You Love To Buy Them Later
                </p>
                <Button className="text-xl">Continue Shopping</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Account Security</CardTitle>
                <CardDescription className="text-2xl font-semibold">
                  Manage Your Password and Security Settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword" className="text-xl font-semibold">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div>
                  <Label htmlFor="newPassword" className="text-xl font-semibold">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className="text-xl font-semibold">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button className="text-xl font-semibold">Update Password</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-3xl">
                  <CreditCard className="h-6 w-6" />
                  Payment Methods
                </CardTitle>
                <CardDescription className="text-2xl font-semibold">
                  Manage Your Saved Payment Methods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <CreditCard className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    No Payment Methods
                  </h3>
                  <p className="text-gray-600 mb-4 text-lg font-semibold">
                    Add a Payment Method for Faster Checkout
                  </p>
                  <Button className="text-xl font-semibold">Add Payment Method</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-semibold">Account Actions</CardTitle>
              <CardDescription className="text-2xl font-semibold">Manage Your Account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">Email Notifications</h3>
                  <p className="text-xl text-gray-600">
                    Receive Updates About your Orders and Promotions
                  </p>
                </div>
                <Button variant="outline" className="text-xl font-semibold">Manage</Button>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Download Your Data</h3>
                  <p className="text-xl text-gray-600">
                    Get a Copy of your Account Data
                  </p>
                </div>
                <Button variant="outline" className="text-xl font-semibold">Download</Button>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-red-600">Sign Out</h3>
                  <p className="text-xl text-gray-600">
                    Sign Out of your Account
                  </p>
                </div>
                <Button variant="destructive" className="text-xl font-semibold" onClick={logout}>
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
