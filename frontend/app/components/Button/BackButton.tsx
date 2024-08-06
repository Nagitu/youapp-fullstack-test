'use client'
import router from 'next/router'
import React from 'react'

const BackButton = () => {
  return (
    <button 
    className=" p-2 text-white flex items-center"
    onClick={() => router.back()}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 19l-7-7 7-7"
      />
    </svg>
    <a>back</a>
  </button>

  )
}

export default BackButton