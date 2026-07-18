import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import ProductGrid from "../components/ProductGrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFF8FB]">
      <Navbar />
      <Hero />
      <Categories />
      <ProductGrid />
      <Footer />  
    </main>
  );
}