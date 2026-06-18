import { MdOutlineChair } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";

import hero_1 from "../assets/images/hero_01.webp";
import hero_2 from "../assets/images/hero_02.webp";
import hero_3 from "../assets/images/hero_3.webp";
import RoomImage from "../assets/Product_images/RoomImage.webp";

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

import SaleA from "../assets/Product_images/sela1.webp";
import SaleB from "../assets/Product_images/sela2.webp";
import SaleC from "../assets/Product_images/sale3.webp";
import { FaInstagram } from "react-icons/fa6";

import InstaA from "../assets/Product_images/insta1.webp";
import InstaB from "../assets/Product_images/insta2.webp";
import InstaC from "../assets/Product_images/insta3.webp";
import InstaD from "../assets/Product_images/insta4.webp";
import InstaE from "../assets/Product_images/insta5.webp";
import InstaF from "../assets/Product_images/insta6.webp";

import { useEffect, useState } from "react";

function Home() {
  const [timeLeft, setTimeLeft] = useState(220 * 24 * 60 * 60);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: hero_1,
      
    },
    {
      id: 2,
      image: hero_2,
     
    },
    {
      id: 3,
      image: hero_3,
     
    },
  ];

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  const days = Math.floor(timeLeft / (24 * 60 * 60));
  const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
  const mins = Math.floor((timeLeft % (60 * 60)) / 60);
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

  const images = [InstaA, InstaB, InstaC, InstaD, InstaE, InstaF];

  const topSeller = [
    {
      id: 1,
      image: SaleA,
      title: "Lounge Deep Chaise Lounge",
      price: "20000 Frw",
    },
    {
      id: 2,
      image: SaleB,
      title: "Lounge Deep Chaise Lounge",
      price: "20000 Frw",
    },
    {
      id: 3,
      image: SaleC,
      title: "Lounge Deep Chaise Lounge",
      price: "20000 Frw",
    },
  ];

  return (
    <>
      <section className="w-screen h-[120vh] mt-20 px-10">
        <div className="w-full h-[40%] pt-20">
          <div className="flex items-center">
            <div>
              <button className="relative overflow-hidden bg-[#FFA832] px-8 py-3 rounded-4xl group">
                <span className="absolute inset-0 bg-gray-800 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></span>
                <MdOutlineChair className="relative z-10 text-4xl text-white" />
              </button>
            </div>
            <div className="flex">
              <div className="ml-4">
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-Bricolage font-bold">
                  Elevate Your Lifestyle
                </p>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <p className="font-Bricolage font-bold text-3xl sm:text-4xl md:text-5xl lg:text-5xl">
              with Our Furniture
              <br />
            </p>
          </div>
          <div className="mt-2 flex">
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-Bricolage font-bold"></p>
            <button className="relative overflow-hidden group rounded-4xl text-sm bg-[#FFA832] ml-4 font-bold text-white px-6 py-3">
              <span className="absolute w-full h-full inset-0 flex items-center justify-center bg-gray-900 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 text-white"></span>
              <span className="relative z-10">Shop now</span>
            </button>
          </div>
        </div>

        <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] rounded-4xl overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{
              backgroundImage: `url(${slides[currentSlide].image})`,
            }}
          >
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">
              {slides[currentSlide].title}
            </h1>
            <p className="text-white mt-4 text-lg md:text-xl">
              {slides[currentSlide].subtitle}
            </p>
            {/* <button className="mt-6 px-8 py-3 bg-orange-500 rounded-full text-white font-bold hover:bg-orange-600 transition duration-300">
              Shop Now
            </button> */}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg z-20 hover:bg-gray-100 transition duration-300"
          >
            <FaArrowLeft className="text-black text-xl" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg z-20 hover:bg-gray-100 transition duration-300"
          >
            <FaArrowRight className="text-black text-xl" />
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition duration-300 ${
                  currentSlide === index ? "bg-orange-500" : "bg-white/70"
                }`}
              />
            ))}
          </div>
        </section>
      </section>

      <section className="w-full px-6 py-10 bg-[#f5f5f5]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group relative h-[500px] rounded-[35px] overflow-hidden">
            <img
              src={living}
              alt="living"
              className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 bg-white px-8 py-4 rounded-tr-[30px] text-lg font-medium transition duration-300 hover:text-orange-500 cursor-pointer">
              LIVING ROOM
            </div>
          </div>

          <div className="group relative h-[500px] rounded-[35px] overflow-hidden">
            <img
              src={bedroom}
              alt="bedroom"
              className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 bg-white px-8 py-4 rounded-tr-[30px] text-lg font-medium transition duration-300 hover:text-orange-500 cursor-pointer">
              BED ROOM
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="group relative h-[240px] rounded-[35px] overflow-hidden">
              <img
                src={kitchen}
                alt="kitchen"
                className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 right-0 bg-white px-8 py-4 rounded-tl-[30px] text-lg font-medium transition duration-300 hover:text-orange-500 cursor-pointer">
                KITCHEN
              </div>
            </div>

            <div className="group relative h-[240px] rounded-[35px] overflow-hidden">
              <img
                src={kidroom}
                alt="kidroom"
                className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
              />
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

      <section className="flex justify-center items-center w-full px-6 py-10 bg-white mt-12">
        <div className="flex gap-5 overflow-x-auto md:grid md:grid-cols-3 xl:grid-cols-4">
          {Products.map((i) => (
            <div
              key={i.id}
              className="min-w-[300px] md:min-w-0 rounded-xl overflow-hidden bg-white"
            >
              <div className="w-full rounded-1xl overflow-hidden">
                <img
                  src={i.image}
                  alt={i.title}
                  className="w-full h-[350px] object-cover transition duration-700 hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h1 className="text-xl font-extra">{i.title}</h1>
                <p className="text-orange-500 mt-2">{i.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="w-full flex justify-center">
        <button className="relative px-7 py-3 border border-gray-200 hover:text-white group rounded-4xl text-center font-bold overflow-hidden">
          <span className="absolute w-full h-full inset-0 bg-orange-500 -translate-x-full transition-transform group-hover:translate-x-0 duration-500"></span>
          <span className="relative z-10">Shop All Products</span>
        </button>
      </div>

      <section className="w-full px-6 py-10 bg-white mt-12">
        <div className="w-full min-h-[500px] grid md:flex">
          <div
            style={{ backgroundImage: `url(${ImageVideo})` }}
            className="w-full md:w-1/2 bg-cover bg-center min-h-[300px]"
          ></div>

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
                Use this text to share information about your <br />
                brand with your customers. Describe a product, share
                announcements, or welcome customers to your store.
              </p>

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

              <div className="w-full flex justify-center">
                <button className="relative px-6 py-3 bg-orange-400 font-bold rounded-3xl text-white cursor-pointer group overflow-hidden">
                  <span className="absolute w-full h-full inset-0 bg-gray-900 translate-x-full group-hover:translate-x-0 transition-transform duration-500 rounded-3xl"></span>
                  <span className="relative z-10">Shop the sale</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-10 bg-white">
        <div
          style={{ backgroundImage: `url(${RoomImage})` }}
          className="relative w-full h-[90vh] rounded-[35px] bg-cover bg-center overflow-hidden"
        >
          <div className="absolute top-5 right-5">
            <p className="uppercase tracking-[4px] text-sm text-gray-700">
              Craft Own Furniture
            </p>
          </div>

          <div className="absolute top-12 right-0 bg-white px-10 py-8 rounded-l-[30px] rounded-tr-[30px] shadow-sm">
            <h1 className="text-2xl md:text-4xl font-bold font-Bricolage">
              Your new forever
              <br />
              favorites are here
            </h1>
          </div>

          <div className="absolute top-[30%] left-[50%] w-6 h-6 bg-white rounded-full border-4 border-white cursor-pointer"></div>
          <div className="absolute bottom-[18%] left-[13%] w-6 h-6 bg-white rounded-full border-4 border-white cursor-pointer"></div>
          <div className="absolute bottom-[19%] left-[64%] w-6 h-6 bg-white rounded-full border-4 border-white cursor-pointer"></div>
        </div>
      </section>

      <section className="w-full px-4 py-10 bg-white">
        <div className="flex gap-5 overflow-x-auto md:grid md:grid-cols-3 xl:grid-cols-4 md:place-items-center">
          {topSeller.map((e) => (
            <div
              key={e.id}
              className="group relative min-w-[300px] md:min-w-0 rounded-xl overflow-hidden bg-white"
            >
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={e.image}
                  alt={e.title}
                  className="w-full h-[350px] object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-5 right-5 bg-gray-800 text-white p-4 rounded-full translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 cursor-pointer hover:bg-orange-500">
                  <FiShoppingBag className="text-2xl" />
                </div>
              </div>
              <div className="p-4">
                <h1 className="text-xl font-extra">{e.title}</h1>
                <p className="text-orange-500 mt-2">{e.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full bg-[#f5f5f5] py-16 px-5 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="uppercase tracking-[4px] text-sm text-orange-500 font-semibold">
                Instagram Shop
              </p>
              <h1 className="text-4xl md:text-5xl font-bold font-Bricolage leading-tight max-w-[500px]">
                Discover inspiration from our furniture
              </h1>
              <p className="text-gray-500 text-base md:text-lg leading-8 max-w-[550px]">
                Tag @miniture in your Instagram photos for a chance to be
                featured here. Discover beautiful furniture ideas and modern
                interior inspiration.
              </p>
            </div>

            <button className="relative overflow-hidden border border-gray-300 rounded-full px-8 py-4 font-semibold group">
              <span className="absolute inset-0 bg-orange-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
              <span className="relative z-10 group-hover:text-white transition">
                Visit Our Instagram
              </span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-[25px]"
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-[250px] md:h-[320px] object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-4 right-4 w-14 h-14 rounded-full bg-orange-400 flex items-center justify-center text-white text-xl cursor-pointer transition duration-300 hover:scale-110 hover:bg-orange-500">
                  <FaInstagram />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;






// import { MdOutlineChair } from "react-icons/md";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import { MdKeyboardArrowDown } from "react-icons/md";
// import { FiShoppingBag } from "react-icons/fi";

// import hero_1 from "../assets/images/hero_01.webp";
// import hero_2 from "../assets/images/hero_01.webp";
// import hero_3 from "../assets/images/hero_01.webp";
// import RoomImage from "../assets/Product_images/RoomImage.webp";

// import living from "../assets/images/living.webp";
// import bedroom from "../assets/images/bedroom.webp";
// import kitchen from "../assets/images/kitchen.webp";
// import kidroom from "../assets/images/kidroom.webp";

// import ProductA from "../assets/Product_images/product_1.webp";
// import ProductB from "../assets/Product_images/product_2.webp";
// import ProductC from "../assets/Product_images/product_3.webp";
// import Productd from "../assets/Product_images/product_4.webp";
// import ProductE from "../assets/Product_images/product_5.webp";
// import ProductF from "../assets/Product_images/product_6.webp";
// import ProductG from "../assets/Product_images/product_7.webp";
// import ProductH from "../assets/Product_images/product_8.webp";
// import ImageVideo from "../assets/Product_images/video.webp";

// import SaleA from "../assets/Product_images/sela1.webp";
// import SaleB from "../assets/Product_images/sela2.webp";
// import SaleC from "../assets/Product_images/sale3.webp";
// import { FaInstagram } from "react-icons/fa6";

// import InstaA from "../assets/Product_images/insta1.webp";
// import InstaB from "../assets/Product_images/insta2.webp";
// import InstaC from "../assets/Product_images/insta3.webp";
// import InstaD from "../assets/Product_images/insta4.webp";
// import InstaE from "../assets/Product_images/insta5.webp";
// import InstaF from "../assets/Product_images/insta6.webp";

// import { useEffect, useState } from "react";

// function Home() {
//   const [timeLeft, setTimeLeft] = useState(220 * 24 * 60 * 60);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 0) {
//           clearInterval(interval);
//           return 0;
//         }

//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//   const interval = setInterval(() => {
//     setCurrentSlide((prev) =>
//       prev === slides.length - 1 ? 0 : prev + 1
//     );
//   }, 60000); // 1 minute

//   return () => clearInterval(interval);
// }, []);

// const nextSlide = () => {
//   setCurrentSlide((prev) =>
//     prev === slides.length - 1 ? 0 : prev + 1
//   );
// };

// const prevSlide = () => {
//   setCurrentSlide((prev) =>
//     prev === 0 ? slides.length - 1 : prev - 1
//   );
// };

//   const days = Math.floor(timeLeft / (24 * 60 * 60));

//   const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));

//   const mins = Math.floor((timeLeft % (60 * 60)) / 60);

//   const secs = timeLeft % 60;

//   const Products = [
//     {
//       id: 1,
//       title: "Ana Gray Dining Chair",
//       price: "299 Frw",
//       image: ProductA,
//     },
//     {
//       id: 2,
//       title: "Natural Wood Dining Chair",
//       price: "300 Frw",
//       image: ProductB,
//     },
//     {
//       id: 3,
//       title: "Paolo Black Wood Dining Chair",
//       price: "400 Frw",
//       image: ProductC,
//     },
//     {
//       id: 4,
//       title: "Curved Back Dining Chair",
//       price: "200 Frw",
//       image: Productd,
//     },
//     {
//       id: 5,
//       title: "Natural Wood Dining Chair",
//       price: "300 Frw",
//       image: ProductE,
//     },
//     {
//       id: 6,
//       title: "Paolo Black Wood Dining Chair",
//       price: "400 Frw",
//       image: ProductF,
//     },
//     {
//       id: 7,
//       title: "Curved Back Dining Chair",
//       price: "200 Frw",
//       image: ProductG,
//     },
//     {
//       id: 8,
//       title: "Curved Back Dining Chair",
//       price: "200 Frw",
//       image: ProductH,
//     },
//   ];
//   const images = [InstaA, InstaB, InstaC, InstaD, InstaE, InstaF];

//   const topSeller = [
//     {
//       id: 1,
//       image: SaleA,
//       title: "Lounge Deep Chaise Lounge",
//       price: "20000 Frw",
//     },
//     {
//       id: 2,
//       image: SaleB,
//       title: "Lounge Deep Chaise Lounge",
//       price: "20000 Frw",
//     },
//     {
//       id: 3,
//       image: SaleC,
//       title: "Lounge Deep Chaise Lounge",
//       price: "20000 Frw",
//     },
//   ];
//   const slides = [
//   {
//     id: 1,
//     image: hero_1,
//     title: "Modern Furniture Collection",
//     subtitle: "Elevate your living space",
//   },
//   {
//     id: 2,
//     image: hero_2,
//     title: "Comfort Meets Style",
//     subtitle: "Premium furniture for your home",
//   },
//   {
//     id: 3,
//     image: hero_3,
//     title: "Create Your Dream Interior",
//     subtitle: "Discover unique designs",
//   },
// ];

//   return (
//     <>
//       <section className="w-screen h-[120vh] mt-20 px-10">
//         <div className=" w-full h-[40%] pt-20">
//           <div className="flex items-center">
//             <div>
//               <button className=" relative overflow-hidden bg-[#FFA832] px-8 py-3 rounded-4xl group">
//                 {/* Background animation */}
//                 <span className="absolute inset-0 bg-gray-800 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></span>

//                 {/* Icon */}
//                 <MdOutlineChair
//                   className="
//       relative z-10
//       text-4xl
//       text-white
//     "
//                 />
//               </button>
//             </div>
//             <div className="flex">
//               <div className="ml-4">
//                 <p className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-Bricolage font-bold">
//                   Elevate Your Lifestyle
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="mt-2">
//             <p className=" font-Bricolage font-bold text-3xl sm:text-4xl md:text-5xl lg:text-5xl">
//               with Our Furniture
//               <br />
//             </p>
//           </div>
//           <div className="mt-2 flex">
//             <p className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-Bricolage font-bold"></p>
//             <button className="relative overflow-hidden group rounded-4xl text-sm bg-[#FFA832] ml-4 font-bold text-white px-6 py-3">
//               <span className="absolute w-full h-full inset-0 flex items-center justify-center bg-gray-900 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 text-white "></span>
//               <span className="relative z-10">Shop now</span>
//             </button>
//           </div>
//         </div>

//         <section
//   className="
//   relative
//   w-full
//   h-[50vh]
//   sm:h-[60vh]
//   md:h-[70vh]
//   rounded-4xl
//   overflow-hidden
//   "
// >
//   <div
//     className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
//     style={{
//       backgroundImage: `url(${slides[currentSlide].image})`,
//     }}
//   >
//     <div className="absolute inset-0 bg-black/30"></div>
//   </div>

//   {/* CONTENT */}
//   <div
//     className="
//     relative
//     z-10
//     h-full
//     flex
//     flex-col
//     items-center
//     justify-center
//     text-center
//     px-4
//     "
//   >
//     <h1
//       className="
//       text-3xl
//       md:text-5xl
//       lg:text-6xl
//       font-bold
//       text-white
//       "
//     >
//       {slides[currentSlide].title}
//     </h1>

//     <p className="text-white mt-4 text-lg md:text-xl">
//       {slides[currentSlide].subtitle}
//     </p>

//     <button
//       className="
//       mt-6
//       px-8
//       py-3
//       bg-orange-500
//       rounded-full
//       text-white
//       font-bold
//       "
//     >
//       Shop Now
//     </button>
//   </div>

//   {/* LEFT */}
//   <button
//     onClick={prevSlide}
//     className="
//     absolute
//     left-4
//     top-1/2
//     -translate-y-1/2
//     bg-white
//     p-3
//     rounded-full
//     shadow-lg
//     z-20
//     "
//   >
//     <FaArrowLeft className="text-black text-xl" />
//   </button>

//   {/* RIGHT */}
//   <button
//     onClick={nextSlide}
//     className="
//     absolute
//     right-4
//     top-1/2
//     -translate-y-1/2
//     bg-white
//     p-3
//     rounded-full
//     shadow-lg
//     z-20
//     "
//   >
//     <FaArrowRight className="text-black text-xl" />
//   </button>

//   {/* DOTS */}
//   <div
//     className="
//     absolute
//     bottom-5
//     left-1/2
//     -translate-x-1/2
//     flex
//     gap-3
//     z-20
//     "
//   >
//     {slides.map((slide, index) => (
//       <button
//         key={slide.id}
//         onClick={() => setCurrentSlide(index)}
//         className={`
//           w-3 h-3 rounded-full
//           ${
//             currentSlide === index
//               ? "bg-orange-500"
//               : "bg-white"
//           }
//         `}
//       />
//     ))}
//   </div>
// </section>

