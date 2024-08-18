import { Helmet } from "react-helmet";

const MyProducts = () => {
    return (
        <div className="font-poppins flex items-center">
             <Helmet>
                <title>My Products || Dune Shop</title>
            </Helmet>
            <h1 className="text-5xl font-bold text-teal-800">No Product is available here Right now</h1>
        </div>
    );
};

export default MyProducts;