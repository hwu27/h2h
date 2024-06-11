// dashboard.jsx
'use client'
import React, { useState } from 'react';
import withAuth from '@/app/hoc/withAuth';
import { useAuth } from '@/app/hooks/useAuth';
import { db } from '@/app/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

function Dashboard() { 
  const [firstName, setfirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { user } = useAuth();
  const router = useRouter();
  const handleSubmitName = async () => {
    if (firstName && lastName) {
      await setDoc(doc(db, 'users', user.uid), {
        firstName: firstName,
        lastName: lastName
      });
    }
    router.push(`/dashboard/${user.uid}`);
  };
  return ( 
  <> 
    <section className='flex flex-col h-screen-full justify-center items-center'>
      <div className='text-6xl mb-8'>What is your name?</div>
      <input placeholder='First Name' className='border-2 rounded-xl px-2 py-1 mb-8' value={firstName} onChange={e => setfirstName(e.target.value)}></input>
      <input placeholder='Last Name' className='border-2 rounded-xl px-2 py-1 mb-8' value={lastName} onChange={e => setLastName(e.target.value)}></input>
      <a onClick={handleSubmitName} className='cursor-pointer'>submit</a>
    </section>
  </>
  )
}

export default withAuth(Dashboard, 'welcome');

