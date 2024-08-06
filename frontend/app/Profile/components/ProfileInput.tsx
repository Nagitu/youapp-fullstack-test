'use client';

type ProfileProps = {
    username: string;
    Zodiac?: string;
    Horoscope?: string;
    Gender?: string;
    backgroundImage?: string; // Tambahkan props untuk background image
}

const ProfileInput: React.FC<ProfileProps> = ({ username, Gender, Horoscope, Zodiac, backgroundImage }) => (
    <div
        className='relative w-[90%] h-[190px] rounded-custom mx-auto'
        style={{
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
            backgroundColor: !backgroundImage ? '#162329' : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}
    >
        {!backgroundImage && (
            <div
                className="w-full h-full p-4 rounded-custom bg-[#162329] text-white"
            />
        )}
        <div className='absolute bottom-4 left-4 flex flex-col'>
            <span className="text-white">@{username}</span>
            {Gender && <span className="text-white">{Gender}</span>}
            {Horoscope && <span className="text-white">{Horoscope}</span>}
            {Zodiac && <span className="text-white">{Zodiac}</span>}
        </div>
    </div>
);

export default ProfileInput;

