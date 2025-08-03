'use client'

import { Product } from '@/types/product'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
  addedItems: Set<number>
}

const ProductCard = ({ product, onAddToCart, addedItems }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
      <div className="relative">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={250}
          className="w-full h-[250px] object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <p className="text-blue-600 font-bold text-lg mb-4">{product.price}₺</p>
        <button
          onClick={() => onAddToCart(product)}
          disabled={addedItems.has(product.id)}
          className={`w-full flex items-center justify-center gap-2 text-white font-semibold py-3 px-4 rounded-lg transition ${
            addedItems.has(product.id)
              ? "bg-green-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          <ShoppingCart size={18} />
          {addedItems.has(product.id) ? "Sepete Eklendi" : "Sepete Ekle"}
        </button>
      </div>
    </div>
  )
}

export default ProductCard