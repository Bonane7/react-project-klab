import { MdOutlineChair } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import hero_1 from "../assets/images/hero_01.webp";

import living from "../assets/images/living.webp";
import bedroom from "../assets/images/bedroom.webp";
import kitchen from "../assets/images/kitchen.webp";
import kidroom from "../assets/images/kidroom.webp";

import ProductA from "../assets/Product_images/product_1.webp";
import ProductB from "../assets/Product_images/product_2.webp";
import ProductC from "../assets/Product_images/product_3.webp";
import Productd from "../assets/Product_images/product_4.webp";
import ProductE from "../assets/Product_images/product_5.webp";
import ProductF from "../assets/Product_images/product_6.webp";
import ProductG from "../assets/Product_images/product_7.webp";
import ProductH from "../assets/Product_images/product_8.webp";

function Home() {
  const Products = [
    {
      id: 1,
      title: "Ana Gray Dining Chair",
      price: "299 Frw",
      image: ProductA,
    },
    {
      id: 2,
      title: "Natural Wood Dining Chair",
      price: "300 Frw",
      image: ProductB,
    },
    {
      id: 3,
      title: "Paolo Black Wood Dining Chair",
      price: "400 Frw",
      image: ProductC,
    },
    {
      id: 4,
      title: "Curved Back Dining Chair",
      price: "200 Frw",
      image: Productd,
    },
    {
      id: 5,
      title: "Natural Wood Dining Chair",
      price: "300 Frw",
      image: ProductE,
    },
    {
      id: 6,
      title: "Paolo Black Wood Dining Chair",
      price: "400 Frw",
      image: ProductF,
    },
    {
      id: 7,
      title: "Curved Back Dining Chair",
      price: "200 Frw",
      image: ProductG,
    },
    {
      id: 8,
      title: "Curved Back Dining Chair",
      price: "200 Frw",
      image: ProductH,
    },
  ];

  return (
    <>
      <section className="w-screen h-[120vh] mt-20 px-10">
        <div className=" w-full h-[40%] pt-20">
          <div className="flex items-center">
            <div>
              <button className="bg-[#FFA832] px-8 py-3 rounded-4xl ">
                <MdOutlineChair className="text-4xl text-white" />
              </button>
            </div>
            <div className="flex">
              <div className="ml-4">
                <p className="text-5xl font-Bricolage font-bold">
                  Elevate Your Lifestyle
                </p>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-5xl font-Bricolage font-bold">
              with Our Furniture
              <br />
            </p>
          </div>
          <div className="mt-2 flex">
            <p className="text-5xl font-Bricolage font-bold"> Creations </p>
            <span className="rounded-4xl text-sm bg-[#FFA832] px-3 py-3 ml-4 font-bold text-white">
              Shop now
            </span>
          </div>
        </div>
        <div
          className="w-full h-[70vh] bg-cover bg-center rounded-4xl flex items-center justify-center text-white"
          style={{ backgroundImage: `url(${hero_1})` }}
        >
          <div className="bg-black-300/50 w-full h-full inset-0 flex items-center justify-between p-10">
            <FaArrowLeft className="text-5xl text-black bg-amber-100 p-3 rounded-full" />
            <FaArrowRight className="text-5xl text-black bg-amber-100 p-3 rounded-full" />
          </div>
        </div>
      </section>
      <section className="w-full px-6 py-10 bg-[#f5f5f5]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT CARD */}
          <div className="group relative h-[500px] rounded-[35px] overflow-hidden">
            <img
              src={living}
              alt="living"
              className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
            />

            {/* LABEL */}
            <div className="absolute bottom-0 left-0 bg-white px-8 py-4 rounded-tr-[30px] text-lg font-medium transition duration-300 hover:text-orange-500 cursor-pointer">
              LIVING ROOM
            </div>
          </div>

          {/* CENTER CARD */}
          <div className="group relative h-[500px] rounded-[35px] overflow-hidden">
            <img
              src={bedroom}
              alt="bedroom"
              className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
            />

            {/* LABEL */}
            <div className="absolute bottom-0 left-0 bg-white px-8 py-4 rounded-tr-[30px] text-lg font-medium transition duration-300 hover:text-orange-500 cursor-pointer">
              BED ROOM
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-6">
            {/* KITCHEN */}
            <div className="group relative h-[240px] rounded-[35px] overflow-hidden">
              <img
                src={kitchen}
                alt="kitchen"
                className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
              />

              {/* LABEL */}
              <div className="absolute bottom-0 right-0 bg-white px-8 py-4 rounded-tl-[30px] text-lg font-medium transition duration-300 hover:text-orange-500 cursor-pointer">
                KITCHEN
              </div>
            </div>

            {/* KID ROOM */}
            <div className="group relative h-[240px] rounded-[35px] overflow-hidden">
              <img
                src={kidroom}
                alt="kidroom"
                className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
              />

              {/* LABEL */}
              <div className="absolute bottom-0 right-0 bg-white px-8 py-4 rounded-tl-[30px] text-lg font-medium transition duration-300 hover:text-orange-500 cursor-pointer">
                KID ROOM
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-10 bg-white">
        {/* MOBILE SCROLL */}
        <div
          className="
    flex gap-5 overflow-x-auto
    md:grid md:grid-cols-3
    xl:grid-cols-4
  "
        >
          {Products.map((i) => (
            <div
              key={i.id}
              className="
          min-w-[300px]
          md:min-w-0
          rounded-xl
          overflow-hidden
          bg-white
        "
            >
              {/* IMAGE */}
              <div className="w-full rounded-1xl overflow-hidden">
                <img
                  src={i.image}
                  alt={i.title}
                  className="
              w-full
              h-[350px]
              object-cover
              transition
              duration-700
              hover:scale-110
            "
                />
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <h1 className="text-xl font-extra">{i.title}</h1>

                <p className="text-orange-500 mt-2">{i.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
export default Home;
