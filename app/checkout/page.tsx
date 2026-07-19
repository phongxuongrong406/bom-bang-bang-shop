"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, getCartTotal, getCartCount } = useCart();
  
  // Thông tin ngân hàng VPBank của cậu
  const BANK_INFO = {
    bankId: "VPB", 
    accountNo: "190766616", 
    accountName: "PHAM VU ANH HANG", 
  };

  // Quản lý thông tin khách hàng
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
    paymentMethod: "COD"
  });

  // Quản lý các bước: FILL_INFO (Điền đơn) -> SCAN_QR (Quét mã) -> SUCCESS (Hoàn tất)
  const [step, setStep] = useState<"FILL_INFO" | "SCAN_QR" | "SUCCESS">("FILL_INFO");
  const [isLoading, setIsLoading] = useState(false);

  // Hàm gọi API ngầm để gửi Email về cho cậu
  const triggerSendEmail = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          items: cart, 
          customer: formData,
          totalAmount: getCartTotal()
        }),
      });

      if (response.ok) {
        setStep("SUCCESS"); // Gửi mail thành công thì chuyển sang màn hình hoàn tất
      } else {
        alert("Hệ thống bận tí rìu, cậu bấm lại giúp shop nhé! 😢");
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi kết nối mạng rồi cậu ơi! 😭");
    } finally {
      setIsLoading(false);
    }
  };

  // Kích hoạt khi khách bấm nút Xác Nhận ở bước điền form
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Cậu điền đầy đủ thông tin giao hàng nhé! 🌸");
      return;
    }

    if (formData.paymentMethod === "COD") {
      // Nếu là COD -> Bắn email về máy chủ shop luôn
      triggerSendEmail();
    } else {
      // Nếu là BANK -> Chuyển sang màn hình bắt Quét QR trước, CHƯA gửi email
      setStep("SCAN_QR");
    }
  };

  // Tính số tiền bill
  const totalAmountNumber = cart.reduce((sum, item) => {
    const priceNum = parseInt(item.price.replace(/\D/g, ""));
    return sum + priceNum * item.quantity;
  }, 0);


  // ========================================================
  // BƯỚC 3: MÀN HÌNH ĐẶT HÀNG THÀNH CÔNG HOÀN TOÀN (Đã nhận mail)
  // ========================================================
  if (step === "SUCCESS") {
    return (
      <div className="mx-auto max-w-xl text-center py-16 px-6 bg-white border border-gray-100 shadow-xl rounded-3xl my-10 space-y-6">
        <span className="text-6xl block">🎉</span>
        <h1 className="text-3xl font-bold text-pink-500">Đơn hàng hoàn tất!</h1>
        
        <div className="bg-green-50 p-6 rounded-2xl border border-green-100 max-w-sm mx-auto">
          <p className="text-sm font-semibold text-green-800">
            {formData.paymentMethod === "BANK" 
              // Thông báo cho khách chuyển khoản
              ? "Shop đã ghi nhận thông tin chuyển khoản của cậu! Hệ thống đang xử lý đơn hàng nhé 🏧"
              // Thông báo cho khách COD
              : "Đơn hàng đã được ghi nhận thành công! Cậu sẽ thanh toán tiền mặt khi nhận hàng nha 💵"}
          </p>
        </div>

        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Cảm ơn cậu đã ủng hộ <strong>BBB's Shop</strong>. Tớ sẽ check thông tin đơn và alo giao hàng sớm nhất!
        </p>

        <Link href="/" className="inline-block rounded-full bg-pink-500 px-8 py-3 font-semibold text-white hover:bg-pink-600 transition shadow-md shadow-pink-100">
          Tiếp tục mua sắm 🛍️
        </Link>
      </div>
    );
  }


  // ========================================================
  // BƯỚC 2: MÀN HÌNH BẮT QUẾT MÃ QR (Chỉ dành cho khách chọn BANK)
  // ========================================================
  if (step === "SCAN_QR") {
    return (
      <div className="mx-auto max-w-md text-center py-12 px-6 bg-white border border-gray-100 shadow-xl rounded-3xl my-10 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">📲 Quét mã thanh toán</h2>
        <p className="text-xs text-red-400 font-medium bg-red-50 py-2 px-4 rounded-xl">
          ⚠️ Cậu vui lòng quét QR chuyển khoản trước, sau đó bấm nút xác nhận bên dưới để hoàn tất gửi đơn nhé!
        </p>

        {/* Hiện mã QR VPBank kèm tiền */}
        <div className="bg-white p-3 rounded-2xl inline-block border border-gray-100 shadow-md">
          <img 
            src={`https://img.vietqr.io/image/${BANK_INFO.bankId}-${BANK_INFO.accountNo}-compact2.jpg?amount=${totalAmountNumber}&addInfo=BOMBANG%20${formData.phone}&accountName=${encodeURIComponent(BANK_INFO.accountName)}`}
            alt="Mã QR Thanh Toán VPBank"
            className="w-64 h-64 mx-auto object-contain"
          />
        </div>

        {/* Thông tin chi tiết */}
        <div className="text-left text-xs text-gray-600 space-y-1.5 bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <p>🏦 <strong>Ngân hàng:</strong> VPBank</p>
          <p>💳 <strong>Số tài khoản:</strong> {BANK_INFO.accountNo}</p>
          <p>👤 <strong>Chủ tài khoản:</strong> {BANK_INFO.accountName}</p>
          <p>💰 <strong>Số tiền:</strong> <span className="text-pink-500 font-bold">{getCartTotal()}</span></p>
          <p>📝 <strong>Nội dung:</strong> <span className="font-mono bg-white px-1.5 py-0.5 rounded border text-gray-800 font-bold">BOMBANG {formData.phone}</span></p>
        </div>

        {/* NÚT CHỐT: Bấm vào đây mới kích hoạt gửi Email đơn hàng về máy cậu */}
        <button
          onClick={triggerSendEmail}
          disabled={isLoading}
          className={`w-full rounded-full bg-green-500 py-4 font-bold text-white shadow-lg shadow-green-100 hover:bg-green-600 transition active:scale-95 flex justify-center items-center ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isLoading ? "♻️ Đang gửi đơn..." : "✅ Tôi đã quét mã & chuyển tiền thành công"}
        </button>

        <button 
          onClick={() => setStep("FILL_INFO")}
          className="text-xs text-gray-400 hover:text-gray-600 underline"
        >
          Quay lại sửa thông tin nhận hàng
        </button>
      </div>
    );
  }


  // ========================================================
  // BƯỚC 1: MÀN HÌNH ĐIỀN FORM THÔNG TIN THANH TOÁN (Mặc định)
  // ========================================================
  if (getCartCount() === 0) {
    return (
      <div className="text-center py-24 px-6">
        <span className="text-6xl block mb-4">🛒</span>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Giỏ hàng của cậu đang trống trơn...</h2>
        <Link href="/" className="inline-block rounded-full bg-pink-500 px-6 py-3 text-white font-medium hover:bg-pink-600 transition">
          Quay lại lựa đồ cute ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center md:text-left">
        📦 Thanh toán hàng tại BBB's Shop
      </h1>
      
      <div className="grid gap-10 lg:grid-cols-12 items-start">
        {/* FORM ĐIỀN THÔNG TIN */}
        <form onSubmit={handleSubmitForm} className="lg:col-span-7 bg-white border border-gray-100 shadow-sm rounded-3xl p-6 md:p-8 space-y-6">
          <h3 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-3">Thông tin giao hàng</h3>
          
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Họ và tên người nhận *</label>
            <input 
              type="text" 
              placeholder="Ví dụ: Nguyễn Văn A"
              required
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-pink-400 focus:outline-none transition"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Số điện thoại *</label>
              <input 
                type="tel" 
                placeholder="Nhập số điện thoại nhận hàng"
                required
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-pink-400 focus:outline-none transition"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Hình thức thanh toán</label>
              <select 
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-pink-400 focus:outline-none bg-white transition"
                value={formData.paymentMethod}
                onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
              >
                <option value="COD">Thanh toán khi nhận hàng (COD)</option>
                <option value="BANK">Chuyển khoản ngân hàng (Qua mã QR)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Địa chỉ nhận hàng chi tiết *</label>
            <input 
              type="text" 
              placeholder="Số nhà, tên đường, xã/phường, quận/huyện, tỉnh..."
              required
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-pink-400 focus:outline-none transition"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Ghi chú đơn hàng (Nếu có)</label>
            <textarea 
              rows={3}
              placeholder="Nhắn nhủ shop thời gian giao hàng hoặc đóng gói quà giúp cậu nhé..."
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-pink-400 focus:outline-none transition resize-none"
              value={formData.note}
              onChange={(e) => setFormData({...formData, note: e.target.value})}
            />
          </div>
        </form>

        {/* TÓM TẮT ĐƠN HÀNG Ở CỘT PHẢI */}
        <div className="lg:col-span-5 bg-gray-50 border border-gray-100 rounded-3xl p-6 space-y-6">
          <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-3">Đơn hàng của cậu ({getCartCount()})</h3>
          
          <div className="max-h-64 overflow-y-auto space-y-4 pr-2">
            {cart.map((item) => (
              <div key={item.name} className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-gray-100">
                <img src={item.image} alt={item.name} className="h-14 w-14 rounded-xl object-contain bg-gray-50 p-1" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-800 truncate">{item.name}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Số lượng: {item.quantity}</p>
                </div>
                <p className="text-sm font-bold text-pink-500">{item.price}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Tiền hàng:</span>
              <span className="font-medium text-gray-800">{getCartTotal()}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Phí vận chuyển:</span>
              <span className="text-green-500 font-medium">Miễn phí 🌸</span>
            </div>
            <div className="flex justify-between text-base font-bold text-gray-900 border-t border-dashed border-gray-200 pt-3">
              <span>Tổng thanh toán:</span>
              <span className="text-2xl text-pink-500">{getCartTotal()}</span>
            </div>
          </div>

          <button 
            onClick={() => {
              const form = document.querySelector("form");
              if (form) form.requestSubmit();
            }}
            disabled={isLoading}
            className={`w-full rounded-full bg-pink-500 py-4 font-bold text-white shadow-lg shadow-pink-100 hover:bg-pink-600 transition active:scale-95 flex justify-center items-center ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoading ? "♻️ Đang xử lý..." : formData.paymentMethod === "BANK" ? "Tiếp tục thanh toán QR ➡️" : "Xác nhận đặt hàng thành công 💝"}
          </button>
        </div>
      </div>
    </div>
  );
}