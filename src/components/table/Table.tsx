'use client';

import dayjs from 'dayjs';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { getDataTable } from '@/lib/handler/table-handler';

import AddUserIdentification from '@/components/AddUserIdentification';
import ModalHome from '@/components/ModalHome';
import SelectMonth from '@/components/SelectMonth';
import { ModalEditTrasaction } from '@/components/table/components/RowsUtils';
import {
  EmptyTableRow,
  TableRow,
} from '@/components/table/components/TableRow';

interface Transaction {
  _id: string;
  tx_name: string;
  tx_date: Date;
  sender: string;
  receiver: string;
  tx_amount: string;
  created_by: string;
  history: TransactionHistoryProps[];
}

interface TransactionHistoryProps {
  tx_name: string;
  tx_amount: string;
  edited_date: string;
  edited_by: string;
}

export interface EditData {
  id: string;
  name: string;
  date: Date | string;
  sender?: string;
  receiver?: string;
  amount: string | number;
  createdBy?: string;
}

export const initPayload: EditData = {
  id: '',
  name: '',
  date: '',
  sender: '0',
  receiver: '0',
  amount: '0',
  createdBy: '',
};

export default function Table() {
  const currentMonthIndex = dayjs(new Date()).month() + 1;
  const [month, setMonth] = useState(currentMonthIndex);
  const { data, isLoading } = useQuery<Transaction[]>(
    ['transaction-list', month],
    () => getDataTable(month)
  );
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [userModal, setUserModal] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<EditData>(initPayload);

  const user =
    typeof window !== 'undefined' ? localStorage.getItem('user') : '';

  const openModal = (data: EditData) => {
    setSelectedData(data);
    if (user) {
      setModalEdit(true);
    } else {
      setUserModal(true);
    }
  };

  return (
    <>
      <div className='mt-6 flex '>
        <ModalHome />
        {selectedData.name && (
          <ModalEditTrasaction
            state={[modalEdit, setModalEdit]}
            selectedDataState={[selectedData, setSelectedData]}
          />
        )}

        <AddUserIdentification
          state={[userModal, setUserModal]}
          modalForm={setModalEdit}
        />
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
                      Transaksi
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-sm font-medium uppercase text-gray-700'
                    >
                      Jumlah
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-sm font-medium uppercase text-gray-700'
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-400 '>
                  {isLoading && !data && <EmptyTableRow message='Loading' />}
                  {!data ||
                    (data?.length === 0 && <EmptyTableRow message='Kosong' />)}
                  {data &&
                    data?.length > 0 &&
                    data.map((item: Transaction) => (
                      <TableRow
                        key={item._id}
                        id={item._id}
                        name={item.tx_name}
                        date={item.tx_date}
                        sender={item.sender}
                        receiver={item.receiver}
                        amount={item.tx_amount}
                        createdBy={item.created_by}
                        history={item.history}
                        isEdit={(data: EditData) => openModal(data)}
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
