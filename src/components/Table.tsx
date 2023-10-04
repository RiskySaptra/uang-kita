'use client';

import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import { useState } from 'react';
import { useQuery } from 'react-query';
dayjs.extend(localeData);

import { formatCurrency } from '@/lib/utils';

import ModalHome from '@/components/ModalHome';

interface TableRowProps {
  name: string;
  date: Date | string;
  sender: string;
  receiver: string;
  amount: string;
  createdBy?: string;
}

interface Transaction {
  _id: string;
  tx_name: string;
  tx_date: Date;
  sender: string;
  receiver: string;
  tx_amount: string;
  created_by: string;
}

export const fetchCache = 'force-no-store';

const _baseUrl = process.env.BASE_URL;
const getDataTable = async (month: number) => {
  try {
    const data = await fetch(
      `${_baseUrl}api/transactions-list?month=${month}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        next: { revalidate: 0 },
      }
    );
    return data.json();
  } catch (error) {
    // console.log(error);
  }
};

export default function Table() {
  const currentMonthIndex = dayjs(new Date()).month() + 1;

  const [month, setMonth] = useState(currentMonthIndex);

  const { data, isLoading } = useQuery<Transaction[]>(
    ['transaction-list', month],
    () => getDataTable(month)
  );

  return (
    <>
      <div className='mt-6 flex '>
        <ModalHome />
        <SelectMonth
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        />
      </div>
      <div className='mt-5 flex flex-col'>
        <div className='-m-1.5 overflow-x-auto'>
          <div className='inline-block min-w-full p-1.5 align-middle'>
            <div className='overflow-hidden rounded-lg border bg-gray-200'>
              <table className='min-w-full divide-y divide-gray-500'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-sm font-medium uppercase text-gray-700'
                    >
                      Berita Transaksi
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-sm font-medium uppercase text-gray-700'
                    >
                      Tanggal
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-sm font-medium uppercase text-gray-700'
                    >
                      Pengirim
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-sm font-medium uppercase text-gray-700'
                    >
                      Penerima
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-sm font-medium uppercase text-gray-700'
                    >
                      Jumlah
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-400 '>
                  {isLoading && !data && <EmptyTableRow message='Loading' />}
                  {!data ||
                    (data?.length === 0 && (
                      <EmptyTableRow message='Jajan laaaahh masa kosong !' />
                    ))}
                  {data &&
                    data?.length > 0 &&
                    data.map((item: Transaction) => (
                      <TableRow
                        key={item._id}
                        name={item.tx_name}
                        date={item.tx_date}
                        sender={item.sender}
                        receiver={item.receiver}
                        amount={item.tx_amount}
                        createdBy={item.created_by}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function EmptyTableRow({ message }: { message: string }) {
  return (
    <tr>
      <td
        colSpan={5}
        className='whitespace-nowrap px-6 py-4 text-sm text-gray-800'
      >
        <p className='text-center text-2xl font-medium text-indigo-700'>
          {message}
        </p>
      </td>
    </tr>
  );
}

function TableRow({
  name,
  date,
  sender,
  receiver,
  amount,
  createdBy,
}: TableRowProps) {
  const parsed = dayjs(date).format('DD MMMM YYYY');
  const statusColor = (reciver: string) => {
    if (reciver === 'pengeluaran') return 'bg-red-500';
    if (reciver === 'rumah') return 'bg-green-500';
    return 'bg-blue-500';
  };
  return (
    <tr>
      <td className='whitespace-nowrap px-6 py-4 text-sm font-medium capitalize text-gray-800 '>
        <ToolTip tooltip={`Di Buat Oleh: ${createdBy}`}>
          <span
            className={`min-h-5 min-w-5 text mr-2 inline-block rounded-full ${statusColor(
              receiver
            )} text-transparent`}
          >
            |
          </span>
          {name}
        </ToolTip>
      </td>
      <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800'>
        {date ? parsed : 'Loading'}
      </td>
      <td className='whitespace-nowrap px-6 py-4 text-sm capitalize text-gray-800'>
        {sender}
      </td>
      <td className='whitespace-nowrap px-6 py-4 text-sm capitalize text-gray-800'>
        {receiver}
      </td>
      <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800'>
        {amount ? formatCurrency(Number(amount)) : 'Loading'}
      </td>
    </tr>
  );
}

const SelectMonth = ({
  onChange,
  value,
}: {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <div className='ml-5 w-[140px]'>
      <select
        id='select-month'
        value={value}
        onChange={onChange}
        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-gray-500 focus:ring-gray-500 '
      >
        {dayjs.months().map((month: string, index) => (
          <option key={month} value={index + 1}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
};

import { FC, ReactNode, useRef } from 'react';

interface Props {
  children: ReactNode;
  tooltip?: string;
}

const ToolTip: FC<Props> = ({ children, tooltip }): JSX.Element => {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const container = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={container}
      onMouseEnter={({ clientX }) => {
        if (!tooltipRef.current || !container.current) return;
        const { left } = container.current.getBoundingClientRect();

        tooltipRef.current.style.left = clientX - left + 'px';
      }}
      className='group relative inline-block'
    >
      {children}
      {tooltip ? (
        <span
          ref={tooltipRef}
          className='invisible absolute top-[-38px] mt-2 whitespace-nowrap rounded bg-blue-800 p-1 px-3 text-white opacity-0 transition group-hover:visible group-hover:opacity-100'
        >
          {tooltip}
        </span>
      ) : null}
    </div>
  );
};
