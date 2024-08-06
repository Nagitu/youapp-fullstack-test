'use client'

import { useState } from "react";
import Input from "./components/Input";
import { useRouter } from 'next/navigation';
import BackButton from "../components/Button/BackButton";

const AuthPage = () => {
  const [variant, setVariant] = useState('LOGIN'); 
  const router = useRouter(); 

  const toggleVariant = () => {
    setVariant(prevVariant => (prevVariant === 'LOGIN' ? 'REGISTER' : 'LOGIN'));
  };

  const isLogin = variant === 'LOGIN';

  return (
    <div className="relative flex items-center justify-center min-h-screen flex-col gap-4 bg-custom-radial-gradient">
        
        <div className='absolute top-4 left-4'>
        <BackButton />
        </div>
      <h1 className='text-lg'>{variant}</h1>
      {isLogin ? (
        <>
          <Input placeholder="enter username/email" type="text" />
          <Input placeholder="enter your password" type="password" />
        </>
      ) : (
        <>
          <Input placeholder="enter email" type="text" />
          <Input placeholder="enter username" type="text" />
          <Input placeholder="enter password" type="password" />
          <Input placeholder="confirm password" type="password" />
        </>
      )}
      <button className='bg-custom-button-auth w-327px h-51px gap-0 rounded-custom'>
        {variant}
      </button>
      <div className='flex gap-2'>
        <a>{isLogin ? 'No account?' : 'Have an account?'}</a>
        <a className='text-gradient' onClick={toggleVariant}>
          {isLogin ? 'Register Here' : 'Login Here'}
        </a>
      </div>
    </div>
  );
}

export default AuthPage;
