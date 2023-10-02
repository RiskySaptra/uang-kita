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
    </tr>
  );
}

export default function TableHome() {
  return (
    <div className='overflow-x-auto'>
      <table className='w-full text-left text-sm text-gray-500'>
        <thead className=' bg-gray-700 text-xs uppercase text-white '>
          <tr>
            <th className='px-6 py-4'>Transactions Name</th>
            <th className='px-6 py-4'>Sender</th>
            <th className='px-6 py-4'>Receiver</th>
            <th className='px-6 py-4'>Transactions Amount</th>
          </tr>
        </thead>
        <tbody className='border-b border-gray-700 bg-gray-900 text-white'>
          <TableRow name='Mark' sender='Otto' receiver='@mdo' amount='20000' />
          <TableRow name='Mark' sender='Otto' receiver='@mdo' amount='20000' />
          <TableRow name='Mark' sender='Otto' receiver='@mdo' amount='20000' />
        </tbody>
      </table>
    </div>
  );
}
