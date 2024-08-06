
import EditButton from "./EditButton";

type SectionProps = {
    title: string;
    children: React.ReactNode;
    action: 'SAVE' | 'EDIT';
    onActionChange: () => void;
};

const Section: React.FC<SectionProps> = ({
    title,
    children,
    action,
    onActionChange
}) => (
    <div className="relative w-[90%] h-max bg-[#0E191F] rounded-custom p-4 mx-auto">
        <div className='flex items-center justify-between mb-4'>
            <span className="text-white text-xl font-semibold">{title}</span>
            <button onClick={onActionChange} className="text-gradient hover:text-gray-300">
                {action === 'SAVE' ? 'Save & Update' : <EditButton />}
            </button>
        </div>
        {children}
    </div>
);

export default Section;
