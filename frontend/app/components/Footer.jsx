'use client'
import React from 'react';
import { IoLogoInstagram, IoLogoTwitter, IoLogoFacebook } from "react-icons/io";
import { IoLogoDiscord, IoLogoSlack } from "react-icons/io5";

export default function Footer()
{
  return (
    <>
      {/* Footer */}
      <footer className='flex flex-col items-center justify-center h-24 bg-blue-300'>
      <div className='text-white text-l mt-2'>@ 2024 H2H</div>
      <div className='flex text-white text-3xl mt-2'> <IoLogoInstagram /> <IoLogoTwitter /> <IoLogoFacebook /> <IoLogoDiscord /> <IoLogoSlack /></div>
      </footer>
    </>
  );
}