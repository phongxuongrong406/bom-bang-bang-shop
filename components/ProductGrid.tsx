import ProductCard from "./ProductCard";

const products = [
  {
    image: "https://picsum.photos/400/400?1",
    name: "Pastel Notebook",
    oldPrice: "99.000đ",
    price: "79.000đ",
    rating: 5,
    badge: "SALE",
  },
  {
    image: "https://picsum.photos/400/400?2",
    name: "Cute Sticker Pack",
    oldPrice: "50.000đ",
    price: "35.000đ",
    rating: 5,
    badge: "NEW",
  },
  {
    image: "https://picsum.photos/400/400?3",
    name: "Pink Lipstick",
    oldPrice: "220.000đ",
    price: "189.000đ",
    rating: 4,
    badge: "HOT",
  },
  {
    image: "https://picsum.photos/400/400?4",
    name: "Pearl Bracelet",
    oldPrice: "160.000đ",
    price: "129.000đ",
    rating: 5,
  },
];


export default function ProductGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">

      <h2 className="mb-12 text-center text-4xl font-bold text-pink-500">
        Best Seller
      </h2>


      <div className="
        grid 
        gap-8 
        sm:grid-cols-2 
        lg:grid-cols-4
      ">

        {products.map((product) => (
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

    </section>
  );
}