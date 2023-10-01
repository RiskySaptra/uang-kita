'use client';

import React, { useState } from 'react';

import Modal from '@/app/components/modal';

interface CardProps {
  title: string;
  amount: string;
}

interface TableRowProps {
  name: string;
  sender: string;
  receiver: string;
  amount: string;
}

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <main className='container mx-auto px-2 py-10 xl:mx-auto'>
      <div className='flex justify-center pb-7'>
        <h1 className='text-xl font-bold'>UANG BULANAN 3==D</h1>
      </div>

      <div className='grid min-h-[11rem] grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'>
        <Card title='Total Amount in the Account' amount='Rp.0' />
        <Card title='Total Debt' amount='Rp.0' />
        <Card title='Pusing' amount='Rp.0' />
        <Card title='Total Expenses' amount='Rp.0' />
      </div>

      <div className='mt-5 flex justify-between'>
        <button
          onClick={openModal}
          className='focus:shadow-outline inline-flex h-10 items-center justify-center rounded-lg bg-gray-900 px-6 font-medium tracking-wide text-white transition duration-200 hover:bg-gray-800 focus:outline-none'
        >
          Add New Transaction
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className='h-[600px]  w-[300px]'>
          <h2 className='mb-4 text-2xl font-semibold'>Modal Content</h2>
          <p>This is your modal content.</p>
        </div>
      </Modal>

      <div className='mt-5 rounded-lg bg-gray-200'>
        <Table />
      </div>
    </main>
  );
}

function Card({ title, amount }: CardProps) {
  return (
    <div className='rounded-lg bg-gray-200 p-4'>
      <p className='font-semibold uppercase'>{title}</p>
      <p className='text-xl font-bold'>{amount}</p>
    </div>
  );
}

function Table() {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full text-left text-sm font-light'>
        <thead>
          <tr>
            <th className='px-6 py-4'>Transactions Name</th>
            <th className='px-6 py-4'>Sender</th>
            <th className='px-6 py-4'>Receiver</th>
            <th className='px-6 py-4'>Transactions Amount</th>
            <th className='px-6 py-4'>Action</th>
          </tr>
        </thead>
        <tbody>
          <TableRow name='Mark' sender='Otto' receiver='@mdo' amount='20000' />
          <TableRow name='Mark' sender='Otto' receiver='@mdo' amount='20000' />
          <TableRow name='Mark' sender='Otto' receiver='@mdo' amount='20000' />
        </tbody>
      </table>
    </div>
  );
}

function TableRow({ name, sender, receiver, amount }: TableRowProps) {
  return (
    <tr className='border-b hover:bg-gray-100'>
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