//         {/* <section
//           className="w-full h-[70vh] bg-cover bg-center rounded-4xl flex items-center justify-center text-white"
//           style={{ backgroundImage: `url(${hero_1})` }}
//         >
//           <div className="bg-black-300/50 w-full h-full inset-0 flex items-center justify-between p-10">
//             <FaArrowLeft className="text-5xl text-black bg-amber-100 p-3 rounded-full" />
//             <FaArrowRight className="text-5xl text-black bg-amber-100 p-3 rounded-full" />
//           </div>
//         </section>
//       </section> */}
//       <section className="w-full px-6 py-10 bg-[#f5f5f5]">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* LEFT CARD */}
//           <div className="group relative h-[500px] rounded-[35px] overflow-hidden">
//             <img
//               src={living}
//               alt="living"
//               className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
//             />

//             {/* LABEL */}
//             <div className="absolute bottom-0 left-0 bg-white px-8 py-4 rounded-tr-[30px] text-lg font-medium transition duration-300 hover:text-orange-500 cursor-pointer">
//               LIVING ROOM
//             </div>
//           </div>

//           {/* CENTER CARD */}
//           <div className="group relative h-[500px] rounded-[35px] overflow-hidden">
//             <img
//               src={bedroom}
//               alt="bedroom"
//               className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
//             />

