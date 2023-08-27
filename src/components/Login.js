import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';

const Login = () => {
 
 const [isSignInForm,setIsSignForm]=useState(true);
 const[errorMessage,setErrorMessage]=useState();

//const name=useRef(null);
 const email=useRef(null);
 const password=useRef(null);


 const toggleSignInForm=() =>{
    setIsSignForm(!isSignInForm);
 }

 const handleButtonClick=()=>{

    //validate data
    const message=checkValidData(email.current.value,password.current.value);
    
    setErrorMessage(message);

    //sign in/up

 }
    
  return (
    <div>
        <Header/>
        <div className='absolute'>
          <img src="https://assets.nflxext.com/ffe/siteui/vlv3/00103100-5b45-4d4f-af32-342649f1bda5/64774cd8-5c3a-4823-a0bb-1610d6971bd4/IN-en-20230821-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="Logo"/>
        </div>
        <form onSubmit={(e)=>e.preventDefault()} className='absolute w-3/12 bg-black p-12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
            <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
            { !isSignInForm && <input type="text" placeholder='Enter Name' className="p-4 my-4 w-full bg-gray-700 rounded-lg"/>}
            <input ref={email} type="text" placeholder='Email or phone number' className="p-4 my-4 w-full bg-gray-700 rounded-lg"/>
            <input ref={password} type="password" placeholder='Password' className="p-4 my-4 w-full bg-gray-700 rounded-lg"/>
            <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
            <p className='text-red-600 font-bold text-lg py-2'>{errorMessage}</p>
            <p className='py-4 cursor-pointer' onClick={toggleSignInForm}> {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"} </p>
        </form>
        
    </div>
  )
}

export default Login