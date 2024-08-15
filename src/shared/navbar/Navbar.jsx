import { AiOutlineProduct } from "react-icons/ai";
import Navmenu from "./Navmenu";
import { MdAddShoppingCart, MdOutlineNoteAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from '../../../public/logo.png'
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { TbLogout2 } from "react-icons/tb";
import NavMobile from "./NavMobile";

const Navbar = () => {
    const [theme, setTheme] = useState(() => localStorage.getItem("userTheme") || "light");


    useEffect(() => {
        localStorage.setItem("userTheme", theme)
        const uiTheme = localStorage.getItem("userTheme")
        document.querySelector('html').setAttribute('data-theme', uiTheme)
    }, [theme])

    const handleTheme = (e) => {
        console.log(e.target.checked)
        if (e.target.checked) {
            setTheme("dark")
        }
        else {
            setTheme("light")
        }
    }
    return (
        <div>
            <div className="px-[20px] font-poppins hidden lg:block">
                <div className="w-[300px] h-screen bg-teal-800 flex flex-col justify-between py-5">

                    <div className="px-2 space-y-3">
                        <Link to='/' className="flex items-center">
                            <img className="w-[3vw]" src={logo} alt="logo" />
                            <span className="text-[45px] font-bold text-yellow-500">UNE SHOP</span>
                        </Link>
                        <div className="flex items-center justify-center gap-2 pl-2 text-yellow-500 text-xl font-bold">
                            <span>Default</span>
                            <input
                                onChange={handleTheme}
                                checked={theme === "dark"}
                                type="checkbox"
                                className="toggle bg-yellow-500" />
                            <span>Dark</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Navmenu address={"/"} label={"Products"} icon={AiOutlineProduct}></Navmenu>
                        <Navmenu address={"/add-product"} label={"Add Product"} icon={MdOutlineNoteAdd}></Navmenu>
                        <Navmenu address={"/my-products"} label={"My Products"} icon={MdAddShoppingCart}></Navmenu>
                    </div>

                    <div className="space-y-3">
                        <Navmenu address={"/profile"} label={"My Profile"} icon={CgProfile}></Navmenu>
                        <div className="hover:bg-yellow-500 hover:rounded-xl duration-500">
                            <button className="flex items-center gap-1 hover:text-[#859770]  text-lg text-white px-3 py-2"> <TbLogout2 className="text-3xl" /> Logout</button>
                        </div>
                    </div>

                </div>
            </div>

            <div className="lg:hidden">
                <NavMobile></NavMobile>
            </div>
        </div>
    );
};

export default Navbar;