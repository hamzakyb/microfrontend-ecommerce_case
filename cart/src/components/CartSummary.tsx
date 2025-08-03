'use client'

import { Package, Truck, CreditCard } from 'lucide-react'

interface CartSummaryProps {
  total: number
  onCheckout: () => void
}

const CartSummary = ({ total, onCheckout }: CartSummaryProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 sticky top-6 border border-blue-100">
      <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 flex items-center gap-2">
        <Package size={18} className="sm:w-5 text-blue-600" />
        <span className="hidden sm:inline">Sipariş Özeti</span>
        <span className="sm:hidden">Özet</span>
      </h2>
      <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
        <div className="flex justify-between items-center bg-gray-50 rounded-lg p-3 sm:p-4">
          <span className="text-gray-600 text-xs sm:text-sm md:text-base font-medium">Ara Toplam</span>
          <span className="font-bold text-sm sm:text-base md:text-lg text-gray-800">{total}₺</span>
        </div>
        <div className="flex justify-between items-center bg-green-50 rounded-lg p-3 sm:p-4">
          <span className="flex items-center gap-1 text-gray-600 text-xs sm:text-sm md:text-base font-medium">
            <Truck size={14} className="sm:w-4 text-green-600" />
            <span className="hidden sm:inline">Kargo</span>
            <span className="sm:hidden">Kargo</span>
          </span>
          <span className="text-green-600 font-bold text-sm sm:text-base">Ücretsiz</span>
        </div>
      </div>
      <div className="border-t-2 border-green-200 pt-4 sm:pt-5">
        <div className="flex justify-between items-center bg-green-100 rounded-lg p-3 sm:p-4">
          <span className="text-gray-800 font-bold text-sm sm:text-base md:text-lg">Toplam</span>
          <span className="text-green-700 font-bold text-lg sm:text-xl md:text-2xl">{total}₺</span>
        </div>
      </div>
      <button 
        onClick={onCheckout}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-2 sm:py-3 md:py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg mt-4 sm:mt-6 flex items-center justify-center gap-2 text-sm sm:text-base"
      >
        <CreditCard size={16} className="sm:w-5" />
        <span className="hidden sm:inline">Siparişi Tamamla</span>
        <span className="sm:hidden">Tamamla</span>
      </button>
    </div>
  )
}

export default CartSummary 