import { MdOutlineChair } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import axios from "axios";

import hero_1 from "../assets/images/hero_01.webp";
import hero_2 from "../assets/images/hero_02.webp";
import hero_3 from "../assets/images/hero_3.webp";
import RoomImage from "../assets/Product_images/RoomImage.webp";

import living from "../assets/images/living.webp";
import bedroom from "../assets/images/bedroom.webp";
import kitchen from "../assets/images/kitchen.webp";
import kidroom from "../assets/images/kidroom.webp";

import ImageVideo from "../assets/Product_images/video.webp";

import SaleA from "../assets/Product_images/sela1.webp";
import SaleB from "../assets/Product_images/sela2.webp";
import SaleC from "../assets/Product_images/sale3.webp";
import { FaInstagram } from "react-icons/fa6";

import InstaA from "../assets/Product_images/insta1.webp";
import InstaB from "../assets/Product_images/insta2.webp";
import InstaC from "../assets/Product_images/temp3.webp";
import InstaD from "../assets/Product_images/temp4.webp";
import InstaE from "../assets/Product_images/temp5.webp";
import InstaF from "../assets/Product_images/temp6.webp";

import { useEffect, useState } from "react";
import ProductModal from "../components/ProductModal";
import { toast } from "react-toastify";

const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api_v1`;

function Home() {
  const [timeLeft, setTimeLeft] = useState(220 * 24 * 60 * 60);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addingToCart, setAddingToCart] = useState(null);

  const slides = [
    { id: 1, image: hero_1 },
    { id: 2, image: hero_2 },
    { id: 3, image: hero_3 },
  ];

  // ✅ Récupérer les produits depuis l'API (limité à 5)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/product/getProducts`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        let data = [];
        if (res.data) {
          if (Array.isArray(res.data)) {
            data = res.data;
          } else if (res.data.products && Array.isArray(res.data.products)) {
            data = res.data.products;
          } else if (res.data.data && Array.isArray(res.data.data)) {
            data = res.data.data;
          } else if (typeof res.data === 'object') {
            const values = Object.values(res.data);
            const arrayValue = values.find(v => Array.isArray(v));
            if (arrayValue) {
              data = arrayValue;
            }
          }
        }

        setProducts(data.slice(0, 5));
      } catch (err) {
        console.error("Failed to load products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    document.body.style.overflow = 'unset';
  };

  // ✅ Fonction pour ajouter au panier
  const addToCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add items to cart");
      return;
    }

    try {
      setAddingToCart(productId);
      const res = await axios.post(
        `${BASE_URL}/cart/add`,
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success("Product added to cart! 🛒");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error(error.response?.data?.message || "Failed to add to cart");
    } finally {
      setAddingToCart(null);
    }
  };

  const days = Math.floor(timeLeft / (24 * 60 * 60));
  const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
  const mins = Math.floor((timeLeft % (60 * 60)) / 60);
  const secs = timeLeft % 60;

  const images = [InstaA, InstaB, InstaC, InstaD, InstaE, InstaF];

  const topSeller = [
    { id: 1, image: SaleA, title: "Lounge Deep Chaise Lounge", price: "20000 Frw" },
    { id: 2, image: SaleB, title: "Lounge Deep Chaise Lounge", price: "20000 Frw" },
    { id: 3, image: SaleC, title: "Lounge Deep Chaise Lounge", price: "20000 Frw" },
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
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
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

      {/* ✅ Section produits avec bouton "Ajouter au panier" */}
      <section className="flex justify-center items-center w-full px-6 py-10 bg-white mt-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="min-w-[200px] rounded-xl overflow-hidden bg-white animate-pulse">
                <div className="w-full h-[250px] bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-gray-400 text-xl">No products available</p>
        ) : (
          <div className="flex gap-5 overflow-x-auto md:grid md:grid-cols-3 xl:grid-cols-5">
            {products.map((product) => {
              const imageUrl = product?.imageUrl || product?.image || null;
              const productName = product?.productName || product?.name || 'Product';
              const productPrice = product?.productPrice || product?.price || 0;
              const productId = product?._id || product?.id;

              return (
                <div
                  key={productId}
                  className="group relative min-w-[250px] md:min-w-0 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-shadow duration-300"
                >
                  <div 
                    className="w-full rounded-xl overflow-hidden bg-gray-100 cursor-pointer"
                    onClick={() => openModal(product)}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={productName}
                        className="w-full h-[250px] object-cover transition duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="w-full h-[250px] flex items-center justify-center text-gray-300 text-4xl">🛋️</div>';
                        }}
                      />
                    ) : (
                      <div className="w-full h-[250px] flex items-center justify-center text-gray-300 text-4xl">🛋️</div>
                    )}
                  </div>
                  <div className="p-4">
                    <h1 className="text-lg font-semibold truncate">{productName}</h1>
                    <p className="text-orange-500 mt-1 font-bold">FRw {Number(productPrice).toFixed(2)}</p>
                  </div>

                  {/* ✅ Bouton "Ajouter au panier" avec fonction API */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(productId);
                    }}
                    disabled={addingToCart === productId}
                    className="absolute bottom-20 right-4 bg-orange-500 text-white p-3 rounded-full shadow-lg translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-orange-600 hover:scale-110 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {addingToCart === productId ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FiShoppingBag className="text-xl" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
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
              <p className="text-center font-Outfit text-sm">LIMITED TIME ONLY</p>
              <p className="text-3xl md:text-5xl text-center font-Maven">
                The living room event up
                <br />
                to 30% off
              </p>
              <p className="text-center md:text-center text-xl text-gray-400">
                Use this text to share information about your <br />
                brand with your customers.
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
            <p className="uppercase tracking-[4px] text-sm text-gray-700">Craft Own Furniture</p>
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

      {/* ✅ Top Sellers avec bouton "Ajouter au panier" */}
      <section className="w-full px-4 py-10 bg-white">
        <div className="flex gap-5 overflow-x-auto md:grid md:grid-cols-3 xl:grid-cols-4 md:place-items-center">
          {topSeller.map((e) => (
            <div
              key={e.id}
              className="group relative min-w-[300px] md:min-w-0 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <div 
                className="relative overflow-hidden rounded-xl cursor-pointer"
                onClick={() => openModal(e)}
              >
                <img
                  src={e.image}
                  alt={e.title}
                  className="w-full h-[350px] object-cover transition duration-700 group-hover:scale-110"
                />
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    // Pour les top sellers sans ID, on utilise un ID fictif
                    const productId = e.id;
                    addToCart(productId);
                  }}
                  disabled={addingToCart === e.id}
                  className="absolute bottom-5 right-5 bg-orange-500 text-white p-4 rounded-full translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 cursor-pointer hover:bg-orange-600 hover:scale-110 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {addingToCart === e.id ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <FiShoppingBag className="text-2xl" />
                  )}
                </button>
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
                featured here.
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

      {/* ✅ Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}

export default Home;








// import { MdOutlineChair } from "react-icons/md";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import { MdKeyboardArrowDown } from "react-icons/md";
// import { FiShoppingBag } from "react-icons/fi";
// import axios from "axios";

// import hero_1 from "../assets/images/hero_01.webp";
// import hero_2 from "../assets/images/hero_02.webp";
// import hero_3 from "../assets/images/hero_3.webp";
// import RoomImage from "../assets/Product_images/RoomImage.webp";

// import living from "../assets/images/living.webp";
// import bedroom from "../assets/images/bedroom.webp";
// import kitchen from "../assets/images/kitchen.webp";
// import kidroom from "../assets/images/kidroom.webp";

// import ImageVideo from "../assets/Product_images/video.webp";

// import SaleA from "../assets/Product_images/sela1.webp";
// import SaleB from "../assets/Product_images/sela2.webp";
// import SaleC from "../assets/Product_images/sale3.webp";
// import { FaInstagram } from "react-icons/fa6";

// import InstaA from "../assets/Product_images/insta1.webp";
// import InstaB from "../assets/Product_images/insta2.webp";
// import InstaC from "../assets/Product_images/temp3.webp";
// import InstaD from "../assets/Product_images/temp4.webp";
// import InstaE from "../assets/Product_images/temp5.webp";
// import InstaF from "../assets/Product_images/temp6.webp";

// import { useEffect, useState } from "react";
// import ProductModal from "../components/ProductModal";

// function Home() {
//   const [timeLeft, setTimeLeft] = useState(220 * 24 * 60 * 60);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const slides = [
//     { id: 1, image: hero_1 },
//     { id: 2, image: hero_2 },
//     { id: 3, image: hero_3 },
//   ];

//   // ✅ Récupérer les produits depuis l'API (limité à 5)
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:5000/api_v1/product/getProducts", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         let data = [];
//         if (res.data) {
//           if (Array.isArray(res.data)) {
//             data = res.data;
//           } else if (res.data.products && Array.isArray(res.data.products)) {
//             data = res.data.products;
//           } else if (res.data.data && Array.isArray(res.data.data)) {
//             data = res.data.data;
//           } else if (typeof res.data === 'object') {
//             const values = Object.values(res.data);
//             const arrayValue = values.find(v => Array.isArray(v));
//             if (arrayValue) {
//               data = arrayValue;
//             }
//           }
//         }

//         setProducts(data.slice(0, 5));
//       } catch (err) {
//         console.error("Failed to load products:", err);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

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
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) =>
//         prev === slides.length - 1 ? 0 : prev + 1
//       );
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [slides.length]);

//   const nextSlide = () => {
//     setCurrentSlide((prev) =>
//       prev === slides.length - 1 ? 0 : prev + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) =>
//       prev === 0 ? slides.length - 1 : prev - 1
//     );
//   };

//   const openModal = (product) => {
//     setSelectedProduct(product);
//     setIsModalOpen(true);
//     document.body.style.overflow = 'hidden';
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedProduct(null);
//     document.body.style.overflow = 'unset';
//   };

//   const days = Math.floor(timeLeft / (24 * 60 * 60));
//   const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
//   const mins = Math.floor((timeLeft % (60 * 60)) / 60);
//   const secs = timeLeft % 60;

//   const images = [InstaA, InstaB, InstaC, InstaD, InstaE, InstaF];

//   const topSeller = [
//     { id: 1, image: SaleA, title: "Lounge Deep Chaise Lounge", price: "20000 Frw" },
//     { id: 2, image: SaleB, title: "Lounge Deep Chaise Lounge", price: "20000 Frw" },
//     { id: 3, image: SaleC, title: "Lounge Deep Chaise Lounge", price: "20000 Frw" },
//   ];

//   return (
//     <>
//       <section className="w-screen h-[120vh] mt-20 px-10">
//         <div className="w-full h-[40%] pt-20">
//           <div className="flex items-center">
//             <div>
//               <button className="relative overflow-hidden bg-[#FFA832] px-8 py-3 rounded-4xl group">
//                 <span className="absolute inset-0 bg-gray-800 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></span>
//                 <MdOutlineChair className="relative z-10 text-4xl text-white" />
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
//             <p className="font-Bricolage font-bold text-3xl sm:text-4xl md:text-5xl lg:text-5xl">
//               with Our Furniture
//               <br />
//             </p>
//           </div>
//           <div className="mt-2 flex">
//             <p className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-Bricolage font-bold"></p>
//             <button className="relative overflow-hidden group rounded-4xl text-sm bg-[#FFA832] ml-4 font-bold text-white px-6 py-3">
//               <span className="absolute w-full h-full inset-0 flex items-center justify-center bg-gray-900 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 text-white"></span>
//               <span className="relative z-10">Shop now</span>
//             </button>
//           </div>
//         </div>

//         <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] rounded-4xl overflow-hidden">
//           <div
//             className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
//             style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
//           >
//             <div className="absolute inset-0 bg-black/30"></div>
//           </div>

//           <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
//             <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">
//               {slides[currentSlide].title}
//             </h1>
//             <p className="text-white mt-4 text-lg md:text-xl">
//               {slides[currentSlide].subtitle}
//             </p>
//           </div>

//           <button
//             onClick={prevSlide}
//             className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg z-20 hover:bg-gray-100 transition duration-300"
//           >
//             <FaArrowLeft className="text-black text-xl" />
//           </button>

//           <button
//             onClick={nextSlide}
//             className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg z-20 hover:bg-gray-100 transition duration-300"
//           >
//             <FaArrowRight className="text-black text-xl" />
//           </button>

//           <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3 z-20">
//             {slides.map((slide, index) => (
//               <button
//                 key={slide.id}
//                 onClick={() => setCurrentSlide(index)}
//                 className={`w-3 h-3 rounded-full transition duration-300 ${
//                   currentSlide === index ? "bg-orange-500" : "bg-white/70"
//                 }`}
//               />
//             ))}
//           </div>
//         </section>
//       </section>

//       <section className="w-full px-6 py-10 bg-[#f5f5f5]">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="group relative h-[500px] rounded-[35px] overflow-hidden">
//             <img
//               src={living}
//               alt="living"
//               className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
//             />
//             <div className="absolute bottom-0 left-0 bg-white px-8 py-4 rounded-tr-[30px] text-lg font-medium transition duration-300 hover:text-orange-500 cursor-pointer">
//               LIVING ROOM
//             </div>
//           </div>

//           <div className="group relative h-[500px] rounded-[35px] overflow-hidden">
//             <img
//               src={bedroom}
//               alt="bedroom"
//               className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
//             />
//             <div className="absolute bottom-0 left-0 bg-white px-8 py-4 rounded-tr-[30px] text-lg font-medium transition duration-300 hover:text-orange-500 cursor-pointer">
//               BED ROOM
//             </div>
//           </div>

//           <div className="flex flex-col gap-6">
//             <div className="group relative h-[240px] rounded-[35px] overflow-hidden">
//               <img
//                 src={kitchen}
//                 alt="kitchen"
//                 className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
//               />
//               <div className="absolute bottom-0 right-0 bg-white px-8 py-4 rounded-tl-[30px] text-lg font-medium transition duration-300 hover:text-orange-500 cursor-pointer">
//                 KITCHEN
//               </div>
//             </div>

//             <div className="group relative h-[240px] rounded-[35px] overflow-hidden">
//               <img
//                 src={kidroom}
//                 alt="kidroom"
//                 className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
//               />
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

//       {/* ✅ Section produits avec images de l'API - LIMITÉ À 5 PRODUITS */}
//       <section className="flex justify-center items-center w-full px-6 py-10 bg-white mt-12">
//         {loading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
//             {Array.from({ length: 5 }).map((_, i) => (
//               <div key={i} className="min-w-[200px] rounded-xl overflow-hidden bg-white animate-pulse">
//                 <div className="w-full h-[250px] bg-gray-200" />
//                 <div className="p-4 space-y-2">
//                   <div className="h-4 bg-gray-200 rounded w-3/4" />
//                   <div className="h-4 bg-gray-200 rounded w-1/2" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : products.length === 0 ? (
//           <p className="text-gray-400 text-xl">No products available</p>
//         ) : (
//           <div className="flex gap-5 overflow-x-auto md:grid md:grid-cols-3 xl:grid-cols-5">
//             {products.map((product) => {
//               const imageUrl = product?.imageUrl || product?.image || null;
//               const productName = product?.productName || product?.name || 'Product';
//               const productPrice = product?.productPrice || product?.price || 0;

