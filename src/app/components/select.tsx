import React from 'react';

import { DataItem } from '@/app/home/ModalHome';

export interface Selectdata {
  id: number;
  name: string;
}

export interface SelectProps {
  value: number;
  title: string;
  id: string;
  data: DataItem[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectForm: React.FC<SelectProps> = ({
  value,
  id,
  title,
  data,
  onChange,
}) => {
  return (
    <div className='mb-2'>
      <label className='mb-2 block text-sm font-medium text-gray-900'>
        {title}
      </label>
      <select
        id={id}
        defaultValue={value}
        onChange={onChange}
        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-gray-500 focus:ring-gray-500 '
      >
        <option selected>Choose</option>
        {data.map((item: DataItem) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectForm;
