"use client";

import { useEffect, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Edit,
  Trash2,
  Package,
  Users,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

// Mock data
const mockProducts = [
  {
    id: 1,
    name: "Luxury Cashmere Sweater",
    category: "women",
    subcategory: "tops",
    price: 189.99,
    stock: 8,
    status: "active",
    sales: 45,
  },
  {
    id: 2,
    name: "Designer Leather Jacket",
    category: "men",
    subcategory: "outerwear",
    price: 299.99,
    stock: 12,
    status: "active",
    sales: 23,
  },
  {
    id: 3,
    name: "Silk Evening Dress",
    category: "women",
    subcategory: "dresses",
    price: 159.99,
    stock: 0,
    status: "out_of_stock",
    sales: 67,
  },
];

const mockOrders = [
  {
    id: "ORD-001",
    customer: "Sarah Johnson",
    date: "2024-01-15",
    status: "shipped",
    total: 189.99,
    items: 1,
  },
  {
    id: "ORD-002",
    customer: "Michael Chen",
    date: "2024-01-14",
    status: "processing",
    total: 459.98,
    items: 2,
  },
  {
    id: "ORD-003",
    customer: "Emma Wilson",
    date: "2024-01-13",
    status: "delivered",
    total: 299.99,
    items: 1,
  },
];

export default function AdminPage() {
  const { callAdminApi } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const result = await callAdminApi();
      if (!result.success) {
        console.warn("Access denied:", result.message);
        router.push("/"); // Redirect non-admin users to home or login
      } else {
        console.log("Admin message:", result.message);
      }
    }

    fetchData();
  }, [callAdminApi, router]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    subcategory: "",
    price: "",
    stock: "",
    description: "",
    images: "",
  });

  const { toast } = useToast();

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      toast({
        title: "Please fill in required fields",
        description: "Name, category, and price are required.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Product added successfully!",
      description: `${newProduct.name} has been added to inventory.`,
    });

    setNewProduct({
      name: "",
      category: "",
      subcategory: "",
      price: "",
      stock: "",
      description: "",
      images: "",
    });
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    toast({
      title: "Order status updated",
      description: `Order ${orderId} status changed to ${newStatus}.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-5xl font-playfair font-light mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 text-2xl">
          Manage your Inventory and Orders
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                <Package className="h-6 w-6 text-rose-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">250</p>
                <p className="text-lg text-gray-600">Total Products</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">500+</p>
                <p className="text-lg text-gray-600">Total Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">5K+</p>
                <p className="text-lg text-gray-600">Total Customers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">$89,234</p>
                <p className="text-lg text-gray-600">Monthly Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-xl">
          <TabsTrigger value="products" className="rounded-lg text-xl">
            Products
          </TabsTrigger>
          <TabsTrigger value="orders" className="rounded-lg text-xl">
            Orders
          </TabsTrigger>
          <TabsTrigger value="add-product" className="rounded-lg text-xl">
            Add Product
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Product Inventory</CardTitle>
              <CardDescription className="text-xl">
                Manage your product catalog and inventory levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xl">Product</TableHead>
                    <TableHead className="text-xl">Category</TableHead>
                    <TableHead className="text-xl">Price</TableHead>
                    <TableHead className="text-xl">Stock</TableHead>
                    <TableHead className="text-xl">Status</TableHead>
                    <TableHead className="text-xl">Sales</TableHead>
                    <TableHead className="text-xl">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium text-xl">
                        {product.name}
                      </TableCell>
                      <TableCell className="capitalize text-xl">
                        {product.category} / {product.subcategory}
                      </TableCell>
                      <TableCell className="text-xl">${product.price}</TableCell>
                      <TableCell className="text-xl">{product.stock}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            product.status === "active"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {product.status === "active"
                            ? "Active"
                            : "Out of Stock"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xl">{product.sales}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="lg">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="lg">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Order Management</CardTitle>
              <CardDescription className="text-xl">View and manage customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xl">Order ID</TableHead>
                    <TableHead className="text-xl">Customer</TableHead>
                    <TableHead className="text-xl">Date</TableHead>
                    <TableHead className="text-xl">Status</TableHead>
                    <TableHead className="text-xl">Items</TableHead>
                    <TableHead className="text-xl">Total</TableHead>
                    <TableHead className="text-xl">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="text-xl">{order.id}</TableCell>
                      <TableCell className="text-xl">{order.customer}</TableCell>
                      <TableCell className="text-xl">{order.date}</TableCell>
                      <TableCell>
                        <Select
                          defaultValue={order.status}
                          onValueChange={(value) =>
                            handleUpdateOrderStatus(order.id, value)
                          }
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="processing" className="text-xl">
                              Processing
                            </SelectItem>
                            <SelectItem value="shipped" className="text-xl">Shipped</SelectItem>
                            <SelectItem value="delivered" className="text-xl">Delivered</SelectItem>
                            <SelectItem value="cancelled" className="text-xl">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-xl">{order.items}</TableCell>
                      <TableCell className="text-xl">${order.total}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="lg" className="text-xl">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add-product" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Add New Product</CardTitle>
              <CardDescription className="text-xl">
                Add a new product to your inventory
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="productName" className="text-xl">Product Name *</Label>
                  <Input
                    id="productName"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <Label htmlFor="price" className="text-xl">Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <Label htmlFor="category" className="text-xl">Category *</Label>
                  <Select
                    value={newProduct.category}
                    onValueChange={(value) =>
                      setNewProduct({ ...newProduct, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="women" className="text-xl">Women</SelectItem>
                      <SelectItem value="men" className="text-xl">Men</SelectItem>
                      <SelectItem value="kids" className="text-xl">Kids</SelectItem>
                      <SelectItem value="accessories" className="text-xl">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subcategory" className="text-xl">Subcategory</Label>
                  <Input
                    id="subcategory"
                    value={newProduct.subcategory}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        subcategory: e.target.value,
                      })
                    }
                    placeholder="e.g., tops, dresses, shoes"
                  />
                </div>

                <div>
                  <Label htmlFor="stock" className="text-xl">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, stock: e.target.value })
                    }
                    placeholder="0"
                  />
                </div>

                <div>
                  <Label htmlFor="images" className="text-xl">Image URLs</Label>
                  <Input
                    id="images"
                    value={newProduct.images}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, images: e.target.value })
                    }
                    placeholder="Comma-separated image URLs"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-xl">Product Description</Label>
                <Textarea
                  id="description"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter detailed product description"
                  className="min-h-32"
                />
              </div>

              <Button
                onClick={handleAddProduct}
                className="bg-rose-600 hover:bg-rose-700 text-xl"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
