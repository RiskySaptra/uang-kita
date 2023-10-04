'use client';

import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { formatCurrency } from '@/lib/utils';

import ModalHome from '@/components/ModalHome';

interface TableRowProps {
  name: string;
  date: Date | string;
  sender: string;
  receiver: string;
  amount: string;
}

interface Transaction {
  _id: string;
  tx_name: string;
  tx_date: Date;
  sender: string;
  receiver: string;
  tx_amount: string;
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

  const { data } = useQuery<Transaction[]>(['transaction-list', month], () =>
    getDataTable(month)
  );
  return (
    <>
      <div className='mt-2 flex content-end'>
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
                  {data?.length ? (
                    data.map((item: Transaction) => (
                      <TableRow
                        key={item._id}
                        name={item.tx_name}
                        date={item.tx_date}
                        sender={item.sender}
                        receiver={item.receiver}
                        amount={item.tx_amount}
                      />
                    ))
                  ) : (
                    <TableRow
                      name='Loading'
                      date=''
                      sender='Loading'
                      receiver='Loading'
                      amount=''
                    />
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function TableRow({ name, date, sender, receiver, amount }: TableRowProps) {
  const parsed = dayjs(date).format('DD MMMM YYYY');
  const statusColor = (reciver: string) => {
    if (reciver === 'pengeluaran') return 'bg-red-500';
    if (reciver === 'rumah') return 'bg-green-500';
    return 'bg-blue-500';
  };
  return (
    <tr>
      <td className='whitespace-nowrap px-6 py-4 text-sm font-medium capitalize text-gray-800 '>
        <span
          className={`min-h-5 min-w-5 text mr-2 inline-block rounded-full ${statusColor(
            receiver
          )} text-transparent`}
        >
          |
        </span>
        {name}
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

dayjs.extend(localeData);

const SelectMonth = ({
  onChange,
  value,
}: {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <div className='ml-5 w-[140px]'>
      <label
        htmlFor='select-month'
        className='mb-1 block text-sm font-medium text-white'
      >
        Pilih Bulan
      </label>
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
