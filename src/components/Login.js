import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
    const [isSignInForm,setIsSingInForm] = useState(true);
    const handleToggle=()=>setIsSingInForm(!isSignInForm)
    return (
        <div>

            <Header />
            <div className='absolute'>
                <img
                    src=
                    "https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt='bg-image' />
            </div>

            <form className="w-3/12 absolute bg-black p-12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
                <h1 className='font-bold text-3xl py-4'>{isSignInForm?"Sign In":"Sign Up"}</h1>
                {!isSignInForm && 
                <input type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-800' />}
                <input type='email' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-800 ' />
                <input type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-800' />
                <button className='p-4 my-6 w-full bg-red-600 rounded-md'>{isSignInForm?"Sign In":"Sign Up"}</button>
                <p className='py-4 cursor-pointer' onClick={handleToggle}>{isSignInForm?"New to Netflix? Sign Up Now":"Already registered? Sign In Now"}</p>


            </form>
        </div>
    )
}

export default Login