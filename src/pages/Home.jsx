
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import AllProducts from "../component/allProducts/AllProducts";
import UseAllProducts from "../hooks/UseAllProducts";
import { useEffect, useState } from "react";
import UseAxiosSecure from "../hooks/UseAxiosSecure";


const Home = () => {

    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const axiossecure = UseAxiosSecure();

    // call the products 
    const { products } = UseAllProducts(itemsPerPage, currentPage);


    useEffect(() => {
        const getCount = async () => {
            const { data } = await axiossecure.get(`/products-count`)
            setCount(data.count)
        }
        getCount()
    }, [axiossecure])

    const handleSearch = (e) => {
        e.preventDefault();
        const search = e.target.search.value;

    }

    const numberofPages = Math.ceil(count / itemsPerPage)
    const pages = [...Array(numberofPages).keys()].map(element => element + 1)

    // handle pagination
    const handlePagination = (value) => {
        setCurrentPage(value)
    }
    return (
        <div className="px-[20px] font-poppins">
            <div className="bg-teal-800 h-[250px] min-w-[calc(100vw-400px)] sticky top-0 z-10 font-poppins rounded-b-xl px-5 pt-3">
                <div className="flex items-center gap-16">
                    <h1 className="text-xl font-semibold text-white">Total Product: {products.length}</h1>
                    <h1 className=" text-3xl text-white font-semibold">Find your product easily by filtering</h1>
                </div>
                <div className="flex justify-between mt-5">
                    <div className="flex justify-center items-center space-x-2">
                        <label htmlFor="sort by" className=" text-white"> Sort By:</label>
                        <select name="price" id="price" className=" outline-none rounded-xl bg-[#EFF07D] p-2 text-teal-800">
                            <option value="">Price</option>
                            <option value="dsc">Descending Order</option>
                            <option value="asc">Ascending Order</option>
                        </select>
                    </div>

                    <div className="flex justify-center items-center space-x-2">
                        <label htmlFor="sort by" className=" text-white"> Sort By:</label>
                        <select name="date" id="date" className=" outline-none rounded-xl bg-[#EFF07D] p-2 text-teal-800">
                            <option value="">Date</option>
                            <option value="dscDate">Descending Order</option>
                            <option value="ascDate">Ascending Order</option>
                        </select>
                    </div>

                    <div className="flex justify-center items-center space-x-2">
                        <label htmlFor="sort by" className=" text-white"> Filter By:</label>
                        <select name="Brand-Name" id="brand" className=" outline-none rounded-xl bg-[#EFF07D] p-2 text-teal-800">
                            <option value="">Brand</option>
                            <option value="nike">Nike</option>
                            <option value="addidas">Addidas</option>
                            <option value="puma">Puma</option>
                            <option value="fila">Fila</option>
                        </select>
                    </div>

                    <div className="flex justify-center items-center space-x-2">
                        <label htmlFor="sort by" className=" text-white"> Filter By:</label>
                        <select name="category" id="category" className=" outline-none rounded-xl bg-[#EFF07D] p-2 text-teal-800">
                            <option value="">Category</option>
                            <option value="shoe">Shoe</option>
                            <option value="t-shirt">T-shirt</option>
                            <option value="cap">Cap</option>
                            <option value="shorts">Shorts</option>
                        </select>
                    </div>

                    <div className="flex justify-center items-center space-x-2">
                        <label htmlFor="sort by" className=" text-white"> Filter By:</label>
                        <select name="price-range" id="price-range" className=" outline-none rounded-xl bg-[#EFF07D] p-2 text-teal-800">
                            <option value="">Price-range</option>
                            <option value="20-40">20$-40$</option>
                            <option value="41-80">41$-80$</option>
                            <option value="81-120">81$-120$</option>
                            <option value="121-150">121$-150$</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-center items-center mt-16">
                    <form onSubmit={handleSearch} className="flex items-center">
                        <label className="flex items-center gap-2 relative">
                            <input className="py-[10px] px-3 rounded-l-xl outline-none" type="search" name='search' placeholder="Search here" />
                        </label>
                        <input className="text-teal-800 bg-[#EFF07D] text-xl font-medium px-3 py-2 rounded-r-xl cursor-pointer hover:scale-105 duration-500" type="submit" value="sumbit" />
                    </form>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
                {
                    products.map(product => <AllProducts key={product._id} product={product}></AllProducts>)
                }
            </div>

            {/* pagination section */}
            <div className="mt-12 flex items-center justify-center gap-4">
                <button
                    onClick={() => handlePagination(currentPage - 1)}
                    className="bg-teal-800 px-3 py-2 rounded-xl flex items-center gap-1 text-white font-medium hover:scale-110 duration-500">
                    <FaArrowLeftLong /> Previous
                </button>

                {
                    pages.map(buttonNum => (
                        <button
                            onClick={() => handlePagination(buttonNum)}
                            key={buttonNum}
                            className={`${currentPage === buttonNum ? "bg-[#EFF07D] text-teal-800" : "bg-teal-800 text-white"}  px-3 py-2 rounded-xl  font-medium hover:scale-110 duration-500`}>
                            {buttonNum}
                        </button>
                    )

                    )
                }

                <button
                    onClick={() => handlePagination(currentPage + 1)}
                    className="bg-teal-800 px-3 py-2 rounded-xl flex items-center gap-1 text-white font-medium hover:scale-110 duration-500">
                    Next <FaArrowRightLong />
                </button>
            </div>
        </div>
    );
};

export default Home;