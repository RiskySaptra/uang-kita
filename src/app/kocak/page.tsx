'use client';
import React, { useState } from 'react';

import Dropdown from '@/app/components/dropdown';

interface TableRowProps {
  name: string;
  sender: string;
  receiver: string;
  amount: string;
}

const dataCard = [
  {
    _id: 1,
    title: 'TOTAL UANG DIREKENING',
    amount: 'Rp.0',
  },
  {
    _id: 2,
    title: 'TOTAL UTANG RUMAH KE USER',
    amount: 'Rp.0',
  },
  {
    _id: 3,
    title: 'TOTAL PENGELUARAN',
    amount: 'Rp.0',
  },
  {
    _id: 4,
    title: 'UDUNAN YANG HARUS DIBAYAR',
    amount: 'Rp.0',
  },
];

function TableRow({ name, sender, receiver, amount }: TableRowProps) {
  return (
    <tr className='border-b hover:bg-gray-500'>
      <td className='px-6 py-4'>{name}</td>
      <td className='px-6 py-4'>{sender}</td>
      <td className='px-6 py-4'>{receiver}</td>
      <td className='px-6 py-4'>{amount}</td>
      <td className='px-6 py-4'>
        <div className='space-x-4'>
          <button className='btn-primary'>Edit</button>
          <button className='btn-primary'>Delete</button>
        </div>
      </td>
    </tr>
  );
}

function Table() {
  return (
    <div className='overflow-x-auto'>
      <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
        <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th className='px-6 py-4'>Transactions Name</th>
            <th className='px-6 py-4'>Sender</th>
            <th className='px-6 py-4'>Receiver</th>
            <th className='px-6 py-4'>Transactions Amount</th>
            <th className='px-6 py-4'>Action</th>
          </tr>
        </thead>
        <tbody className='border-b bg-white dark:border-gray-700 dark:bg-gray-900'>
          <TableRow name='Mark' sender='Otto' receiver='@mdo' amount='20000' />
          <TableRow name='Mark' sender='Otto' receiver='@mdo' amount='20000' />
          <TableRow name='Mark' sender='Otto' receiver='@mdo' amount='20000' />
        </tbody>
      </table>
    </div>
  );
}

export default function page() {
  const [isDropdownOpen, setIsDropdownOpen] = useState<any>({
    isOpen: false,
    id: null,
  });

  const openDropdown = (id: any) => {
    setIsDropdownOpen({
      isOpen: !isDropdownOpen.isOpen,
      id: id,
    });
  };

  const closeDropdown = (id: any) => {
    setIsDropdownOpen({ isOpen: false, id: id });
  };

  return (
    <React.Fragment>
      <div className="h-screen bg-[url('/images/UANGKITA.png')] bg-auto bg-center p-4">
        <div className='grid min-h-[11rem] grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'>
          {dataCard.map((item, index) => {
            return (
              <div
                className='flex cursor-pointer items-center justify-center rounded bg-gray-50 p-5 dark:bg-gray-800'
                onClick={() => openDropdown(item._id)}
                key={index}
              >
                <div>
                  <p className='dark:text-white-500 text-2xl text-white'>
                    {item.title}
                  </p>
                  <div className='flex items-center justify-center text-white'>
                    {item.amount}
                  </div>
                  <Dropdown
                    isOpen={
                      isDropdownOpen.isOpen && isDropdownOpen.id === item._id
                    }
                    onClose={() => closeDropdown}
                    isId={isDropdownOpen.id}
                  >
                    <div>
                      <div>Nama</div>
                      <div>M Risky</div>
                      <div>Zam hadi</div>
                      <div>Mahesa</div>
                      <div>Kevin</div>
                    </div>
                    <div>
                      <div>Bulan Lalu</div>
                      <div>Rp.69</div>
                      <div>Rp.69</div>
                      <div>Rp.69</div>
                      <div>Rp.69</div>
                    </div>
                    <div>
                      <div>Bulan Ini</div>
                      <div>Rp.69</div>
                      <div>Rp.69</div>
                      <div>Rp.69</div>
                      <div>Rp.69</div>
                    </div>
                    <div>
                      <div>Total</div>
                      <div>Rp.138</div>
                      <div>Rp.138</div>
                      <div>Rp.138</div>
                      <div>Rp.138</div>
                    </div>
                  </Dropdown>
                </div>
              </div>
            );
          })}
        </div>
        <div className='mt-5 rounded-lg bg-gray-200'>
          <Table />
        </div>
      </div>
    </React.Fragment>
  );
}
