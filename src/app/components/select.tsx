import React from 'react';

export interface Selectdata {
  id: number;
  name: string;
}

export interface SelectProps {
  value: string;
  title: string;
  id: string;
  data: any;
  onChange: (e: any) => void;
}

const SelectForm: React.FC<SelectProps> = ({
  value,
  id,
  title,
  data,
  onChange,
}) => {
  return (
    <div className='mb-6'>
      <label className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-700'>
        {title}
      </label>
      <select
        id={id}
        defaultValue={value}
        onChange={onChange}
        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
      >
        <option selected>Choose</option>
        {data.map((item: any) => (
          <option key={data.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectForm;
