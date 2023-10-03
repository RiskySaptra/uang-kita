import dayjs from 'dayjs';
import { useQuery } from 'react-query';

import { formatCurrency } from '@/lib/utils';

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
const getDataTable = async () => {
  try {
    const data = await fetch(`${_baseUrl}api/transactions-list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data.json();
  } catch (error) {
    // console.log(error);
  }
};

export default function Table() {
  const { data } = useQuery<Transaction[]>('transaction-list', getDataTable);
  return (
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
                {data ? (
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
  );
}

function TableRow({ name, date, sender, receiver, amount }: TableRowProps) {
  const parsed = dayjs(date).format('DD MMMM YYYY');
  return (
    <tr>
      <td className='whitespace-nowrap px-6 py-4 text-sm font-medium capitalize text-gray-800 '>
        {name}
      </td>
      <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800'>
        {date ? parsed : 'Loading'}
      </td>
      <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800'>
        {sender}
      </td>
      <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800'>
        {receiver}
      </td>
      <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800'>
        {amount ? formatCurrency(Number(amount)) : 'Loading'}
      </td>
    </tr>
  );
}
