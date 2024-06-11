// Home.jsx
'use client'
import React, { useState, useEffect, useRef, memo } from 'react';
import { confetti } from 'tsparticles-confetti';
import { FaHeart, FaHandHoldingHeart, FaBrain } from "react-icons/fa";
import { GiScreaming } from "react-icons/gi";
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { useAuth } from '@/app/hooks/useAuth';

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
  
  {/* Scroll into view */}
  const hardestSmallSection = useRef(null);
  const hardestLargeSection = useRef(null);
  const doctorSection = useRef(null);

  const executeScroll = (ref) => {
    if (ref.current)
      ref.current.scrollIntoView({ behavior: "smooth" });
  }

  {/* Check loading*/}
  const { loading } = useAuth();

  {/* ----------------------------- Components ----------------------------- */}
  const MainSection = () => (   
    <main className='flex flex-col lg:flex-row h-screen-75 w-12/12 items-center justify-center select-none'>
      <div className='text-center lg:text-left text-3xl lg:text-5xl lg:w-4/12 lg:mr-24 lg:ml-0 leading-normal'>
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
    </main>
  );

  const HeartRedirectors = () => (
    <>
      <div className='lg:hidden flex justify-center h-screen-15'>
        <a onClick={() => executeScroll(hardestSmallSection)}>
          <svg className="animate-bounce w-12 h-12 cursor-pointer" viewBox="0 0 64 64" fill="#fdba74" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <FaHeart className='text-5xl text-red-400'/>
          </svg>
        </a>
      </div>
      <div className='hidden lg:flex justify-center h-screen-15'>
        <a onClick={() => executeScroll(hardestLargeSection)}>
          <svg className="animate-bounce w-12 h-12 cursor-pointer" viewBox="0 0 64 64" fill="#fdba74" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <FaHeart className='text-5xl text-red-400'/>
          </svg>
        </a>
      </div>
    </>
  );

  const DoctorSection = () => (
    <section id='doctor-section' ref={doctorSection} className='flex flex-col min-h-screen w-full items-center text-center p-12'>
      <div className='flex flex-col lg:flex-row items-center text-4xl font-bold'><span><img className='h-16 mr-4' src='./images/h2h_horizontal.png'></img></span> was made to help you practice.</div>
      <div className='flex flex-col lg:flex-row items-center justify-center h-full w-full'>
        <div className='flex flex-col items-center border-2 rounded-lg h-140 w-full lg:w-1/3 m-8 shadow-lg'>
          <a className='cursor-pointer p-12' onClick={run}>
            <FaHandHoldingHeart className='text-6xl text-red-400' />
          </a>
          <div className='text-4xl font-bold'>Empathy</div>
          <div className='text-l lg:text-xl p-8'>
            According to a survey from the United Way of the National Capital Area, 
            our national empathy levels have decreased by around <span className='font-bold'>14%</span> from 2018 to 2022.
            But <span className='font-bold'>it isn't our fault</span>. Misinformation, stress, and isolation during the pandemic have all contributed to this.
            It is more important than ever to practice being in <span className='font-bold'>someone else's shoes</span>. 
          </div>
        </div>
        <div className='flex flex-col items-center border-2 rounded-lg h-140 w-full lg:w-1/3 m-8 shadow-lg'>
          <a className='cursor-pointer p-12' onClick={run}>
            <GiScreaming className='text-6xl text-red-400' />
          </a>
          <div className='text-4xl font-bold'>Stress</div>
          <div className='text-l lg:text-xl p-8'>
            In these stressful scenarios, can you keep your calm? Can you respond in a timely but reassuring manner? 
            If it was you on the other side, what would you want to hear? You will be going through <span className='font-bold'>constant stress</span> everyday,
            whether it is from the actual work or the people <span className='font-bold'>you are helping</span>.
          </div>
        </div>
        <div className='flex flex-col items-center border-2 rounded-lg h-140 w-full lg:w-1/3 m-8 shadow-lg'>
          <a className='cursor-pointer p-12' onClick={run}>
            <FaBrain className='text-6xl text-red-400' />
          </a>
          <div className='text-4xl font-bold'>Mindfulness</div>
          <div className='text-l lg:text-xl p-8'>
            We have created a series of scenarios that will help you practice being mindful.
            Whether it is a patient who is scared, a relative who is angry, or a friend who is stressed.
            Whether it is related to a diagnosis, a treatment, or a prognosis.
            Whether it is a good day or a bad day.
            <span className='font-bold'>What would you say? What would you do?</span>
          </div>
        </div>
      </div>
      {/* Get started / Tutorial Button */}
      <div className='flex justify-center items-center my-auto'>
        <a className='flex justify-center items-center font-bold hover:text-4xl hover:text-gray-200 text-3xl cursor-pointer'>Get started</a>
        <div className='mx-4 text-2xl'>or</div>
        <a className='flex justify-center items-center font-bold hover:text-4xl hover:text-gray-200 text-3xl cursor-pointer'>Tutorial</a>
      </div>
    </section>
  );
  return (
    <>
      <Header />
      <MainSection />
      <HeartRedirectors />
      {/* ----------------------------- Hardest Section ----------------------------- */}
      {/* Due to re-rendering problems, we will keep the hardest section in the render method */}
      <section id='hardest-section-lg' ref={hardestLargeSection} className='hidden lg:flex h-screen-full w-full items-center justify-center bg-blue-400 px-24 '>
        {/* Left capsule */}
        <div className='flex flex-col justify-center items-center h-4/6 w-4/12 rounded-r-none rounded-3xl p-14 bg-white shadow-2xl'>
          <div className='flex text-center text-4xl'>
            <span className='flex flex-col mb-8 leading-snug'>We believe that it is speaking to a <span className='font-bold'>stressed relative or friend of a patient.</span></span>
          </div>
          {/* Heart redirector */}
          <div>
            <a onClick={() => executeScroll(doctorSection)}>
              <svg className="animate-bounce w-12 h-12 cursor-pointer" viewBox="0 0 64 64" fill="#fdba74" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <FaHeart className='text-5xl text-red-400'/>
              </svg>
            </a>
          </div>
        </div>
        {/* Right capsule */}
        <div className='flex flex-col justify-center items-center rounded-3xl h-5/6 w-8/12 shadow-2xl'>
          <iframe 
            className="w-full h-full rounded-3xl"
            src="https://www.youtube.com/embed/rJYaKsbExSo" 
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>
        </div>
      </section>
      <section id='hardest-section-sm' ref={hardestSmallSection} className='flex flex-col lg:hidden h-screen-full w-12/12 items-center justify-center bg-blue-400 p-2'>
        {/* Top capsule */}
        <div className='flex flex-col justify-center items-center h-1/2 w-full mb-12 shadow-2xl'>
          <iframe 
            className="w-full h-full rounded-t-3xl"
            src="https://www.youtube.com/embed/rJYaKsbExSo"
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>
          {/* Bottom capsule */}
          <div className='flex flex-col justify-center items-center rounded-b-3xl h-1/12 p-2 w-full bg-white shadow-2xl'>
            <div className='flex flex-col items-center justify-center text-center text-xl'>
              <span className='flex flex-col leading-snug'>We believe that it is speaking to a <span className='font-bold'>stressed relative or friend of a patient.</span></span>
            </div>
          </div>
        </div>
        {/* Heart redirector */}
        <div>
          <a onClick={() => executeScroll(doctorSection)}>
            <svg className="animate-bounce w-12 h-12 cursor-pointer" viewBox="0 0 64 64" fill="#fdba74" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <FaHeart className='text-5xl text-red-400'/>
            </svg>
          </a>
        </div>
      </section>

      <DoctorSection />
      <Footer />
    </>
  );
}