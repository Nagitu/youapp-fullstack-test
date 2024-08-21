'use client'

import BackButton from "../components/Button/BackButton"
import Header from "../Profile/components/Header"

const Page = () => {
  return (
    <div className='flex flex-col py-4 min-h-screen bg-custom-radial-gradient'>
          <div className='flex items-center gap-24 p-4'>
        <BackButton href='/Profile'/>
    </div>
        <div className='flex flex-col  w-full max-w-full px-4'>
            <div className='flex flex-col mb-10'>
            <span className='text-gradient'>
                Tell everyone about yourself
            </span>
            <span className='text-lg'>
                What interests you?
            </span>
            </div>
            <div className='w-full max-w-full p-4 bg-[#D9D9D90F] rounded-lg flex flex-col gap-2'>
                <input 
                  className='h-10 bg-transparent w-full border border-transparent focus:border-gray-300 rounded-lg px-2' 
                />
                <div className='flex flex-wrap gap-2 w-full'>
                    <div className='border bg-[#FFFFFF1A] p-2 rounded-xl'>Music</div>
                    <div className='border bg-[#FFFFFF1A] p-2 rounded-xl'>Basketball</div>
                    <div className='border bg-[#FFFFFF1A] p-2 rounded-xl'>Fitness</div>
                    <div className='border bg-[#FFFFFF1A] p-2 rounded-xl'>Gymming</div>
                    <div className='border bg-[#FFFFFF1A] p-2 rounded-xl'>Gymming</div>
                    <div className='border bg-[#FFFFFF1A] p-2 rounded-xl'>Gymming</div>
                    <div className='border bg-[#FFFFFF1A] p-2 rounded-xl'>Gymming</div>
                    <div className='border bg-[#FFFFFF1A] p-2 rounded-xl'>Gymming</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Page
