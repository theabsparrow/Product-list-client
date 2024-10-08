import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../public/logo.png'
import UseAuth from "../hooks/UseAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { userLogin, setUser, user, setLoading, loginWithGoogle } = UseAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [navigate, user])

    // login with email and password
    const handleLogin = async (e) => {
        e.preventDefault();
        const userEmail = e.target.email.value;
        const userPass = e.target.password.value;

        try {
            const result = await userLogin(userEmail, userPass);
            setUser(result.user);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Login successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/')
        }
        catch (error) {
            console.log(error)
            setLoading(false)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "invalid email or password",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    }

    // login with google
    const handleGoogle = async () => {
        try {
            const result = await loginWithGoogle();
            console.log(result)
            setUser(result.user);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Successfully login with google",
                showConfirmButton: false,
                timer: 1500
            });
        }
        catch (error) {
            setLoading(false)
            console.log(error)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "invalid email or password",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    }

    return (
        <div>
            {!user ? <>
                <div className="min-h-[calc(100vh-466px)] px-4 lg:px-[70px] mt-4 mb-4 font-roboto">

                    <Helmet>
                        <title>Login || Dune Shop</title>
                    </Helmet>

                    <div className="flex justify-center">
                        <div className="md:w-[90vw] lg:w-[35vw] p-6 border-[1px] border-teal-800 shadow-2xl rounded-lg">

                            <div className='flex flex-col items-center'>
                                <h1 className="mt-3 text-2xl font-semibold sm:text-3xl ">You must login first to</h1>
                                <div className='flex items-center'>
                                    <img className='w-[10vw] lg:w-[4vw]' src={logo} alt="" />
                                    <h1 className='text-teal-800 text-3xl lg:text-5xl font-bold'>UNE SHOP</h1>
                                </div>
                            </div>

                            <form onSubmit={handleLogin}>
                                <div className="flex flex-col mt-6">
                                    <label className='text-xl font-medium'>Email:</label>
                                    <input type="email" name='email' className="block  py-3 border bg-transparent rounded-lg px-5 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="enter your email address" required />
                                </div>
                                <div className="relative flex flex-col mt-6">
                                    <label className='text-xl font-medium'>Password:</label>
                                    <input type={showPassword ? "text" : "password"} name='password' className="block  py-3 border bg-transparent rounded-lg px-5 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="enter your password" required />
                                    <span onClick={() => setShowPassword(!showPassword)} className='text-xl absolute right-2 top-11'>
                                        {showPassword ? <IoEyeOff className="text-teal-800"></IoEyeOff> : <IoEye className="text-teal-800"></IoEye>}
                                    </span>
                                </div>
                                <div className='mt-3 space-x-2 flex items-center'>
                                    <label htmlFor="checked" className='text-lg font-medium'>Remember</label>
                                    <input type="checkbox" name="checkbox" id="checkbox" />
                                </div>
                                <div className='mt-4'>
                                    <button className="w-full px-6 py-3 text-lg font-medium text-white bg-teal-800 rounded-lg hover:bg-yellow-500 duration-500">
                                        Sign in
                                    </button>
                                </div>
                            </form>

                            <div className="mt-6">
                                <p className="mt-4 text-center text-lg font-medium">or sign in with</p>
                                <button onClick={handleGoogle} className='flex items-center justify-center mt-2 gap-10 text-lg font-medium border-teal-800 shadow-xl border-[1px] w-full px-6 py-3 rounded-xl hover:bg-teal-800 hover:text-white duration-500'>
                                    <FcGoogle className='text-xl'></FcGoogle> Sign in with Google
                                </button>

                                <div className="mt-6 text-center ">
                                    <h1 className='text-lg font-medium'>Don’t have an account yet? <Link to='/register' className='text-teal-800 hover:text-yellow-500 duration-500'>Register</Link></h1>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </> : <>
                <div className="min-h-screen flex items-center justify-center">
                    <span className="loading loading-bars loading-xs"></span>
                    <span className="loading loading-bars loading-sm"></span>
                    <span className="loading loading-bars loading-md"></span>
                    <span className="loading loading-bars loading-lg"></span>
                </div>
            </>}
        </div>
    );
};

export default Login;