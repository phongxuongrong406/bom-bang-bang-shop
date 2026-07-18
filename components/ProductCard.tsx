"use client"; // <-- Thêm dòng này ở đầu file vì có dùng nút bấm click

import { useCart } from "@/context/CartContext";

type Product = {
  image: string;
  name: string;
  price: string;
  oldPrice?: string;
  rating?: number;
  badge?: string;
};

export default function ProductCard({
  image,
  name,
  price,
  oldPrice,
  rating = 5,
  badge,
}: Product) {
  const { addToCart } = useCart(); // <-- Lấy hàm thêm vào giỏ hàng ra dùng

  return (
    <div className="group overflow-hidden rounded-3xl bg-white shadow-md transition hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between h-full border border-gray-100">
      
      <div className="relative bg-gray-50 flex items-center justify-center h-64 overflow-hidden">
        {/* Đã sửa thành object-contain để hiện FULL ảnh theo ý cậu */}
        <img
          src={image}
          alt={name}
          className="h-full w-full object-contain p-2 transition group-hover:scale-105"
        />

        {badge && (
          <span className="absolute left-4 top-4 rounded-full bg-pink-500 px-3 py-1 text-sm text-white font-bold animate-pulse">
            {badge}
          </span>
        )}

        <button className="absolute right-4 top-4 rounded-full bg-white p-2 shadow hover:scale-110 transition">
          ❤️
        </button>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 min-h-[3.5rem]">
            {name}
          </h3>

          <div className="mt-1 text-amber-400">
            {"⭐".repeat(rating)}
          </div>

          <div className="mt-3 flex items-baseline">
            {oldPrice && (
              <span className="mr-2 text-sm text-gray-400 line-through">
                {oldPrice}
              </span>
            )}
            <span className="text-xl font-bold text-pink-500">
              {price}
            </span>
          </div>
        </div>

        {/* Sự kiện onClick kích hoạt ở đây */}
        <button 
          onClick={() => addToCart({ name, price, image })}
          className="mt-5 w-full rounded-full bg-pink-500 py-3 text-white font-semibold hover:bg-pink-600 transition active:scale-95"
        >
          Add to Cart 🛒
        </button>
      </div>

    </div>
  );
}