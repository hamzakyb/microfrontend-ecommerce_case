// Uygulamalar arası veri iletişimi için event sistemi

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// Custom event ile veri gönderme
export const sendCartUpdate = (cartItems: CartItem[]) => {
  // LocalStorage'a kaydet
  localStorage.setItem("cart", JSON.stringify(cartItems));
  
  // Custom event gönder
  const event = new CustomEvent('cartUpdated', {
    detail: { cartItems }
  });
  window.dispatchEvent(event);
  
  // BroadcastChannel ile diğer uygulamalara bildir
  if (typeof window !== 'undefined') {
    try {
      const channel = new BroadcastChannel('cart-channel');
      channel.postMessage({
        type: 'CART_UPDATED',
        cartItems
      });
    } catch (error) {
      console.log('BroadcastChannel not supported, using localStorage only');
    }
  }
};

// Cart verilerini alma
export const getCartItems = (): CartItem[] => {
  try {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Error getting cart items:", error);
    return [];
  }
};

// Cart listener'ı oluşturma
export const createCartListener = (callback: (cartItems: CartItem[]) => void) => {
  // LocalStorage değişikliklerini dinle
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === 'cart') {
      try {
        const cartItems = e.newValue ? JSON.parse(e.newValue) : [];
        callback(cartItems);
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
    }
  };

  // Custom event dinle
  const handleCustomEvent = (e: CustomEvent) => {
    callback(e.detail.cartItems);
  };

  // BroadcastChannel dinle
  let channel: BroadcastChannel | null = null;
  try {
    channel = new BroadcastChannel('cart-channel');
    channel.onmessage = (event) => {
      if (event.data.type === 'CART_UPDATED') {
        callback(event.data.cartItems);
      }
    };
  } catch (error) {
    console.log('BroadcastChannel not supported');
  }

  // Event listener'ları ekle
  window.addEventListener('storage', handleStorageChange);
  window.addEventListener('cartUpdated', handleCustomEvent as EventListener);

  // Cleanup fonksiyonu
  return () => {
    window.removeEventListener('storage', handleStorageChange);
    window.removeEventListener('cartUpdated', handleCustomEvent as EventListener);
    if (channel) {
      channel.close();
    }
  };
}; 