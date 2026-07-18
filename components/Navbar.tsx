"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { getCartCount, setIsCartOpen } = useCart(); // <-- Lấy thêm hàm setIsCartOpen ra đây

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100 px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        
        <Link href="/" className="text-2xl font-bold text-pink-500 hover:scale-105 transition">
          🌸 Bom Bàng Bang
        </Link>

        <div className="hidden space-x-8 font-medium text-gray-600 md:flex">
          <Link href="/" className="hover:text-pink-500 transition">Trang chủ</Link>
          <Link href="/products" className="hover:text-pink-500 transition">Sản phẩm</Link>
          <Link href="#" className="hover:text-pink-500 transition">Danh mục</Link>
          <Link href="#" className="hover:text-pink-500 transition">Liên hệ</Link>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-xl hover:scale-110 transition">🔍</button>
          
          {/* Đã thêm sự kiện onClick mở giỏ hàng tại đây */}
          <button 
            onClick={() => setIsCartOpen(true)} 
            className="relative p-2 hover:scale-110 transition"
          >
            <span className="text-2xl">🛒</span>
            
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs font-bold text-white animate-bounce">
                {getCartCount()}
              </span>
            )}
          </button>
        </div>

      </div>
    </nav>
  );
}