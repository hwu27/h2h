// practice.jsx
'use client'
import React, { useRef, useEffect, useState } from 'react';
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import withAuth from '@/app/hoc/withAuth';

function Practice() { 

  const practiceRef = useRef(null);
  useEffect(() => {
    if (practiceRef.current) {
      practiceRef.current.scrollIntoView();
    }
  }, []);
  
  const [minimizeText, setMinimizeText] = useState(false)
  const minimize = () => {
    setMinimizeText(!minimizeText)
  }

  return ( 
  <> 
    <Header />
    <main ref={practiceRef} className='flex flex-col items-center justify-center h-screen-full w-full p-4'>
    <div className={`flex flex-col justify-between border-2 ${minimizeText ? 'h-full rounded-b-3xl' : 'h-4/6'} w-8/12 p-4 rounded-t-3xl`}>
      <div></div> {/* This empty div will take up the top space */}
      {!minimizeText ? <FaArrowDown className='text-xl m-2 hover:text-gray-200 cursor-pointer' onClick={minimize}/> : <FaArrowUp className='text-xl m-2 hover:text-gray-200 cursor-pointer' onClick={minimize}/>}
    </div>
      {!minimizeText && <div className='flex flex-col items-center border-2 h-2/6 w-8/12 p-4 rounded-b-3xl'>
        <div className='border-2 rounded-t-3xl h-5/6 w-11/12'>
        
        </div>
        <input className='border-2 rounded-b-3xl h-1/6 w-11/12 p-4'>
        
        </input>
      </div>}
    </main>
    <Footer />
  </>
  )
}

export default withAuth(Practice, 'practice');

