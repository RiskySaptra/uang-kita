'use client';
import React, { useState } from 'react';

import ModalHome from '@/app/home/ModalHome';
import TableHome from '@/app/home/TableHome';
import DropDownHome from '@/app/home/DropDownHome';

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

export default function page() {
  return (
    <React.Fragment>
      <div className="h-screen bg-[url('/images/UANGKITA.png')] bg-auto bg-center p-4">
        <div className='grid min-h-[11rem] grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'>
          {dataCard.map((item, index) => {
            return <DropDownHome item={item} key={index} />;
          })}
        </div>

        <ModalHome />
        <div className='mt-5 rounded-lg bg-gray-200'>
          <TableHome />
        </div>
      </div>
    </React.Fragment>
  );
}
