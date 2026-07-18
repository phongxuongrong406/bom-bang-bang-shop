export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-pink-100 text-gray-600">
      
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Cột 1: Giới thiệu thương hiệu */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-pink-500">🌸 Bom Bàng Bang</h3>
          <p className="text-sm leading-relaxed">
            Thế giới phụ kiện, mỹ phẩm và văn phòng phẩm cute lạc lối dành cho các nàng thơ. Mang niềm vui nhỏ bé vào từng ngày của bạn!
          </p>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:scale-110 transition">🌐</a>
            <a href="#" className="hover:scale-110 transition">📸</a>
            <a href="#" className="hover:scale-110 transition">🛍️</a>
          </div>
        </div>

        {/* Cột 2: Danh mục mua sắm */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">
            Mua sắm
          </h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-pink-500 transition">Tất cả sản phẩm</a></li>
            <li><a href="#" className="hover:text-pink-500 transition">Văn phòng phẩm Cute</a></li>
            <li><a href="#" className="hover:text-pink-500 transition">Mỹ phẩm & Phụ kiện</a></li>
            <li><a href="#" className="hover:text-pink-500 transition">Hàng mới về ✨</a></li>
          </ul>
        </div>

        {/* Cột 3: Hỗ trợ khách hàng */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">
            Hỗ trợ khách hàng
          </h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-pink-500 transition">Chính sách vận chuyển</a></li>
            <li><a href="#" className="hover:text-pink-500 transition">Đổi trả & Hoàn tiền</a></li>
            <li><a href="#" className="hover:text-pink-500 transition">Hướng dẫn chọn size/màu</a></li>
            <li><a href="#" className="hover:text-pink-500 transition">Liên hệ trợ giúp</a></li>
          </ul>
        </div>

        {/* Cột 4: Đăng ký bản tin quà tặng */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">
            Nhận ưu đãi đặc biệt
          </h4>
          <p className="text-sm mb-4 leading-relaxed">
            Đăng ký để không bỏ lỡ các đợt phát voucher bí mật và sản phẩm giới hạn.
          </p>
          <form className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email của bạn..." 
              className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:border-pink-500 focus:outline-none"
            />
            <button className="rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600 transition shrink-0">
              Gửi
            </button>
          </form>
        </div>

      </div>

      {/* Bản quyền */}
      <div className="border-t border-gray-200 py-6 text-center text-sm text-gray-400">
        <p>© 2026 Bom Bàng Bang Shop. Built with 💖 and Next.js.</p>
      </div>

    </footer>
  );
}