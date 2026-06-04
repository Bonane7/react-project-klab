// NavBare.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RiMenu2Fill } from "react-icons/ri";
import CartPopup from "../components/CartPopup";

function NavBare() {
  const [isCartOpen, setIsCartOpen] = useState(false);

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
          {/* MOBILE MENU */}
          <button className="block md:hidden text-3xl">
            <RiMenu2Fill />
          </button>

          {/* LOGO */}
          <h1 className="font-Maven text-2xl md:text-3xl font-semibold">
            muniture
          </h1>
        </div>

        {/* CENTER MENU */}
        <div className="hidden md:flex">
          <ul className="flex items-center gap-8 font-medium">
            {/* HOME */}
            <li className="relative group">
              <Link
                to="/"
                className="flex items-center gap-1 hover:text-orange-500 transition"
              >
                Home
                <MdKeyboardArrowDown />
              </Link>
              <div className="absolute top-14 left-0 w-52 bg-white shadow-xl rounded-2xl p-5 opacity-0 invisible translate-y-5 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-500">
                <div className="grid gap-4 text-gray-600">
                  <Link to="/" className="hover:text-orange-500 transition">
                    Home Modern
                  </Link>
                  <Link to="/" className="hover:text-orange-500 transition">
                    Home Minimal
                  </Link>
                  <Link to="/" className="hover:text-orange-500 transition">
                    Home Interior
                  </Link>
                </div>
              </div>
            </li>

            {/* CATALOG */}
            <li className="relative group">
              <Link
                to="/catalog"
                className="flex items-center gap-1 hover:text-orange-500 transition"
              >
                Catalog
                <MdKeyboardArrowDown />
              </Link>
              <div className="absolute top-14 left-0 w-56 bg-white shadow-xl rounded-2xl p-5 opacity-0 invisible translate-y-5 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-500">
                <div className="grid gap-4 text-gray-600">
                  <Link to="/" className="hover:text-orange-500 transition">
                    Living Room
                  </Link>
                  <Link to="/" className="hover:text-orange-500 transition">
                    Dining Room
                  </Link>
                  <Link to="/" className="hover:text-orange-500 transition">
                    Kitchen
                  </Link>
                  <Link to="/" className="hover:text-orange-500 transition">
                    Bedroom
                  </Link>
                </div>
              </div>
            </li>

            {/* PAGES */}
            <li className="relative group">
              <Link
                to="/pages"
                className="flex items-center gap-1 hover:text-orange-500 transition"
              >
                Pages
                <MdKeyboardArrowDown />
              </Link>
              <div className="absolute top-14 left-0 w-52 bg-white shadow-xl rounded-2xl p-5 opacity-0 invisible translate-y-5 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-500">
                <div className="grid gap-4 text-gray-600">
                  <Link to="/about" className="hover:text-orange-500 transition">
                    About Us
                  </Link>
                  <Link to="/faq" className="hover:text-orange-500 transition">
                    FAQ
                  </Link>
                  <Link to="/shop" className="hover:text-orange-500 transition">
                    Shop
                  </Link>
                </div>
              </div>
            </li>

            {/* BLOG */}
            <li>
              <Link to="/blog" className="hover:text-orange-500 transition">
                Blog
              </Link>
            </li>

            {/* CONTACT */}
            <li>
              <Link to="/contact" className="hover:text-orange-500 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-5">
          {/* SEARCH */}
          <button className="text-2xl hover:text-orange-500 transition">
            <CiSearch />
          </button>

          {/* PROFILE */}
          <button className="hidden md:block text-2xl hover:text-orange-500 transition">
            <IoPersonOutline />
          </button>

          {/* BAG - CARD SHOP */}
          <div className="relative">
            <button
              onClick={() => setIsCartOpen(true)} // Ouvrir le popup
              className="text-2xl hover:text-orange-500 transition"
            >
              <MdOutlineShoppingBag />
            </button>

            {/* COUNT */}
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">1</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Popup du panier */}
      <CartPopup isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default NavBare;










// import { Link } from "react-router-dom";
// import { CiSearch } from "react-icons/ci";
// import { IoPersonOutline } from "react-icons/io5";
// import { MdOutlineShoppingBag } from "react-icons/md";
// import { MdKeyboardArrowDown } from "react-icons/md";
// import { RiMenu2Fill } from "react-icons/ri";

// function NavBare() {
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
//           <h1
//             className="
//               font-Maven
//               text-2xl
//               md:text-3xl
//               font-semibold
//             "
//           >
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
//                 className="
//                   flex
//                   items-center
//                   gap-1
//                   hover:text-orange-500
//                   transition
//                 "
//               >
//                 Home
//                 <MdKeyboardArrowDown />
//               </Link>

//               {/* POPUP */}
//               <div
//                 className="
//                   absolute
//                   top-14
//                   left-0
//                   w-52
//                   bg-white
//                   shadow-xl
//                   rounded-2xl
//                   p-5
//                   opacity-0
//                   invisible
//                   translate-y-5
//                   group-hover:opacity-100
//                   group-hover:visible
//                   group-hover:translate-y-0
//                   transition-all
//                   duration-500
//                 "
//               >

//                 <div className="grid gap-4 text-gray-600">

//                   <Link
//                     to="/"
//                     className="hover:text-orange-500 transition"
//                   >
//                     Home Modern
//                   </Link>

//                   <Link
//                     to="/"
//                     className="hover:text-orange-500 transition"
//                   >
//                     Home Minimal
//                   </Link>

//                   <Link
//                     to="/"
//                     className="hover:text-orange-500 transition"
//                   >
//                     Home Interior
//                   </Link>

//                 </div>

//               </div>

//             </li>

//             {/* CATALOG */}
//             <li className="relative group">

//               <Link
//                 to="/catalog"
//                 className="
//                   flex
//                   items-center
//                   gap-1
//                   hover:text-orange-500
//                   transition
//                 "
//               >
//                 Catalog
//                 <MdKeyboardArrowDown />
//               </Link>

//               {/* POPUP */}
//               <div
//                 className="
//                   absolute
//                   top-14
//                   left-0
//                   w-56
//                   bg-white
//                   shadow-xl
//                   rounded-2xl
//                   p-5
//                   opacity-0
//                   invisible
//                   translate-y-5
//                   group-hover:opacity-100
//                   group-hover:visible
//                   group-hover:translate-y-0
//                   transition-all
//                   duration-500
//                 "
//               >

//                 <div className="grid gap-4 text-gray-600">

//                   <Link
//                     to="/"
//                     className="hover:text-orange-500 transition"
//                   >
//                     Living Room
//                   </Link>

//                   <Link
//                     to="/"
//                     className="hover:text-orange-500 transition"
//                   >
//                     Dining Room
//                   </Link>

//                   <Link
//                     to="/"
//                     className="hover:text-orange-500 transition"
//                   >
//                     Kitchen
//                   </Link>

//                   <Link
//                     to="/"
//                     className="hover:text-orange-500 transition"
//                   >
//                     Bedroom
//                   </Link>

//                 </div>

//               </div>

//             </li>

//             {/* PAGES */}
//             <li className="relative group">

//               <Link
//                 to="/pages"
//                 className="
//                   flex
//                   items-center
//                   gap-1
//                   hover:text-orange-500
//                   transition
//                 "
//               >
//                 Pages
//                 <MdKeyboardArrowDown />
//               </Link>

//               {/* POPUP */}
//               <div
//                 className="
//                   absolute
//                   top-14
//                   left-0
//                   w-52
//                   bg-white
//                   shadow-xl
//                   rounded-2xl
//                   p-5
//                   opacity-0
//                   invisible
//                   translate-y-5
//                   group-hover:opacity-100
//                   group-hover:visible
//                   group-hover:translate-y-0
//                   transition-all
//                   duration-500
//                 "
//               >

//                 <div className="grid gap-4 text-gray-600">

//                   <Link
//                     to="/about"
//                     className="hover:text-orange-500 transition"
//                   >
//                     About Us
//                   </Link>

//                   <Link
//                     to="/faq"
//                     className="hover:text-orange-500 transition"
//                   >
//                     FAQ
//                   </Link>

//                   <Link
//                     to="/shop"
//                     className="hover:text-orange-500 transition"
//                   >
//                     Shop
//                   </Link>

//                 </div>

//               </div>

//             </li>

//             {/* BLOG */}
//             <li>
//               <Link
//                 to="/blog"
//                 className="hover:text-orange-500 transition"
//               >
//                 Blog
//               </Link>
//             </li>

//             {/* CONTACT */}
//             <li>
//               <Link
//                 to="/contact"
//                 className="hover:text-orange-500 transition"
//               >
//                 Contact
//               </Link>
//             </li>

//           </ul>

//         </div>

//         {/* RIGHT */}
//         <div className="flex items-center gap-5">

//           {/* SEARCH */}
//           <button
//             className="
//               text-2xl
//               hover:text-orange-500
//               transition
//             "
//           >
//             <CiSearch />
//           </button>

//           {/* PROFILE */}
//           <button
//             className="
//               hidden
//               md:block
//               text-2xl
//               hover:text-orange-500
//               transition
//             "
//           >
//             <IoPersonOutline />
//           </button>

//           {/* BAG */}
//           <div className="relative">

//             <button
//               className="
//                 text-2xl
//                 hover:text-orange-500
//                 transition
//               "
//             >
//               <MdOutlineShoppingBag />
//             </button>

//             {/* COUNT */}
//             <div
//               className="
//                 absolute
//                 -top-2
//                 -right-2
//                 w-5
//                 h-5
//                 bg-orange-500
//                 rounded-full
//                 flex
//                 items-center
//                 justify-center
//               "
//             >
//               <span className="text-white text-[10px] font-bold">
//                 1
//               </span>
//             </div>

//           </div>

//         </div>

//       </nav>
//     </>
//   );
// }

// export default NavBare;
