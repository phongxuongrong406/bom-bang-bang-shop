import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bom Bàng Bang Shop",
  description: "Cute Stationery & Accessories",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Bọc giỏ hàng toàn cục ở đây */}
        <CartProvider>
          <div className="min-h-screen bg-white text-gray-800 antialiased flex flex-col justify-between">
            {/* Navbar luôn nằm trên cùng ở mọi trang */}
            <Navbar />
            
            {/* Nội dung thay đổi theo từng trang sẽ nằm ở đây */}
            <main className="flex-grow">
              {/* Thêm lớp hiệu ứng mượt mà khi chuyển trang */}
              <div className="animate-fade-in">
                {children}
              </div>
            </main>
            
            {/* Footer luôn nằm dưới đáy ở mọi trang */}
            <Footer />

            {/* Giỏ hàng trượt luôn chực chờ ở mọi trang */}
            <CartDrawer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}