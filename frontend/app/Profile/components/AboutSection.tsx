import React, { useEffect, useState } from 'react';
import Info from "./Info";
import EditForm from "./EditForm";
import Section from "./Section";
type Profile = {
    _id: string;
    user: string;
    name: string;
    birthday: string;
    zodiac: string;
    gender: string;
    height: number;
    weight: number;
    about: string;
    horoscope:string;
} | null;

type AboutSectionProps = {
    action: 'SAVE' | 'EDIT';
    onActionChange: () => void;
    token?: string; 
};

const AboutSection: React.FC<AboutSectionProps> = ({ action, onActionChange, token }) => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!token) return;

            try {
                const response = await fetch('http://localhost:8080/profiles', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.status === 404) {
                    setProfile(null);
                    return;
                }

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data: Profile = await response.json();
                setProfile(data);
            } catch (error) {
                console.error('Fetch error:', (error as Error).message);
                setProfile(null);
                setError((error as Error).message);
            }
        };

        fetchProfile();
    }, [token]);

    const formatDate = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (action === 'EDIT' && !profile) {
        return (
            <Section title="About" action={action} onActionChange={onActionChange}>
                <div className='flex flex-col space-y-2'>
                    <span>Add in your info to help others know you better</span>
                </div>
            </Section>
        );
    }

    return (
        <Section title="About" action={action} onActionChange={onActionChange}>
            <div className='flex flex-col space-y-2'>
                {action === 'SAVE' && profile ? (
                    <>
                        <EditForm label="Username" value={profile.name} />
                        <EditForm label="Gender" value={profile.gender} />
                        <EditForm label="Birthday" value={formatDate(profile.birthday)} />
                        <EditForm label="Horoscope" value={profile.horoscope} disabled />
                        <EditForm label="Zodiac" value={profile.zodiac} disabled />
                        <EditForm label="Height" value={profile.height} />
                        <EditForm label="Weight" value={profile.weight} />
                    </>
                ) : (
                    profile && (
                        <>
                            <Info category="Birthday" value={`${formatDate(profile.birthday)} (Age ${new Date().getFullYear() - new Date(profile.birthday).getFullYear()})`} />
                            <Info category="Horoscope" value={profile.horoscope} />
                            <Info category="Zodiac" value={profile.zodiac} />
                            <Info category="Height" value={`${profile.height} cm`} />
                            <Info category="Weight" value={`${profile.weight} kg`} />
                        </>
                    )
                )}
            </div>
        </Section>
    );
};

export default AboutSection;
