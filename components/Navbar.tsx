export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-pink-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-pink-500">
          🌸 Bom Bàng Bang
        </h1>

        <nav className="hidden gap-8 md:flex">
          <a href="#" className="hover:text-pink-500">Home</a>
          <a href="#" className="hover:text-pink-500">Products</a>
          <a href="#" className="hover:text-pink-500">Sale</a>
          <a href="#" className="hover:text-pink-500">Contact</a>
        </nav>

        <div className="flex gap-4 text-xl">
          🔍
          🛒
          👤
        </div>
      </div>
    </header>
  );
}