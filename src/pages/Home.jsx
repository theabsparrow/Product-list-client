import HomeNavbar from "../component/homenavbar/HomeNavbar";


const Home = () => {
    return (
        <div className="px-[20px]">
            <div className="hidden lg:block">
                <HomeNavbar></HomeNavbar>
            </div>
        </div>
    );
};

export default Home;