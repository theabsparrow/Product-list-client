import { Link, useNavigate } from "react-router-dom";
import logo from '../../../public/logo.png'
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { MdAddShoppingCart, MdLightbulbCircle, MdNightlight, MdOutlineMenu, MdOutlineNoteAdd } from "react-icons/md";
import Navmenu from "./Navmenu";
import { AiOutlineProduct } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { TbLogout2 } from "react-icons/tb";
import UseAuth from "../../hooks/UseAuth";
import Swal from "sweetalert2";

const NavMobile = () => {
    const [display, setDisplay] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem("userTheme") || "light");
    const {logout, user} = UseAuth();
    const navigate = useNavigate();

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

    const handleLogout = async() => {
        try {
            await logout()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Log out successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/login")
        }
        catch (error) {
            console.log(error)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "logout failed",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    }

    return (
        <div className="font-poppins h-[70px] md:h-[120px] bg-teal-800 px-3 md:py-2">
            <div className="flex justify-between items-center">
                <Link to='/' className="flex items-center">
                    <img className="w-[10vw]" src={logo} alt="logo" />
                    <span className="text-[40px] md:text-6xl font-bold text-yellow-500">UNE SHOP</span>
                </Link>

                <div className={`${display ? "right-0 " : "hidden"} duration-1000 lg:hidden z-10 absolute top-[69px] md:top-[90px] space-y-3 flex flex-col items-start shadow-xl rounded-b-xl p-3 bg-teal-800 `}>
                    <Navmenu address={"/"} label={"Products"} icon={AiOutlineProduct}></Navmenu>
                    <Navmenu address={"/add-product"} label={"Add Product"} icon={MdOutlineNoteAdd}></Navmenu>
                    <Navmenu address={"/my-products"} label={"My Products"} icon={MdAddShoppingCart}></Navmenu>
                    <Navmenu address={"/profile"} label={"My Profile"} icon={CgProfile}></Navmenu>
                    <div className="hover:bg-yellow-500 hover:rounded-xl duration-500">
                        <button onClick={handleLogout} className="flex items-center gap-1 hover:text-[#859770]  text-lg text-white px-3 py-2"> <TbLogout2 className="text-3xl" /> Logout</button>
                    </div>
                    <div className="flex items-center justify-center gap-2 pl-2 text-yellow-500  font-bold">
                            <span className="text-2xl"><MdLightbulbCircle /></span>
                            <input
                                onChange={handleTheme}
                                checked={theme === "dark"}
                                type="checkbox"
                                className="toggle bg-yellow-500" />
                            <span className="text-2xl"><MdNightlight /></span>
                        </div>

                </div>

                {/* hamburger icon*/}
                <div onClick={() => setDisplay(!display)} className='lg:hidden'>
                    {
                        display === true ? <RxCross2 className='text-5xl md:text-6xl text-yellow-500'></RxCross2> : <MdOutlineMenu className='text-5xl md:text-6xl text-yellow-500'></MdOutlineMenu>
                    }
                </div>
            </div>
        </div>
    );
};

export default NavMobile;