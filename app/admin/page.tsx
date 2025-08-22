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
  Search,
  BarChart2,
  Eye,
  Mail,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { AnimatePresence, motion } from "framer-motion";

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
    featured: true,
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
    featured: false,
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
    featured: true,
  },
  {
    id: 4,
    name: "Premium Wool Coat",
    category: "men",
    subcategory: "outerwear",
    price: 249.99,
    stock: 5,
    status: "active",
    sales: 34,
    featured: false,
  },
  {
    id: 5,
    name: "Elegant Silk Blouse",
    category: "women",
    subcategory: "tops",
    price: 129.99,
    stock: 15,
    status: "active",
    sales: 56,
    featured: true,
  },
];

const mockOrders = [
  {
    id: "ORD-001",
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    date: "2024-01-15",
    status: "shipped",
    total: 189.99,
    items: 1,
  },
  {
    id: "ORD-002",
    customer: "Michael Chen",
    email: "michael@example.com",
    date: "2024-01-14",
    status: "processing",
    total: 459.98,
    items: 2,
  },
  {
    id: "ORD-003",
    customer: "Emma Wilson",
    email: "emma@example.com",
    date: "2024-01-13",
    status: "delivered",
    total: 299.99,
    items: 1,
  },
  {
    id: "ORD-004",
    customer: "David Lee",
    email: "david@example.com",
    date: "2024-01-12",
    status: "cancelled",
    total: 249.99,
    items: 1,
  },
  {
    id: "ORD-005",
    customer: "Olivia Brown",
    email: "olivia@example.com",
    date: "2024-01-11",
    status: "shipped",
    total: 129.99,
    items: 1,
  },
];

const mockUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    orders: 5,
    totalSpent: 789.45,
    status: "active",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael@example.com",
    orders: 3,
    totalSpent: 459.98,
    status: "active",
  },
  {
    id: 3,
    name: "Emma Wilson",
    email: "emma@example.com",
    orders: 7,
    totalSpent: 1299.93,
    status: "vip",
  },
  {
    id: 4,
    name: "David Lee",
    email: "david@example.com",
    orders: 2,
    totalSpent: 349.98,
    status: "inactive",
  },
  {
    id: 5,
    name: "Olivia Brown",
    email: "olivia@example.com",
    orders: 4,
    totalSpent: 589.96,
    status: "active",
  },
];

