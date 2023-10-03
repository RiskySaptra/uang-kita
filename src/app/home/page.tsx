'use client';
import React from 'react';

import ModalHome from '@/app/home/ModalHome';
import TableHome from '@/app/home/TableHome';

export default function page() {
  return (
    <React.Fragment>
      <div className="h-screen bg-[url('/images/UANGKITA.png')] bg-auto bg-center p-4">
        <ModalHome />
        <div className='mt-5 rounded-lg bg-gray-200'>
          <TableHome />
        </div>
      </div>
    </React.Fragment>
  );
}