//             {/* LABEL */}
//             <div className="absolute bottom-0 left-0 bg-white px-8 py-4 rounded-tr-[30px] text-lg font-medium transition duration-300 hover:text-orange-500 cursor-pointer">
//               BED ROOM
//             </div>
//           </div>

//           {/* RIGHT COLUMN */}
//           <div className="flex flex-col gap-6">
//             {/* KITCHEN */}
//             <div className="group relative h-[240px] rounded-[35px] overflow-hidden">
//               <img
//                 src={kitchen}
//                 alt="kitchen"
//                 className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
//               />

//               {/* LABEL */}
//               <div className="absolute bottom-0 right-0 bg-white px-8 py-4 rounded-tl-[30px] text-lg font-medium transition duration-300 hover:text-orange-500 cursor-pointer">
//                 KITCHEN
//               </div>
//             </div>

//             {/* KID ROOM */}
//             <div className="group relative h-[240px] rounded-[35px] overflow-hidden">
//               <img
//                 src={kidroom}
//                 alt="kidroom"
//                 className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
//               />

//               {/* LABEL */}
//               <div className="absolute bottom-0 right-0 bg-white px-8 py-4 rounded-tl-[30px] text-lg font-medium transition duration-300 hover:text-orange-500 cursor-pointer">
//                 KID ROOM
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <div>
//         <p className="text-gray-400 mt-10 text-4xl text-center font-bold">
//           You are in
//           <span className="text-black border-b-2 border-orange-500 pb-1 inline-flex items-center gap-1 hover:cursor-pointer">
//             Kitchen
//             <MdKeyboardArrowDown className="text-[20px]" />
//           </span>
//         </p>
//       </div>

