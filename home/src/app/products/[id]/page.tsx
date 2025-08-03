"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { products } from "@/lib/products";
import { ShoppingCart, Check, ArrowLeft, Star } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types/product";
import { sendCartUpdate, getCartItems, CartItem } from "../../../lib/cartEvents";

interface ProductDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductDetailProps) {
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      const resolvedParams = await params;
      const foundProduct = products.find(p => p.id === parseInt(resolvedParams.id));
      setProduct(foundProduct || null);
    };
    
    loadProduct();
  }, [params]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Ürün Bulunamadı</h1>
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = (product: Product) => {
    try {
      // Mevcut sepeti al
      const cartItems = getCartItems();
      
      console.log("Current cart items:", cartItems);

      // Ürünün sepette olup olmadığını kontrol et
      const existingItemIndex = cartItems.findIndex((item: CartItem) => item.id === product.id);

      if (existingItemIndex !== -1) {
        // Ürün zaten sepette varsa miktarını artır
        cartItems[existingItemIndex].quantity += quantity;
        console.log("Updated existing item:", cartItems[existingItemIndex]);
      } else {
        // Yeni ürün ekle
        const newItem = {
          ...product,
          quantity: quantity
        };
        cartItems.push(newItem);
        console.log("Added new item:", newItem);
      }

      // Sepeti güncelle ve diğer uygulamalara bildir
      sendCartUpdate(cartItems);
      console.log("Cart updated and broadcasted:", cartItems);
      
      // Görsel geri bildirim
      setAddedToCart(true);
      
      // 2 saniye sonra geri bildirimi kaldır
      setTimeout(() => {
        setAddedToCart(false);
      }, 2000);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
            >
              <ArrowLeft size={20} />
              Geri Dön
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Ürün Detayı</h1>
            <button
              onClick={() => window.open("http://localhost:3001", "_blank")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              <ShoppingCart size={20} />
              Sepetim
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Ürün Görseli */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={400}
                className="w-full h-[400px] object-cover rounded-xl"
              />
              {addedToCart && (
                <div className="absolute top-4 right-4 bg-green-500 text-white p-3 rounded-full">
                  <Check size={20} />
                </div>
              )}
            </div>
            
            {/* Küçük Görseller */}
            <div className="flex gap-2">
              <div className="w-20 h-20 border-2 border-blue-500 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-20 h-20 border-2 border-gray-200 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-20 h-20 border-2 border-gray-200 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Ürün Bilgileri */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-gray-600">(24 değerlendirme)</span>
              </div>
              <p className="text-3xl font-bold text-blue-600 mb-4">{product.price}₺</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Açıklama</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Özellikler</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Malzeme:</span>
                  <span className="font-medium">%100 Yün</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Boyut:</span>
                  <span className="font-medium">200x300 cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Renk:</span>
                  <span className="font-medium">Doğal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Stok:</span>
                  <span className="font-medium text-green-600">Mevcut</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Miktar</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
                  >
                    +
                  </button>
                </div>
                <span className="text-gray-600">adet</span>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => handleAddToCart(product)}
                disabled={addedToCart}
                className={`w-full flex items-center justify-center gap-2 text-white font-semibold py-4 px-6 rounded-lg transition ${
                  addedToCart
                    ? "bg-green-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                <ShoppingCart size={20} />
                {addedToCart ? "Sepete Eklendi" : "Sepete Ekle"}
              </button>
              
              <button className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-4 px-6 rounded-lg transition">
                Favorilere Ekle
              </button>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Ücretsiz kargo</span>
                <span>2-3 iş günü içinde teslimat</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 