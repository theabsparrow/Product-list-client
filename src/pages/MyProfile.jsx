import { Helmet } from "react-helmet";
import UseAuth from "../hooks/UseAuth";
import cover from '../../public/Cover.png';


const MyProfile = () => {
    const { user } = UseAuth();

    return (
        <div className="w-[calc(100vw-400px)] mt-5 ">
            <Helmet>
                <title>Profile || Dune Shop</title>
            </Helmet>
            <div className='flex justify-center items-center'>
                <Helmet>
                    <title>Profile</title>
                </Helmet>
                <div className='bg-teal-800 shadow-lg rounded-2xl lg:w-[70vw] lg:h-[80vh]'>
                    <img
                        alt='profile'
                        src={cover}
                        className='w-full mb-4 rounded-t-lg h-64'
                    />
                    <div className='flex flex-col items-center justify-center p-4 -mt-16'>
                        <a href='#' className='relative block'>
                            <img
                                alt='profile'
                                src={user?.photoURL}
                                className='mx-auto object-cover rounded-full h-52 w-52  border-2 border-white '
                            />
                        </a>
                        <p className='mt-2 text-xl font-medium text-white '>
                            User Id: {user.uid}
                        </p>
                        <div className='w-full p-2 mt-4 rounded-lg'>
                            <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
                                <p className=' flex gap-2 text-white text-2xl font-medium'>
                                    Name :
                                     <span className='font-bold text-black '>
                                        {user.displayName}
                                    </span>
                                </p>
                                <p className='flex gap-2 text-white text-xl font-medium'>
                                    Email
                                    <span className='font-bold text-black '>{user.email}</span>
                                </p>

                                <div>
                                    <button className='bg-[#859770] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1'>
                                        Update Profile
                                    </button>
                                    <button className='bg-[#859770] px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053]'>
                                        Change Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;