//       <section className="flex justify-center items-center w-full px-6 py-10 bg-white mt-12">
//         <div
//           className="
//     flex gap-5 overflow-x-auto
//     md:grid md:grid-cols-3
//     xl:grid-cols-4
//   "
//         >
//           {Products.map((i) => (
//             <div
//               key={i.id}
//               className="
//           min-w-[300px]
//           md:min-w-0
//           rounded-xl
//           overflow-hidden
//           bg-white
//         "
//             >
//               {/* IMAGE */}
//               <div className="w-full rounded-1xl overflow-hidden">
//                 <img
//                   src={i.image}
//                   alt={i.title}
//                   className="
//               w-full
//               h-[350px]
//               object-cover
//               transition
//               duration-700
//               hover:scale-110
//             "
//                 />
//               </div>

//               {/* CONTENT */}
//               <div className="p-4">
//                 <h1 className="text-xl font-extra">{i.title}</h1>

//                 <p className="text-orange-500 mt-2">{i.price}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//       <div className="w-full flex justify-center">
//         <button className="relative px-7 py-3 border border-gray-200 hover:text-white group rounded-4xl text-center font-bold overflow-hidden ">
//           <span className="absolute w-full h-full inset-0 bg-orange-500 -translate-x-full transition-transform group-hover:translate-0 duration-500 "></span>
//           <span className="relative z-10 ">Shop All Products</span>
//         </button>
//       </div>

