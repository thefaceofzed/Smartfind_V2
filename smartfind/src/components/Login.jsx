import React, { useState } from 'react';
import Signup from './Signup';
import Form from './Form';
import loginImg from '../assets/login.jpg';
import '../index.css';

export default function Login() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleForm = () => {
    setShowSignUp(!showSignUp);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (username, password) => {
    // Perform login logic here
    if (username === 'admin' && password === '1234') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const renderSignInForm = () => {
    return (
      <div className='bg-gray-800 flex flex-col justify-center'>
        <form className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8'>
          <h2 className='text-4xl dark:text-white font-bold text-center'>Smart Find</h2>
          <div className='flex flex-col text-gray-400 py-2'>
            <label>Username</label>
            <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" />
          </div>
          <div className='flex flex-col text-gray-400 py-2'>
            <label>Password</label>
            <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type={showPassword ? 'text' : 'password'} />
            <span className='absolute top-2 right-2 cursor-pointer' onClick={handleTogglePassword}>
              {showPassword ? <i className='far fa-eye'></i> : <i className='far fa-eye-slash'></i>}
            </span>
          </div>
          <div className='flex justify-between text-gray-400 py-2'>
            <p className='flex items-center'><input className='mr-2' type="checkbox" /> Remember Me</p>
            <p>Forgot Password</p>
          </div>
          <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg' onClick={() => handleLogin('admin', '1234')}>
            SIGN IN
          </button>
          <button className='w-full my-5 py-2 bg-gray-700 shadow-lg hover:shadow-lg/50 text-white font-semibold rounded-lg' onClick={handleToggleForm}>
            SIGN UP
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
      <div className='hidden sm:block'>
        <img className='w-full h-full object-cover' src={loginImg} alt="" />
      </div>
      {isLoggedIn ? <Form /> : (showSignUp ? <Signup handleToggleForm={handleToggleForm} /> : renderSignInForm())}
    </div>
  )
}
