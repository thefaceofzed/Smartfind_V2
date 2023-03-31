import React, { useState } from 'react';
import '../index.css';
export default function Signup(props) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    switch (name) {
      case 'fullName':
        setFullName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Full Name: ${fullName}, Email: ${email}, Password: ${password}`);
    props.handleToggleForm(); // Updated function name
  };

  return (
    <div className='bg-gray-800 flex flex-col justify-center'>
      <form className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8' onSubmit={handleSubmit}>
        <h2 className='text-4xl dark:text-white font-bold text-center'>Smart Find</h2>
        <div className='flex flex-col text-gray-400 py-2'>
          <label>Full Name</label>
          <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" name="fullName" onChange={handleInputChange} required />
        </div>
        <div className='flex flex-col text-gray-400 py-2'>
          <label>Email Address</label>
          <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="email" name="email" onChange={handleInputChange} required />
        </div>
        <div className='flex flex-col text-gray-400 py-2'>
          <label>Password</label>
          <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" name="password" onChange={handleInputChange} required />
        </div>
        <div className='flex justify-between text-gray-400 py-2'></div>
        <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>
          SIGN UP
        </button>
        <button className='w-full my-5 py-2 bg-gray-700 shadow-lg hover:shadow-lg/50 text-white font-semibold rounded-lg' onClick={props.handleToggleForm}>
          BACK TO SIGN IN
        </button>
      </form>
    </div>
  );
}