//       <section className="w-full px-6 py-10 bg-white mt-12">
//         <div className="w-full min-h-[500px] grid md:flex">
//           {/* Image */}
//           <div
//             style={{ backgroundImage: `url(${ImageVideo})` }}
//             className="w-full md:w-1/2 bg-cover bg-center min-h-[300px]"
//           ></div>

//           {/* Content */}
//           <div className="w-full md:w-1/2 grid p-10 items-center justify-center">
//             <div className="grid gap-6">
//               <p className="text-center font-Outfit text-sm">
//                 LIMITED TIME ONLY
//               </p>

//               <p className="text-3xl md:text-5xl text-center font-Maven">
//                 The living room event up
//                 <br />
//                 to 30% off
//               </p>

//               <p className="text-center md:text-center text-xl text-gray-400">
//                 Use this text to share information about your <br />
//                 brand with your customers. Describe a product, share
//                 announcements, or welcome customers to your store.
//               </p>

//               {/* TIMER */}
//               <div className="flex justify-center gap-4 flex-wrap mt-6">
//                 <div className="w-28 h-28 rounded-full border border-gray-300 flex flex-col items-center justify-center">
//                   <h1 className="text-5xl font-bold">{days}</h1>
//                   <p className="text-xl">Days</p>
//                 </div>

