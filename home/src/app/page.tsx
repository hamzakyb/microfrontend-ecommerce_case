"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { ShoppingCart, Check, Package } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types/product";
import { CartItem } from "@/lib/cartEvents";

export default function HomePage() {
  const [addedItems, setAddedItems] = useState<Set<number>>(new Set());
  const [showModal, setShowModal] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  const handleAddToCart = (product: Product) => {
    console.log("handleAddToCart called with product:", product);
    try {
      // Mevcut sepeti al (sadece URL'den)
      let cartItems: CartItem[] = [];
      
      // URL'den cart verilerini al
      const urlParams = new URLSearchParams(window.location.search);
      const cartParam = urlParams.get('cart');
      
      if (cartParam) {
        try {
          cartItems = JSON.parse(decodeURIComponent(cartParam));
          console.log("Cart loaded from URL:", cartItems);
        } catch (error) {
          console.log("Error parsing cart from URL, starting fresh");
        }
      } else {
        console.log("No cart in URL, starting fresh");
      }
      
      console.log("Current cart items:", cartItems);

      // Ürünün sepette olup olmadığını kontrol et
      const existingItemIndex = cartItems.findIndex((item: CartItem) => item.id === product.id);

      if (existingItemIndex !== -1) {
        // Ürün zaten sepette varsa miktarını artır
        cartItems[existingItemIndex].quantity += 1;
        console.log("Updated existing item:", cartItems[existingItemIndex]);
      } else {
        // Yeni ürün ekle
        const newItem = {
          ...product,
          quantity: 1
        };
        cartItems.push(newItem);
        console.log("Added new item:", newItem);
      }

      // URL'yi güncelle (sayfa yenilenmeden)
      const cartData = encodeURIComponent(JSON.stringify(cartItems));
      const newUrl = `${window.location.pathname}?cart=${cartData}`;
      window.history.replaceState({}, '', newUrl);
      console.log("URL updated with cart data:", cartItems);
      
      // Modal göster
      setModalProduct(product);
      setShowModal(true);
      
      // 3 saniye sonra modalı kapat
      setTimeout(() => {
        setShowModal(false);
        setModalProduct(null);
      }, 3000);
      
      // Görsel geri bildirim için state'i güncelle
      setAddedItems(prev => new Set([...prev, product.id]));
      
      // 2 saniye sonra geri bildirimi kaldır
      setTimeout(() => {
        setAddedItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(product.id);
          return newSet;
        });
      }, 2000);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const goToCart = () => {
    // URL'den cart verilerini al
    const urlParams = new URLSearchParams(window.location.search);
    const cartParam = urlParams.get('cart');
    
    let cartItems: CartItem[] = [];
    if (cartParam) {
      try {
        cartItems = JSON.parse(decodeURIComponent(cartParam));
        console.log("Cart data from URL for cart page:", cartItems);
      } catch (error) {
        console.log("Error parsing cart from URL");
      }
    } else {
      console.log("No cart data in URL");
    }
    
    // Cart verilerini URL parametresi olarak gönder
    const cartData = encodeURIComponent(JSON.stringify(cartItems));
    console.log("Opening cart with data:", cartItems);
    window.open(`/cart?cart=${cartData}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Halı Mağazası</h1>
            <button
              onClick={goToCart}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              <ShoppingCart size={20} />
              Sepetim
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800 flex items-center gap-2">
          <Package size={28} className="text-blue-600" />
          Halı Ürünleri
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="relative">
                <Link href={`/products/${item.id}`}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={400}
                    height={250}
                    className="w-full h-[250px] object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                {addedItems.has(item.id) && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white p-2 rounded-full">
                    <Check size={16} />
                  </div>
                )}
              </div>
              <div className="p-4 flex-grow">
                <Link href={`/products/${item.id}`}>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 hover:text-blue-600 transition cursor-pointer">{item.name}</h3>
                </Link>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                <p className="text-blue-600 font-bold text-lg mb-4">{item.price}₺</p>
                <div className="flex gap-2">
                  <Link
                    href={`/products/${item.id}`}
                    className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-4 rounded-lg transition text-center"
                  >
                    Detayları Gör
                  </Link>
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={addedItems.has(item.id)}
                    className={`flex items-center justify-center gap-2 text-white font-semibold py-3 px-4 rounded-lg transition ${
                      addedItems.has(item.id)
                        ? "bg-green-500 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {showModal && modalProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Ürün Sepete Eklendi!</h3>
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={modalProduct.image}
                  alt={modalProduct.name}
                  width={60}
                  height={60}
                  className="rounded-lg object-cover"
                />
                <div className="text-left">
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">{modalProduct.name}</p>
                  <p className="text-blue-600 font-medium text-sm sm:text-base">{modalProduct.price}₺</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">Ürün başarıyla sepetinize eklendi.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 sm:py-3 px-4 rounded-lg transition text-sm sm:text-base"
                >
                  Devam Et
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    goToCart();
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 px-4 rounded-lg transition text-sm sm:text-base flex items-center justify-center gap-1"
                >
                  <ShoppingCart size={16} />
                  Sepeti Gör
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
