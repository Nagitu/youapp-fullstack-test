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
    horoscope: string;
} | null;

type AboutSectionProps = {
    action: 'SAVE' | 'EDIT';
    onActionChange: () => void;
    token?: string;
};

const AboutSection: React.FC<AboutSectionProps> = ({ action, onActionChange, token }) => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [name, setName] = useState<string>('');
    const [birthday, setBirthday] = useState<string>('');
    const [zodiac, setZodiac] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [height, setHeight] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);
    const [about, setAbout] = useState<string>('');
    const [horoscope, setHoroscope] = useState<string>('');

    useEffect(() => {
        const fetchProfile = async () => {
            if (!token) return;

            try {
                const response = await fetch('http://localhost:8080/profiles', {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` },
                });

                if (response.status === 404) {
                    setProfile(null);
                    return;
                }

                if (!response.ok) throw new Error('Network response was not ok');

                const data: Profile = await response.json();
                setProfile(data);

                if (data) {
                    setName(data.name);
                    setBirthday(data.birthday);
                    setZodiac(data.zodiac);
                    setGender(data.gender);
                    setHeight(data.height);
                    setWeight(data.weight);
                    setAbout(data.about);
                    setHoroscope(data.horoscope);
                }
            } catch (error : any) {
                console.error('Fetch error:', error);
                setProfile(null);
                setError(error.message);
            }
        };

        fetchProfile();
    }, [token]);

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString(undefined, {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    const handleSaveOrUpdate = async () => {
        console.log('Fungsi handleSaveOrUpdate dipanggil');
        if (!token) return;
    
        try {
            const url = profile ? 'http://localhost:8080/profiles/update' : 'http://localhost:8080/profiles';
            const method = profile ? 'PATCH' : 'POST';
            const body = JSON.stringify({
                name, birthday, zodiac, gender, height, weight, about, horoscope
            });
    
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body,
            });
    
            if (!response.ok) {
                console.log(response);
                throw new Error(`Failed to ${profile ? 'update' : 'create'} profile`);
            }
    
            const data: Profile = await response.json();
            setProfile(data);
            console.log(data);
        } catch (error: any) {
            console.error('Save/Update error:', error);
            setError(error.message);
        }
    };

    return (
        <Section title="About" action={action} onActionChange={onActionChange} onSave={handleSaveOrUpdate}>
        <div className="flex flex-col space-y-2">
            {action === 'SAVE' ? (
                <>
                    <EditForm label="Username" value={name} onChange={(e) => setName(e.target.value)} />
                    <EditForm label="Gender" value={gender} onChange={(e) => setGender(e.target.value)} />
                    <EditForm label="Birthday" value={birthday} type='date'  onChange={(e) => setBirthday(e.target.value)} />
                    <EditForm label="Horoscope" value={horoscope} disabled />
                    <EditForm label="Zodiac" value={zodiac} disabled />
                    <EditForm label="Height" value={height?.toString()} onChange={(e) => setHeight(Number(e.target.value))} />
                    <EditForm label="Weight" value={weight?.toString()} onChange={(e) => setWeight(Number(e.target.value))} />
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
