'use client';

import dayjs from 'dayjs';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { getDataTable } from '@/lib/handler/table-handler';

import Modal from '@/components/Modal';
import ModalHome from '@/components/ModalHome';
import SelectMonth from '@/components/SelectMonth';
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
}

export default function Table() {
  const currentMonthIndex = dayjs(new Date()).month() + 1;
  const [month, setMonth] = useState(currentMonthIndex);
  const { data, isLoading } = useQuery<Transaction[]>(
    ['transaction-list', month],
    () => getDataTable(month)
  );
  const [modalEdit, setModalEdit] = useState<boolean>(false);

  return (
    <>
      <div className='mt-6 flex '>
        <ModalHome />
        <SelectMonth
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        />
        <Modal isOpen={modalEdit} onClose={() => setModalEdit(false)}>
          <div className='max-h-full md:w-[400px]'>
            <div className='flex justify-center pb-2'>
              <h1 className='text-xl font-bold'>Ubah Transaksi</h1>
            </div>
            <p className='text-md font-medium'>
              Coming Soon Enough! (kalau ingat)
            </p>
            <div>Notes: hanya pengeluaran user yang boleh di ubah</div>
            <div>
              Notes: Soft delete data asli/sebelumnya di simpan di table backup
              refrence objectId
            </div>
            <div>
              Notes: Operasi mengunakan mongodb [$currentOp].transaction
            </div>
          </div>
        </Modal>
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
                        name={item.tx_name}
                        date={item.tx_date}
                        sender={item.sender}
                        receiver={item.receiver}
                        amount={item.tx_amount}
                        createdBy={item.created_by}
                        isEdit={setModalEdit}
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
