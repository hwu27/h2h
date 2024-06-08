'use client'
import React, { useState, useEffect } from 'react';
import { IoIosArrowDropdown, IoIosArrowDropright } from "react-icons/io";
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

  useEffect(() => {
    if (isOpenInfo) {
      document.addEventListener('click', closeMenu);
    }
    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, [isOpenInfo]);
  return (
    <>
    <header className='flex justify-between h-24 items-center select-none'>
        <div className='flex items-center'>
          <img className='h-20 md:h-28' src='images/h2h.png'></img>
          {/*Hamburger navbar*/}
            {!minBar ? <a onClick={() => {openMinBar(); setIsOpenInfo(false);}}><IoIosArrowDropdown className='block md:hidden text-4xl hover:text-gray-200 cursor-pointer'/></a>:
            <a onClick={openMinBar}><IoIosArrowDropright className='block md:hidden text-4xl hover:text-gray-200 cursor-pointer mr-2'/></a>}
          {minBar ? <ul className='fade-in flex md:hidden list-none justify-between w-8/12 mx-auto text-l'>
              <li><Link className='font-bold py-3 mr-2 hover:text-gray-200 cursor-pointer' href='/home'>Home</Link></li>
              <li><a className='font-bold py-3 mx-2 hover:text-gray-200 cursor-pointer'>About</a></li>
              
              <li><a className='font-bold py-3 mx-2 hover:text-gray-200 cursor-pointer' onClick={() => setIsOpenInfo(!isOpenInfo)}>Info</a></li>
              {isOpenInfo && (
                <div className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
                  <div className='py-1' role='menu' aria-orientation='vertical' aria-labelledby='options-menu'>
                    <a href='#' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900' role='menuitem'>Demo</a>
                    <a href='#' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900' role='menuitem'>Tutorial</a>
                  </div>
                </div>
              )}
              <li><Link href='/login#signin-section' className='font-bold py-3 mx-2 hover:text-gray-200 cursor-pointer'>Login</Link></li>
          </ul> : null}
          {/*Regular navbar*/}
          <ul className='list-none hidden md:flex justify-between w-8/12 lg:w-5/12 text-2xl'>
              <li><Link className='font-bold py-3 mx-4 hover:text-gray-200 cursor-pointer' href='/home'>Home</Link></li>
              <li><a className='font-bold py-3 mx-4 hover:text-gray-200 cursor-pointer'>About</a></li>
              <li><a className='font-bold py-3 mx-4 hover:text-gray-200 cursor-pointer'>Demo</a></li> 
              <li><a className='font-bold py-3 mx-4 hover:text-gray-200 cursor-pointer'>Tutorial</a></li>
          </ul>
        </div>
        <div>
          {/*Login/Signup button*/}
          <ul className='list-none hidden md:flex w-8/12 lg:w-5/12 text-2xl'>
            <li>
                <Link href='/login#signin-section' className='font-bold py-3 mx-2 hover:text-gray-200 cursor-pointer'>Login</Link> 
                <span className='font-bold py-3'>|</span>
                {/*Signup button WIP- need to fix the face that it is hidden at first, so when you link to it, it wont be at the signup*/}
                <Link className='font-bold py-3 mx-2 hover:text-gray-200 cursor-pointer' href='/login#signup-section'>Signup</Link> 
            </li>
          </ul>
        </div>
      </header>
    </>
  )
}