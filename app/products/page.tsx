"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";

// Đã cập nhật chuẩn đét theo danh sách sản phẩm thật của cậu 🌸
const allProducts = [
  {
    image: "/images/enmy 0.jpg",
    name: "Bút đánh dấu acrylic ENMY",
    oldPrice: "45.000đ",
    price: "35.000đ",
    rating: 5,
    badge: "SALE",
    category: "Bút",
  },
  {
    image: "/images/denngu.jpg",
    name: "Đèn ngủ gấu ngọt ngào",
    oldPrice: "250.000đ",
    price: "180.000đ",
    rating: 5,
    badge: "NEW",
    category: "Đèn ngủ",
  },
  {
    image: "/images/giaygoi.png",
    name: "Giấy gói quà sinh nhật",
    oldPrice: "30.000đ",
    price: "15.000đ",
    rating: 4,
    badge: "HOT",
    category: "Quà tặng",
  },
  {
    image: "/images/tuigiay.png",
    name: "Túi giấy đựng quà",
    oldPrice: "45.000đ",
    price: "35.000đ",
    rating: 4,
    badge: "HOT",
    category: "Quà tặng",
  },
];

// Các tab danh mục được thiết kế riêng cho sản phẩm của cậu
const categories = ["Tất cả", "Bút", "Đèn ngủ", "Quà tặng"];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  // Lọc sản phẩm dựa theo tab được chọn
  const filteredProducts = selectedCategory === "Tất cả"
    ? allProducts
    : allProducts.filter(p => p.category === selectedCategory);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Tiêu đề trang */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-pink-500 mb-2">Tất Cả Sản Phẩm 🛍️</h1>
        <p className="text-gray-500">Khám phá bộ sưu tập văn phòng phẩm và phụ kiện siêu cute tại Bom Bàng Bang</p>
      </div>

      {/* Thanh bấm chọn Danh mục (Filter) */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full font-medium transition text-sm ${
              selectedCategory === cat
                ? "bg-pink-500 text-white shadow-md shadow-pink-200"
                : "bg-gray-100 text-gray-600 hover:bg-pink-100 hover:text-pink-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lưới hiển thị sản phẩm */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.name}
            image={product.image}
            name={product.name}
            price={product.price}
            oldPrice={product.oldPrice}
            rating={product.rating}
            badge={product.badge}
          />
        ))}
      </div>
    </div>
  );
}