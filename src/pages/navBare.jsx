import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RiMenu2Fill } from "react-icons/ri";

function NavBare() {
  return (
    <>
      <div className="w-full h-20 bg-white-950 flex justify-between items-center px-10 shadow-b-blue-200">
        <div className="flex items-center justify-center">
          <p className="hidden md:block font-Maven text-black text-3xl font-semibold ">
            muniture
          </p>
          <span className="text-3xl block md:hidden">
            <RiMenu2Fill />
          </span>
        </div>
        <div>
          <div>
            <p className="block md:hidden font-Maven text-black text-3xl font-semibold ">
              muniture
            </p>
            <div className="hidden md:block">
              <ul className="flex text-black gap-3 hover:cursor-pointer ">
                <li className="hover:text-orange-500 ">
                  <Link to="./" className="flex items-center">
                    <span>Home</span>{" "}
                    <span>
                      <MdKeyboardArrowDown />
                    </span>
                  </Link>
                </li>
                <li className="hover:text-orange-500 ">
                  <Link to="service" className="flex items-center">
                    <span>Catalog</span>
                    <span>
                      <MdKeyboardArrowDown />
                    </span>
                  </Link>
                </li>
                <li className="hover:text-orange-500 ">
                  <Link to="about" className="flex items-center">
                    <span>Pages</span>
                    <span>
                      <MdKeyboardArrowDown />
                    </span>
                  </Link>
                </li>
                <li className="hover:text-orange-500 ">
                  <Link to="menu">
                    <span>Blog</span>
                  </Link>
                </li>
                <li className="hover:text-orange-500 ">
                  <Link to="menu">
                    <span>Contact</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <span className="text-xl hover:text-orange-500 hover:font-bold">
            <CiSearch className="hover:font-semibold" />
          </span>
          <span className="hidden md:block text-xl">
            <IoPersonOutline />
          </span>

          <div className="flex">
            <span className="text-xl hover:text-orange-500">
              <MdOutlineShoppingBag />
            </span>
            <div className="mt-[-8px] ml-[-5px]">
            <div className=" bg-orange-500 rounded-full w-5 h-5 flex justify-center items-center">
              <p className="text-white text-[10px] font-bold text-center ">1</p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBare;