//               return (
//                 <div
//                   key={product._id || product.id}
//                   className="group relative min-w-[250px] md:min-w-0 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-shadow duration-300"
//                 >
//                   <div 
//                     className="w-full rounded-xl overflow-hidden bg-gray-100 cursor-pointer"
//                     onClick={() => openModal(product)}
//                   >
//                     {imageUrl ? (
//                       <img
//                         src={imageUrl}
//                         alt={productName}
//                         className="w-full h-[250px] object-cover transition duration-700 group-hover:scale-110"
//                         onError={(e) => {
//                           e.target.style.display = 'none';
//                           e.target.parentElement.innerHTML = '<div class="w-full h-[250px] flex items-center justify-center text-gray-300 text-4xl">🛋️</div>';
//                         }}
//                       />
//                     ) : (
//                       <div className="w-full h-[250px] flex items-center justify-center text-gray-300 text-4xl">🛋️</div>
//                     )}
//                   </div>
//                   <div className="p-4">
//                     <h1 className="text-lg font-semibold truncate">{productName}</h1>
//                     <p className="text-orange-500 mt-1 font-bold">FRw {Number(productPrice).toFixed(2)}</p>
//                   </div>

//                   {/* ✅ Bouton Cart avec ouverture du modal */}
//                   <button
//                     onClick={() => openModal(product)}
//                     className="absolute bottom-20 right-4 bg-orange-500 text-white p-3 rounded-full shadow-lg translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-orange-600 hover:scale-110"
//                   >
//                     <FiShoppingBag className="text-xl" />
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </section>

