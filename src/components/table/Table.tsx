'use client';

import dayjs from 'dayjs';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { getDataTable } from '@/lib/handler/table-handler';

import InputForm from '@/components/Input';
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
        <ModalEditTrasaction state={[modalEdit, setModalEdit]} />
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

interface ModalEditTrasactionProps {
  state: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const ModalEditTrasaction = ({ state }: ModalEditTrasactionProps) => {
  const [modalEdit, setModalEdit] = state;
  return (
    <Modal isOpen={modalEdit} onClose={() => setModalEdit(false)}>
      <div className='max-h-full md:w-[400px]'>
        <div className='flex justify-center pb-2'>
          <h1 className='text-xl font-bold'>Ubah Transaksi (disabeld)</h1>
        </div>

        <form>
          <div>
            <InputForm
              title='Berita Transaksi'
              type='text'
              value=''
              // isDisabled={isPayContribution}
              id='transactionName'
              placeholder='Masukkan nama transaksi'
              onChange={() => ''}
              // err={formik?.errors?.transactionName}
            />
          </div>
          <div>
            <InputForm
              title='Jumlah'
              type='text'
              value=''
              id='amount'
              placeholder='Masukkan jumlah uang'
              onChange={() => ''}
            />
          </div>
        </form>
        <button
          type='submit'
          className='focus:shadow-outline mt-2 inline-flex h-10 items-center justify-center rounded-lg bg-gray-900 px-6 font-medium tracking-wide text-white transition duration-200 hover:bg-gray-800 focus:outline-none'
        >
          Submit
        </button>
      </div>
    </Modal>
  );
};