export default function AdminPage() {
  const { callAdminApi } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    async function fetchData() {
      const result = await callAdminApi();
      if (!result.success) {
        console.warn("Access denied:", result.message);
        router.push("/");
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
    featured: false,
  });
  const [productSearch, setProductSearch] = useState("");
  const [orderSearch, setOrderSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState(mockProducts);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      product.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredOrders = mockOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.customer.toLowerCase().includes(orderSearch.toLowerCase())
  );

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      toast({
        title: "Please fill in required fields",
        description: "Name, category, and price are required.",
        variant: "destructive",
      });
      return;
    }

    setProducts([
      ...products,
      {
        ...newProduct,
        id: products.length + 1,
        sales: 0,
        status: parseInt(newProduct.stock) > 0 ? "active" : "out_of_stock",
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
      },
    ]);
    toast({
      title: "Product added successfully!",
      description: `${newProduct.name} has been added to inventory.`,
      className: "bg-rose-600 text-white",
    });

    setNewProduct({
      name: "",
      category: "",
      subcategory: "",
      price: "",
      stock: "",
      description: "",
      images: "",
      featured: false,
    });
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    toast({
      title: "Order status updated",
      description: `Order ${orderId} status changed to ${newStatus}.`,
      className: "bg-rose-600 text-white",
    });
  };

  const handleToggleFeatured = (id: number) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
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
            <h1 className="text-5xl font-bold mb-3">Admin Dashboard</h1>
            <p className="text-lg">Orchestrate your empire with elegance.</p>
          </div>
          <Switch
            checked={darkMode}
            onCheckedChange={setDarkMode}
            className="data-[state=checked]:bg-rose-600"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {[
            {
              icon: Package,
              value: "250",
              label: "Total Products",
              color: "rose",
            },
            {
              icon: ShoppingCart,
              value: "500+",
              label: "Total Orders",
              color: "blue",
            },
            {
              icon: Users,
              value: "5K+",
              label: "Total Customers",
              color: "emerald",
            },
            {
              icon: TrendingUp,
              value: "$89,234",
              label: "Monthly Revenue",
              color: "amber",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`${darkMode ? "bg-gray-800/90" : "bg-white/90"} backdrop-blur-lg border-none shadow-2xl rounded-3xl transition-all duration-300 hover:shadow-rose-400/30 hover:scale-105`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 bg-${stat.color}-100 rounded-full flex items-center justify-center`}
                    >
                      <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p
                        className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                      >
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card
          className={`${darkMode ? "bg-gray-800/90" : "bg-white/90"} backdrop-blur-lg border-none shadow-2xl rounded-3xl mb-12 transition-all duration-300 hover:shadow-rose-400/30`}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-3xl font-bold">
              <BarChart2 className="h-7 w-7 text-rose-600" />
              Analytics Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-gradient-to-br from-rose-100 to-purple-100 rounded-2xl shadow-inner">
              <p className="text-lg font-semibold text-gray-600">
                Advanced Analytics Dashboard Placeholder (Integrate with
                Chart.js or Recharts)
              </p>
            </div>
          </CardContent>
        </Card>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-rose-500 to-purple-600 p-1.5 rounded-2xl shadow-lg overflow-hidden">
            {[
              { value: "products", label: "Products" },
              { value: "orders", label: "Orders" },
              { value: "users", label: "Users" },
              { value: "add-product", label: "Add Product" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-xl text-lg font-semibold text-white py-3 data-[state=active]:bg-white data-[state=active]:text-rose-600 data-[state=active]:shadow-2xl transition-all duration-300 hover:bg-rose-100/30 hover:scale-105"
              >
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
              <TabsContent value="products" className="space-y-8">
                <Card
                  className={`${darkMode ? "bg-gray-800/90" : "bg-white/90"} backdrop-blur-lg border-none shadow-2xl rounded-3xl transition-all duration-300 hover:shadow-rose-400/30`}
                >
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold">
                      Product Inventory
                    </CardTitle>
                    <CardDescription
                      className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      Curate your product collection
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative mb-6">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="Search products..."
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        className={`pl-10 rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-purple-500" : "border-gray-300 focus:ring-rose-500"}`}
                      />
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="text-lg font-semibold">
                            Product
                          </TableHead>
                          <TableHead className="text-lg font-semibold">
                            Category
                          </TableHead>
                          <TableHead className="text-lg font-semibold">
                            Price
                          </TableHead>
                          <TableHead className="text-lg font-semibold">
                            Stock
                          </TableHead>
                          <TableHead className="text-lg font-semibold">
                            Status
                          </TableHead>
                          <TableHead className="text-lg font-semibold">
                            Sales
                          </TableHead>
                          <TableHead className="text-lg font-semibold">
                            Featured
                          </TableHead>
                          <TableHead className="text-lg font-semibold">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <AnimatePresence>
                          {filteredProducts.map((product) => (
                            <motion.tr
                              key={product.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className={`${darkMode ? "hover:bg-gray-700/50" : "hover:bg-rose-50/50"} transition-colors`}
                            >
                              <TableCell className="font-medium text-lg">
                                {product.name}
                              </TableCell>
                              <TableCell className="capitalize text-lg">
                                {product.category} / {product.subcategory}
                              </TableCell>
                              <TableCell className="text-lg">
                                ${product.price}
                              </TableCell>
                              <TableCell className="text-lg">
                                {product.stock}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    product.status === "active"
                                      ? "default"
                                      : "destructive"
                                  }
                                  className={
                                    product.status === "active"
                                      ? "bg-rose-600 text-white"
                                      : "bg-red-600 text-white"
                                  }
                                >
                                  {product.status === "active"
                                    ? "Active"
                                    : "Out of Stock"}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-lg">
                                {product.sales}
                              </TableCell>
                              <TableCell>
                                <Switch
                                  checked={product.featured}
                                  onCheckedChange={() =>
                                    handleToggleFeatured(product.id)
                                  }
                                  className="data-[state=checked]:bg-rose-600"
                                />
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="lg"
                                        className="border-rose-500 text-rose-600 hover:bg-rose-50/50"
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      Edit product
                                    </TooltipContent>
                                  </Tooltip>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="lg"
                                        className="border-red-500 text-red-600 hover:bg-red-50/50"
                                        onClick={() =>
                                          handleDeleteProduct(product.id)
                                        }
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      Delete product
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                              </TableCell>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      </TableBody>
                    </Table>
                    {filteredProducts.length === 0 && (
                      <p className="text-center text-lg mt-4">
                        No products found.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="space-y-8">
                <Card
                  className={`${darkMode ? "bg-gray-800/90" : "bg-white/90"} backdrop-blur-lg border-none shadow-2xl rounded-3xl transition-all duration-300 hover:shadow-rose-400/30`}
                >
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold">
                      Order Management
                    </CardTitle>
                    <CardDescription
                      className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      Oversee customer orders
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative mb-6">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="Search orders..."
                        value={orderSearch}
                        onChange={(e) => setOrderSearch(e.target.value)}
                        className={`pl-10 rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-purple-500" : "border-gray-300 focus:ring-rose-500"}`}
                      />
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="text-lg font-semibold">
                            Order ID
                          </TableHead>
                          <TableHead className="text-lg font-semibold">
                            Customer
                          </TableHead>
                          <TableHead className="text-lg font-semibold">
                            Date
                          </TableHead>
                          <TableHead className="text-lg font-semibold">
                            Status
                          </TableHead>
                          <TableHead className="text-lg font-semibold">
                            Items
                          </TableHead>
                          <TableHead className="text-lg font-semibold">
                            Total
                          </TableHead>
                          <TableHead className="text-lg font-semibold">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <AnimatePresence>
                          {filteredOrders.map((order) => (
                            <motion.tr
                              key={order.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className={`${darkMode ? "hover:bg-gray-700/50" : "hover:bg-rose-50/50"} transition-colors`}
                            >
                              <TableCell className="text-lg">
                                {order.id}
                              </TableCell>
                              <TableCell className="text-lg">
                                {order.customer}
                              </TableCell>
                              <TableCell className="text-lg">
                                {order.date}
                              </TableCell>
                              <TableCell>
                                <Select
                                  defaultValue={order.status}
                                  onValueChange={(value) =>
                                    handleUpdateOrderStatus(order.id, value)
                                  }
                                >
                                  <SelectTrigger
                                    className={`w-32 rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-purple-500" : "border-gray-300 focus:ring-rose-500"}`}
                                  >
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem
                                      value="processing"
                                      className="text-lg"
                                    >
                                      Processing
                                    </SelectItem>
                                    <SelectItem
                                      value="shipped"
                                      className="text-lg"
                                    >
                                      Shipped
                                    </SelectItem>
                                    <SelectItem
                                      value="delivered"
                                      className="text-lg"
                                    >
                                      Delivered
                                    </SelectItem>
                                    <SelectItem
                                      value="cancelled"
                                      className="text-lg"
                                    >
                                      Cancelled
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell className="text-lg">
                                {order.items}
                              </TableCell>
                              <TableCell className="text-lg">
                                ${order.total}
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-xl border-rose-500 text-rose-600 hover:bg-rose-50/50"
                                      >
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      View details
                                    </TooltipContent>
                                  </Tooltip>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-xl border-purple-500 text-purple-600 hover:bg-purple-50/50"
                                      >
                                        <Mail className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      Email customer
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                              </TableCell>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      </TableBody>
                    </Table>
                    {filteredOrders.length === 0 && (
                      <p className="text-center text-lg mt-4">
                        No orders found.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="users" className="space-y-8">
                <Card
                  className={`${darkMode ? "bg-gray-800/90" : "bg-white/90"} backdrop-blur-lg border-none shadow-2xl rounded-3xl transition-all duration-300 hover:shadow-rose-400/30`}
                >
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold">
                      User Management
                    </CardTitle>
                    <CardDescription
                      className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      Oversee your customer base
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative mb-6">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="Search users..."
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                        className={`pl-10 rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-purple-500" : "border-gray-300 focus:ring-rose-500"}`}
                      />
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="text-lg font-semibold">
                            Name
                          </TableHead>
                          <TableHead className="text-lg font-semibold">
                            Email
                          </TableHead>
                          <TableHead className="text-lg font-semibold">
                            Orders
                          </TableHead>
                          <TableHead className="text-lg font-semibold">
                            Total Spent
                          </TableHead>
                          <TableHead className="text-lg font-semibold">
                            Status
                          </TableHead>
                          <TableHead className="text-lg font-semibold">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <AnimatePresence>
                          {filteredUsers.map((user) => (
                            <motion.tr
                              key={user.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className={`${darkMode ? "hover:bg-gray-700/50" : "hover:bg-rose-50/50"} transition-colors`}
                            >
                              <TableCell className="font-medium text-lg">
                                {user.name}
                              </TableCell>
                              <TableCell className="text-lg">
                                {user.email}
                              </TableCell>
                              <TableCell className="text-lg">
                                {user.orders}
                              </TableCell>
                              <TableCell className="text-lg">
                                ${user.totalSpent.toFixed(2)}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    user.status === "vip"
                                      ? "bg-purple-600"
                                      : user.status === "active"
                                        ? "bg-rose-600"
                                        : "bg-gray-600"
                                  }
                                >
                                  {user.status.charAt(0).toUpperCase() +
                                    user.status.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-xl border-rose-500 text-rose-600 hover:bg-rose-50/50"
                                      >
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      View profile
                                    </TooltipContent>
                                  </Tooltip>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-xl border-purple-500 text-purple-600 hover:bg-purple-50/50"
                                      >
                                        <Mail className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      Contact user
                                    </TooltipContent>
                                  </Tooltip>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-xl border-red-500 text-red-600 hover:bg-red-50/50"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Delete user</TooltipContent>
                                  </Tooltip>
                                </div>
                              </TableCell>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      </TableBody>
                    </Table>
                    {filteredUsers.length === 0 && (
                      <p className="text-center text-lg mt-4">
                        No users found.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="add-product" className="space-y-8">
                <Card
                  className={`${darkMode ? "bg-gray-800/90" : "bg-white/90"} backdrop-blur-lg border-none shadow-2xl rounded-3xl transition-all duration-300 hover:shadow-rose-400/30`}
                >
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold">
                      Add New Product
                    </CardTitle>
                    <CardDescription
                      className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      Enrich your inventory
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label
                          htmlFor="productName"
                          className="text-lg font-semibold"
                        >
                          Product Name *
                        </Label>
                        <Input
                          id="productName"
                          value={newProduct.name}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              name: e.target.value,
                            })
                          }
                          placeholder="Enter product name"
                          className={`mt-2 rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-purple-500" : "border-gray-300 focus:ring-rose-500"}`}
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="price"
                          className="text-lg font-semibold"
                        >
                          Price *
                        </Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={newProduct.price}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              price: e.target.value,
                            })
                          }
                          placeholder="0.00"
                          className={`mt-2 rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-purple-500" : "border-gray-300 focus:ring-rose-500"}`}
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="category"
                          className="text-lg font-semibold"
                        >
                          Category *
                        </Label>
                        <Select
                          value={newProduct.category}
                          onValueChange={(value) =>
                            setNewProduct({ ...newProduct, category: value })
                          }
                        >
                          <SelectTrigger
                            className={`mt-2 rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-purple-500" : "border-gray-300 focus:ring-rose-500"}`}
                          >
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="women" className="text-lg">
                              Women
                            </SelectItem>
                            <SelectItem value="men" className="text-lg">
                              Men
                            </SelectItem>
                            <SelectItem value="kids" className="text-lg">
                              Kids
                            </SelectItem>
                            <SelectItem value="accessories" className="text-lg">
                              Accessories
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label
                          htmlFor="subcategory"
                          className="text-lg font-semibold"
                        >
                          Subcategory
                        </Label>
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
                          className={`mt-2 rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-purple-500" : "border-gray-300 focus:ring-rose-500"}`}
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="stock"
                          className="text-lg font-semibold"
                        >
                          Stock Quantity
                        </Label>
                        <Input
                          id="stock"
                          type="number"
                          value={newProduct.stock}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              stock: e.target.value,
                            })
                          }
                          placeholder="0"
                          className={`mt-2 rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-purple-500" : "border-gray-300 focus:ring-rose-500"}`}
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="images"
                          className="text-lg font-semibold"
                        >
                          Image URLs
                        </Label>
                        <Input
                          id="images"
                          value={newProduct.images}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              images: e.target.value,
                            })
                          }
                          placeholder="Comma-separated image URLs"
                          className={`mt-2 rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-purple-500" : "border-gray-300 focus:ring-rose-500"}`}
                        />
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="description"
                        className="text-lg font-semibold"
                      >
                        Product Description
                      </Label>
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
                        className={`mt-2 min-h-32 rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-purple-500" : "border-gray-300 focus:ring-rose-500"}`}
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <Label
                        htmlFor="featured"
                        className="text-lg font-semibold"
                      >
                        Mark as Featured
                      </Label>
                      <Switch
                        id="featured"
                        checked={newProduct.featured}
                        onCheckedChange={(checked) =>
                          setNewProduct({ ...newProduct, featured: checked })
                        }
                        className="data-[state=checked]:bg-rose-600"
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <Label htmlFor="tags" className="text-lg font-semibold">
                        Tags
                      </Label>
                      <Input
                        id="tags"
                        placeholder="Comma-separated tags, e.g., luxury, summer, sale"
                        className={`rounded-xl ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-purple-500" : "border-gray-300 focus:ring-rose-500"}`}
                      />
                    </div>

                    <Button
                      onClick={handleAddProduct}
                      className="bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white text-lg font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Add Product
                    </Button>
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
