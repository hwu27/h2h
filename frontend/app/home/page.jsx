// Home.jsx
'use client'
import React, { useState, useEffect } from 'react';
import { confetti } from 'tsparticles-confetti';
import { FaHeart, FaHandHoldingHeart, FaBrain } from "react-icons/fa";
import { GiScreaming } from "react-icons/gi";
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

export default function Home() {

  {/* Main page */ }

  const phrases = ['long hours', 'paperwork', 'debt', 'stress', 'burnout', 'isolation', 'uncertainty', 'death', 'disease', 'mistakes', 'loneliness', 'fear', 'failure']
  const [phrase, setPhrase] = useState(phrases[0]);
  const [count, setCount] = useState(0);
  const limit = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      let i = Math.floor(Math.random() * phrases.length);
      setPhrase(phrases[i]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  
  {/* Confetti Thanks to Matteo Bruni for tsparticles and the JS example */ }
  const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ['heart'],
    colors: ['FFC0CB', 'FF69B4', 'FF1493', 'C71585']
  };

  const run = () => {

    if (count >= limit) return;

    confetti({
      ...defaults,
      particleCount: 50,
      scalar: 2
    });

    confetti({
      ...defaults,
      particleCount: 25,
      scalar: 3
    });

    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 4
    });

    setCount(count + 1);
  };

  return (
    <>
      <Header />
      <main className='flex flex-col lg:flex-row h-screen-75 w-12/12 items-center justify-center m-4 select-none'>
        <div className='text-3xl lg:text-5xl lg:w-4/12 mx-6 lg:mr-24 lg:ml-0 leading-normal'>
          What's the <span className='font-bold text-4xl lg:text-7xl text-red-400'>hardest</span> part of being a <span className='font-bold text-4xl lg:text-7xl text-blue-400'>doctor</span> <span className='text-4xl lg:text-6xl'>?</span>
        </div>
        <div className='flex justify-center text-4xl lg:text-6xl font-bold border-2 rounded-lg shadow-lg p-3 mt-12 w-8/12 lg:w-4/12'>
          {phrase === 'long hours' && <p className="animation-dropdown">long hours</p>}
          {phrase === 'paperwork' && <p className="animation-dropdown">paperwork</p>}
          {phrase === 'debt' && <p className="animation-dropdown">debt</p>}
          {phrase === 'stress' && <p className="animation-dropdown">stress</p>}
          {phrase === 'burnout' && <p className="animation-dropdown">burnout</p>}
          {phrase === 'isolation' && <p className="animation-dropdown">isolation</p>}
          {phrase === 'uncertainty' && <p className="animation-dropdown">uncertainty</p>}
          {phrase === 'death' && <p className="animation-dropdown">death</p>}
          {phrase === 'disease' && <p className="animation-dropdown">disease</p>}
          {phrase === 'mistakes' && <p className="animation-dropdown">mistakes</p>}
          {phrase === 'loneliness' && <p className="animation-dropdown">loneliness</p>}
          {phrase === 'fear' && <p className="animation-dropdown">fear</p>}
          {phrase === 'failure' && <p className="animation-dropdown">failure</p>}
        </div>
        {/* Heart redirector */}
        <div className='hidden lg:flex justify-center'>
          <a href='#hardest-section-lg'>
            <svg className="animate-bounce w-12 h-12 cursor-pointer" viewBox="0 0 64 64" fill="#fdba74" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <FaHeart className='text-5xl text-red-400'/>
            </svg>
          </a>
        </div>
        <div className='lg:hidden flex justify-center mt-8'>
          <a href='#hardest-section-sm'>
            <svg className="animate-bounce w-12 h-12 cursor-pointer" viewBox="0 0 64 64" fill="#fdba74" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <FaHeart className='text-5xl text-red-400'/>
            </svg>
          </a>
        </div>
      </main>
      {/* Hardest Part Section Small */}
      <section id='hardest-section-sm' className='flex flex-col lg:hidden h-screen-full w-12/12 items-center justify-center bg-blue-100 p-4'>
        {/* Top capsule */}
        <div className='flex flex-col justify-center items-center h-1/12 p-2 w-full border-2 rounded-t-3xl rounded-r-none rounded-l-none bg-red-400 shadow-lg'>
          <div className='flex flex-col items-center justify-center text-center text-xl text-white'>
            <span className='flex flex-col leading-snug'>We believe that it is speaking to a <span className='font-bold'>stressed relative or friend of a patient.</span></span>
          </div>
        </div>
        {/* Bottom capsule */}
        <div id='hardest-section-sm' className='flex flex-col justify-center items-center h-1/2 w-full bg-blue-300 rounded-b-3xl mb-12 shadow-lg'>
          <div className='h-full w-full bg-white rounded-b-lg relative p-4'>
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/rJYaKsbExSo"
              title="YouTube video player" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
        </div>
        {/* Heart redirector */}
        <div>
          <a href='#doctor-section'>
            <svg className="animate-bounce w-12 h-12 cursor-pointer" viewBox="0 0 64 64" fill="#fdba74" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <FaHeart className='text-5xl text-red-400'/>
            </svg>
          </a>  
        </div>
      </section>

      {/* Hardest Part Section Large*/}
      <section id='hardest-section-lg' className='hidden lg:flex h-screen-full w-full items-center justify-center bg-blue-100 p-4'>
        {/* Left capsule */}
        <div className='flex flex-col justify-center items-center h-4/6 w-5/12 border-2 rounded-r-none rounded-full p-14 bg-red-400 shadow-lg'>
          <div className='flex text-center text-3xl text-white'>
            <span className='flex flex-col mb-8 leading-snug'>We believe that it is speaking to a <span className='font-bold'>stressed relative or friend of a patient.</span></span>
          </div>
          <div>
            <a href='#doctor-section'>
              <svg className="animate-bounce w-12 h-12 cursor-pointer" viewBox="0 0 64 64" fill="#fdba74" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <FaHeart className='text-5xl text-blue-400'/>
              </svg>
            </a>  
          </div>
        </div>
        {/* Right capsule */}
        <div className='flex flex-col justify-center items-center rounded-3xl h-5/6 w-7/12 bg-white p-16 shadow-lg'>
          <div className='h-full w-full bg-white rounded-lg relative'>
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/rJYaKsbExSo" 
              title="YouTube video player" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
        </div>
      </section>
      {/* Explanation of what we teach */}
      <section id='doctor-section' className='flex flex-col min-h-screen w-full items-center text-center'>
        <div className='flex flex-col lg:flex-row items-center text-4xl lg:text-6xl font-bold my-4'><span><img className='h-24 mr-4' src='./images/h2h_horizontal.png'></img></span> was made to help you practice.</div>
        <div className='flex flex-col lg:flex-row items-center justify-center h-12/12 lg:h-full w-full'>
          <div className='flex flex-col items-center border-2 rounded-lg h-5/6 w:5/6 lg:w-1/3 m-12 shadow-lg'>
            <a className='cursor-pointer p-12' onClick={run}>
              <FaHandHoldingHeart className='text-6xl text-red-400' />
            </a>
            <div className='text-2xl font-bold'>Empathy</div>
            <div className='text-l p-8'>
              We have created dozens of scenarios involving accidents, comas, etc. Combined with the power of generative AI, we can 
              simulate the most realistic scenarios for you. Can we regain the empathy we lost? 
            </div>
          </div>
          <div className='flex flex-col items-center border-2 rounded-lg h-5/6 w:5/6 lg:w-1/3 m-12 shadow-lg'>
            <a className='cursor-pointer p-12' onClick={run}>
              <GiScreaming className='text-6xl text-red-400' />
            </a>
            <div className='text-2xl font-bold'>Stress</div>
            <div className='flex text-l p-8'>
              In these stressful scenarios, can you keep your calm? Can you respond in a timely but reassuring manner?
            </div>
          </div>
          <div className='flex flex-col items-center border-2 rounded-lg h-5/6 w:5/6 lg:w-1/3 m-12 shadow-lg'>
            <a className='cursor-pointer p-12' onClick={run}>
              <FaBrain className='text-6xl text-red-400' />
            </a>
            <div className='text-2xl font-bold'>Mindfulness</div>
            <div className='text-l p-8'>
              The scenarios are designed with specific characteristics and personalities in mind. Can you adapt to each one? Comforting them
              according to their needs?
            </div>
          </div>
        </div>
        {/* Get started / Tutorial Button */}
        <div className='flex justify-center items-center'>
          <a className='flex justify-center items-center border-2 rounded-r-none rounded-2xl hover:w-52 w-36 h-12 p-12 mb-8 font-bold text-2xl cursor-pointer bg-red-400 text-white'>Get started</a>
          <a className='flex justify-center items-center border-2 rounded-l-none rounded-2xl hover:w-52 w-36 h-12 p-12 mb-8 font-bold text-2xl cursor-pointer bg-blue-400 text-white'>Tutorial</a>
        </div>
      </section>
      <Footer />
    </>
  );
}