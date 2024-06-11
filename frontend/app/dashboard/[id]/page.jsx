// dashboard.jsx
'use client'
import React, { useRef, useEffect, useState } from 'react';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Tooltip } from 'react-tooltip'

import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import withAuth from '@/app/hoc/withAuth';
import { db } from '@/app/firebase';
import { useAuth } from '@/app/hooks/useAuth';
import { getDoc, doc } from 'firebase/firestore';
function Dashboard() { 

  const {user} = useAuth();
  const [firstName, setFirstName] = useState('...');
  const [timeSpent, setTimeSpent] = useState('...');
  const [avgPerformance, setAvgPerformance] = useState('...');

  useEffect(() => {
    const fetchData = async () => {
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();
      setFirstName(userData.firstName);
    };
    fetchData();
  }, []);

  const profileRef = useRef(null);
  useEffect(() => {
    if (profileRef.current) {
      profileRef.current.scrollIntoView();
    }
  }, []);



  {/* ----------------------------- Components ----------------------------- */}
  
  const WelcomeMessage = () => (
    <div className='text-white text-6xl font-bold m-8'>Welcome, {firstName}</div>
  );
  
  const ProfileSection = () => (
    <div className='bg-white h-screen-75 w-3/12 mr-8 shadow-2xl rounded-3xl p-4 mb-8 mx-auto'>
      <p className='flex items-center text-2xl text-black font-bold mb-16'>
        <IoMdInformationCircleOutline className='text-yellow-500 hover:text-gray-200 cursor-pointer mr-2' data-tooltip-id='profile' data-tooltip-content='It is hard talking to people. You are doing great.'/>
        Profile
        <Tooltip id='profile' style={{ borderRadius: '0.75rem' }}/>
      </p>
      <div className='flex items-center h-4/6 flex flex-col p-2 font-bold'>
        <div className='text-center'>
          <p className='mb-2'>Time spent:</p>
          <p className='mb-2'>{timeSpent}</p>
        </div>
        <div className='text-center'>
          <p className='mb-2'>Average Performance:</p>
          <p className='mb-2'>{avgPerformance}</p>
        </div>
        <div className='h-full w-full text-center'>
          <p className='mb-2'>Achievements</p>
          <div className='border-2 rounded-3xl h-full w-full shadow-lg'></div>
        </div>
      </div>
    </div>
  );
  
  const HistorySection = () => (
    <div className='flex flex-col bg-white h-screen-75 w-8/12 shadow-2xl rounded-3xl p-4 mb-8 mx-auto'>
      <div className='flex items-center text-2xl text-black font-bold'>
        <IoMdInformationCircleOutline className='text-yellow-500 hover:text-gray-200 cursor-pointer mr-2' data-tooltip-id='history' data-tooltip-content='To see chat history, performances, and feedback, click on one :)'/>
        <p>History</p>
        <Tooltip id='history' style={{ borderRadius: '0.75rem' }}/>
      </div>
      <HistoryItems />
    </div>
  );
  
  {/* ----------------------------- Replace with API call  ----------------------------- */}
  const HistoryItems = () => (
    <div className='flex flex-col items-center h-full w-full overflow-y-auto'>
      <HistoryItem />
      <Divider />
      <HistoryItem />
      <Divider />
      <HistoryItem />
      <Divider />
      <HistoryItem />
      <Divider />
      <HistoryItem />
      <Divider />
      <HistoryItem />
      <Divider />
      <HistoryItem />
      <Divider />
      <HistoryItem />
      <Divider />
      <HistoryItem />
      <Divider />
      <HistoryItem />
      <Divider />
      <HistoryItem />
      <Divider />
      <HistoryItem />
      <Divider />
      <HistoryItem />
      <Divider />
      <HistoryItem />
      <Divider />
      <HistoryItem />
      <Divider />
      <HistoryItem />
      <Divider />
      <HistoryItem />
      <Divider />
      <HistoryItem />
      <Divider />
      <HistoryItem />
      <Divider />
      <HistoryItem />
    </div>
  );
  
  const HistoryItem = () => (
    <div className='hover:bg-gray-100 cursor-pointer border-2 rounded-3xl h-24 flex-shrink-0 w-11/12 m-8'></div>
  );
  
  const Divider = () => (
    <div className='bg-gray-100 h-0.5 flex-shrink-0 rounded-3xl w-10/12'></div>
  );
  return ( 
  <> 
    <Header />
    <main id='dashboard-main' className='flex flex-col items-center h-screen-full bg-blue-400' ref={profileRef}>
      <WelcomeMessage />
      <div className='flex flex-row h-full w-full'>
        <ProfileSection />
        <HistorySection />
      </div>
    </main>
    <Footer />
  </>
  )
}

export default withAuth(Dashboard, 'dashboard');