//       <div className="w-full flex justify-center">
//         <button className="relative px-7 py-3 border border-gray-200 hover:text-white group rounded-4xl text-center font-bold overflow-hidden">
//           <span className="absolute w-full h-full inset-0 bg-orange-500 -translate-x-full transition-transform group-hover:translate-x-0 duration-500"></span>
//           <span className="relative z-10">Shop All Products</span>
//         </button>
//       </div>

//       <section className="w-full px-6 py-10 bg-white mt-12">
//         <div className="w-full min-h-[500px] grid md:flex">
//           <div
//             style={{ backgroundImage: `url(${ImageVideo})` }}
//             className="w-full md:w-1/2 bg-cover bg-center min-h-[300px]"
//           ></div>

//           <div className="w-full md:w-1/2 grid p-10 items-center justify-center">
//             <div className="grid gap-6">
//               <p className="text-center font-Outfit text-sm">LIMITED TIME ONLY</p>
//               <p className="text-3xl md:text-5xl text-center font-Maven">
//                 The living room event up
//                 <br />
//                 to 30% off
//               </p>
//               <p className="text-center md:text-center text-xl text-gray-400">
//                 Use this text to share information about your <br />
//                 brand with your customers.
//               </p>

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
//                   <span className="absolute w-full h-full inset-0 bg-gray-900 translate-x-full group-hover:translate-x-0 transition-transform duration-500 rounded-3xl"></span>
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
//           className="relative w-full h-[90vh] rounded-[35px] bg-cover bg-center overflow-hidden"
//         >
//           <div className="absolute top-5 right-5">
//             <p className="uppercase tracking-[4px] text-sm text-gray-700">Craft Own Furniture</p>
//           </div>

