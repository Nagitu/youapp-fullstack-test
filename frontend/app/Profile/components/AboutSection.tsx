
import Info from "./Info";
import EditForm from "./EditForm";
import Section from "./Section";

type AboutSectionProps = {
    action: 'SAVE' | 'EDIT';
    onActionChange: () => void;
    biodata: {
        username: string;
        birthday: string;
        Age: number;
        horoscope: string;
        zodiac: string;
        height: number;
        weight: number;
        gender: string;
    };
};

const AboutSection: React.FC<AboutSectionProps> = ({ action, onActionChange, biodata }) => {
    return (
        <Section title="About" action={action} onActionChange={onActionChange}>
            <div className='flex flex-col space-y-2'>
                {action === 'SAVE' ? (
                    <>
                        <EditForm label="Username" value={biodata.username} />
                        <EditForm label="Gender" value={biodata.gender} />
                        <EditForm label="Birthday" value={biodata.birthday} />
                        <EditForm label="Horoscope" value={biodata.horoscope} disabled />
                        <EditForm label="Zodiac" value={biodata.zodiac} disabled />
                        <EditForm label="Height" value={biodata.height} />
                        <EditForm label="Weight" value={biodata.weight} />
                    </>
                ) : (
                    <>
                        <Info category="Birthday" value={`${biodata.birthday} (Age ${biodata.Age})`} />
                        <Info category="Horoscope" value={biodata.horoscope} />
                        <Info category="Zodiac" value={biodata.zodiac} />
                        <Info category="Height" value={`${biodata.height} cm`} />
                        <Info category="Weight" value={`${biodata.weight} kg`} />
                    </>
                )}
            </div>
        </Section>
    );
};

export default AboutSection;
