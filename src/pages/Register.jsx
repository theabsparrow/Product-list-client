import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { TbFidgetSpinner } from "react-icons/tb";
import { Link } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import logo from '../../public/logo.png';
import { FcGoogle } from "react-icons/fc";
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';

const Register = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [errorPass, setErrorPass] = useState('');
    const [displayPass, setDisplayPass] = useState(false);
    const [displayConfirmPass, setDisplayConfirmPass] = useState(false);
    const [disable, setDisable] = useState(true);
    const {loading} = UseAuth();
    const [Captcha, setCaptcha] = useState('')
    const [errorCaptcha, setErrorCaptcha] = useState('')


    useEffect(() => {
        loadCaptchaEnginge(6)
    }, [])

    const handleCaptcha = (e) => {
        setCaptcha("")
        setErrorCaptcha("")
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setCaptcha("captcha matched successfully")
            setDisable(false)
        }

        else {
            return (setErrorCaptcha("captcha didn't matched, try again"),
                setDisable(true)
            )
        }
    }

    const onSubmit = async (data) => {
        const userName = data.name;
        const userEmail = data.email;
        const userImage = data.image[0];
        const userPass = data.password;

        console.log(userName, userEmail, userImage, userPass)
    }



    return (
        <div className="px-8 py-3 lg:w-[35vw] mx-auto mt-5 border border-teal-800 shadow-2xl rounded-xl font-poppins">
            {/* <Helmet>
                <title>Sign Up || surveyAtlas</title>
            </Helmet> */}
            <div className='flex items-center justify-center'>
                <img className='w-[2vw]' src={logo} alt="" />
                <h1 className='text-teal-800 text-4xl font-bold'>UNE SHOP</h1>
            </div>
            <h1 className="text-2xl font-semibold text-teal-800 mt-2 text-center">Register Now</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-3" >
                {/* name */}
                <div className="form-control">
                    <input type="text" name="name" {...register("name", { required: true, maxLength: 30 })} placeholder="Enter your name" className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                    {errors.name?.type === 'required' && <span className=" text-red-500">Name is required *</span>}
                    {errors.name?.type === 'maxLength' && <span className=" text-red-500">Name should not be more than 30 characters </span>}
                </div>

                {/* email */}
                <div className="form-control flex flex-col mt-3">
                    <input type="email" name="email" {...register("email", { required: true })} placeholder="email" className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                    {errors.email?.type === 'required' && <span className=" text-red-500">Email is required *</span>}
                </div>

                {/* image */}
                <div className="mt-3">
                    <label>
                        <span>Upload Image : </span>
                    </label>
                    <input type="file" name="image" {...register("image", { required: true })} id="image" className="text-teal-800" />
                    {errors.image?.type === 'required' && <span className=" text-red-500">Photo file required *</span>}
                </div>

                {/* password */}
                <div className="form-control relative mt-3">
                    <input
                        type={displayPass ? "text" : "password"}
                        placeholder="password"
                        name="password"
                        {...register("password", {
                            required: true,
                            minLength: 6,
                            maxLength: 20,
                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                        })}
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                    {errors.password?.type === 'required' && <span className=" text-red-500">Password required *</span>}
                    {errors.password?.type === 'minLength' && <span className=" text-red-500">Password should be at least 6 character</span>}
                    {errors.password?.type === 'maxLength' && <span className=" text-red-500">Password should not be more than 20 character </span>}
                    {errors.password?.type === 'pattern' && <span className=" text-red-500">Password must have one uppercase, one lowercase, one number and one special character</span>}
                    <span className="absolute top-3 right-2" onClick={() => setDisplayPass(!displayPass)}>{displayPass ? <IoEyeOff className="text-xl text-teal-800"></IoEyeOff> : <IoEye className="text-xl text-teal-800"></IoEye>}</span>
                </div>

                {/* confirm password */}
                <div className="form-control relative mt-3">
                    <input
                        type={displayConfirmPass ? "text" : "password"}
                        placeholder="confirm password"
                        name="confirmPass"
                        {...register("confirmPass", {
                            required: true,
                            minLength: 6,
                            maxLength: 20,
                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                        })}
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                    {errors.confirmPass?.type === 'required' && <span className=" text-red-500">Confirm Password required *</span>}
                    {errors.confirmPass?.type === 'minLength' && <span className=" text-red-500">Confirm Password should be at least 6 character</span>}
                    {errors.confirmPass?.type === 'maxLength' && <span className=" text-red-500">Confirm Password should not be more than 20 character </span>}
                    {errors.confirmPass?.type === 'pattern' && <span className=" text-red-500">Confirm Password must have one uppercase, one lowercase, one number and one special character</span>}
                    {errorPass && <span className=" text-red-500">{errorPass}</span>}
                    <span className="absolute top-3 right-2" onClick={() => setDisplayConfirmPass(!displayConfirmPass)}>{displayConfirmPass ? <IoEyeOff className="text-xl text-teal-800"></IoEyeOff> : <IoEye className="text-xl text-teal-800"></IoEye>}</span>
                </div>

                {/* terms and service */}
                <div className="flex flex-col justify-center gap-2 mt-2">
                    <div className="flex items-center">
                        <input type="checkbox" name="checked" {...register("checked", {
                            required: true,
                        })} id="checked" />
                        <p>Accept our terms and services.</p>
                    </div>
                    {errors.checked?.type === 'required' && <span className=" text-red-500">You need to accept our terms and services *</span>}
                </div>

                {/* recaptcha */}
                <div className="form-control flex flex-col border">
                    <label className="label">
                        <LoadCanvasTemplate />
                    </label>
                    <input
                        name="captcha"
                        {...register("captcha", {
                            required: true,
                        })}
                        onBlur={handleCaptcha}
                        type="text"
                        placeholder="type the captcha above"
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                    {errors.captcha?.type === 'required' && <span className=" text-red-500">You need to type correct recaptcha *</span>}
                    {Captcha && <span className="text-teal-800">{Captcha}</span>}
                    {errorCaptcha && <span className="text-red-600">{errorCaptcha}</span>}
                </div>

                <div className="form-control mt-3">
                    <button
                        disabled={ disable}
                        type="submit"
                        className="btn bg-teal-800 hover:bg-yellow-500 duration-500 text-white text-lg">
                        {/* {loading ? <TbFidgetSpinner className="animate-spin m-auto"></TbFidgetSpinner> : "Sign up"} */}
                        Register
                    </button>
                </div>
            </form>
            <div>
                <div>
                    <div className="divider divider-success text-teal-800">Social Login</div>
                </div>
                <div>
                    <button className='flex items-center justify-center mt-2 gap-10 text-lg font-medium border-teal-800 shadow-xl border-[1px] w-full px-6 py-2 rounded-xl hover:bg-teal-800 hover:text-white duration-500'>
                        <FcGoogle className='text-xl'></FcGoogle> Sign in with Google
                    </button>
                </div>

                <div className="text-center mt-2">
                    <p>Already have an account? Please <Link to='/login' className="text-teal-800 text-xl font-medium ">Login</Link></p>
                </div>

            </div>

        </div>
    );
};

export default Register;