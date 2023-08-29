import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { auth } from '../utils/firebase';

import {createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile} from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_URL, USER_AVATAR } from '../utils/constants';

const Login = () => {
 
 const [isSignInForm,setIsSignForm]=useState(true);
 const[errorMessage,setErrorMessage]=useState();
 const dispatch=useDispatch();

 const name=useRef(null);
 const email=useRef(null);
 const password=useRef(null);


 const toggleSignInForm=() =>{
    setIsSignForm(!isSignInForm);
 }

 const handleButtonClick = () => {
  const message = checkValidData(email.current.value, password.current.value);
  setErrorMessage(message);
  if (message) return;

  if (!isSignInForm) {
    // Sign Up Logic
    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value,
          photoURL: USER_AVATAR,
        })
          .then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(
              addUser({
                uid: uid,
                email: email,
                displayName: displayName,
                photoURL: photoURL,
              })
            );

          })
          .catch((error) => {
            setErrorMessage(error.message);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
      });
  } else {
    // Sign In Logic
    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
      });
  }
};
  return (
    <div>
        <Header/>
        <div className='absolute'>
        <img src={BG_URL} alt="logo" />
        </div>
        <form onSubmit={(e)=>e.preventDefault()} className='absolute w-3/12 bg-black p-12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
            <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
            { !isSignInForm && <input ref={name}  type="text" placeholder='Enter Name' className="p-4 my-4 w-full bg-gray-700 rounded-lg"/>}
            <input ref={email} type="text" placeholder='Email or phone number' className="p-4 my-4 w-full bg-gray-700 rounded-lg"/>
            <input ref={password} type="password" placeholder='Password' className="p-4 my-4 w-full bg-gray-700 rounded-lg"/>
            <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
            <p className='text-red-600 font-bold text-lg py-2'>{errorMessage}</p>
            <p className='py-4 cursor-pointer' onClick={toggleSignInForm}> {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"} </p>
        </form>
        
    </div>
  )
}

export default Login;