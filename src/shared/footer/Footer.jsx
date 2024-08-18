import { FaFacebook, FaXTwitter } from 'react-icons/fa6';
import logo from '../../../public/logo.png'
import { IoLogoYoutube } from 'react-icons/io';

const Footer = () => {
    return (
        <div className="mt-10">
            <footer className="footer footer-center bg-teal-800 text-primary-content p-10">
                <aside>
                    <img className='w-[10vw] lg:w-[5vw]' src={logo} alt="logo" />
                    <p className="font-bold">
                        Dune Shop
                        <br />
                        Providing reliable sports products since 2024
                    </p>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
                </aside>
                <nav>
                    <div className="grid grid-flow-col gap-4 text-3xl">
                        <a> <FaXTwitter /></a>
                        <a> <IoLogoYoutube /></a>
                        <a> <FaFacebook /></a>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;