import ProductCard from "./ProductCard";

const products = [
  {
    image: "/images/enmy 0.jpg",
    name: "Bút đánh dấu acrylic ENMY",
    oldPrice: "45.000đ",
    price: "35.000đ",
    rating: 5,
    badge: "SALE",
  },
  {
    image: "/images/denngu.jpg",
    name: "Đèn ngủ gấu ngọt ngào",
    oldPrice: "250.000đ",
    price: "180.000đ",
    rating: 5,
    badge: "NEW",
  },
  {
    image: "/images/giaygoi.png",
    name: "Giấy gói quà sinh nhật",
    oldPrice: "30.000đ",
    price: "15.000đ",
    rating: 4,
    badge: "HOT",
  },
  {
    image: "/images/tuigiay.png",
    name: "Túi giấy đựng quà",
    oldPrice: "45.000đ",
    price: "35.000đ",
    rating: 4,
    badge: "HOT",
  },
  {
    image: "/images/pearl-bracelet.jpg",
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