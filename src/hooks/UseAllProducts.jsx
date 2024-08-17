import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";


const UseAllProducts = (itemsPerPage, currentPage, sortPrice, sortDate, filterBrand, filterCategory, search, minPrice, maxPrice) => {
    const axiossecure = UseAxiosSecure();
    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: [
            'products',
            itemsPerPage,
            currentPage,
            sortPrice,
            sortDate,
            filterBrand,
            filterCategory,
            search,
            minPrice,
            maxPrice
        ],
        queryFn: async () => {
            const { data } = await axiossecure.get(
                `/products?page=${currentPage}&size=${itemsPerPage}&sortPrice=${sortPrice}&sortDate=${sortDate}&filterBrand=${filterBrand}&filterCategory=${filterCategory}&search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}`
            )

            return data;
        }
    })
    return { products, isLoading, refetch }
};

export default UseAllProducts;