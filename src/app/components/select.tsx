import React from 'react';

interface SelectProps {
  value: string;
  title: string;
  id: string;
}

const SelectForm: React.FC<SelectProps> = ({ value, id, title }) => {
  return (
    <div className='mb-6'>
      <label className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-700'>
        {title}
      </label>
      <select
        id={id}
        defaultValue={value}
        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
      >
        <option selected>Choose your fighter</option>
        <option value={1}>Risky</option>
        <option value={2}>Mahesa</option>
        <option value={3}>Zamhadi</option>
        <option value={4}>Kevin</option>
        <option value={-1}>Rumah</option>
        <option value={-2}>Pengeluaran</option>
      </select>
    </div>
  );
};

export default SelectForm;
