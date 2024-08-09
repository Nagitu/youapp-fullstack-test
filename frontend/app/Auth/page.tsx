'use client'

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Input from "./components/Input"; // Pastikan jalur ini benar
import BackButton from "../components/Button/BackButton"; // Pastikan jalur ini benar

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
        <BackButton href="/" />
      </div>
      <h1 className='text-lg'>{variant}</h1>
      {isLogin ? (
        <>
          <Input placeholder="enter username/email" type="text" key="login-username" />
          <Input placeholder="enter your password" type="password" key="login-password" />
        </>
      ) : (
        <>
          <Input placeholder="enter email" type="text" key="register-email" />
          <Input placeholder="enter username" type="text" key="register-username" />
          <Input placeholder="enter password" type="password" key="register-password" />
          <Input placeholder="confirm password" type="password" key="register-confirm-password" />
        </>
      )}
      <button className='bg-custom-button-auth w-327px h-51px gap-0 rounded-custom'>
        {variant}
      </button>
      <div className='flex gap-2'>
        <span>{isLogin ? 'No account?' : 'Have an account?'}</span>
        <button className='text-gradient cursor-pointer' onClick={toggleVariant}>
          {isLogin ? 'Register Here' : 'Login Here'}
        </button>
      </div>
    </div>
  );
}

export default AuthPage;
