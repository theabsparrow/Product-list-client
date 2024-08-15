import { Outlet } from "react-router-dom";
import Footer from "../shared/footer/Footer";
import Navbar from "../shared/navbar/Navbar";


const Layout = () => {
    return (
        <div>
            <div className="flex justify-between">
                <Navbar></Navbar>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Layout;