'use client'

import { products } from "@/lib/products"
import ProductCard from "./ProductCard"
import { Product } from "@/types/product"

interface ProductListProps {
  onAddToCart: (product: Product) => void
  addedItems: Set<number>
}

export default function ProductList({ onAddToCart, addedItems }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={onAddToCart}
          addedItems={addedItems}
        />
      ))}
    </div>
  )
} 