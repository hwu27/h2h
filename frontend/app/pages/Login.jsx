// Login.js
import React from 'react';
import { LoginBtn, SignOutBtn } from './firebase';

export default function Login() {
  return <>
    <section id='login-section'>
      <div className='flex flex-col h-screen-75 border-2 w-4/12 mx-auto my-12 justify-center items-center'>
        <div className='flex flex-col justify-center items-center mb-7'>
          <p>Username</p>
          <input className='border-2'></input>
        </div>
        <div className='flex flex-col justify-center items-center mb-24'>
          <p>Password</p>
          <input className='border-2'></input>
        </div>
        <LoginBtn />
        <div>
          <a className='mr-16'>Forgot password?</a>
          <a className=''>Don't have an account?</a>
        </div>
      </div>
    </section>
  </>
}

