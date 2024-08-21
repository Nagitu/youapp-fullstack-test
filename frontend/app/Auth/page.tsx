'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Input from "./components/Input"; 
import BackButton from "../components/Button/BackButton"; 

type Variant = 'LOGIN' | 'REGISTER';

type AuthState = {
  identifier: string;  
  username: string;
  email: string;       
  password: string;
  confirmPassword: string;
};

const AuthPage: React.FC = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [authState, setAuthState] = useState<AuthState>({
    identifier: '', 
    username: '',
    email: '',   
    password: '',
    confirmPassword: '',
  });

  const router = useRouter();

  const toggleVariant = () => {
    setVariant((prevVariant) => (prevVariant === 'LOGIN' ? 'REGISTER' : 'LOGIN'));
  };

  const handleChange = (field: keyof AuthState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthState({ ...authState, [field]: e.target.value });
  };

  const handleLogin = async () => {
    console.log("Login data:", {
      identifier: authState.identifier,
      password: authState.password,
    });

    try {
      const result = await signIn('credentials', {
        redirect: false,
        identifier: authState.identifier,
        password: authState.password,
      });

      if (result?.error) {
        console.error(result.error);
      } else {
        router.push('/home'); 
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleRegister = async () => {
    if (authState.password !== authState.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    console.log("Registration data:", {
      email: authState.email,
      username: authState.username,
      password: authState.password,
      confirmPassword: authState.confirmPassword,
    });

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: authState.email,
          username: authState.username,
          password: authState.password,
        }),
      });

      if (response.ok) {
        toggleVariant(); 
      } else {
        const errorData = await response.json();
        console.error('Registration error:', errorData.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleSubmit = () => {
    if (variant === 'LOGIN') {
      handleLogin();
    } else {
      handleRegister();
    }
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
          <Input
            placeholder="Enter username/email"
            type="text"
            key="login-identifier"
            value={authState.identifier}
            onChange={handleChange('identifier')}
          />
          <Input
            placeholder="Enter your password"
            type="password"
            key="login-password"
            value={authState.password}
            onChange={handleChange('password')}
          />
        </>
      ) : (
        <>
          <Input
            placeholder="Enter email"
            type="text"
            key="register-email"
            value={authState.email}
            onChange={handleChange('email')}
          />
          <Input
            placeholder="Enter username"
            type="text"
            key="register-username"
            value={authState.username}
            onChange={handleChange('username')}
          />
          <Input
            placeholder="Enter password"
            type="password"
            key="register-password"
            value={authState.password}
            onChange={handleChange('password')}
          />
          <Input
            placeholder="Confirm password"
            type="password"
            key="register-confirm-password"
            value={authState.confirmPassword}
            onChange={handleChange('confirmPassword')}
          />
        </>
      )}
      <button
        className='bg-custom-button-auth w-327px h-51px gap-0 rounded-custom'
        onClick={handleSubmit}
      >
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
