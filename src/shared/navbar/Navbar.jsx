import { AiOutlineProduct } from "react-icons/ai";
import Navmenu from "./Navmenu";
import { MdAddShoppingCart, MdOutlineNoteAdd } from "react-icons/md";


const Navbar = () => {
    return (
        <div className="px-[30px] sticky top-0 z-10 font-poppins">
            <div className="w-[200px] h-screen bg-teal-800 ">
                <div className="space-y-5">
                    <Navmenu address={"/"} label={"Products"} icon={AiOutlineProduct}></Navmenu>
                    <Navmenu address={"/add-product"} label={"Add Product"} icon={MdOutlineNoteAdd}></Navmenu>
                    <Navmenu address={"/my-products"} label={"My Products"} icon={MdAddShoppingCart}></Navmenu>
                </div>

            </div>
        </div>
    );
};

export default Navbar;