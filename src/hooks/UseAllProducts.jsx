import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";


const UseAllProducts = (itemsPerPage, currentPage) => {
    const axiossecure = UseAxiosSecure();
    const {data:products=[], isLoading, refetch} = useQuery({
        queryKey: ['products', itemsPerPage, currentPage],
        queryFn: async () => {
            const {data} = await axiossecure.get(`products?page=${currentPage}&size=${itemsPerPage}`)
            return data;
        }
    })
    return {products, isLoading, refetch}
};

export default UseAllProducts;