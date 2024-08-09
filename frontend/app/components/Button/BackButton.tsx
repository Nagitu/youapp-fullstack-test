'use client'
import Link from 'next/link'
import React from 'react'

type buttonProps = {
  href: string;
}

const BackButton: React.FC<buttonProps> = ({ href }) => {
  return (
    <Link href={href} className="p-2 text-white flex items-center">
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
      <span>Back</span>
    </Link>
  )
}

export default BackButton
