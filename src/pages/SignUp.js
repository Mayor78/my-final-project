import React, {  useState } from 'react'
import loginIcons from '../assest/signin.gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate  } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';





const SignUp = () => {
    const [showPassword, setPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [Data, setData] = useState({
        email: "",
        password: "",
        name : "",
        confirmpassword: "",
        profilePic: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUploadPic = async(e)=>{
        const file = e.target.files[0]

        const imagePic = await imageTobase64(file)
      
        setData((preve)=>{
            return{
                ...preve,
                profilePic :imagePic
            }
        })
    }
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (Data.password === Data.confirmpassword) {
          try {
            const dataResponse = await fetch(SummaryApi.signUp.url, {
              method: SummaryApi.signUp.method,
              headers: {
                "content-type": "application/json"
              },
              body: JSON.stringify(Data)
            });
      
            if (dataResponse.ok) {
              const data = await dataResponse.json();
      
              if (data.success) {
                toast.success(data.message);
                navigate("/login");
              } else {
                toast.error(data.message);
              }
            } else {
              console.error("Server responded with an error:", dataResponse.statusText);
            }
      
          } catch (err) {
            console.error("Fetch error:", err);
          }
        } else {
          console.log("Passwords don't match");
        }
      };
      

  return (
    <section id='sign-up'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-5 py-4 w-full max-w-sm mx-auto '>
                    <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                        <div>
                            <img src={Data.profilePic || loginIcons} alt='login icons' />
                        </div>
                        <form>
                            <label>
                            <div className='text-xs bg-opacity-80 bg-slate-200 py-3 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                                upload Photo
                            </div>
                                <input type='file'className='hidden'onChange={handleUploadPic}/>
                            </label>
                        </form>
                      
                       
                    </div>

                    <form className='pt-6 flex flex-col gap-3' onSubmit={handleSubmit}>
                    <div className='grid'>
                            <label>Name :</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='text'
                                    placeholder=' Enter your Name '
                                    name='name'
                                    value={Data.name}
                                    onChange={handleChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent'
                                />
                            </div>
                        </div>

                        <div className='grid'>
                            <label>Email :</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='email'
                                    placeholder=' Enter email '
                                    name='email'
                                    value={Data.email}
                                    onChange={handleChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent' />
                               
                            </div>
                        </div>

                        <div>
                         <label>Password :</label>
                            <div className='bg-slate-100 p-2 flex'>
                                 <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Enter password'
                                    name='password'
                                    value={Data.password}
                                    onChange={handleChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent'/>
                                
                                 <div className='cursor-pointer text-xl' onClick={() => setPassword((prev) => !prev)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </div>
                            </div>
                            
                           
                        </div>
                        <div>
                         <label>Confirm Password :</label>
                            <div className='bg-slate-100 p-2 flex'>
                                 <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder='Confirm Your password'
                                    value={Data.confirmpassword}
                                    name='confirmpassword'
                                    onChange={handleChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent'/>
                                
                                 <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </div>
                            </div>
                            
                           
                        </div>
                        
                        
                        

                        <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-3 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign Up</button>
                    </form>

                    <p className='my-5'>Already have an account ? <Link to={'/login'} className='text-red-600 hover:text-red-700 hover:underline hover:uppercase'>Login</Link></p>
                </div>
            </div>
        </section>
  )
}

export default SignUp
