// components/Header.tsx
import BackButton from "../../components/Button/BackButton";

type headerProps = {
    username : string;
    href : string;
}

const Header:React.FC<headerProps> = ({href,username}) => (
    <div className='flex items-center gap-24 p-4'>
        <BackButton href={href}/>
        <h1 className='text-white'>{username}</h1>
    </div>
);

export default Header;
