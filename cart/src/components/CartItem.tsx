'use client'

import Image from 'next/image'
import { Trash2 } from 'lucide-react'

interface CartItemProps {
  item: {
    id: number
    name: string
    price: number
    image: string
    quantity: number
  }
  onUpdateQuantity: (productId: number, newQuantity: number) => void
  onRemoveItem: (productId: number) => void
}

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }: CartItemProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 md:p-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
        <Image
          src={item.image}
          alt={item.name}
          width={80}
          height={80}
          className="rounded-lg object-cover shadow-md w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0"
        />
        <div className="flex-grow min-w-0">
          <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-800 truncate">{item.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-gray-500 text-xs sm:text-sm">Birim Fiyat:</span>
            <span className="bg-blue-50 border border-blue-200 rounded-md px-2 py-1 text-blue-700 font-semibold text-xs sm:text-sm">{item.price}₺</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between w-full sm:w-auto gap-2 sm:gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-blue-300 flex items-center justify-center hover:bg-blue-100 hover:border-blue-400 transition-all duration-200 text-blue-600 font-bold text-sm sm:text-base"
          >
            -
          </button>
          <span className="w-8 sm:w-12 text-center font-semibold text-gray-800 text-sm sm:text-base">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-blue-300 flex items-center justify-center hover:bg-blue-100 hover:border-blue-400 transition-all duration-200 text-blue-600 font-bold text-sm sm:text-base"
          >
            +
          </button>
        </div>
        <div className="flex flex-col items-end gap-2 sm:gap-3">
          <div className="bg-green-50 border-2 border-green-200 rounded-lg px-2 py-1 sm:px-3 sm:py-2">
            <p className="font-bold text-sm sm:text-base md:text-lg text-green-700">{item.price * item.quantity}₺</p>
          </div>
          <button
            onClick={() => onRemoveItem(item.id)}
            className="text-red-500 hover:text-red-700 transition-colors duration-200 p-1 sm:p-2 hover:bg-red-50 rounded-full"
            title="Ürünü Sil"
          >
            <Trash2 size={14} className="sm:w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem 