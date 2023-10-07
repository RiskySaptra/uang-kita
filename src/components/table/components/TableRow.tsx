import dayjs from 'dayjs';
import { ChevronDown, ChevronUp, FileEdit } from 'lucide-react';
import { useState } from 'react';

import { cn, formatCurrency, transactionWording } from '@/lib/utils';

import { NameTooltip } from '@/components/table/components/RowsUtils';
import { EditData } from '@/components/table/Table';

interface TransactionHistoryProps {
  tx_name: string;
  tx_amount: string;
  edited_date: string;
  edited_by: string;
}
interface TableRowProps {
  id: string;
  name: string;
  date: Date | string;
  sender: string;
  receiver: string;
  amount: string;
  createdBy?: string;
  history: TransactionHistoryProps[];
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
  history,
  isEdit,
}: TableRowProps) {
  const parsed = dayjs(date).format('DD MMMM YYYY');
  const isCannotEdit = sender !== 'rumah' && receiver === 'pengeluaran';
  const [isClosed, setIsClosed] = useState<boolean>(true);
  return (
    <>
      <tr>
        <td className='whitespace-nowrap px-6 py-4 text-sm font-medium capitalize text-gray-800 '>
          <NameTooltip
            name={`${name} ${
              history.length > 0 && `(edited: ${history.length}x)`
            }`}
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
          {formatCurrency(Number(amount) || 0)}
        </td>
        <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800'>
          <IconButton
            icon={<FileEdit />}
            disabled={!isCannotEdit}
            onClick={() =>
              isEdit({ id, name, date, sender, receiver, amount, createdBy })
            }
          />
          {history.length > 0 && (
            <IconButton
              disabled={!isCannotEdit}
              icon={isClosed ? <ChevronDown /> : <ChevronUp />}
              onClick={() => setIsClosed(!isClosed)}
            />
          )}
        </td>
      </tr>
      {history.length > 0 && (
        <TransactionDetail history={history} isClosed={isClosed} />
      )}
    </>
  );
}

const TransactionDetail = ({
  history,
  isClosed,
}: {
  history: TransactionHistoryProps[];
  isClosed: boolean;
}) => {
  return (
    <tr className={`${isClosed && 'hidden'}`}>
      <td
        colSpan={5}
        className='whitespace-nowrap px-9 py-2 text-sm text-gray-800'
      >
        <table className='min-w-full table-fixed divide-y text-left'>
          <thead>
            <tr>
              <th>Histori Transaksi</th>
              <th>Tanggal Edit</th>
              <th>Jumlah</th>
              <th>Di Edit Oleh</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item: TransactionHistoryProps, index: number) => {
              const parsed = dayjs(item.edited_date).format(
                'DD MMMM YYYY (h:mm A)'
              );

              return (
                <tr key={index}>
                  <td className='w-[200px]'>{item.tx_name}</td>
                  <td className='w-[100px]'>{parsed}</td>
                  <td className='w-[100px]'>
                    {formatCurrency(Number(item.tx_amount))}
                  </td>
                  <td className='w-[100px]'>{item.edited_by}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </td>
    </tr>
  );
};

interface IconButtonProps {
  disabled?: boolean;
  onClick: () => void;
  icon: any;
}

const IconButton = ({ disabled, onClick, icon }: IconButtonProps) => {
  return (
    <button
      onClick={() => {
        if (!disabled) onClick();
      }}
      className={cn(
        'active:text-blue-6600 z-10 mr-3 text-blue-800 hover:text-blue-600 active:text-blue-400',
        disabled &&
          'cursor-not-allowed text-gray-400 hover:text-gray-400 active:text-gray-400'
      )}
    >
      {icon}
    </button>
  );
};
