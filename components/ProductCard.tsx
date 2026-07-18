type Product = {
  image: string;
  name: string;
  price: string;
  oldPrice?: string;
  rating?: number;
  badge?: string;
};

export default function ProductCard({
  image,
  name,
  price,
  oldPrice,
  rating = 5,
  badge,
}: Product) {
  return (
    <div className="group overflow-hidden rounded-3xl bg-white shadow-md transition hover:-translate-y-2 hover:shadow-xl">

      <div className="relative">

        <img
          src={image}
          alt={name}
          className="h-64 w-full object-cover transition group-hover:scale-105"
        />


        {badge && (
          <span className="absolute left-4 top-4 rounded-full bg-pink-500 px-3 py-1 text-sm text-white">
            {badge}
          </span>
        )}


        <button className="absolute right-4 top-4 rounded-full bg-white p-2 shadow">
          ❤️
        </button>

      </div>


      <div className="p-5">

        <h3 className="text-lg font-semibold">
          {name}
        </h3>


        <div className="mt-2">
          {"⭐".repeat(rating)}
        </div>


        <div className="mt-3">

          {oldPrice && (
            <span className="mr-2 text-gray-400 line-through">
              {oldPrice}
            </span>
          )}

          <span className="text-xl font-bold text-pink-500">
            {price}
          </span>

        </div>


        <button className="mt-5 w-full rounded-full bg-pink-500 py-3 text-white hover:bg-pink-600">
          Add to Cart 🛒
        </button>

      </div>

    </div>
  );
}