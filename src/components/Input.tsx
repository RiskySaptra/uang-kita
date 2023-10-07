import React from 'react';

interface InputProps {
  title: string;
  type: string;
  id: string;
  placeholder: string;
  value: string | number;
  isDisabled?: boolean;
  err?: string | string[] | undefined;
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
  err,
}) => {
  return (
    <div className='mb-1 w-full'>
      <label className='mb-1 block text-sm font-medium text-gray-900 '>
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
      />
      <label className='mt-1 block text-sm font-medium text-red-600 '>
        {err}
      </label>
    </div>
  );
};

export default InputForm;
