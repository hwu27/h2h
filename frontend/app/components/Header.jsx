'use client'
import React, { useState, useEffect } from 'react';
import { IoIosArrowDropdown, IoIosArrowDropright } from "react-icons/io";
import { useAuth } from '@/app/hooks/useAuth';
import { SignOutBtn } from '@/app/firebase';
import Link from 'next/link';

export default function Header() {
  {/* Header */}
  const [minBar, setMinBar] = useState(false);
  const openMinBar = () => {
    setMinBar(!minBar);
  };
  {/* isOpen for info dropdown menu of info */}
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const closeMenu = (e) => {
    if (!e.target.closest('.block')) {
      setIsOpenInfo(false);
    }
  };
  const handleOpenMinBar = () => {
    openMinBar();
    setIsOpenInfo(false);
  };
  
  useEffect(() => {
    if (isOpenInfo) {
      document.addEventListener('click', closeMenu);
    }
    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, [isOpenInfo]);

  {/* Change login/signin to sign out if logged in*/}
  const { user } = useAuth();
  const isLoggedIn = Boolean(user);

  
  const Logo = () => (
    <img className='h-20 md:h-24' src='/images/h2h.png'></img>
  );

  {/* ----------------------------- Components ----------------------------- */}

  const InfoDropdown = () => (
  <div className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
    <div className='py-1' role='menu' aria-orientation='vertical' aria-labelledby='options-menu'>
      <a className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900' role='menuitem'>Demo</a>
      <a className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900' role='menuitem'>Tutorial</a>
    </div>
  </div>
  );

  const NavigationLinks = () => (
    <ul className='list-none hidden md:flex justify-between w-8/12 lg:w-5/12 text-xl'>
      <li><Link className='font-bold py-3 mx-4 hover:text-gray-200 cursor-pointer' href='/home'>Home</Link></li>
      <li><a className='font-bold py-3 mx-4 hover:text-gray-200 cursor-pointer'>About</a></li>
      <li><a className='font-bold py-3 mx-4 hover:text-gray-200 cursor-pointer'>Demo</a></li> 
      <li><a className='font-bold py-3 mx-4 hover:text-gray-200 cursor-pointer'>Tutorial</a></li>
    </ul>
  );

  const LoginSignupLinks = () => (
    <ul className='list-none hidden md:flex w-8/12 lg:w-5/12 text-xl'>
      {!isLoggedIn ? 
        <li>
          <Link href='/login?mode=signin' className='font-bold py-3 mx-2 hover:text-gray-200 cursor-pointer'>Login</Link> 
          <span className='font-bold py-3'>|</span>
          <Link className='font-bold py-3 mx-2 hover:text-gray-200 cursor-pointer' href='/login?mode=signup'>Signup</Link> 
        </li> 
        : 
        <li> 
          <Link className='font-bold py-3 mx-2 hover:text-gray-200 cursor-pointer' href={`/practice/${user.uid}`}>Practice</Link>
          <Link className='font-bold py-3 mx-2 hover:text-gray-200 cursor-pointer' href={`/dashboard/${user.uid}`}>Dashboard</Link>
          <SignOutBtn />
        </li>
      }
    </ul>
  );

  return (
    <>
    <header className='flex justify-between h-screen-10 items-center select-none'>
        <div className='flex items-center'>
          <Logo />
          
          {/* Navigation Links */}
          {/* Due to re-rendering problems, we will keep the minbar section in the render method */}
          {!minBar ? 
          <a onClick={handleOpenMinBar}>
            <IoIosArrowDropdown className='block md:hidden text-4xl hover:text-gray-200 cursor-pointer'/>
          </a>
          :
          <a onClick={openMinBar}>
            <IoIosArrowDropright className='block md:hidden text-4xl hover:text-gray-200 cursor-pointer mr-2'/>
          </a>}
          {minBar ? 
          <ul className='fade-in flex md:hidden list-none justify-between w-8/12 mx-auto text-l'>
            <li><Link className='font-bold py-3 mr-2 hover:text-gray-200 cursor-pointer' href='/home'>Home</Link></li>
            <li><a className='font-bold py-3 mx-2 hover:text-gray-200 cursor-pointer'>About</a></li>
            <li><a className='font-bold py-3 mx-2 hover:text-gray-200 cursor-pointer' onClick={() => setIsOpenInfo(!isOpenInfo)}>Info</a></li>
            {isOpenInfo && <InfoDropdown />}
            {!isLoggedIn ? 
              <li><Link href='/login?mode=signin' className='font-bold py-3 mx-2 hover:text-gray-200 cursor-pointer'>Login</Link></li>
              : 
              <li><SignOutBtn className='font-bold py-3 mx-2 hover:text-gray-200 cursor-pointer'>Sign Out</SignOutBtn></li>}
          </ul> 
          : null}
          <NavigationLinks />
        </div>
        <div>
          <LoginSignupLinks />
        </div>
      </header>
    </>
  )
}