//                 <div className="w-28 h-28 rounded-full border border-gray-300 flex flex-col items-center justify-center">
//                   <h1 className="text-5xl font-bold">{hours}</h1>
//                   <p className="text-xl">Hours</p>
//                 </div>

//                 <div className="w-28 h-28 rounded-full border border-gray-300 flex flex-col items-center justify-center">
//                   <h1 className="text-5xl font-bold">{mins}</h1>
//                   <p className="text-xl">Mins</p>
//                 </div>

//                 <div className="w-28 h-28 rounded-full border border-gray-300 flex flex-col items-center justify-center">
//                   <h1 className="text-5xl font-bold">{secs}</h1>
//                   <p className="text-xl">Secs</p>
//                 </div>
//               </div>

//               <div className="w-full flex justify-center">
//                 <button className="relative px-6 py-3 bg-orange-400 font-bold rounded-3xl text-white cursor-pointer group overflow-hidden">
//                   <span className="absolute w-full h-full inset-0 bg-gray-900 translate-x-full group-hover:translate-0 transition-transform duration-500 rounded-3xl"></span>
//                   <span className="relative z-10">Shop the sale</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="w-full px-4 py-10 bg-white">
//         <div
//           style={{ backgroundImage: `url(${RoomImage})` }}
//           className="
//       relative
//       w-full
//       h-[90vh]
//       rounded-[35px]
//       bg-cover
//       bg-center
//       overflow-hidden
//     "
//         >
//           {/* TOP RIGHT TEXT */}
//           <div className="absolute top-5 right-5">
//             <p className="uppercase tracking-[4px] text-sm text-gray-700">
//               Craft Own Furniture
//             </p>
//           </div>

