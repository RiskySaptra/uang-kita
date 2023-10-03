import React from 'react';

import { DataItem } from '@/components/ModalHome';

export interface Selectdata {
  id: number;
  name: string;
}

export interface SelectProps {
  value: number;
  title: string;
  id: string;
  data: DataItem[];
  isDisabled?: boolean;
  err: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectForm: React.FC<SelectProps> = ({
  value,
  id,
  title,
  data,
  onChange,
  isDisabled,
  err,
}) => {
  return (
    <div className='mb-2'>
      <label
        htmlFor={id}
        className='mb-2 block text-sm font-medium text-gray-900'
      >
        {title}
      </label>
      <select
        id={id}
        value={value}
        disabled={isDisabled}
        onChange={onChange}
        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-gray-500 focus:ring-gray-500 '
      >
        <option value=''>Choose</option>
        {data.map((item: DataItem) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <label className='mt-2 block text-sm font-medium text-red-600 '>
        {err}
      </label>
    </div>
  );
};

export default SelectForm;
