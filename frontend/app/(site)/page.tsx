'use client'
import Image from "next/image";

export default function Home() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-custom-radial-gradient'>
    <div className='text-center'>
      <h1 className='text-3xl font-bold mb-4'>Welcome to You App</h1>
      <h2 className='text-xl'>The first dating app with horoscope</h2>
      <a href="/Auth" className='hover:underline text-xs'>click to continue using app</a>
    </div>
  </div>
  
  );
}