//           {/* WHITE CARD */}
//           <div
//             className="
//         absolute
//         top-12
//         right-0
//         bg-white
//         px-10
//         py-8
//         rounded-l-[30px]
//         rounded-tr-[30px]
//         shadow-sm
//       "
//           >
//             <h1
//               className="
//           text-2xl
//           md:text-4xl
//           font-bold
//           font-Bricolage
//         "
//             >
//               Your new forever
//               <br />
//               favorites are here
//             </h1>
//           </div>

//           {/* DOT 1 */}
//           <div
//             className="
//         absolute
//         top-[30%]
//         left-[50%]
//         w-6
//         h-6
//         bg-white
//         rounded-full
//         border-4
//         border-white
//         cursor-pointer
//       "
//           ></div>

//           {/* DOT 2 */}
//           <div
//             className="
//         absolute
//         bottom-[18%]
//         left-[13%]
//         w-6
//         h-6
//         bg-white
//         rounded-full
//         border-4
//         border-white
//         cursor-pointer
//       "
//           ></div>

//           {/* DOT 3 */}
//           <div
//             className="
//         absolute
//         bottom-[19%]
//         left-[64%]
//         w-6
//         h-6
//         bg-white
//         rounded-full
//         border-4
//         border-white
//         cursor-pointer
//       "
//           ></div>
//         </div>
//       </section>

//       <section className="w-full px-4 py-10 bg-white">
//         <div
//           className="
//       flex gap-5 overflow-x-auto
//       md:grid md:grid-cols-3
//       xl:grid-cols-4
//       md:place-items-center
//     "
//         >
//           {topSeller.map((e) => (
//             <div
//               key={e.id}
//               className="
//           group
//           relative
//           min-w-[300px]
//           md:min-w-0
//           rounded-xl
//           overflow-hidden
//           bg-white
//         "
//             >
//               {/* IMAGE CONTAINER */}
//               <div className="relative overflow-hidden rounded-xl">
//                 <img
//                   src={e.image}
//                   alt={e.title}
//                   className="
//               w-full
//               h-[350px]
//               object-cover
//               transition
//               duration-700
//               group-hover:scale-110
//             "
//                 />

