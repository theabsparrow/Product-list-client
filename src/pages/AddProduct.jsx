import { Helmet } from "react-helmet";
import UseAuth from "../hooks/UseAuth";
import axios from "axios";
import { useState } from "react";
import { ImGift } from "react-icons/im";
import { useMutation } from "@tanstack/react-query";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
import Swal from "sweetalert2";


const AddProduct = () => {
    const { user } = UseAuth();
    const [imagePreview, setImagePreview] = useState();
    const [imageText, setImageText] = useState('Upload Image');
    const axiossecure = UseAxiosSecure();


    const { mutateAsync } = useMutation({
        mutationFn: async (productData) => {
            const { data } = await axiossecure.post(`/add-product`, productData)
            return data;
        },
        onSuccess: () => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Product added successfully!",
                showConfirmButton: false,
                timer: 1500
            });

            setImagePreview(null);
            setImageText('Upload Image');
            document.getElementById('product-form').reset();
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const productName = form.name.value;
        const image = form.image.files[0];
        const category = form.category.value;
        const brandName = form.brand.value;
        const price = parseInt(form.price.value);
        const ratings = form.ratings.value;
        const description = form.describtion.value;
        const creationDateTime = new Date();
        const userName = user.displayName;
        const userEmail = user.email


        const formData = new FormData();
        formData.append('image', image);
        try {
            const response = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                formData
            );

            const productImage = response.data.data.display_url;
            console.log(productImage)

            const productData = {
                productName, productImage, description, price, category, brandName, ratings, creationDateTime, userName, userEmail
            }

            await mutateAsync(productData)

        }
        catch (error) {
            console.log(error)
        }
    }

    const hnadleImage = (image) => {
        setImagePreview(URL.createObjectURL(image));
        setImageText(image.name)
    }
    return (
        <div className=" w-full">
            <Helmet>
                <title>Add Products || Dune Shop</title>
            </Helmet>
            <div className="flex justify-center mt-10">
                <div className="md:w-[90vw] lg:w-[40vw] p-6 border-[1px] shadow-2xl rounded-lg">

                    <div className='flex flex-col items-center'>
                        <h1 className=" text-2xl font-semibold  capitalize sm:text-3xl ">Add a Product</h1>
                    </div>

                    <form id="product-form" onSubmit={handleSubmit}>

                        <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-6">
                            <div className="flex flex-col lg:w-[49%]">
                                <label className="text-lg font-medium" > Product Name :</label>
                                <input type="text" name="name" className="block  py-2 border bg-transparent rounded-lg px-5 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="enter product name" required />
                            </div>

                            <div className=' p-4 bg-white w-full  m-auto rounded-lg flex'>
                                <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                                    <div className='flex flex-col w-max mx-auto text-center'>
                                        <label>
                                            <input
                                                onChange={e => hnadleImage(e.target.files[0])}
                                                className='text-sm cursor-pointer w-36 hidden'
                                                type='file'
                                                name='image'
                                                id='image'
                                                accept='image/*'
                                                hidden
                                            />
                                            <div className='bg-teal-800 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-yellow-500 duration-500'>
                                                {
                                                    imageText.length > 15 ? imageText.split('.')[0].slice(0, 15) + '...' + imageText.split('.')[1] : imageText
                                                }
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                <div className=" border">
                                    {imagePreview && <img className="h-[10vh] w-[15vw] lg:h-[10vh] lg:w-[8vw]" src={imagePreview} />}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-6 gap-4">
                            <div className="flex flex-col lg:w-[49%]">
                                <label className="text-lg font-medium">Choose category :</label>
                                <select
                                    className="lg:w-full bg-teal-800 p-2 text-white rounded-lg py-2 px-2 lg:px-5 outline-none"
                                    name="category"
                                    id="category"
                                    required>
                                    <option value="">Category</option>
                                    <option value="shoe">Shoe</option>
                                    <option value="t shirt">T-shirt</option>
                                    <option value="cap">Cap</option>
                                    <option value="shorts">Shorts</option>
                                </select>
                            </div>

                            <div className="flex flex-col lg:w-[49%]">
                                <label className="text-lg font-medium">Choose Brand :</label>
                                <select
                                    className="lg:w-full bg-teal-800 text-white rounded-lg py-2 px-2 lg:px-5 outline-none"
                                    name="brand"
                                    id="brand"
                                    required>
                                    <option value="">Brand</option>
                                    <option value="Nike">Nike</option>
                                    <option value="Adidas">Adidas</option>
                                    <option value="Puma">Puma</option>
                                    <option value="Fila">Fila</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-6 ">
                            <div className="flex flex-col lg:w-[49%]">
                                <label className="text-lg font-medium">Product price :</label>
                                <input
                                    type="text"
                                    name='price'
                                    className="block  py-2 border bg-transparent rounded-lg px-5 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="input price"
                                    required />
                            </div>
                            <div className="flex flex-col lg:w-[49%]">
                                <label className="text-lg font-medium">Ratings:</label>
                                <input
                                    type="text"
                                    name='ratings'
                                    className="block  py-2 border bg-transparent rounded-lg px-5 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="input ratings"
                                    required />
                            </div>
                        </div>


                        <div className='mt-3 space-x-2 flex flex-col'>
                            <label className="text-lg font-medium">Product describtion :</label>
                            <textarea className="outline-none border-gray-600 border-[1px] rounded-xl px-6 pt-3 bg-transparent" name="describtion" id="describtion" cols="30" rows="3" placeholder="write a describtion" required></textarea>
                        </div>

                        <div className='mt-4'>
                            <button className="w-full px-6 py-3 text-lg font-medium text-white bg-teal-800 rounded-lg hover:bg-yellow-500 duration-500 ">
                                Submit
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default AddProduct;