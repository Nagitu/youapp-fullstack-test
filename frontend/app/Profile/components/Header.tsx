// components/Header.tsx
import BackButton from "../../components/Button/BackButton";

const Header = ({ username }: { username: string }) => (
    <div className='flex items-center gap-24 p-4'>
        <BackButton href="/Home"/>
        <h1 className='text-white'>{username}</h1>
    </div>
);

export default Header;
