import React, { useState } from 'react';
import Section from './Section';

type InterestSectionProps = {
    action: 'SAVE' | 'EDIT';
    onActionChange: () => void;
};

const InterestSection: React.FC<InterestSectionProps> = ({ action, onActionChange }) => {
    const [disabled, setDisabled] = useState(action === 'SAVE');

    React.useEffect(() => {
        setDisabled(action === 'EDIT');
    }, [action]);

    return (
        <Section title="Interest" action={action} onActionChange={onActionChange}>
            <input
                type='text'
                className="w-full h-[110px] p-4 rounded-custom bg-[#0E191F] text-white"
                placeholder="Add in your interest to find a better match"
                disabled={disabled}
            />
        </Section>
    );
};

export default InterestSection;
