import React, { useContext, useState } from 'react';
import loginIcons from '../assest/signin.gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';


const Login = () => {
    const [showPassword, setPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const { fetchUserDetails } = useContext(Context)

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
const navigate = useNavigate()
    const handleSubmit = async(e) =>{
        e.preventDefault()

        const dataResponse = await fetch(SummaryApi.signIn.url,{
            method : SummaryApi.signIn.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        if(dataApi.success){
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()
           
        }

        if(dataApi.error){
            toast.error(dataApi.message)
        }

    }

    console.log("data login",data)

    return (
        <section id='login'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-5 py-4 w-full max-w-sm mx-auto '>
                    <div className='w-20 h-20 mx-auto '>
                        <div>
                            <img src={loginIcons} alt='login icons' />
                        </div>
                            
                    </div>

                    <form className='pt-6 flex flex-col gap-3' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Email :</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='email'
                                    placeholder=' Enter email '
                                    name='email'
                                    value={data.email}
                                    onChange={handleChange}
                                    className='w-full h-full outline-none bg-transparent'
                                />
                            </div>
                        </div>

                        <div>
                            <label>Password :</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Enter password'
                                    name='password'
                                    value={data.password}
                                    onChange={handleChange}
                                    className='w-full h-full outline-none bg-transparent'
                                />
                                <div className='cursor-pointer text-xl' onClick={() => setPassword((prev) => !prev)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                            <Link to={'/forgot-password'} className='block w-fit my-2 ml-auto hover:underline hover:text-red-600'>
                                forgot password ?
                            </Link>
                        </div>

                        <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-3 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login In</button>
                    </form>

                    <p className='my-5'>Don't have an account ? <Link to={'/sign-up'} className='text-red-600 hover:text-red-700 hover:underline hover:uppercase'>Sign Up</Link></p>
                </div>
            </div>
        </section>
    );
};

export default Login;