//           <div className="absolute top-12 right-0 bg-white px-10 py-8 rounded-l-[30px] rounded-tr-[30px] shadow-sm">
//             <h1 className="text-2xl md:text-4xl font-bold font-Bricolage">
//               Your new forever
//               <br />
//               favorites are here
//             </h1>
//           </div>

//           <div className="absolute top-[30%] left-[50%] w-6 h-6 bg-white rounded-full border-4 border-white cursor-pointer"></div>
//           <div className="absolute bottom-[18%] left-[13%] w-6 h-6 bg-white rounded-full border-4 border-white cursor-pointer"></div>
//           <div className="absolute bottom-[19%] left-[64%] w-6 h-6 bg-white rounded-full border-4 border-white cursor-pointer"></div>
//         </div>
//       </section>

//       {/* ✅ Top Sellers avec ouverture du modal */}
//       <section className="w-full px-4 py-10 bg-white">
//         <div className="flex gap-5 overflow-x-auto md:grid md:grid-cols-3 xl:grid-cols-4 md:place-items-center">
//           {topSeller.map((e) => (
//             <div
//               key={e.id}
//               className="group relative min-w-[300px] md:min-w-0 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-shadow duration-300"
//             >
//               <div 
//                 className="relative overflow-hidden rounded-xl cursor-pointer"
//                 onClick={() => openModal(e)}
//               >
//                 <img
//                   src={e.image}
//                   alt={e.title}
//                   className="w-full h-[350px] object-cover transition duration-700 group-hover:scale-110"
//                 />
//                 <div 
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     openModal(e);
//                   }}
//                   className="absolute bottom-5 right-5 bg-orange-500 text-white p-4 rounded-full translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 cursor-pointer hover:bg-orange-600 hover:scale-110"
//                 >
//                   <FiShoppingBag className="text-2xl" />
//                 </div>
//               </div>
//               <div className="p-4">
//                 <h1 className="text-xl font-extra">{e.title}</h1>
//                 <p className="text-orange-500 mt-2">{e.price}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="w-full bg-[#f5f5f5] py-16 px-5 lg:px-20">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
//           <div className="space-y-8">
//             <div className="space-y-5">
//               <p className="uppercase tracking-[4px] text-sm text-orange-500 font-semibold">
//                 Instagram Shop
//               </p>
//               <h1 className="text-4xl md:text-5xl font-bold font-Bricolage leading-tight max-w-[500px]">
//                 Discover inspiration from our furniture
//               </h1>
//               <p className="text-gray-500 text-base md:text-lg leading-8 max-w-[550px]">
//                 Tag @miniture in your Instagram photos for a chance to be
//                 featured here.
//               </p>
//             </div>

//             <button className="relative overflow-hidden border border-gray-300 rounded-full px-8 py-4 font-semibold group">
//               <span className="absolute inset-0 bg-orange-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
//               <span className="relative z-10 group-hover:text-white transition">
//                 Visit Our Instagram
//               </span>
//             </button>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
//             {images.map((img, index) => (
//               <div
//                 key={index}
//                 className="relative group overflow-hidden rounded-[25px]"
//               >
//                 <img
//                   src={img}
//                   alt=""
//                   className="w-full h-[250px] md:h-[320px] object-cover transition duration-700 group-hover:scale-110"
//                 />
//                 <div className="absolute bottom-4 right-4 w-14 h-14 rounded-full bg-orange-400 flex items-center justify-center text-white text-xl cursor-pointer transition duration-300 hover:scale-110 hover:bg-orange-500">
//                   <FaInstagram />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ✅ Product Modal */}
//       <ProductModal
//         product={selectedProduct}
//         isOpen={isModalOpen}
//         onClose={closeModal}
//       />
//     </>
//   );
// }

// export default Home;