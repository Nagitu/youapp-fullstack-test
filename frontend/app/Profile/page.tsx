'use client';

import Header from "./components/Header";
import ProfileInput from "./components/ProfileInput";
import AboutSection from "./components/AboutSection";
import InterestSection from "./components/InterestSection";
import { useState } from "react";

const Page = () => {
    const [aboutAction, setAboutAction] = useState<'SAVE' | 'EDIT'>('EDIT');
    const [interestAction, setInterestAction] = useState<'SAVE' | 'EDIT'>('EDIT');

    const handleActionChange = (section: 'about' | 'interest') => {
        if (section === 'about') {
            setAboutAction(prev => prev === 'EDIT' ? 'SAVE' : 'EDIT');
        } else if (section === 'interest') {
            setInterestAction(prev => prev === 'EDIT' ? 'SAVE' : 'EDIT');
        }
    };

    const username = 'johndoe123';
    const biodata = {
        username,
        birthday: "28 / 08 / 1995",
        Age: 28,
        horoscope: "virgo",
        zodiac: "virgo",
        height: 175,
        weight: 65,
        gender: "male"
    };

    return (
        <div className='flex flex-col min-h-screen py-4'>
            <Header username={username} />
            <div className='flex flex-col gap-5'>
                <ProfileInput username={username} Gender={biodata.gender}  />
                <AboutSection action={aboutAction} onActionChange={() => handleActionChange('about')} biodata={biodata} />
                <InterestSection action={interestAction} onActionChange={() => handleActionChange('interest')} />
            </div>
        </div>
    );
};

export default Page;
