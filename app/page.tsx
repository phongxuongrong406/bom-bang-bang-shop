import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import ProductGrid from "../components/ProductGrid";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <ProductGrid />
      <ProductCard />
    </>
  );
}