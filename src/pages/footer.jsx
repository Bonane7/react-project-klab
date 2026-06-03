import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

import { MdOutlineArrowOutward } from "react-icons/md";
import { IoEarthOutline } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

function Footer() {
  return (
    <footer className="w-full bg-[#0d0d0d] text-white mt-20">
      
      {/* TOP */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-12
          px-5
          md:px-10
          lg:px-20
          py-16
        "
      >

        {/* COLUMN 1 */}
        <div className="space-y-6">

          <h1
            className="
              text-2xl
              md:text-3xl
              font-bold
              font-Bricolage
            "
          >
            Our story
          </h1>

          <p
            className="
              text-sm
              md:text-base
              text-gray-400
              leading-7
              max-w-[320px]
            "
          >
            Miniture is one of the biggest international
            fashion companies, one of the world’s largest
            distribution groups.
          </p>

          {/* SOCIALS */}
          <div className="flex items-center gap-3">

            <div
              className="
                w-12
                h-12
                rounded-full
                border
                border-gray-700
                flex
                items-center
                justify-center
                cursor-pointer
                transition
                duration-300
                hover:bg-orange-500
                hover:border-orange-500
              "
            >
              <FaFacebookF className="text-sm" />
            </div>

            <div
              className="
                w-12
                h-12
                rounded-full
                border
                border-gray-700
                flex
                items-center
                justify-center
                cursor-pointer
                transition
                duration-300
                hover:bg-orange-500
                hover:border-orange-500
              "
            >
              <FaXTwitter className="text-sm" />
            </div>

            <div
              className="
                w-12
                h-12
                rounded-full
                border
                border-gray-700
                flex
                items-center
                justify-center
                cursor-pointer
                transition
                duration-300
                hover:bg-orange-500
                hover:border-orange-500
              "
            >
              <FaInstagram className="text-sm" />
            </div>

            <div
              className="
                w-12
                h-12
                rounded-full
                border
                border-gray-700
                flex
                items-center
                justify-center
                cursor-pointer
                transition
                duration-300
                hover:bg-orange-500
                hover:border-orange-500
              "
            >
              <FaYoutube className="text-sm" />
            </div>

          </div>

        </div>

        {/* COLUMN 2 */}
        <div className="space-y-6">

          <h1
            className="
              text-2xl
              md:text-3xl
              font-bold
              font-Bricolage
            "
          >
            Quick links
          </h1>

          <div
            className="
              grid
              gap-4
              text-sm
              md:text-base
              text-gray-400
            "
          >

            <p className="hover:text-orange-500 transition cursor-pointer">
              Accent Chairs
            </p>

            <p className="hover:text-orange-500 transition cursor-pointer">
              Dining Chair
            </p>

            <p className="hover:text-orange-500 transition cursor-pointer">
              Dining Room
            </p>

            <p className="hover:text-orange-500 transition cursor-pointer">
              Kid's Furniture
            </p>

          </div>

        </div>

        {/* COLUMN 3 */}
        <div className="space-y-6">

          <h1
            className="
              text-2xl
              md:text-3xl
              font-bold
              font-Bricolage
            "
          >
            Information
          </h1>

          <div
            className="
              grid
              gap-4
              text-sm
              md:text-base
              text-gray-400
            "
          >

            <p className="hover:text-orange-500 transition cursor-pointer">
              Privacy policy
            </p>

            <p className="hover:text-orange-500 transition cursor-pointer">
              Refund policy
            </p>

            <p className="hover:text-orange-500 transition cursor-pointer">
              Shipping & Return
            </p>

            <p className="hover:text-orange-500 transition cursor-pointer">
              Term & Conditions
            </p>

          </div>

        </div>

        {/* COLUMN 4 */}
        <div className="space-y-6">

          <h1
            className="
              text-2xl
              md:text-3xl
              font-bold
              font-Bricolage
            "
          >
            Let’s get in touch
          </h1>

          {/* INPUT */}
          <div
            className="
              w-full
              bg-[#171717]
              rounded-2xl
              flex
              items-center
              overflow-hidden
            "
          >

            <input
              type="email"
              placeholder="Enter your email"
              className="
                w-full
                bg-transparent
                outline-none
                px-4
                py-4
                text-sm
                text-white
                placeholder:text-gray-500
              "
            />

            <button
              className="
                min-w-[55px]
                h-[55px]
                bg-orange-400
                flex
                items-center
                justify-center
                transition
                duration-300
                hover:bg-orange-500
              "
            >
              <MdOutlineArrowOutward className="text-xl" />
            </button>

          </div>

        </div>

      </div>

      {/* BORDER */}
      <div className="border-t border-gray-800"></div>

      {/* BOTTOM */}
      <div
        className="
          flex
          flex-col
          lg:flex-row
          items-center
          justify-between
          gap-6
          px-5
          md:px-10
          lg:px-20
          py-8
        "
      >

        {/* COPYRIGHT */}
        <p
          className="
            text-gray-400
            text-sm
            text-center
          "
        >
          © 2026 Miniture. Powered by Shopify
        </p>

        {/* BUTTONS */}
        <div
          className="
            flex
            flex-col
            sm:flex-row
            gap-4
            w-full
            sm:w-auto
          "
        >

          {/* LANGUAGE */}
          <button
            className="
              border
              border-gray-700
              rounded-full
              px-5
              py-3
              flex
              items-center
              justify-center
              gap-3
              text-sm
              hover:border-orange-500
              transition
              duration-300
            "
          >

            <IoEarthOutline className="text-lg" />

            <span>English</span>

          </button>

          {/* CURRENCY */}
          <button
            className="
              border
              border-gray-700
              rounded-full
              px-5
              py-3
              flex
              items-center
              justify-center
              gap-3
              text-sm
              hover:border-orange-500
              transition
              duration-300
            "
          >

            <RiMoneyDollarCircleLine className="text-lg" />

            <span>Rwanda (USD $)</span>

          </button>

        </div>

      </div>

    </footer>
  );
}

export default Footer;