
import Section from "./Section";

type InterestSectionProps = {
    action: 'SAVE' | 'EDIT';
    onActionChange: () => void;
};

const InterestSection: React.FC<InterestSectionProps> = ({ action, onActionChange }) => {
    return (
        <Section title="Interest" action={action} onActionChange={onActionChange}>
            <input
                type='text'
                className="w-full h-[110px] p-4 rounded-custom bg-[#0E191F]"
                placeholder="Add in your interest to find a better match"
            />
        </Section>
    );
};

export default InterestSection;
