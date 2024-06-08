'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';

{/* WIP - need  to implement checks for other uid urls*/}
export default function withAuth(Component) {
  return (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();
    
    useEffect(() => {
      if (!loading && !user) {
        router.push('/login');
      }
    }, [user, loading, router]);

    if (loading) {
      return <p>Loading...</p>;
    }

    return user ? <Component {...props} /> : null;
  };
};


