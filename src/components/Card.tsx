import { useState } from 'react';

import { formatCurrency } from '@/lib/utils';

import { TotalSumProps } from '@/app/page';

interface CardProps {
  title: string;
  amount: string;
  data?: TotalSumProps[];
  detailsTitle?: string;
}

export default function Card({ title, amount, data, detailsTitle }: CardProps) {
  const [open, setOpen] = useState<boolean>(false);
  const handelOpen = () => {
    if (data) {
      setOpen(!open);
    }
  };

  return (
    <div
      onClick={handelOpen}
      className='min-h-[10rem] cursor-pointer select-none rounded-lg bg-gray-200 p-4 text-gray-700'
    >
      {!open && (
        <>
          <p className='font-semibold uppercase'>{title}</p>
          <p className='text-xl font-bold'>{amount}</p>
        </>
      )}
      {data && open && (
        <div className='relative overflow-x-auto'>
          <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
            <thead className='text-xs uppercase text-gray-700'>
              <tr>
                <th scope='col' className='px-3 pb-2'>
                  Nama
                </th>
                <th scope='col' className='px-3 pb-2'>
                  {detailsTitle}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <th
                    scope='row'
                    className='whitespace-nowrap px-3 py-[2px] font-medium capitalize text-gray-900'
                  >
                    {item.name}
                  </th>
                  <td
                    className={`px-3 py-[2px]  ${
                      item.total >= 0 ? 'text-gray-900' : 'text-red-600'
                    }`}
                  >
                    {formatCurrency(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
