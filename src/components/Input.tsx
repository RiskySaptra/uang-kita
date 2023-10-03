import React from 'react';

interface InputProps {
  title: string;
  type: string;
  id: string;
  placeholder: string;
  value: string | number;
  isDisabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputForm: React.FC<InputProps> = ({
  title,
  type,
  id,
  placeholder,
  value,
  onChange,
  isDisabled,
}) => {
  return (
    <div className='mb-2 w-full'>
      <label className='mb-2 block text-sm font-medium text-gray-900 '>
        {title}
      </label>
      <input
        type={type}
        id={id}
        disabled={isDisabled}
        value={value}
        onChange={onChange}
        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-gray-500 focus:ring-gray-500 disabled:text-gray-500'
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default InputForm;
