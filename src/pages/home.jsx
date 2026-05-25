import { MdOutlineChair } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
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
import ImageVideo from "../assets/Product_images/video.webp";


import React, { useEffect, useState } from "react";




function Home() {
const [timeLeft, setTimeLeft] = useState(220 * 24 * 60 * 60);

useEffect(() => {

  const interval = setInterval(() => {

    setTimeLeft((prev) => {

      if (prev <= 0) {
        clearInterval(interval);
        return 0;
      }

      return prev - 1;

    });

  }, 1000);

  return () => clearInterval(interval);

}, []);

const days = Math.floor(timeLeft / (24 * 60 * 60));

const hours = Math.floor(
  (timeLeft % (24 * 60 * 60)) / (60 * 60)
);

const mins = Math.floor(
  (timeLeft % (60 * 60)) / 60
);

const secs = timeLeft % 60;



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
              <button className=" relative overflow-hidden bg-[#FFA832] px-8 py-3 rounded-4xl group">
                {/* Background animation */}
                <span className="absolute inset-0 bg-gray-800 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></span>

                {/* Icon */}
                <MdOutlineChair
                  className="
      relative z-10
      text-4xl
      text-white
    "
                />
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
            <button className="relative overflow-hidden group rounded-4xl text-sm bg-[#FFA832] ml-4 font-bold text-white px-6 py-3">
              <span className="absolute w-full h-full inset-0 flex items-center justify-center bg-gray-900 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 text-white "></span>
              <span className="relative z-10">Shop now</span>
            </button>
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

      <div>
        <p className="text-gray-400 mt-10 text-4xl text-center font-bold">
          You are in
          <span className="text-black border-b-2 border-orange-500 pb-1 inline-flex items-center gap-1 hover:cursor-pointer">
            Kitchen
            <MdKeyboardArrowDown className="text-[20px]" />
          </span>
        </p>
      </div>

      <section className="w-full px-6 py-10 bg-white mt-12">
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
      <div className="w-full flex justify-center">
       
          <button className="relative px-7 py-3 border border-gray-200 hover:text-white group rounded-4xl text-center font-bold overflow-hidden ">
            <span className="absolute w-full h-full inset-0 bg-orange-500 -translate-x-full transition-transform group-hover:translate-0 duration-500 ">

            </span>
            <span className="relative z-10 ">Shop All Products</span>
          </button>
        
      </div>

<section className="w-full px-6 py-10 bg-white mt-12">

  <div className="w-full min-h-[500px] grid md:flex">

    {/* Image */}
    <div
      style={{ backgroundImage: `url(${ImageVideo})` }}
      className="w-full md:w-1/2 bg-cover bg-center min-h-[300px]"
    >
    </div>

    {/* Content */}
    <div className="w-full md:w-1/2 grid p-10 items-center justify-center">

      <div className="grid gap-6">

        <p className="text-center font-Outfit text-sm">
          LIMITED TIME ONLY
        </p>

        <p className="text-3xl md:text-5xl text-center font-Maven">
          The living room event up
          <br />
          to 30% off
        </p>

        <p className="text-center md:text-center text-xl text-gray-400">
          Use this text to share information about your <br/>brand with your customers.
          Describe a product, share announcements, or welcome customers to your store.
        </p>

            {/* TIMER */}
            <div className="flex justify-center gap-4 flex-wrap mt-6">

              <div className="w-28 h-28 rounded-full border border-gray-300 flex flex-col items-center justify-center">
                <h1 className="text-5xl font-bold">{days}</h1>
                <p className="text-xl">Days</p>
              </div>

              <div className="w-28 h-28 rounded-full border border-gray-300 flex flex-col items-center justify-center">
                <h1 className="text-5xl font-bold">{hours}</h1>
                <p className="text-xl">Hours</p>
              </div>

              <div className="w-28 h-28 rounded-full border border-gray-300 flex flex-col items-center justify-center">
                <h1 className="text-5xl font-bold">{mins}</h1>
                <p className="text-xl">Mins</p>
              </div>

              <div className="w-28 h-28 rounded-full border border-gray-300 flex flex-col items-center justify-center">
                <h1 className="text-5xl font-bold">{secs}</h1>
                <p className="text-xl">Secs</p>
              </div>

            </div>

      </div>

    </div>

  </div>

</section>
    </>
  );
}
export default Home;