//                 {/* BAG BUTTON */}
//                 <div
//                   className="
//               absolute
//               bottom-5
//               right-5
//               bg-gray-800
//               text-white
//               p-4
//               rounded-full
//               translate-y-20
//               opacity-0
//               group-hover:translate-y-0
//               group-hover:opacity-100
//               transition-all
//               duration-500
//               cursor-pointer
//               hover:bg-orange-500
//             "
//                 >
//                   <FiShoppingBag className="text-2xl" />
//                 </div>
//               </div>

//               {/* CONTENT */}
//               <div className="p-4">
//                 <h1 className="text-xl font-extra">{e.title}</h1>

//                 <p className="text-orange-500 mt-2">{e.price}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="w-full bg-[#f5f5f5] py-16 px-5 lg:px-20">
//         <div
//           className="
//           grid
//           grid-cols-1
//           lg:grid-cols-2
//           gap-14
//           items-center
//         "
//         >
//           {/* LEFT CONTENT */}
//           <div className="space-y-8">
//             <div className="space-y-5">
//               <p
//                 className="
//                 uppercase
//                 tracking-[4px]
//                 text-sm
//                 text-orange-500
//                 font-semibold
//               "
//               >
//                 Instagram Shop
//               </p>

//               <h1
//                 className="
//                 text-4xl
//                 md:text-5xl
//                 font-bold
//                 font-Bricolage
//                 leading-tight
//                 max-w-[500px]
//               "
//               >
//                 Discover inspiration from our furniture
//               </h1>

//               <p
//                 className="
//                 text-gray-500
//                 text-base
//                 md:text-lg
//                 leading-8
//                 max-w-[550px]
//               "
//               >
//                 Tag @miniture in your Instagram photos for a chance to be
//                 featured here. Discover beautiful furniture ideas and modern
//                 interior inspiration.
//               </p>
//             </div>

//             {/* BUTTON */}
//             <button
//               className="
//               relative
//               overflow-hidden
//               border
//               border-gray-300
//               rounded-full
//               px-8
//               py-4
//               font-semibold
//               group
//             "
//             >
//               {/* HOVER BG */}
//               <span
//                 className="
//                 absolute
//                 inset-0
//                 bg-orange-500
//                 -translate-x-full
//                 group-hover:translate-x-0
//                 transition-transform
//                 duration-500
//               "
//               ></span>

//               {/* TEXT */}
//               <span
//                 className="
//                 relative
//                 z-10
//                 group-hover:text-white
//                 transition
//               "
//               >
//                 Visit Our Instagram
//               </span>
//             </button>
//           </div>

//           {/* RIGHT IMAGES */}
//           <div
//             className="
//             grid
//             grid-cols-2
//             md:grid-cols-3
//             gap-5
//           "
//           >
//             {images.map((img, index) => (
//               <div
//                 key={index}
//                 className="
//                 relative
//                 group
//                 overflow-hidden
//                 rounded-[25px]
//               "
//               >
//                 {/* IMAGE */}
//                 <img
//                   src={img}
//                   alt=""
//                   className="
//                   w-full
//                   h-[250px]
//                   md:h-[320px]
//                   object-cover
//                   transition
//                   duration-700
//                   group-hover:scale-110
//                 "
//                 />

//                 {/* ICON */}
//                 <div
//                   className="
//                   absolute
//                   bottom-4
//                   right-4
//                   w-14
//                   h-14
//                   rounded-full
//                   bg-orange-400
//                   flex
//                   items-center
//                   justify-center
//                   text-white
//                   text-xl
//                   cursor-pointer
//                   transition
//                   duration-300
//                   hover:scale-110
//                   hover:bg-orange-500
//                 "
//                 >
//                   <FaInstagram />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
// export default Home;
