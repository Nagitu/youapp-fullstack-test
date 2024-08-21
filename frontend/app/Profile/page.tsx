'use client';

import Header from "./components/Header";
import ProfileInput from "./components/ProfileInput";
import AboutSection from "./components/AboutSection";
import InterestSection from "./components/InterestSection";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Router, useRouter } from "next/router";

type Session = {
    accessToken?: string; 
    user?: {
        id: string|'guest'
    }
};

const Page: React.FC = () => {
    const [aboutAction, setAboutAction] = useState<'SAVE' | 'EDIT'>('EDIT');
    const [interestAction, setInterestAction] = useState<'SAVE' | 'EDIT'>('EDIT');
    const { data: session } = useSession();
    const token = (session as Session)?.accessToken;
    const username = (session as Session)?.user?.id || 'Guest';
    

    const handleActionChange = (section: 'about' | 'interest') => {
        if (section === 'about') {
            setAboutAction(prev => prev === 'EDIT' ? 'SAVE' : 'EDIT');
        } else if (section === 'interest') {
            setInterestAction(prev => prev === 'EDIT' ? 'SAVE' : 'EDIT');
        }
    };
    return (
        <div className='flex flex-col min-h-screen py-4'>
            <Header username={username} href="/Home"/>
            <div className='flex flex-col gap-5'>
                <ProfileInput username={username} />
                <AboutSection
                    action={aboutAction}
                    onActionChange={() => handleActionChange('about')}
                    token={token} 
                />
                <InterestSection
                    action={interestAction}
                    onActionChange={() => handleActionChange('interest')}
                />
            </div>
        </div>
    );
};

export default Page;
