// dashboard.jsx
'use client'
import React, { useEffect, useState } from 'react';
import { SignOutBtn } from '@/app/firebase';
import withAuth from '@/app/hoc/withAuth';


function Dashboard() { 

  return ( 
  <> 
    <section>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard</p>
      <SignOutBtn />
    </section>
  </>
  )
}

export default withAuth(Dashboard);

