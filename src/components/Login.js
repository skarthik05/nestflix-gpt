import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../config/firebase.config';
import { addUser } from '../utils/store/userSlice';
import { validateFormData } from '../utils/formValidation.util';
import Header from './Header'

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleSignUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth, 
                email.current.value, 
                password.current.value
            );
            
            const user = userCredential.user;
            await updateProfile(user, {
                displayName: name.current.value
            });

            const { uid: userId, email: userEmail, displayName: userName, photoURL: userPhoto } = auth.currentUser;
            dispatch(addUser({ 
                uid: userId, 
                email: userEmail, 
                displayName: userName, 
                photoURL: userPhoto 
            }));
            navigate('/browse');
        } catch (error) {
            setErrorMessage(`${error.code}-${error.message}`);
        }
    };

    const handleSignIn = async () => {
        try {
            await signInWithEmailAndPassword(
                auth, 
                email.current.value, 
                password.current.value
            );
            navigate('/browse');
        } catch (error) {
            setErrorMessage(`${error.code}-${error.message}`);
        }
    };

    const handleButtonSubmit = () => {
        const message = validateFormData(
            email.current.value, 
            password.current.value, 
            name?.current?.value
        );
        setErrorMessage(message);
        if (message) return;

        if (!isSignInForm) {
            handleSignUp();
        } else {
            handleSignIn();
        }
    };

    const handleToggle = () => setIsSignInForm(!isSignInForm);

    return (
        <div>
            <Header />
            <div className='absolute'>
                <img
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg" 
                    alt='bg-image' 
                />
            </div>

            <form 
                onClick={(e) => e.preventDefault()} 
                className="w-3/12 absolute bg-black p-12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
            >
                <h1 className='font-bold text-3xl py-4'>
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>
                
                {!isSignInForm && (
                    <input 
                        ref={name} 
                        type='text' 
                        placeholder='Full Name' 
                        className='p-4 my-4 w-full bg-gray-800' 
                    />
                )}
                
                <input 
                    ref={email} 
                    type='email' 
                    placeholder='Email Address' 
                    className='p-4 my-4 w-full bg-gray-800' 
                />
                
                <input 
                    ref={password} 
                    type='password' 
                    placeholder='Password' 
                    className='p-4 my-4 w-full bg-gray-800' 
                />
                
                {errorMessage && (
                    <p className='text-red-500 font-semibold text-lg'>{errorMessage}</p>
                )}
                
                <button 
                    onClick={handleButtonSubmit} 
                    className='p-4 my-6 w-full bg-red-600 rounded-md'
                >
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>
                
                <p 
                    className='py-4 cursor-pointer' 
                    onClick={handleToggle}
                >
                    {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}
                </p>
            </form>
        </div>
    );
};

export default Login;