export default function Hero() {
  return (
    <section className="bg-[#FFF8FB]">

      <div className="
        mx-auto 
        flex 
        max-w-7xl 
        flex-col 
        items-center 
        gap-10 
        px-6 
        py-20
        md:flex-row
      ">


        {/* Left content */}
        <div className="flex-1">

          <p className="mb-4 text-lg text-pink-500">
            🌸 Welcome to
          </p>


          <h1 className="
            text-5xl 
            font-bold 
            leading-tight 
            text-gray-800
            md:text-6xl
          ">
            Bom Bàng Bang
            <br />
            Shop
          </h1>


          <p className="
            mt-6 
            text-xl 
            text-gray-500
          ">
            Cute Stationery • Beauty • Accessories
          </p>


          <button className="
            mt-8
            rounded-full
            bg-pink-500
            px-8
            py-4
            text-lg
            font-semibold
            text-white
            transition
            hover:bg-pink-600
          ">
            Shop Now 🛒
          </button>

        </div>



        {/* Right image */}
        <div className="flex-1">

          <div className="
            relative
            mx-auto
            h-96
            w-96
            overflow-hidden
            rounded-full
            bg-pink-100
          ">

            <img
              src="https://cdn.phototourl.com/free/2026-07-18-f45321b2-6b6b-4dca-8455-4a813f85018e.png"
              alt="Bom Bang Bang products"
              className="
                h-full
                w-full
                object-cover
              "
            />

          </div>

        </div>


      </div>

    </section>
  );
} 