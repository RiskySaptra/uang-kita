import React, { useState } from 'react';

import InputForm from '@/app/components/input';
import Modal from '@/app/components/modal';
import SelectForm from '@/app/components/select';

export interface DataItem {
  id: number;
  name: string;
}

const data: DataItem[] = [
  {
    id: 1,
    name: 'Risky',
  },
  {
    id: 2,
    name: 'Mahesa',
  },
  {
    id: 3,
    name: 'Zamhadi',
  },
  {
    id: 4,
    name: 'Kevin',
  },
  {
    id: -1,
    name: 'Rumah',
  },
  {
    id: -2,
    name: 'Pengeluaran',
  },
];

interface Payload {
  transactionName: string;
  sender: number;
  receiver: number;
  amount: number;
}

const initPayload: Payload = {
  transactionName: 'Galon',
  sender: 2,
  receiver: -1,
  amount: 10000,
};

export default function ModalHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payload, setPayload] = useState<Payload>(initPayload);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const processPayload = (selected: number, field: string) => {
    const conditionCallback = (item: DataItem) => {
      if (field === 'sender') {
        if (item.id === -2) return false;
      } else {
        if (selected < 0) {
          if (item.id === -2) return true;
          return item.id > 0;
        } else {
          return item.id < 0;
        }
      }
      return true;
    };

    return data.filter(conditionCallback);
  };

  const handleSelect = (
    e: React.ChangeEvent<HTMLSelectElement>,
    field: string
  ) => {
    setPayload({
      ...payload,
      [field]: Number(e.target.value),
    });
  };

  return (
    <React.Fragment>
      <div className='mt-5 flex justify-between'>
        <button
          onClick={openModal}
          className='focus:shadow-outline inline-flex h-10 items-center justify-center rounded-lg bg-gray-900 px-6 font-medium tracking-wide text-white transition duration-200 hover:bg-gray-800 focus:outline-none'
        >
          Add New Transaction
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className='max-h-full w-[300px]'>
          <div className='flex justify-center pb-7'>
            <h1 className='text-xl font-bold'>Pencatatan Dimulai</h1>
          </div>

          <form>
            <div>
              <InputForm
                title='Berita Transaksi'
                type='text'
                id='transactionName'
                placeholder='Masukkan nama barang yang dibeli'
              />
            </div>
            <div>
              <SelectForm
                title='Sender'
                id='sender'
                value={payload.sender}
                data={processPayload(payload.sender, 'sender')}
                onChange={(e) => handleSelect(e, 'sender')}
              />
            </div>
            <div>
              <SelectForm
                title='Receiver'
                id='receiver'
                value={payload.receiver}
                data={processPayload(payload.sender, 'receiver')}
                onChange={(e) => handleSelect(e, 'receiver')}
              />
            </div>
            <div>
              <InputForm
                title='Amount'
                type='number'
                id='amount'
                placeholder='Masukkan jumlah uang'
              />
            </div>
            <button
              type='submit'
              className='w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </React.Fragment>
  );
}
