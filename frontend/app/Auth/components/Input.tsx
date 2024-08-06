import React from 'react';

type InputProps = {
  type: string;
  placeholder: string;
};

const Input: React.FC<InputProps> = ({ type, placeholder }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-327px h-51px p-4 top-[212px] left-[23px] gap-0 rounded-custom"
    />
  );
};

export default Input;
