import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { RiMenu2Fill } from "react-icons/ri";
import { FaStar, FaTimes } from "react-icons/fa";

import CartPopup from "../components/CartPopup";
import AuthModal from "../components/AuthModal";

// Images pour le menu Catalog
import ProductA from "../assets/Product_images/product_1.webp";
import ProductB from "../assets/Product_images/product_2.webp";
import ProductC from "../assets/Product_images/product_3.webp";
import Productd from "../assets/Product_images/product_4.webp";

function NavBare() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState(null);
  
  // Références pour chaque dropdown
  const dropdownRefs = {
    home: useRef(null),
    catalog: useRef(null),
    pages: useRef(null),
  };

  // Gestionnaire pour fermer le dropdown quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Vérifier si le clic est en dehors de tous les dropdowns ouverts
      const isOutside = Object.values(dropdownRefs).every(
        (ref) => ref.current && !ref.current.contains(event.target)
      );
      
      // Vérifier si le clic est sur un élément de navigation
      const isNavItem = event.target.closest('nav') && !event.target.closest('.dropdown-container');
      
      if (isOutside || isNavItem) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Bloquer le scroll quand le menu mobile est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleMouseEnter = (menu) => {
    setOpenDropdown(menu);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      const dropdownElement = dropdownRefs[openDropdown]?.current;
      if (dropdownElement && !dropdownElement.matches(':hover')) {
        setOpenDropdown(null);
      }
    }, 100);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setMobileSubMenu(null);
  };

  const handleMobileSubMenu = (menu) => {
    setMobileSubMenu(mobileSubMenu === menu ? null : menu);
  };

  // Données pour le menu Home
  const homeLinks = [
    { name: "Home v1 — Modern Elegance", path: "/home-v1" },
    { name: "Home v2 — Rustic Comfort", path: "/home-v2" },
    { name: "Home v3 — Minimalist Chic", path: "/home-v3" },
    { name: "Home v4 — Industrial Vibes", path: "/home-v4" },
    { name: "Home v5 — Vintage Revival", path: "/home-v5" },
    { name: "Home v6 — Kid's Playland", path: "/home-v6" },
  ];

  // Données pour le menu Pages
  const pageLinks = [
    { name: "About Us", path: "/about" },
    { name: "FAQs", path: "/faqs" },
    { name: "Contact Us", path: "/contact" },
  ];

  // Données pour les produits du menu Catalog
  const catalogProducts = [
    {
      id: 1,
      name: "Ana Grey Dining Chair",
      price: "$299.99",
      rating: 5.0,
      image: ProductA,
      save: null,
    },
    {
      id: 2,
      name: "Axis 2-Piece Sectional Sofa",
      price: "$339.99",
      rating: 5.0,
      image: ProductB,
      save: null,
    },
    {
      id: 3,
      name: "Axis 2-Seat Sofa",
      price: "$239.99",
      rating: 5.0,
      image: ProductC,
      save: null,
    },
    {
      id: 4,
      name: "Curved Back Dining Chair",
      price: "$199.99",
      rating: 5.0,
      image: Productd,
      save: "Save 19%",
    },
  ];

  const catalogCategories = [
    "Most popular",
    "All Accent Chairs (26)",
    "Living Room",
    "Bedroom",
    "Kitchen",
    "Outdoor",
  ];

  // Menu items pour mobile
  const menuItems = [
    { 
      name: "Home", 
      path: "/", 
      subItems: homeLinks,
      type: "home"
    },
    { 
      name: "Catalog", 
      path: "/catalog", 
      subItems: catalogCategories,
      type: "catalog",
      products: catalogProducts
    },
    { 
      name: "Pages", 
      path: "/pages", 
      subItems: pageLinks,
      type: "pages"
    },
    { name: "Blog", path: "/blog", subItems: null },
    { name: "Contact", path: "/contact", subItems: null },
  ];

  return (
    <>
      <nav
        className="
        fixed
        top-0
        left-0
        w-full
        h-20
        bg-white
        flex
        items-center
        justify-between
        px-5
        md:px-10
        z-50
        shadow-sm
      "
      >
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleMobileMenu}
            className="block md:hidden text-3xl hover:text-orange-500 transition-colors duration-300"
          >
            <RiMenu2Fill />
          </button>

          <Link to="/" className="font-Maven text-2xl md:text-3xl font-semibold">
            muniture
          </Link>
        </div>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex">
          <ul className="flex items-center gap-8 font-medium">
            {/* HOME DROPDOWN */}
            <li 
              className="relative group dropdown-container"
              onMouseEnter={() => handleMouseEnter('home')}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to="/"
                className="flex items-center gap-1 hover:text-orange-500 transition-colors duration-300"
              >
                Home
                <MdKeyboardArrowDown className={`transition-transform duration-300 ${openDropdown === 'home' ? 'rotate-180' : ''}`} />
              </Link>

              <div
                ref={dropdownRefs.home}
                onMouseEnter={() => handleMouseEnter('home')}
                onMouseLeave={handleMouseLeave}
                className={`
                  absolute 
                  top-full 
                  left-0 
                  mt-2
                  bg-white 
                  shadow-xl 
                  rounded-xl 
                  min-w-[250px]
                  py-2
                  origin-top
                  transition-all
                  duration-300
                  ease-in-out
                  ${openDropdown === 'home' 
                    ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto' 
                    : 'opacity-0 scale-y-0 -translate-y-2 pointer-events-none'
                  }
                `}
              >
                {homeLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className="block px-6 py-3 hover:bg-orange-50 hover:text-orange-500 transition-colors duration-200 border-b border-gray-50 last:border-0"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </li>

            {/* CATALOG DROPDOWN */}
            <li 
              className="relative group dropdown-container"
              onMouseEnter={() => handleMouseEnter('catalog')}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to="/catalog"
                className="flex items-center gap-1 hover:text-orange-500 transition-colors duration-300"
              >
                Catalog
                <MdKeyboardArrowDown className={`transition-transform duration-300 ${openDropdown === 'catalog' ? 'rotate-180' : ''}`} />
              </Link>

              <div
                ref={dropdownRefs.catalog}
                onMouseEnter={() => handleMouseEnter('catalog')}
                onMouseLeave={handleMouseLeave}
                className={`
                  absolute 
                  top-full 
                  left-0 
                  mt-2
                  bg-white 
                  shadow-xl 
                  rounded-xl 
                  min-w-[700px]
                  py-4
                  px-4
                  origin-top
                  transition-all
                  duration-300
                  ease-in-out
                  ${openDropdown === 'catalog' 
                    ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto' 
                    : 'opacity-0 scale-y-0 -translate-y-2 pointer-events-none'
                  }
                `}
              >
                <div className="flex gap-6">
                  <div className="w-1/3 border-r border-gray-100 pr-4">
                    <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider mb-3">
                      Categories
                    </h3>
                    <ul className="space-y-2">
                      {catalogCategories.map((cat, index) => (
                        <li key={index}>
                          <Link
                            to={`/catalog/${cat.toLowerCase().replace(/ /g, '-')}`}
                            className="block py-2 px-3 hover:bg-orange-50 hover:text-orange-500 rounded-lg transition-colors duration-200"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {cat}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="w-2/3">
                    <div className="grid grid-cols-2 gap-4">
                      {catalogProducts.map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.id}`}
                          className="group block hover:shadow-lg rounded-lg p-2 transition-shadow duration-300"
                          onClick={() => setOpenDropdown(null)}
                        >
                          <div className="relative overflow-hidden rounded-lg">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-[120px] object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {product.save && (
                              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                {product.save}
                              </span>
                            )}
                          </div>
                          <div className="mt-2">
                            <div className="flex items-center gap-1 text-yellow-400">
                              <FaStar className="text-sm" />
                              <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
                            </div>
                            <h4 className="text-sm font-medium truncate">{product.name}</h4>
                            <p className="text-orange-500 font-bold text-sm">{product.price}</p>
                            <button className="mt-1 text-xs text-orange-500 hover:text-orange-600 font-semibold">
                              View →
                            </button>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </li>

            {/* PAGES DROPDOWN */}
            <li 
              className="relative group dropdown-container"
              onMouseEnter={() => handleMouseEnter('pages')}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to="/pages"
                className="flex items-center gap-1 hover:text-orange-500 transition-colors duration-300"
              >
                Pages
                <MdKeyboardArrowDown className={`transition-transform duration-300 ${openDropdown === 'pages' ? 'rotate-180' : ''}`} />
              </Link>

              <div
                ref={dropdownRefs.pages}
                onMouseEnter={() => handleMouseEnter('pages')}
                onMouseLeave={handleMouseLeave}
                className={`
                  absolute 
                  top-full 
                  left-0 
                  mt-2
                  bg-white 
                  shadow-xl 
                  rounded-xl 
                  min-w-[200px]
                  py-2
                  origin-top
                  transition-all
                  duration-300
                  ease-in-out
                  ${openDropdown === 'pages' 
                    ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto' 
                    : 'opacity-0 scale-y-0 -translate-y-2 pointer-events-none'
                  }
                `}
              >
                {pageLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className="block px-6 py-3 hover:bg-orange-50 hover:text-orange-500 transition-colors duration-200 border-b border-gray-50 last:border-0"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </li>

            <li>
              <Link
                to="/blog"
                className="hover:text-orange-500 transition-colors duration-300"
              >
                Blog
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="hover:text-orange-500 transition-colors duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-5">
          <div className="relative">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="text-2xl hover:text-orange-500 transition-colors duration-300"
            >
              <CiSearch />
            </button>

            {showSearch && (
              <div
                className="
                absolute
                right-0
                top-12
                bg-white
                shadow-xl
                rounded-xl
                p-3
                w-72
                "
              >
                <input
                  type="text"
                  placeholder="Search..."
                  className="
                  w-full
                  border
                  p-2
                  rounded-lg
                  outline-none
                  focus:border-orange-500
                  transition-colors
                  duration-300
                  "
                />
              </div>
            )}
          </div>

          <button
            onClick={() => setIsAuthOpen(true)}
            className="text-2xl hover:text-orange-500 transition-colors duration-300"
          >
            <IoPersonOutline />
          </button>

          <div className="relative">
            <button
              onClick={() => setIsCartOpen(true)}
              className="text-2xl hover:text-orange-500 transition-colors duration-300"
            >
              <MdOutlineShoppingBag />
            </button>

            <div
              className="
              absolute
              -top-2
              -right-2
              w-5
              h-5
              bg-orange-500
              rounded-full
              flex
              items-center
              justify-center
              animate-pulse
              "
            >
              <span className="text-white text-[10px] font-bold">
                1
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`
          fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden
          ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={toggleMobileMenu}
      />

      {/* MOBILE MENU */}
      <div
        className={`
          fixed top-0 left-0 w-[85%] max-w-[400px] h-full bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out md:hidden
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-2xl font-Maven font-semibold">Menu</h2>
          <button
            onClick={toggleMobileMenu}
            className="text-3xl hover:text-orange-500 transition-colors duration-300 p-2"
          >
            <FaTimes />
          </button>
        </div>

        {/* MENU ITEMS */}
        <div className="overflow-y-auto h-[calc(100%-80px)]">
          {mobileSubMenu ? (
            // SUB MENU VIEW
            <div>
              <button
                onClick={() => setMobileSubMenu(null)}
                className="flex items-center gap-2 p-5 text-orange-500 font-semibold hover:bg-orange-50 w-full transition-colors duration-200 border-b"
              >
                <MdKeyboardArrowRight className="text-2xl rotate-180" />
                Retour
              </button>

              {mobileSubMenu === 'home' && (
                <div className="py-2">
                  {homeLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.path}
                      className="block px-6 py-4 hover:bg-orange-50 hover:text-orange-500 transition-colors duration-200 border-b border-gray-50"
                      onClick={toggleMobileMenu}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}

              {mobileSubMenu === 'catalog' && (
                <div className="py-2">
                  <div className="px-6 py-3">
                    <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider mb-3">
                      Categories
                    </h3>
                    {catalogCategories.map((cat, index) => (
                      <Link
                        key={index}
                        to={`/catalog/${cat.toLowerCase().replace(/ /g, '-')}`}
                        className="block py-3 hover:bg-orange-50 hover:text-orange-500 transition-colors duration-200 border-b border-gray-50"
                        onClick={toggleMobileMenu}
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                  
                  <div className="px-6 py-3 border-t border-gray-100">
                    <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider mb-3">
                      Popular Products
                    </h3>
                    {catalogProducts.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0 hover:bg-orange-50 transition-colors duration-200 rounded-lg px-2"
                        onClick={toggleMobileMenu}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h4 className="font-medium text-sm">{product.name}</h4>
                          <p className="text-orange-500 font-bold text-sm">{product.price}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {mobileSubMenu === 'pages' && (
                <div className="py-2">
                  {pageLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.path}
                      className="block px-6 py-4 hover:bg-orange-50 hover:text-orange-500 transition-colors duration-200 border-b border-gray-50"
                      onClick={toggleMobileMenu}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // MAIN MENU VIEW
            <div>
              {menuItems.map((item, index) => (
                <div key={index}>
                  {item.subItems ? (
                    <button
                      onClick={() => handleMobileSubMenu(item.type)}
                      className="flex items-center justify-between w-full px-6 py-4 hover:bg-orange-50 transition-colors duration-200 border-b border-gray-50"
                    >
                      <span className="font-medium">{item.name}</span>
                      <MdKeyboardArrowRight className="text-2xl text-gray-400" />
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className="block px-6 py-4 hover:bg-orange-50 hover:text-orange-500 transition-colors duration-200 border-b border-gray-50 font-medium"
                      onClick={toggleMobileMenu}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <CartPopup
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </>
  );
}

export default NavBare;





// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { CiSearch } from "react-icons/ci";
// import { IoPersonOutline } from "react-icons/io5";
// import { MdOutlineShoppingBag } from "react-icons/md";
// import { MdKeyboardArrowDown } from "react-icons/md";
// import { RiMenu2Fill } from "react-icons/ri";

// import CartPopup from "../components/CartPopup";
// import AuthModal from "../components/AuthModal";

// function NavBare() {
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);
//   const [isAuthOpen, setIsAuthOpen] = useState(false);

//   return (
//     <>
//       <nav
//         className="
//         fixed
//         top-0
//         left-0
//         w-full
//         h-20
//         bg-white
//         flex
//         items-center
//         justify-between
//         px-5
//         md:px-10
//         z-50
//         shadow-sm
//       "
//       >
//         {/* LEFT */}
//         <div className="flex items-center gap-4">
//           <button className="block md:hidden text-3xl">
//             <RiMenu2Fill />
//           </button>

//           <h1 className="font-Maven text-2xl md:text-3xl font-semibold">
//             muniture
//           </h1>
//         </div>

//         {/* MENU */}
//         <div className="hidden md:flex">
//           <ul className="flex items-center gap-8 font-medium">
//             <li className="relative group">
//               <Link
//                 to="/"
//                 className="flex items-center gap-1 hover:text-orange-500"
//               >
//                 Home
//                 <MdKeyboardArrowDown />
//               </Link>
//             </li>

//             <li>
//               <Link
//                 to="/catalog"
//                 className="hover:text-orange-500"
//               >
//                 Catalog
//               </Link>
//             </li>

//             <li>
//               <Link
//                 to="/pages"
//                 className="hover:text-orange-500"
//               >
//                 Pages
//               </Link>
//             </li>

//             <li>
//               <Link
//                 to="/blog"
//                 className="hover:text-orange-500"
//               >
//                 Blog
//               </Link>
//             </li>

//             <li>
//               <Link
//                 to="/contact"
//                 className="hover:text-orange-500"
//               >
//                 Contact
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* RIGHT */}
//         <div className="flex items-center gap-5">
//           {/* SEARCH */}
//           <div className="relative">
//             <button
//               onClick={() => setShowSearch(!showSearch)}
//               className="text-2xl hover:text-orange-500"
//             >
//               <CiSearch />
//             </button>

//             {showSearch && (
//               <div
//                 className="
//                 absolute
//                 right-0
//                 top-12
//                 bg-white
//                 shadow-xl
//                 rounded-xl
//                 p-3
//                 w-72
//                 "
//               >
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="
//                   w-full
//                   border
//                   p-2
//                   rounded-lg
//                   outline-none
//                   focus:border-orange-500
//                   "
//                 />
//               </div>
//             )}
//           </div>

//           {/* PROFILE */}
//           <button
//             onClick={() => setIsAuthOpen(true)}
//             className="text-2xl hover:text-orange-500"
//           >
//             <IoPersonOutline />
//           </button>

//           {/* CART */}
//           <div className="relative">
//             <button
//               onClick={() => setIsCartOpen(true)}
//               className="text-2xl hover:text-orange-500"
//             >
//               <MdOutlineShoppingBag />
//             </button>

//             <div
//               className="
//               absolute
//               -top-2
//               -right-2
//               w-5
//               h-5
//               bg-orange-500
//               rounded-full
//               flex
//               items-center
//               justify-center
//               "
//             >
//               <span className="text-white text-[10px] font-bold">
//                 1
//               </span>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <CartPopup
//         isOpen={isCartOpen}
//         onClose={() => setIsCartOpen(false)}
//       />

//       <AuthModal
//         isOpen={isAuthOpen}
//         onClose={() => setIsAuthOpen(false)}
//       />
//     </>
//   );
// }

// export default NavBare;











// // NavBare.jsx
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { CiSearch } from "react-icons/ci";
// import { IoPersonOutline } from "react-icons/io5";
// import { MdOutlineShoppingBag } from "react-icons/md";
// import { MdKeyboardArrowDown } from "react-icons/md";
// import { RiMenu2Fill } from "react-icons/ri";
// import CartPopup from "../components/CartPopup";

// function NavBare() {
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   return (
//     <>
//       <nav
//         className="
//           fixed
//           top-0
//           left-0
//           w-full
//           h-20
//           bg-white
//           flex
//           items-center
//           justify-between
//           px-5
//           md:px-10
//           z-50
//           shadow-sm
//         "
//       >
//         {/* LEFT */}
//         <div className="flex items-center gap-4">
//           {/* MOBILE MENU */}
//           <button className="block md:hidden text-3xl">
//             <RiMenu2Fill />
//           </button>

//           {/* LOGO */}
//           <h1 className="font-Maven text-2xl md:text-3xl font-semibold">
//             muniture
//           </h1>
//         </div>

//         {/* CENTER MENU */}
//         <div className="hidden md:flex">
//           <ul className="flex items-center gap-8 font-medium">
//             {/* HOME */}
//             <li className="relative group">
//               <Link
//                 to="/"
//                 className="flex items-center gap-1 hover:text-orange-500 transition"
//               >
//                 Home
//                 <MdKeyboardArrowDown />
//               </Link>
//               <div className="absolute top-14 left-0 w-52 bg-white shadow-xl rounded-2xl p-5 opacity-0 invisible translate-y-5 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-500">
//                 <div className="grid gap-4 text-gray-600">
//                   <Link to="/" className="hover:text-orange-500 transition">
//                     Home Modern
//                   </Link>
//                   <Link to="/" className="hover:text-orange-500 transition">
//                     Home Minimal
//                   </Link>
//                   <Link to="/" className="hover:text-orange-500 transition">
//                     Home Interior
//                   </Link>
//                 </div>
//               </div>
//             </li>

//             {/* CATALOG */}
//             <li className="relative group">
//               <Link
//                 to="/catalog"
//                 className="flex items-center gap-1 hover:text-orange-500 transition"
//               >
//                 Catalog
//                 <MdKeyboardArrowDown />
//               </Link>
//               <div className="absolute top-14 left-0 w-56 bg-white shadow-xl rounded-2xl p-5 opacity-0 invisible translate-y-5 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-500">
//                 <div className="grid gap-4 text-gray-600">
//                   <Link to="/" className="hover:text-orange-500 transition">
//                     Living Room
//                   </Link>
//                   <Link to="/" className="hover:text-orange-500 transition">
//                     Dining Room
//                   </Link>
//                   <Link to="/" className="hover:text-orange-500 transition">
//                     Kitchen
//                   </Link>
//                   <Link to="/" className="hover:text-orange-500 transition">
//                     Bedroom
//                   </Link>
//                 </div>
//               </div>
//             </li>

//             {/* PAGES */}
//             <li className="relative group">
//               <Link
//                 to="/pages"
//                 className="flex items-center gap-1 hover:text-orange-500 transition"
//               >
//                 Pages
//                 <MdKeyboardArrowDown />
//               </Link>
//               <div className="absolute top-14 left-0 w-52 bg-white shadow-xl rounded-2xl p-5 opacity-0 invisible translate-y-5 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-500">
//                 <div className="grid gap-4 text-gray-600">
//                   <Link to="/about" className="hover:text-orange-500 transition">
//                     About Us
//                   </Link>
//                   <Link to="/faq" className="hover:text-orange-500 transition">
//                     FAQ
//                   </Link>
//                   <Link to="/shop" className="hover:text-orange-500 transition">
//                     Shop
//                   </Link>
//                 </div>
//               </div>
//             </li>

//             {/* BLOG */}
//             <li>
//               <Link to="/blog" className="hover:text-orange-500 transition">
//                 Blog
//               </Link>
//             </li>

//             {/* CONTACT */}
//             <li>
//               <Link to="/contact" className="hover:text-orange-500 transition">
//                 Contact
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* RIGHT */}
//         <div className="flex items-center gap-5">
//           {/* SEARCH */}
//           <button className="text-2xl hover:text-orange-500 transition">
//             <CiSearch />
//           </button>

//           {/* PROFILE */}
//           <button className="hidden md:block text-2xl hover:text-orange-500 transition">
//             <IoPersonOutline />
//           </button>

//           {/* BAG - CARD SHOP */}
//           <div className="relative">
//             <button
//               onClick={() => setIsCartOpen(true)} // Ouvrir le popup
//               className="text-2xl hover:text-orange-500 transition"
//             >
//               <MdOutlineShoppingBag />
//             </button>

//             {/* COUNT */}
//             <div className="absolute -top-2 -right-2 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
//               <span className="text-white text-[10px] font-bold">1</span>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Popup du panier */}
//       <CartPopup isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
//     </>
//   );
// }

// export default NavBare;
