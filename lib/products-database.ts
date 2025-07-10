import { ReactNode } from "react"

export interface Product {
  reviews: ReactNode
  badge: ReactNode
  id: number
  name: string
  price: number
  originalPrice?: number
  category: string
  subcategory: string
  images: string[]
  colors: Array<{
    name: string
    value: string
    hex: string
  }>
  sizes: string[]
  description: string
  features: string[]
  specifications: Record<string, string>
  rating: number
  reviewCount: number
  inStock: boolean
  stockCount: number
  tags: string[]
  isNew?: boolean
  isSale?: boolean
}

const products: Product[] = [
  // Women's Dresses
  {
    id: 101,
    name: "Elegant Evening Dress",
    price: 299.99,
    originalPrice: 399.99,
    category: "women",
    subcategory: "dresses",
    images: [
      "/placeholder.svg?height=600&width=400",
      "/placeholder.svg?height=600&width=400",
      "/placeholder.svg?height=600&width=400",
    ],
    colors: [
      { name: "Black", value: "black", hex: "#000000" },
      { name: "Navy", value: "navy", hex: "#1e3a8a" },
      { name: "Burgundy", value: "burgundy", hex: "#7c2d12" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "A stunning evening dress perfect for special occasions. Made from premium silk with intricate beadwork details.",
    features: ["Premium silk fabric", "Hand-sewn beadwork", "Elegant silhouette", "Hidden back zipper", "Fully lined"],
    specifications: {
      Material: "100% Silk",
      Care: "Dry clean only",
      Origin: "Made in Italy",
      Fit: "Regular fit",
    },
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    stockCount: 15,
    tags: ["evening", "formal", "silk", "beaded"],
    isSale: true,
    reviews: undefined,
    badge: undefined
  },
  {
    id: 102,
    name: "Casual Summer Dress",
    price: 89.99,
    category: "women",
    subcategory: "dresses",
    images: ["/placeholder.svg?height=600&width=400", "/placeholder.svg?height=600&width=400"],
    colors: [
      { name: "White", value: "white", hex: "#ffffff" },
      { name: "Light Blue", value: "light-blue", hex: "#bfdbfe" },
      { name: "Pink", value: "pink", hex: "#fce7f3" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "A comfortable and stylish summer dress perfect for casual outings and warm weather.",
    features: ["Breathable cotton blend", "Adjustable straps", "Side pockets", "Machine washable"],
    specifications: {
      Material: "60% Cotton, 40% Linen",
      Care: "Machine wash cold",
      Origin: "Made in Portugal",
      Fit: "Relaxed fit",
    },
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    stockCount: 25,
    tags: ["casual", "summer", "cotton", "comfortable"],
    isNew: true,
    reviews: undefined,
    badge: undefined
  },
  {
    id: 103,
    name: "Professional Midi Dress",
    price: 159.99,
    category: "women",
    subcategory: "dresses",
    images: ["/placeholder.svg?height=600&width=400", "/placeholder.svg?height=600&width=400"],
    colors: [
      { name: "Charcoal", value: "charcoal", hex: "#374151" },
      { name: "Navy", value: "navy", hex: "#1e3a8a" },
      { name: "Burgundy", value: "burgundy", hex: "#7c2d12" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "A sophisticated midi dress designed for the modern professional woman.",
    features: ["Wrinkle-resistant fabric", "Professional silhouette", "Hidden side zipper", "Lined bodice"],
    specifications: {
      Material: "68% Polyester, 30% Viscose, 2% Elastane",
      Care: "Machine wash cold, hang dry",
      Origin: "Made in Turkey",
      Fit: "Tailored fit",
    },
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    stockCount: 18,
    tags: ["professional", "work", "midi", "tailored"],
    reviews: undefined,
    badge: undefined
  },

  // Women's Tops
  {
    id: 201,
    name: "Silk Blouse",
    price: 129.99,
    category: "women",
    subcategory: "tops",
    images: ["/placeholder.svg?height=600&width=400", "/placeholder.svg?height=600&width=400"],
    colors: [
      { name: "Cream", value: "cream", hex: "#fef3c7" },
      { name: "Blush", value: "blush", hex: "#fce7f3" },
      { name: "Sage", value: "sage", hex: "#d1fae5" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Luxurious silk blouse with a timeless design, perfect for both professional and casual settings.",
    features: ["100% mulberry silk", "Mother-of-pearl buttons", "French seams", "Relaxed fit"],
    specifications: {
      Material: "100% Silk",
      Care: "Dry clean recommended",
      Origin: "Made in France",
      Fit: "Relaxed fit",
    },
    rating: 4.9,
    reviewCount: 203,
    inStock: true,
    stockCount: 12,
    tags: ["silk", "blouse", "luxury", "versatile"],
    reviews: undefined,
    badge: undefined
  },
  {
    id: 202,
    name: "Cashmere Sweater",
    price: 189.99,
    originalPrice: 249.99,
    category: "women",
    subcategory: "tops",
    images: [
      "/placeholder.svg?height=600&width=400",
      "/placeholder.svg?height=600&width=400",
      "/placeholder.svg?height=600&width=400",
    ],
    colors: [
      { name: "Cream", value: "cream", hex: "#fef3c7" },
      { name: "Navy", value: "navy", hex: "#1e3a8a" },
      { name: "Charcoal", value: "charcoal", hex: "#374151" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Experience ultimate luxury with our premium cashmere sweater. Crafted from the finest Mongolian cashmere, this piece offers unparalleled softness and warmth. The timeless design makes it perfect for both casual and formal occasions.",
    features: ["100% Mongolian cashmere", "Ribbed cuffs and hem", "Classic crew neck", "Lightweight yet warm"],
    specifications: {
      Material: "100% Cashmere",
      Care: "Hand wash cold, lay flat to dry",
      Origin: "Made in Scotland",
      Fit: "Regular fit",
    },
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    stockCount: 8,
    tags: ["cashmere", "luxury", "sweater", "warm"],
    isSale: true,
    reviews: undefined,
    badge: undefined
  },

  // Men's Shirts
  {
    id: 301,
    name: "Classic White Dress Shirt",
    price: 79.99,
    category: "men",
    subcategory: "shirts",
    images: ["/placeholder.svg?height=600&width=400", "/placeholder.svg?height=600&width=400"],
    colors: [
      { name: "White", value: "white", hex: "#ffffff" },
      { name: "Light Blue", value: "light-blue", hex: "#bfdbfe" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "A timeless classic white dress shirt, perfect for business and formal occasions.",
    features: ["100% cotton poplin", "Spread collar", "French placket", "Adjustable cuffs"],
    specifications: {
      Material: "100% Cotton",
      Care: "Machine wash warm, tumble dry low",
      Origin: "Made in Italy",
      Fit: "Slim fit",
    },
    rating: 4.5,
    reviewCount: 78,
    inStock: true,
    stockCount: 30,
    tags: ["dress shirt", "formal", "cotton", "classic"],
    reviews: undefined,
    badge: undefined
  },
  {
    id: 302,
    name: "Casual Linen Shirt",
    price: 69.99,
    category: "men",
    subcategory: "shirts",
    images: ["/placeholder.svg?height=600&width=400", "/placeholder.svg?height=600&width=400"],
    colors: [
      { name: "Natural", value: "natural", hex: "#f5f5dc" },
      { name: "Light Blue", value: "light-blue", hex: "#bfdbfe" },
      { name: "Sage", value: "sage", hex: "#d1fae5" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Relaxed linen shirt perfect for casual summer days and vacation wear.",
    features: ["100% European linen", "Relaxed fit", "Button-down collar", "Chest pocket"],
    specifications: {
      Material: "100% Linen",
      Care: "Machine wash cold, hang dry",
      Origin: "Made in Portugal",
      Fit: "Relaxed fit",
    },
    rating: 4.3,
    reviewCount: 92,
    inStock: true,
    stockCount: 22,
    tags: ["linen", "casual", "summer", "relaxed"],
    reviews: undefined,
    badge: undefined
  },

  // Kids
  {
    id: 501,
    name: "Girls' Floral Dress",
    price: 39.99,
    category: "kids",
    subcategory: "girls",
    images: ["/placeholder.svg?height=600&width=400", "/placeholder.svg?height=600&width=400"],
    colors: [
      { name: "Pink", value: "pink", hex: "#fce7f3" },
      { name: "Yellow", value: "yellow", hex: "#fef3c7" },
    ],
    sizes: ["2T", "3T", "4T", "5T", "6", "7", "8"],
    description: "Adorable floral dress perfect for special occasions and everyday wear.",
    features: ["Soft cotton blend", "Twirl-worthy skirt", "Easy care fabric", "Comfortable fit"],
    specifications: {
      Material: "95% Cotton, 5% Elastane",
      Care: "Machine wash cold",
      Origin: "Made in India",
      Fit: "Regular fit",
    },
    rating: 4.7,
    reviewCount: 45,
    inStock: true,
    stockCount: 20,
    tags: ["girls", "dress", "floral", "cotton"],
    reviews: undefined,
    badge: undefined
  },
  {
    id: 511,
    name: "Boys' Polo Shirt",
    price: 24.99,
    category: "kids",
    subcategory: "boys",
    images: ["/placeholder.svg?height=600&width=400", "/placeholder.svg?height=600&width=400"],
    colors: [
      { name: "Navy", value: "navy", hex: "#1e3a8a" },
      { name: "White", value: "white", hex: "#ffffff" },
      { name: "Red", value: "red", hex: "#dc2626" },
    ],
    sizes: ["2T", "3T", "4T", "5T", "6", "7", "8"],
    description: "Classic polo shirt for boys, perfect for school and play.",
    features: ["Pique cotton", "Three-button placket", "Ribbed collar and cuffs", "Machine washable"],
    specifications: {
      Material: "100% Cotton",
      Care: "Machine wash warm",
      Origin: "Made in Bangladesh",
      Fit: "Regular fit",
    },
    rating: 4.4,
    reviewCount: 67,
    inStock: true,
    stockCount: 35,
    tags: ["boys", "polo", "school", "cotton"],
    reviews: undefined,
    badge: undefined
  },

  // Accessories
  {
    id: 701,
    name: "Leather Handbag",
    price: 199.99,
    category: "accessories",
    subcategory: "bags",
    images: ["/placeholder.svg?height=600&width=400", "/placeholder.svg?height=600&width=400"],
    colors: [
      { name: "Black", value: "black", hex: "#000000" },
      { name: "Brown", value: "brown", hex: "#92400e" },
      { name: "Tan", value: "tan", hex: "#d2b48c" },
    ],
    sizes: ["One Size"],
    description: "Elegant leather handbag crafted from premium Italian leather.",
    features: ["Genuine Italian leather", "Multiple compartments", "Adjustable strap", "Gold-tone hardware"],
    specifications: {
      Material: "100% Leather",
      Care: "Leather conditioner recommended",
      Origin: "Made in Italy",
      Dimensions: '12" x 8" x 4"',
    },
    rating: 4.6,
    reviewCount: 134,
    inStock: true,
    stockCount: 15,
    tags: ["leather", "handbag", "luxury", "italian"],
    reviews: undefined,
    badge: undefined
  },
  {
    id: 702,
    name: "Silk Scarf",
    price: 89.99,
    category: "accessories",
    subcategory: "scarves",
    images: ["/placeholder.svg?height=600&width=400", "/placeholder.svg?height=600&width=400"],
    colors: [
      { name: "Floral", value: "floral", hex: "#fce7f3" },
      { name: "Geometric", value: "geometric", hex: "#bfdbfe" },
    ],
    sizes: ["One Size"],
    description: "Luxurious silk scarf with beautiful patterns, perfect for any season.",
    features: ["100% mulberry silk", "Hand-rolled edges", "Vibrant colors", "Versatile styling"],
    specifications: {
      Material: "100% Silk",
      Care: "Dry clean only",
      Origin: "Made in France",
      Dimensions: '35" x 35"',
    },
    rating: 4.8,
    reviewCount: 89,
    inStock: true,
    stockCount: 25,
    tags: ["silk", "scarf", "luxury", "accessory"],
    reviews: undefined,
    badge: undefined
  },

  // Sale Items
  {
    id: 801,
    name: "Designer Blazer",
    price: 149.99,
    originalPrice: 299.99,
    category: "women",
    subcategory: "outerwear",
    images: ["/placeholder.svg?height=600&width=400", "/placeholder.svg?height=600&width=400"],
    colors: [
      { name: "Black", value: "black", hex: "#000000" },
      { name: "Navy", value: "navy", hex: "#1e3a8a" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Sophisticated designer blazer perfect for professional and formal occasions.",
    features: ["Tailored fit", "Premium wool blend", "Fully lined", "Notched lapels"],
    specifications: {
      Material: "70% Wool, 25% Polyester, 5% Elastane",
      Care: "Dry clean only",
      Origin: "Made in Italy",
      Fit: "Tailored fit",
    },
    rating: 4.9,
    reviewCount: 167,
    inStock: true,
    stockCount: 8,
    tags: ["blazer", "designer", "wool", "professional"],
    isSale: true,
    reviews: undefined,
    badge: undefined
  },
]

export function getAllProducts(): Product[] {
  return products
}

export function getProductById(id: number): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}

export function getProductsBySubcategory(category: string, subcategory: string): Product[] {
  return products.filter((product) => product.category === category && product.subcategory === subcategory)
}

export function getFeaturedProducts(): Product[] {
  return products.slice(0, 4)
}

export function getSaleProducts(): Product[] {
  return products.filter((product) => product.isSale)
}

export function getNewProducts(): Product[] {
  return products.filter((product) => product.isNew)
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery) ||
      product.subcategory.toLowerCase().includes(lowercaseQuery) ||
      product.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
  )
}
