const categories = [
  {
    emoji: "📚",
    title: "Stationery",
    desc: "Notebook, pen, sticker...",
  },
  {
    emoji: "💍",
    title: "Accessories",
    desc: "Bracelet, necklace...",
  },
  {
    emoji: "💄",
    title: "Beauty",
    desc: "Lipstick, skincare...",
  },
];

export default function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="mb-12 text-center text-4xl font-bold text-pink-500">
        Shop by Category
      </h2>

      <div className="grid gap-8 md:grid-cols-3">
        {categories.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl bg-white p-10 text-center shadow-md transition hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="mb-4 text-6xl">{item.emoji}</div>

            <h3 className="text-2xl font-bold">{item.title}</h3>

            <p className="mt-3 text-gray-500">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}