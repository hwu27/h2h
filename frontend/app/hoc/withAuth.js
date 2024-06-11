'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import { ImSpinner8 } from "react-icons/im";

export default function withAuth(Component, componentName) {
  return (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push('/login');
      } else if (!loading && user && router.pathname !== `/${componentName}/${user.uid}`) {
        router.push(`/${componentName}/${user.uid}`);
      }
    }, [user, loading, router]);

    if (loading) {
      return <section className='flex h-screen-full items-center justify-center'><ImSpinner8 className="animate-spin text-8xl" /></section>;
    }

    return user ? <Component {...props} /> : null;
  };
};