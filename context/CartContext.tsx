"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type CartItem = {
  name: string;
  price: string;
  image: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (product: { name: string; price: string; image: string }) => void;
  removeFromCart: (name: string) => void;
  getCartCount: () => number;
  getCartTotal: () => string;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); // Đánh dấu đã tải xong dữ liệu từ máy khách

  // 1. Tải giỏ hàng từ LocalStorage lên khi khách vừa vào trang
  useEffect(() => {
    const savedCart = localStorage.getItem("bom_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Lỗi đọc giỏ hàng:", error);
      }
    }
    setIsLoaded(true); // Xác nhận đã load xong
  }, []);

  // 2. Tự động lưu giỏ hàng vào LocalStorage mỗi khi có thay đổi (thêm/bớt đồ)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("bom_cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (product: { name: string; price: string; image: string }) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === product.name);
      if (existingItem) {
        return prevCart.map((item) =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (name: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === name);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prevCart.filter((item) => item.name !== name);
    });
  };

  const getCartCount = () => {
    // Nếu chưa load xong từ LocalStorage thì trả về 0 để tránh lệch giao diện SSR
    if (!isLoaded) return 0;
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    const total = cart.reduce((sum, item) => {
      const priceNum = parseInt(item.price.replace(/\D/g, ""));
      return sum + priceNum * item.quantity;
    }, 0);
    return total.toLocaleString("vi-VN") + "đ";
  };

  return (
    <CartContext.Provider value={{ cart, isCartOpen, setIsCartOpen, addToCart, removeFromCart, getCartCount, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart phải được dùng bên trong CartProvider");
  return context;
}