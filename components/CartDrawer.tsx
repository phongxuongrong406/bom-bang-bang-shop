"use client";

import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, addToCart, removeFromCart, getCartTotal } = useCart();

  if (!isCartOpen) return null; // Nếu trạng thái là đóng thì không vẽ gì ra màn hình cả

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Lớp nền mờ màu đen phía sau, click vào đây là đóng giỏ hàng */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cột Giỏ hàng trượt từ bên phải */}
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md transform bg-white shadow-2xl flex flex-col h-full animate-slide-in">
          
          {/* Header của Giỏ hàng */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              🛒 Giỏ hàng của bạn
            </h2>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="text-2xl text-gray-400 hover:text-gray-600 transition"
            >
              ✕
            </button>
          </div>

          {/* Danh sách sản phẩm (Có cuộn chuột nếu quá nhiều đồ) */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <span className="text-5xl block mb-4">🌸</span>
                Giỏ hàng trống trơn hà, mua đồ đi cậu ơi!
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.name} className="flex items-center gap-4 border-b border-gray-100 pb-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-20 w-20 rounded-2xl bg-gray-50 object-contain p-1 border border-gray-100"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 text-sm line-clamp-1">{item.name}</h4>
                    <p className="text-pink-500 font-bold mt-1 text-sm">{item.price}</p>
                    
                    {/* Bộ nút tăng giảm số lượng */}
                    <div className="flex items-center gap-2 mt-2">
                      <button 
                        onClick={() => removeFromCart(item.name)}
                        className="h-6 w-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-pink-100 hover:text-pink-500 font-bold transition text-xs"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => addToCart(item)}
                        className="h-6 w-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-pink-100 hover:text-pink-500 font-bold transition text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Phần tính tiền & Nút bấm thanh toán ở đáy */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 px-6 py-6 bg-gray-50 space-y-4">
              <div className="flex justify-between text-base font-bold text-gray-900">
                <span>Tổng tiền tạm tính:</span>
                <span className="text-xl text-pink-500">{getCartTotal()}</span>
              </div>
              <p className="text-xs text-gray-400">Phí vận chuyển sẽ được tính khi cậu điền địa chỉ nha.</p>
              <button className="w-full rounded-full bg-pink-500 py-4 text-center text-base font-semibold text-white shadow-md hover:bg-pink-600 transition active:scale-95">
                Tiến hành thanh toán 🚀
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}