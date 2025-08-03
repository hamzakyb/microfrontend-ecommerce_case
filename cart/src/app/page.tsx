"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Trash2, ShoppingCart, ArrowLeft, Package, Truck, CreditCard } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // URL parametresinden cart verilerini al
    const urlParams = new URLSearchParams(window.location.search);
    const cartParam = urlParams.get('cart');
    
    if (cartParam) {
      try {
        const cartItems = JSON.parse(decodeURIComponent(cartParam));
        console.log("Cart data from URL:", cartItems);
        setCartItems(cartItems);
      } catch (error) {
        console.error("Error parsing cart from URL:", error);
      }
    } else {
      console.log("No cart data in URL");
    }
    
    setIsLoading(false);
  }, []);

  const removeFromCart = (productId: number) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    
    // URL'yi güncelle
    const cartData = encodeURIComponent(JSON.stringify(updatedCart));
    const newUrl = `${window.location.pathname}?cart=${cartData}`;
    window.history.replaceState({}, '', newUrl);
    console.log("Cart updated and URL refreshed:", updatedCart);
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    const updatedCart = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    
    // URL'yi güncelle
    const cartData = encodeURIComponent(JSON.stringify(updatedCart));
    const newUrl = `${window.location.pathname}?cart=${cartData}`;
    window.history.replaceState({}, '', newUrl);
    console.log("Cart updated and URL refreshed:", updatedCart);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <button
            onClick={() => window.location.href = "/"}
            className="flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium p-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft size={18} className="sm:w-5" />
            <span className="hidden sm:inline text-sm sm:text-base">Geri Dön</span>
            <span className="sm:hidden text-sm">Geri</span>
          </button>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2 flex-1 justify-center sm:justify-start">
            <ShoppingCart size={24} className="sm:w-7 text-blue-600" />
            <span className="hidden sm:inline">Sepetim</span>
            <span className="sm:hidden">Sepet</span>
          </h1>
          <div className="flex items-center gap-1 sm:gap-2 bg-blue-100 px-2 sm:px-3 py-1 sm:py-2 rounded-full">
            <Package size={16} className="sm:w-5 text-blue-600" />
            <span className="text-xs sm:text-sm md:text-lg font-semibold text-blue-800">{cartItems.length} ürün</span>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12 sm:py-16 bg-white rounded-xl shadow-lg px-4 sm:px-6">
            <ShoppingCart size={48} className="sm:w-16 mx-auto text-blue-400 mb-3 sm:mb-4" />
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">Sepetiniz Boş</h2>
            <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">Sepetinizde henüz ürün bulunmuyor.</p>
            <button
              onClick={() => window.location.href = "/"}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2 text-sm sm:text-base"
            >
              <ShoppingCart size={16} className="sm:w-5" />
              Alışverişe Başla
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
            {/* Ürün Listesi */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 md:p-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200">
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
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-blue-300 flex items-center justify-center hover:bg-blue-100 hover:border-blue-400 transition-all duration-200 text-blue-600 font-bold text-sm sm:text-base"
                        >
                          -
                        </button>
                        <span className="w-8 sm:w-12 text-center font-semibold text-gray-800 text-sm sm:text-base">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200 p-1 sm:p-2 hover:bg-red-50 rounded-full"
                          title="Ürünü Sil"
                        >
                          <Trash2 size={14} className="sm:w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Özet */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 sticky top-6 border border-blue-100">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 flex items-center gap-2">
                  <Package size={18} className="sm:w-5 text-blue-600" />
                  <span className="hidden sm:inline">Sipariş Özeti</span>
                  <span className="sm:hidden">Özet</span>
                </h2>
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex justify-between items-center bg-gray-50 rounded-lg p-3 sm:p-4">
                    <span className="text-gray-600 text-xs sm:text-sm md:text-base font-medium">Ara Toplam</span>
                    <span className="font-bold text-sm sm:text-base md:text-lg text-gray-800">{calculateTotal()}₺</span>
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
                    <span className="text-green-700 font-bold text-lg sm:text-xl md:text-2xl">{calculateTotal()}₺</span>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-2 sm:py-3 md:py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg mt-4 sm:mt-6 flex items-center justify-center gap-2 text-sm sm:text-base">
                  <CreditCard size={16} className="sm:w-5" />
                  <span className="hidden sm:inline">Siparişi Tamamla</span>
                  <span className="sm:hidden">Tamamla</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
