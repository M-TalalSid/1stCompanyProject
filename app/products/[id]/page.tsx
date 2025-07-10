import { notFound } from "next/navigation"
import { getProductById } from "../../../lib/products-database"
import { getAllProducts } from "../../../lib/products-database"
import ProductDetailClient from "./product-detail-client"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const products = getAllProducts()
  return products.map((product) => ({
    id: product.id.toString(),
  }))
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const productId = Number.parseInt(id)
  const product = getProductById(productId)

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
}
