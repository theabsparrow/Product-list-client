import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AllProducts = ({ product }) => {
    const { brandName, category, creationDateTime, price, productImage, productName, ratings, } = product;

    const [time, setTime] = useState('');
    const [date, setDate] = useState('');

    useEffect( () => {
        const modifiedTime = new Date (creationDateTime).toLocaleTimeString();
        const modifiedDate = new Date (creationDateTime).toLocaleDateString();
        setTime(modifiedTime)
        setDate(modifiedDate)

    }, [creationDateTime])

    return (
        <div className='border border-teal-800 rounded-xl p-3 shadow-xl font-poppins'>
            <div className='flex justify-center relative'>
                <img className='w-[250px] h-[250px] rounded-xl shadow-2xl' src={productImage} alt={productName} />
                <h1 className='absolute text-lg font-semibold text-teal-800 right-2 bg-[#EFF07DCC] px-2 py-1 rounded-xl'>Price: <span>{price} $</span></h1>
                <h1 className='absolute text-lg font-semibold text-teal-800 left-2 bottom-2 bg-[#EFF07DCC] px-2 py-1 rounded-xl'>Brand: <span>{brandName}</span></h1>
            </div>
            <div className='mt-6 pl-2 border-t-[1px] border-dashed border-teal-800 pt-4 flex justify-between items-end'>
                <div className='space-y-2'>
                    <h1 className='text-2xl font-semibold text-teal-800'>{productName}</h1>
                    <h1 className='text-lg font-medium'> Category: <span className='text-teal-800'>{category}</span></h1>
                    <h1 className='font-medium flex items-center gap-1'>Rate: <span className='text-teal-800'>{ratings}</span> <FaStar className='text-teal-800'/></h1>
                    <h1 className='text-lg font-medium text-teal-800'>{date} {time}</h1>
                </div>
                <div>
                    <Link className='px-2 py-1 rounded-xl bg-teal-800 text-white hover:bg-yellow-500 duration-500'>More</Link>
                </div>
            </div>
        </div>
    );
};

AllProducts.propTypes = {
    product: PropTypes.object
}
export default AllProducts;