import dayjs from 'dayjs';
import { FileEdit } from 'lucide-react';

import { cn, formatCurrency, transactionWording } from '@/lib/utils';

import { NameTooltip } from '@/components/table/components/RowsUtils';
import { EditData } from '@/components/table/Table';

interface TableRowProps {
  id: string;
  name: string;
  date: Date | string;
  sender: string;
  receiver: string;
  amount: string;
  createdBy?: string;
  isEdit: (arg: EditData) => void;
}

export function EmptyTableRow({ message }: { message: string }) {
  return (
    <tr>
      <td
        colSpan={5}
        className='whitespace-nowrap px-6 py-4 text-sm text-gray-800'
      >
        <p className='text-center text-2xl font-medium'>{message}</p>
      </td>
    </tr>
  );
}

export function TableRow({
  id,
  name,
  date,
  sender,
  receiver,
  amount,
  createdBy,
  isEdit,
}: TableRowProps) {
  const parsed = dayjs(date).format('DD MMMM YYYY');
  const isCannotEdit = sender !== 'rumah' && receiver === 'pengeluaran';
  return (
    <tr className='cursor-pointer hover:bg-gray-300'>
      <td className='whitespace-nowrap px-6 py-4 text-sm font-medium capitalize text-gray-800 '>
        <NameTooltip
          name={name}
          createdBy={createdBy}
          sender={sender}
          receiver={receiver}
        />
      </td>
      <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800'>
        {date ? parsed : 'Loading'}
      </td>
      <td className='whitespace-nowrap px-6 py-4 text-sm capitalize text-gray-800'>
        {transactionWording(sender, receiver)}
      </td>
      <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800'>
        {amount ? formatCurrency(Number(amount)) : 'Loading'}
      </td>
      <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800'>
        <IconButton
          disabled={!isCannotEdit}
          onClick={() =>
            isEdit({ id, name, date, sender, receiver, amount, createdBy })
          }
        />
      </td>
    </tr>
  );
}

interface IconButtonProps {
  disabled?: boolean;
  onClick: () => void;
}

const IconButton = ({ disabled, onClick }: IconButtonProps) => {
  return (
    <button
      onClick={() => {
        if (!disabled) onClick();
      }}
      className={cn(
        'active:text-blue-6600 z-10 ml-4 text-blue-800 hover:text-blue-600 active:text-blue-400',
        disabled &&
          'cursor-not-allowed text-gray-400 hover:text-gray-400 active:text-gray-400'
      )}
    >
      <FileEdit />
    </button>
  );
};
