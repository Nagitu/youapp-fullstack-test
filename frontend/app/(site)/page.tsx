'use client'
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-custom-radial-gradient'>
    <div className='text-center'>
      <h1 className='text-3xl font-bold mb-4 '>Welcome to You App</h1>
      <h2 className='text-xl'>The first dating app with horoscope</h2>
      <Link  className='hover:underline text-gradient' href={'/auth'}>click to continue using app</Link>
    </div>
  </div>
  
  );
}
