import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  return (
    <>
      {/* Banner chào mừng */}
      <Hero />
      
      {/* Danh sách sản phẩm bán chạy */}
      <ProductGrid />
    </>
  );
}