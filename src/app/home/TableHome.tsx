import React from 'react';

interface TableRowProps {
  name: string;
  sender: string;
  receiver: string;
  amount: string;
}

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

export default function TableHome() {
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
